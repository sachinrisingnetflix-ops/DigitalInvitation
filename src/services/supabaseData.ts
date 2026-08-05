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

export async function listInvitations() {
  const client = assertConfigured()
  const { data, error } = await client.from('invitations').select('*').order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data ?? []
}

export async function createInvitation(input: Record<string, unknown>) {
  const client = assertConfigured()
  const { data, error } = await client.from('invitations').insert(input).select().single()

  if (error) {
    throw error
  }

  return data
}

export async function updateInvitation(id: string, updates: Record<string, unknown>) {
  const client = assertConfigured()
  const { data, error } = await client.from('invitations').update(updates).eq('id', id).select().single()

  if (error) {
    throw error
  }

  return data
}

export async function deleteInvitation(id: string) {
  const client = assertConfigured()
  const { error } = await client.from('invitations').delete().eq('id', id)

  if (error) {
    throw error
  }
}

export async function listGalleryItems(invitationId?: string) {
  const client = assertConfigured()
  let query = client.from('gallery').select('*').order('sort_order', { ascending: true })

  if (invitationId) {
    query = query.eq('invitation_id', invitationId)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data ?? []
}

export async function createGalleryItem(input: Record<string, unknown>) {
  const client = assertConfigured()
  const { data, error } = await client.from('gallery').insert(input).select().single()

  if (error) {
    throw error
  }

  return data
}

export async function listEvents(invitationId?: string) {
  const client = assertConfigured()
  let query = client.from('events').select('*').order('event_date', { ascending: true })

  if (invitationId) {
    query = query.eq('invitation_id', invitationId)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data ?? []
}

export async function createEvent(input: Record<string, unknown>) {
  const client = assertConfigured()
  const { data, error } = await client.from('events').insert(input).select().single()

  if (error) {
    throw error
  }

  return data
}

export async function listRsvps(invitationId?: string) {
  const client = assertConfigured()
  let query = client.from('rsvp').select('*').order('created_at', { ascending: false })

  if (invitationId) {
    query = query.eq('invitation_id', invitationId)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data ?? []
}

export async function createRsvp(input: Record<string, unknown>) {
  const client = assertConfigured()
  const { data, error } = await client.from('rsvp').insert(input).select().single()

  if (error) {
    throw error
  }

  return data
}
