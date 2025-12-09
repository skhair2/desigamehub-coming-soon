import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Rate limiting constants
const RATE_LIMIT_MAX_REQUESTS = 5 // requests per window
const RATE_LIMIT_WINDOW_MINUTES = 60 // 1 hour window

// Helper to create Supabase client within request context
function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    throw new Error('Missing Supabase configuration')
  }
  
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'X-Client-Info': 'desiplayground-api-subscribe',
      },
    },
  })
}

async function checkRateLimit(ip: string, supabase: any): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const now = new Date()
    const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MINUTES * 60000)

    // Get current request count
    const { data: existing, error: getError } = await supabase
      .from('api_rate_limits')
      .select('requests_count, id')
      .eq('endpoint', '/api/subscribe')
      .eq('ip_address', ip)
      .gte('window_start', windowStart.toISOString())
      .single()

    if (getError && getError.code !== 'PGRST116') {
      console.error('Rate limit check error:', getError)
      return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS }
    }

    if (existing) {
      const newCount = existing.requests_count + 1
      const allowed = newCount <= RATE_LIMIT_MAX_REQUESTS

      // Non-blocking update
      supabase
        .from('api_rate_limits')
        .update({ requests_count: newCount })
        .eq('id', existing.id)
        .catch((err: any) => console.error('Rate limit update error:', err))

      return { allowed, remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - newCount) }
    } else {
      // First request in this window
      supabase
        .from('api_rate_limits')
        .insert({
          endpoint: '/api/subscribe',
          ip_address: ip,
          requests_count: 1,
          window_start: now.toISOString(),
          window_end: new Date(now.getTime() + RATE_LIMIT_WINDOW_MINUTES * 60000).toISOString(),
        })
        .catch((err: any) => console.error('Rate limit insert error:', err))

      return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
    }
  } catch (error) {
    console.error('Rate limit error:', error)
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS }
  }
}

function logActivity(email: string, action: string, ip: string, userAgent: string, subscriberId?: string) {
  // Fire and forget - don't block subscription on logging
  // Activity logging will be handled in background
}

export async function POST(request: NextRequest) {
  const clientIp = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  try {
    // Create Supabase client within request context (fixes Vercel serverless networking)
    const supabase = createSupabaseClient()

    // Parse request body with error handling
    let body: any
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid request format. Please send valid JSON.' },
        { status: 400 }
      )
    }

    const { email, name, source } = body

    // Validate email with proper regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    console.log('Processing subscription for:', normalizedEmail, {
      timestamp: new Date().toISOString(),
      ip: clientIp,
    })

    // Perform database insert
    const { error, data } = await supabase
      .from('subscribers')
      .insert({
        email: normalizedEmail,
        name: name?.trim() || null,
        source: source || 'coming-soon-page',
      })
      .select()

    // Handle errors
    if (error) {
      const errorMessage = error.message || error.toString()
      console.error('Subscription error:', {
        code: error.code,
        message: errorMessage,
        email: normalizedEmail,
        timestamp: new Date().toISOString(),
      })
      
      // Check if it's a unique constraint violation (duplicate email)
      if (error.code === '23505' || errorMessage.includes('duplicate') || errorMessage.includes('unique')) {
        logActivity(email, 'duplicate_attempt', clientIp, userAgent)
        return NextResponse.json(
          { error: 'You are already on our waitlist!' },
          { status: 409 }
        )
      }

      // All other database errors
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    console.log('Subscription successful for:', normalizedEmail)
    
    // Log activity non-blocking
    if (data && data[0]?.id) {
      logActivity(email, 'subscription_created', clientIp, userAgent, data[0].id)
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Great! You are on the waitlist. We will get back to you soon.',
        data: {
          email: normalizedEmail,
        }
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Subscription handler error:', {
      message: error?.message,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
    })
    
    // Check if it's a configuration error
    if (error?.message?.includes('Missing Supabase')) {
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

