import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, SESSION_SECONDS, allowLogin, authConfigured, checkPassword, createSession, sameOrigin } from '@/lib/admin-auth'
import { storageConfigured } from '@/lib/admin-store'
import { apiError, readJson } from '@/lib/admin-request'

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 })
  if (!authConfigured() || !storageConfigured()) return NextResponse.json({ error: 'Complete the admin setup in Vercel and Supabase first.' }, { status: 503 })
  try {
    const body = await readJson(request, 2048) as { password?: unknown }
    if (!body || typeof body.password !== 'string' || body.password.length > 256) return NextResponse.json({ error: 'Enter your admin password.' }, { status: 400 })
    if (!await allowLogin(request)) return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 })
    if (!checkPassword(body.password)) return NextResponse.json({ error: 'The password is incorrect.' }, { status: 401 })
    const response = NextResponse.json({ ok: true })
    response.cookies.set(ADMIN_COOKIE, createSession(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: SESSION_SECONDS })
    response.headers.set('Cache-Control', 'no-store')
    return response
  } catch (error) { return apiError(error) }
}
