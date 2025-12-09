import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import postgres from 'postgres'

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
    
    // Try direct PostgreSQL connection via pooler (works on Vercel)
    const databaseUrl = process.env.DATABASE_URL
    if (databaseUrl) {
      try {
        console.log('📌 Attempting direct PostgreSQL connection via pooler...')
        const sql = postgres(databaseUrl, {
          ssl: 'require',
          transform: {
            undefined: null,
          },
        })

        console.log('📝 Inserting subscriber via PostgreSQL...')
        const result = await sql`
          INSERT INTO subscribers (email, name, source)
          VALUES (${normalizedEmail}, ${subscriberName}, ${source || 'coming-soon-page'})
          ON CONFLICT (email) DO NOTHING
          RETURNING id, email, created_at
        `

        if (result.length > 0) {
          subscriptionSaved = true
          console.log('✅ Saved to PostgreSQL:', {
            id: result[0].id,
            email: result[0].email,
            created_at: result[0].created_at,
          })
        } else {
          console.log('ℹ️ Email already exists in database')
          subscriptionSaved = true // Still count as success
        }

        await sql.end()
      } catch (error: any) {
        console.error('❌ PostgreSQL error:', {
          message: error?.message,
          name: error?.name,
          code: error?.code,
        })
        // Continue anyway - email confirmation is most important
      }
    }
    
    // Fallback: Try REST API for older configurations
    if (!subscriptionSaved) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (supabaseUrl && supabaseKey) {
        try {
          console.log('📌 Attempting fallback: direct REST API call to Supabase...')
          
          const insertUrl = `${supabaseUrl}/rest/v1/subscribers`
          console.log('POST URL:', insertUrl)

          const insertResponse = await fetch(insertUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({
              email: normalizedEmail,
              name: subscriberName,
              source: source || 'coming-soon-page',
            }),
          })

          console.log('📬 REST API Response status:', insertResponse.status)

          if (insertResponse.ok || insertResponse.status === 201 || insertResponse.status === 409) {
            subscriptionSaved = true
            console.log('✅ Saved to Supabase via REST API')
          }
        } catch (error: any) {
          console.error('⚠️ Fallback REST API also failed:', error?.message)
        }
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

