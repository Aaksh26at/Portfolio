import 'server-only'
import { cache } from 'react'
import { defaultContent, validateContent, type SiteContent } from './admin-content'

export class StoreUnavailable extends Error {}
export function storageConfigured() { return !!process.env.PORTFOLIO_SUPABASE_URL && !!process.env.PORTFOLIO_SUPABASE_SERVICE_ROLE_KEY }
export async function database(path: string, init: RequestInit = {}) {
  const base = process.env.PORTFOLIO_SUPABASE_URL?.replace(/\/$/, '')
  const key = process.env.PORTFOLIO_SUPABASE_SERVICE_ROLE_KEY
  if (!base || !key || !/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(base)) throw new StoreUnavailable('Admin database is not configured.')
  let response: Response
  try {
    response = await fetch(`${base}/rest/v1/${path}`, { ...init, cache: 'no-store', signal: AbortSignal.timeout(6000),
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...init.headers } })
  } catch { throw new StoreUnavailable('Admin database could not be reached. Please retry.') }
  if (!response.ok) throw new StoreUnavailable('Admin database request failed. Check configuration and run the setup SQL.')
  return response
}
export type ContentRecord = { content: SiteContent; updated_at: string | null; revision: number; source: 'database' | 'built-in' }
export async function readContent(): Promise<ContentRecord> {
  const response = await database('portfolio_content?id=eq.main&select=content,updated_at,revision')
  const rows = await response.json()
  if (!rows[0]) return { content: structuredClone(defaultContent), updated_at: null, revision: 0, source: 'built-in' }
  return { content: validateContent(rows[0].content), updated_at: rows[0].updated_at, revision: rows[0].revision, source: 'database' }
}
export const publicContent = cache(async (): Promise<SiteContent> => {
  if (!storageConfigured()) return defaultContent
  try { return (await readContent()).content } catch { console.warn('[content] Using built-in content because storage is unavailable.'); return defaultContent }
})
export type InboxMessage = { id: string; name: string; email: string; subject: string; message: string; status: 'new' | 'read' | 'archived'; delivery: string; created_at: string }
export async function saveMessage(message: { name: string; email: string; subject: string; message: string }) {
  if (!storageConfigured()) return null
  const response = await database('portfolio_messages', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(message) })
  const rows = await response.json()
  return rows[0]?.id as string || null
}
export async function messageDelivery(id: string | null, delivery: string) {
  if (!id) return
  try { await database(`portfolio_messages?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify({ delivery }) }) }
  catch { console.warn('[contact] Inbox delivery status was not updated.') }
}
