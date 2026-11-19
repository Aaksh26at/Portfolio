import 'server-only'
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { database } from './admin-store'

export const ADMIN_COOKIE = 'portfolio_admin'
export const SESSION_SECONDS = 8 * 60 * 60
export function authConfigured() { return (process.env.PORTFOLIO_ADMIN_PASSWORD?.length || 0) >= 20 && (process.env.PORTFOLIO_ADMIN_SESSION_SECRET?.length || 0) >= 32 }
function sign(data: string) { return createHmac('sha256', process.env.PORTFOLIO_ADMIN_SESSION_SECRET!).update(data).update(createHash('sha256').update(process.env.PORTFOLIO_ADMIN_PASSWORD!).digest()).digest('base64url') }
export function checkPassword(password: string) {
  if (!authConfigured()) return false
  return timingSafeEqual(createHash('sha256').update(password).digest(), createHash('sha256').update(process.env.PORTFOLIO_ADMIN_PASSWORD!).digest())
}
export function createSession() {
  if (!authConfigured()) throw new Error('Admin login is not configured.')
  const data = Buffer.from(JSON.stringify({ expires: Date.now() + SESSION_SECONDS * 1000, nonce: randomBytes(18).toString('hex') })).toString('base64url')
  return data + '.' + sign(data)
}
export function validSession(value?: string) {
  if (!authConfigured() || !value || value.length > 1024) return false
  try {
    const [data, signature, extra] = value.split('.')
    if (extra || !signature || !data) return false
    const expected = Buffer.from(sign(data)), actual = Buffer.from(signature)
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return false
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString())
    return typeof payload.expires === 'number' && payload.expires > Date.now() && payload.expires <= Date.now() + SESSION_SECONDS * 1000
  } catch { return false }
}
export async function isAdmin() { return validSession((await cookies()).get(ADMIN_COOKIE)?.value) }
export function sameOrigin(request: Request) {
  // Next's Node adapter can use an internal hostname in request.url.
  // Compare against the actual Host header, never a client-supplied forwarded host.
  const value = request.headers.get('origin')
  if (!value) return false
  try {
    const origin = new URL(value)
    const host = request.headers.get('host') || new URL(request.url).host
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname)
    return value === origin.origin && origin.host === host && (origin.protocol === 'https:' || local && origin.protocol === 'http:')
  } catch { return false }
}
export async function allowLogin(request: Request) {
  const address = (request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim().slice(0,100)
  const key = createHmac('sha256', process.env.PORTFOLIO_ADMIN_SESSION_SECRET!).update(address).digest('hex')
  const response = await database('rpc/portfolio_admin_attempt', { method: 'POST', body: JSON.stringify({ bucket_key: key }) })
  return (await response.json()) === true
}
