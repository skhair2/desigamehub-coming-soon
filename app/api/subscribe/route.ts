import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
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
    const subscriberName = name?.trim() || 'Subscriber'

    console.log('📧 Processing subscription:', {
      email: normalizedEmail,
      name: subscriberName,
      source: source || 'coming-soon-page',
      timestamp: new Date().toISOString(),
    })

    // Step 1: Save to Supabase using Edge Function (avoid REST API DNS issues)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Try to save to Supabase via Edge Function but don't block if it fails
    let subscriptionSaved = false
    if (supabaseUrl && supabaseKey) {
      try {
        // Use Supabase Edge Function which is highly available
        const edgeFunctionUrl = `${supabaseUrl}/functions/v1/subscribe`
        const response = await fetch(edgeFunctionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            email: normalizedEmail,
            name: subscriberName,
            source: source || 'coming-soon-page',
          }),
          signal: AbortSignal.timeout(10000),
        })

        if (response.ok) {
          subscriptionSaved = true
          console.log('✅ Subscription saved via Edge Function')
        } else {
          const errText = await response.text()
          console.warn('⚠️ Edge Function returned:', response.status, errText?.substring(0, 100))
        }
      } catch (dbError: any) {
        console.warn('⚠️ Supabase unavailable (this is OK):', dbError?.message)
        // Continue anyway - email is more important
      }
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
        console.log('✅ Confirmation email sent:', emailResponse.data.id)
      } else {
        console.warn('⚠️ Email send failed:', emailResponse.error)
      }
    } catch (emailError: any) {
      console.error('❌ Email error:', emailError?.message)
      // Still return success since we may have saved to DB
    }

    // Step 3: Return success
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

