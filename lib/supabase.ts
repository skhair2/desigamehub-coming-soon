import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Log initialization status for debugging
if (typeof window === 'undefined') {
  // Server-side logging only
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing:', {
      url: supabaseUrl ? 'present' : 'missing',
      key: supabaseAnonKey ? 'present' : 'missing',
    })
  } else {
    console.log('Supabase credentials loaded:', {
      url: supabaseUrl.substring(0, 30) + '...',
    })
  }
}

// Create client only if both env vars are available
export let supabase: any = null

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // Disable persistence on server
        autoRefreshToken: false,
      },
      db: {
        schema: 'public',
      },
      global: {
        headers: {
          'X-Client-Info': 'desiplayground-supabase-js',
        },
      },
    })
    console.log('Supabase client initialized successfully')
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err)
    supabase = null
  }
} else {
  console.error('Cannot initialize Supabase: missing configuration', {
    urlPresent: !!supabaseUrl,
    keyPresent: !!supabaseAnonKey,
  })
  // Fallback mock object for build time
  supabase = { 
    from: () => ({ 
      select: () => ({ single: async () => ({ data: null, error: { message: 'Supabase not configured' } }) }),
      insert: () => ({ select: () => ({ single: async () => ({ data: null, error: { message: 'Supabase not configured' } }) }) }),
      eq: () => ({ single: async () => ({ data: null, error: { message: 'Supabase not configured' } }) })
    }) 
  }
}

// Types for subscribers table
export interface Subscriber {
  id?: string
  email: string
  name?: string
  phone?: string
  country?: string
  subscribed_at?: string
  source?: string
}

