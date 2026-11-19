import { NextResponse } from 'next/server'
import { database, readContent } from '@/lib/admin-store'
import { validateContent } from '@/lib/admin-content'
import { apiError, guard, readJson } from '@/lib/admin-request'

export async function GET(request: Request) {
  const denied = await guard(request); if (denied) return denied
  try { return NextResponse.json(await readContent(), { headers: { 'Cache-Control': 'no-store' } }) } catch (e) { return apiError(e) }
}
export async function PUT(request: Request) {
  const denied = await guard(request); if (denied) return denied
  try {
    const body = await readJson(request) as { content?: unknown; revision?: unknown }
    if (!body || !Number.isInteger(body.revision) || Number(body.revision) < 0) throw new Error('Reload the latest content before saving.')
    const content = validateContent(body.content)
    const response = await database('rpc/portfolio_save_content', { method: 'POST', body: JSON.stringify({ next_content: content, expected_revision: body.revision }) })
    const saved = await response.json()
    if (!saved) return NextResponse.json({ error: 'Content changed in another session. Reload before saving your changes.' }, { status: 409 })
    return NextResponse.json({ ok: true, ...saved })
  } catch (e) { return apiError(e) }
}
