import { NextRequest, NextResponse } from 'next/server'

/**
 * Admin endpoint to batch insert pending subscriptions into Supabase
 * This is a workaround for Vercel → Supabase DNS connectivity issues
 * 
 * Usage: POST /api/admin/sync-subscriptions with email array
 * 
 * Example:
 * curl -X POST http://localhost:3000/api/admin/sync-subscriptions \
 *   -H "Content-Type: application/json" \
 *   -H "Authorization: Bearer YOUR_SECRET_KEY" \
 *   -d '{
 *     "subscriptions": [
 *       {"email": "user@example.com", "name": "User Name", "source": "coming-soon-page"}
 *     ]
 *   }'
 */

export async function POST(request: NextRequest) {
  try {
    // Verify authorization
    const authHeader = request.headers.get('authorization')
    const secretKey = process.env.ADMIN_SECRET_KEY || 'your-secret-key'

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.slice(7)
    if (token !== secretKey) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 403 }
      )
    }

    const { subscriptions } = await request.json()

    if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
      return NextResponse.json(
        { error: 'subscriptions array is required and must not be empty' },
        { status: 400 }
      )
    }

    console.log(`📧 Processing ${subscriptions.length} pending subscriptions`, {
      timestamp: new Date().toISOString(),
    })

    const results = {
      success: 0,
      failed: 0,
      duplicates: 0,
      errors: [] as any[],
    }

    // Try to save each subscription to Supabase via REST API
    for (const sub of subscriptions) {
      const { email, name, source } = sub

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        results.failed++
        results.errors.push({ email, error: 'Invalid email format' })
        continue
      }

      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Supabase credentials not configured')
        }

        const response = await fetch(`${supabaseUrl}/rest/v1/subscribers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            email: email.toLowerCase().trim(),
            name: name || null,
            source: source || 'admin-sync',
          }),
          signal: AbortSignal.timeout(5000),
        })

        if (response.ok) {
          results.success++
          console.log(`✅ Inserted: ${email}`)
        } else if (response.status === 409) {
          // Duplicate
          results.duplicates++
          console.log(`⚠️ Duplicate: ${email}`)
        } else {
          results.failed++
          const text = await response.text()
          results.errors.push({
            email,
            error: `HTTP ${response.status}`,
          })
          console.error(`❌ Failed to insert ${email}:`, text?.substring(0, 100))
        }
      } catch (error: any) {
        results.failed++
        results.errors.push({
          email,
          error: error?.message,
        })
        console.error(`❌ Error inserting ${email}:`, error?.message)
      }
    }

    console.log('📊 Sync results:', results)

    return NextResponse.json(
      {
        message: 'Sync completed',
        ...results,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('❌ Sync error:', error?.message)
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
