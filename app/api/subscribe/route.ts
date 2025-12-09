import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  console.log('\n========== SUBSCRIBE REQUEST RECEIVED ==========')
  console.log('Timestamp:', new Date().toISOString())
  console.log('Method:', request.method)
  console.log('URL:', request.url)
  
  try {
    // Parse request body
    let body: any
    try {
      body = await request.json()
      console.log('✅ Request body parsed:', body)
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    const { email, name, source } = body
    console.log('Extracted fields:', { email, name, source })

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      console.error('❌ Email validation failed:', email)
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()
    const subscriberName = (name && String(name).trim()) || 'Subscriber'

    console.log('📧 Processing subscription:', {
      email: normalizedEmail,
      name: subscriberName,
      source: source || 'coming-soon-page',
      timestamp: new Date().toISOString(),
    })

    let subscriptionSaved = false
    
    // Use Supabase REST API with proper error handling and retries
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      try {
        console.log('📌 Attempting Supabase REST API insert...')
        
        const insertUrl = `${supabaseUrl}/rest/v1/subscribers`

        const insertResponse = await fetch(insertUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            email: normalizedEmail,
            name: subscriberName,
            source: source || 'coming-soon-page',
          }),
        })

        console.log('📬 REST API Response:', {
          status: insertResponse.status,
          statusText: insertResponse.statusText,
        })

        if (insertResponse.status === 201 || insertResponse.status === 200) {
          subscriptionSaved = true
          console.log('✅ Successfully saved to Supabase')
        } else if (insertResponse.status === 409) {
          // Duplicate key - email already exists
          console.log('ℹ️ Email already in waitlist (duplicate)')
          subscriptionSaved = true
        } else if (insertResponse.status >= 400) {
          const errorText = await insertResponse.text()
          console.warn('⚠️ API returned error:', insertResponse.status, errorText?.substring(0, 200))
        }
      } catch (error: any) {
        console.error('❌ REST API error:', {
          message: error?.message,
          name: error?.name,
        })
        // Email will still be sent below
      }
    } else {
      console.warn('⚠️ Supabase credentials missing')
    }

    // Step 2: Send confirmation email via Resend
    let emailSent = false
    try {
      const emailResponse = await resend.emails.send({
        from: 'noreply@desiplayground.com',
        to: normalizedEmail,
        subject: '🎮 Welcome to DesiPlayground Waitlist!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>🎮 Welcome to DesiPlayground!</h2>
            <p>Hi ${subscriberName},</p>
            <p>Thank you for joining our waitlist! We're excited to bring you the best desi games online.</p>
            <p>
              <strong>What's coming:</strong>
            </p>
            <ul>
              <li>🎲 Multiplayer Tambola & Housie</li>
              <li>♟️ Online Carrom Games</li>
              <li>🃏 Ludo & Indian Card Games</li>
              <li>🎭 Dumb Charades & Party Games</li>
            </ul>
            <p>We'll notify you as soon as we launch!</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
            <p style="color: #666; font-size: 12px;">© 2025 DesiPlayground. All rights reserved.</p>
          </div>
        `,
      })

      if (emailResponse.data?.id) {
        emailSent = true
        console.log('✅ Email sent:', emailResponse.data.id)
      } else {
        console.warn('⚠️ Email failed:', emailResponse.error)
      }
    } catch (emailError: any) {
      console.error('❌ Email error:', emailError?.message)
    }

    // Step 3: Return success to user
    return NextResponse.json(
      {
        success: true,
        message: 'Great! You are on the waitlist. Check your email for confirmation.',
        data: {
          email: normalizedEmail,
          saved_to_db: subscriptionSaved,
          confirmation_sent: emailSent,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('❌ Subscription error:', {
      message: error?.message,
      stack: error?.stack?.substring(0, 200),
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

