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

      const { error: updateError } = await supabase
        .from('api_rate_limits')
        .update({ requests_count: newCount })
        .eq('id', existing.id)

      if (updateError) {
        console.error('Rate limit update error:', updateError)
      }

      return { allowed, remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - newCount) }
    } else {
      // First request in this window
      const { error: insertError } = await supabase
        .from('api_rate_limits')
        .insert({
          endpoint: '/api/subscribe',
          ip_address: ip,
          requests_count: 1,
          window_start: now.toISOString(),
          window_end: new Date(now.getTime() + RATE_LIMIT_WINDOW_MINUTES * 60000).toISOString(),
        })

      if (insertError) {
        console.error('Rate limit insert error:', insertError)
        // Still allow the request even if logging fails
      }

      return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
    }
  } catch (error) {
    console.error('Rate limit error:', error)
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS }
  }
}

async function logActivity(email: string, action: string, ip: string, userAgent: string, subscriberId?: string) {
  try {
    if (subscriberId) {
      await supabase
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
    }
  } catch (error) {
    console.error('Activity logging error:', error)
    // Don't fail request if logging fails
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Check rate limiting
    const rateLimit = await checkRateLimit(clientIp)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in 1 hour.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
          }
        }
      )
    }

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

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('subscribers')
      .select('id, email')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Database check error:', checkError)
      return NextResponse.json(
        { error: 'Database error. Please try again.' },
        { status: 500 }
      )
    }

    if (existing) {
      // Log activity for existing email
      await logActivity(email, 'duplicate_attempt', clientIp, userAgent, existing.id)
      return NextResponse.json(
        { error: 'You are already on our waitlist!' },
        { status: 409 }
      )
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from('subscribers')
      .insert({
        email: email.toLowerCase().trim(),
        name: name?.trim() || null,
        source: source || 'coming-soon-page',
        subscribed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    // Log successful subscription
    await logActivity(email, 'subscription_created', clientIp, userAgent, data.id)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Great! You are on the waitlist. We will get back to you soon.',
        data 
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

