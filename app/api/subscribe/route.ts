import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Rate limiting constants
const RATE_LIMIT_MAX_REQUESTS = 5 // requests per window
const RATE_LIMIT_WINDOW_MINUTES = 60 // 1 hour window

async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
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
      // Default to allowing on error to prevent blocking users
      return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS }
    }

    if (existing) {
      // Update request count
      const newCount = existing.requests_count + 1
      const allowed = newCount <= RATE_LIMIT_MAX_REQUESTS

      // Non-blocking update
      supabase
        .from('api_rate_limits')
        .update({ requests_count: newCount })
        .eq('id', existing.id)
        .catch((err: any) => {
          console.error('Rate limit update error (non-blocking):', err)
        })

      return { allowed, remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - newCount) }
    } else {
      // First request in this window - non-blocking insert
      supabase
        .from('api_rate_limits')
        .insert({
          endpoint: '/api/subscribe',
          ip_address: ip,
          requests_count: 1,
          window_start: now.toISOString(),
          window_end: new Date(now.getTime() + RATE_LIMIT_WINDOW_MINUTES * 60000).toISOString(),
        })
        .catch((err: any) => {
          console.error('Rate limit insert error (non-blocking):', err)
        })

      return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
    }
  } catch (error) {
    console.error('Rate limit error:', error)
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS }
  }
}

async function logActivity(email: string, action: string, ip: string, userAgent: string, subscriberId?: string) {
  // Fire and forget - don't block the subscription on logging
  try {
    if (subscriberId) {
      // Non-blocking insert
      supabase
        .from('subscription_activity')
        .insert({
          subscriber_id: subscriberId,
          action,
          ip_address: ip,
          user_agent: userAgent,
          metadata: {
            timestamp: new Date().toISOString(),
            source: 'coming-soon-page',
          },
        })
        .then(() => {
          // Success - no action needed
        })
        .catch((err: any) => {
          // Log but don't throw
          console.error('Activity logging error (non-blocking):', err)
        })
    }
  } catch (error) {
    console.error('Activity logging wrapper error:', error)
    // Don't block the subscription
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

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

    // Attempt to insert subscriber directly (without select to avoid RLS issues)
    const { error, data: insertData } = await supabase
      .from('subscribers')
      .insert({
        email: normalizedEmail,
        name: name?.trim() || null,
        source: source || 'coming-soon-page',
      })
      .catch((err: any) => {
        console.error('Supabase insert catch error:', err)
        return { error: err, data: null }
      })

    // Handle errors
    if (error) {
      console.error('Subscription error details:', JSON.stringify(error))
      
      // Check if it's a unique constraint violation (duplicate email)
      const errorMessage = error.message || error.toString()
      if (error.code === '23505' || errorMessage.includes('unique')) {
        // Log duplicate attempt (non-blocking)
        logActivity(email, 'duplicate_attempt', clientIp, userAgent)
        return NextResponse.json(
          { error: 'You are already on our waitlist!' },
          { status: 409 }
        )
      }

      // All other errors
      console.error('Failed to subscribe:', JSON.stringify(error))
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    console.log('Subscription successful for:', normalizedEmail)
    
    // Generate a simple response without querying the inserted data
    // (to avoid RLS select permission issues)
    const subscriberId = normalizedEmail // Use email as temporary ID, will be updated after
    logActivity(email, 'subscription_created', clientIp, userAgent, subscriberId)

    // Check rate limiting after successful subscription (with error recovery)
    let rateLimit = { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS }
    try {
      rateLimit = await checkRateLimit(clientIp)
    } catch (rateLimitError) {
      console.error('Rate limit check failed (continuing anyway):', rateLimitError)
      // Continue without blocking the successful subscription
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Great! You are on the waitlist. We will get back to you soon.',
        data: {
          email: normalizedEmail,
        }
      },
      { 
        status: 201,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        }
      }
    )
  } catch (error) {
    console.error('Subscription error:', error)
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

