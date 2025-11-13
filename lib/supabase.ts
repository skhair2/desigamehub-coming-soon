import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only throw error if we're in a runtime where we actually need these
let supabase: any = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else if (typeof window !== 'undefined') {
  // Client-side only - throw error
  throw new Error('Missing Supabase environment variables')
}

export const getSupabase = () => {
  if (!supabase) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabase
}

export const supabase = supabase || { from: () => ({ select: () => ({}) }) }

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

