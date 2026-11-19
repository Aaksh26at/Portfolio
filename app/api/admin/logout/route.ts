import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, sameOrigin } from '@/lib/admin-auth'
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 })
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, '', { maxAge: 0, path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' })
  return response
}
