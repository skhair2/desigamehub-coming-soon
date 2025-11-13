import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client only if both env vars are available
export let supabase: any = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Fallback mock object for build time
  supabase = { 
    from: () => ({ 
      select: () => ({ single: async () => ({ data: null, error: null }) }),
      insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
      eq: () => ({ single: async () => ({ data: null, error: null }) })
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

