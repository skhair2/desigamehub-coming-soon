import { NextRequest, NextResponse } from 'next/server'

// This webhook receives events from Resend when emails are sent
// We use this to trigger database saves via Supabase MCP
export async function POST(request: NextRequest) {
  try {
    const event = await request.json()

    console.log('📬 Resend webhook received:', {
      type: event.type,
      email: event.data?.email,
      timestamp: new Date().toISOString(),
    })

    // Webhook signature verification (optional but recommended)
    const signature = request.headers.get('svix-signature')
    if (!signature) {
      console.warn('⚠️ Missing webhook signature')
      // Still process for now
    }

    // Handle different Resend events
    if (event.type === 'email.sent' || event.type === 'email.delivered') {
      const email = event.data?.email
      if (email) {
        console.log('✅ Email event processed:', email)
        // In a real scenario, you'd trigger a Supabase save here
        // For now, logging is sufficient as we're using MCP for batch inserts
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('❌ Webhook error:', error?.message)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 200 })
}
