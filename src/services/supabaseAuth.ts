import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'

function assertConfigured() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.')
  }

  const client = getSupabaseClient()
  if (!client) {
    throw new Error('Supabase client is unavailable.')
  }

  return client
}

export async function signInWithEmail(email: string, password: string) {
  const client = assertConfigured()
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) {
    throw error
  }

  return data
}

export async function signUpWithEmail(email: string, password: string, metadata?: Record<string, unknown>) {
  const client = assertConfigured()
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut() {
  const client = assertConfigured()
  const { error } = await client.auth.signOut()
  if (error) {
    throw error
  }
}

export async function getSession() {
  const client = assertConfigured()
  const {
    data: { session },
    error,
  } = await client.auth.getSession()

  if (error) {
    throw error
  }

  return {
    session,
    user: session?.user ?? null,
  }
}

export async function getCurrentUser() {
  const client = assertConfigured()
  const { data, error } = await client.auth.getUser()

  if (error) {
    throw error
  }

  return data.user
}

export async function upsertUserProfile(profile: {
  id: string
  name?: string
  email?: string
  role?: string
  avatar_url?: string | null
}) {
  const client = assertConfigured()
  const { data, error } = await client.from('users').upsert(profile, { onConflict: 'id' }).select().single()

  if (error) {
    throw error
  }

  return data
}
