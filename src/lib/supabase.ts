import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Clear old session data to prevent conflicts
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('sb-qpuguqqbpcolbkbdyban-auth-token')
    localStorage.removeItem('supabase.auth.token')
  } catch (e) {
    // Ignore storage errors
  }
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storage: localStorage,
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web',
    },
    fetch: (url, options = {}) => {
      return fetch(url, {
        ...options,
        signal: AbortSignal.timeout(30000),
      })
    },
  },
})
