import { NextResponse } from 'next/server'
import { database } from '@/lib/admin-store'
import { apiError, guard, readJson } from '@/lib/admin-request'
export async function GET(request: Request) {
  const denied = await guard(request); if (denied) return denied
  try {
    const response = await database('portfolio_messages?select=id,name,email,subject,message,status,delivery,created_at&order=created_at.desc&limit=100')
    return NextResponse.json({ messages: await response.json() }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e) { return apiError(e) }
}
export async function PATCH(request: Request) {
  const denied = await guard(request); if (denied) return denied
  try {
    const body = await readJson(request, 2048) as { id: string; status: string }
    if (!body || !/^[a-f0-9-]{36}$/i.test(body.id) || !['new', 'read', 'archived'].includes(body.status)) throw new Error('Invalid message update.')
    const response = await database(`portfolio_messages?id=eq.${body.id}`, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ status: body.status }) })
    const rows = await response.json(); if (!rows[0]) return NextResponse.json({ error: 'Message not found.' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (e) { return apiError(e) }
}
