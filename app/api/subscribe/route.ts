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
    const databaseUrl = process.env.DATABASE_URL

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase REST API configuration')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 503 }
      )
    }

    if (!databaseUrl) {
      console.error('Missing DATABASE_URL for connection pooler')
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
      method: 'connection-pooler',
    })

    // Work around DNS resolution issues by using IP address directly
    // First, try to resolve the domain to an IP
    const { resolve4 } = await import('dns').then(m => ({ 
      resolve4: m.resolve4 
    })).catch(() => ({ resolve4: null }))

    let restUrl = `${supabaseUrl}/rest/v1/subscribers`

    // If DNS resolution available, try to get the IP
    if (resolve4) {
      try {
        const ips = await new Promise<string[]>((resolve, reject) => {
          resolve4('mfdycgjdaxygpxyxnfuq.supabase.co', (err, addresses) => {
            if (err) reject(err)
            else resolve(addresses)
          })
        })
        if (ips.length > 0) {
          // Use IP directly instead of hostname to bypass DNS issues
          restUrl = `https://${ips[0]}/rest/v1/subscribers`
          console.log('Resolved to IP:', { ip: ips[0], timestamp: new Date().toISOString() })
        }
      } catch (dnsError) {
        console.log('DNS resolution failed, using hostname', { 
          error: (dnsError as any)?.message,
          timestamp: new Date().toISOString() 
        })
        // Fall back to using hostname
      }
    }

    console.log('Using REST endpoint:', {
      url: restUrl,
      timestamp: new Date().toISOString(),
    })

    let response: any

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
          'Host': 'mfdycgjdaxygpxyxnfuq.supabase.co',
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
      console.error('Fetch error when calling Supabase REST API:', {
        errorName: error?.name,
        errorMessage: error?.message,
        errorCode: error?.code,
        errorCause: error?.cause?.message || error?.cause?.code || String(error?.cause),
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
      timestamp: new Date().toISOString(),
    })

    // Handle errors
    if (!response.ok) {
      const errorMessage = data?.message || data?.error?.message || JSON.stringify(data)
      
      // Check for duplicate email
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
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    console.log('Subscription successful for:', normalizedEmail, {
      timestamp: new Date().toISOString(),
    })

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

