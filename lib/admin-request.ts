import { NextResponse } from 'next/server'
import { isAdmin, sameOrigin } from './admin-auth'
import { StoreUnavailable } from './admin-store'

export async function guard(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Please sign in.' }, { status: 401 })
  if (request.method !== 'GET' && !sameOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 })
  return null
}
export async function readJson(request: Request, limit = 200000): Promise<unknown> {
  if (!request.headers.get('content-type')?.includes('application/json')) throw new Error('Send JSON data.')
  const reader = request.body?.getReader()
  if (!reader) throw new Error('Empty request.')
  const parts: Uint8Array[] = []; let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read(); if (done) break
      size += value.length
      if (size > limit) { await reader.cancel(); throw new Error('Request is too large.') }
      parts.push(value)
    }
  } finally { reader.releaseLock() }
  return JSON.parse(Buffer.concat(parts).toString('utf8'))
}
export function apiError(error: unknown) { return NextResponse.json({ error: error instanceof StoreUnavailable ? error.message : error instanceof Error ? error.message : 'Request failed.' }, { status: error instanceof StoreUnavailable ? 503 : 400 }) }
