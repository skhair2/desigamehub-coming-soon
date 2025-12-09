import { NextRequest, NextResponse } from 'next/server'

// Rate limiting constants
const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_WINDOW_MINUTES = 60

export async function POST(request: NextRequest) {
  const clientIp = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  try {
    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase configuration')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 503 }
      )
    }

    // Parse request body
    let body: any
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    const { email, name, source } = body

    // Validate email
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
      env: process.env.NODE_ENV,
    })

    // Use Supabase REST API directly with POST method (most reliable)
    const restUrl = `${supabaseUrl}/rest/v1/subscribers`
    
    console.log('Supabase REST endpoint:', {
      url: restUrl,
      timeout: '30s',
      timestamp: new Date().toISOString(),
    })

    // Diagnostic: Test connectivity to a simple endpoint first
    console.log('Running connectivity diagnostic...', { timestamp: new Date().toISOString() })
    try {
      const diagTest = await fetch('https://httpbin.org/status/200', { 
        signal: AbortSignal.timeout(5000),
        keepalive: false 
      })
      console.log('✓ Connectivity test passed (httpbin.org)', { 
        status: diagTest.status,
        timestamp: new Date().toISOString() 
      })
    } catch (diagError: any) {
      console.error('✗ Connectivity test FAILED:', {
        errorName: diagError?.name,
        errorMessage: diagError?.message,
        timestamp: new Date().toISOString(),
      })
      // Continue anyway - Supabase might work even if httpbin fails
    }

    let response: any
    let lastError: any = null

    try {
      console.log('Initiating fetch to Supabase REST API', {
        method: 'POST',
        url: restUrl,
        timestamp: new Date().toISOString(),
      })

      response = await fetch(restUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          name: name?.trim() || null,
          source: source || 'coming-soon-page',
        }),
        signal: AbortSignal.timeout(30000),
        keepalive: false,
      })

      console.log('Received response from Supabase', {
        status: response.status,
        statusText: response.statusText,
        timestamp: new Date().toISOString(),
      })

    } catch (error: any) {
      lastError = error
      
      console.error('Fetch error when calling Supabase REST API:', {
        errorName: error?.name,
        errorMessage: error?.message,
        errorCode: error?.code,
        errorCause: error?.cause,
        stack: error?.stack?.substring(0, 300),
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        { error: 'Unable to connect to the subscription service. Please try again in a moment.' },
        { status: 503 }
      )
    }

    const data = await response.json()

    console.log('Supabase response:', {
      status: response.status,
      data: data,
      timestamp: new Date().toISOString(),
    })

    // Handle errors
    if (!response.ok) {
      const errorMessage = data?.message || data?.error?.message || JSON.stringify(data)
      
      // Check for duplicate email (409 from REST API)
      if (response.status === 409 || errorMessage?.includes('duplicate') || errorMessage?.includes('unique')) {
        console.log('Duplicate email attempt:', normalizedEmail)
        return NextResponse.json(
          { error: 'You are already on our waitlist!' },
          { status: 409 }
        )
      }

      // 400 errors from Supabase
      if (response.status === 400) {
        console.error('Bad request to Supabase:', errorMessage)
        if (errorMessage?.includes('unique')) {
          return NextResponse.json(
            { error: 'You are already on our waitlist!' },
            { status: 409 }
          )
        }
        return NextResponse.json(
          { error: 'Invalid data provided' },
          { status: 400 }
        )
      }

      // Auth errors
      if (response.status === 401 || response.status === 403) {
        console.error('Authentication error:', errorMessage)
        return NextResponse.json(
          { error: 'Server authentication error' },
          { status: 503 }
        )
      }

      console.error('Subscription error:', {
        status: response.status,
        message: errorMessage,
        email: normalizedEmail,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    console.log('Subscription successful for:', normalizedEmail)

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

