import { NextResponse } from 'next/server'

export const maxDuration = 20
const MAX_BODY_BYTES = 32_768
const limits = { name: 120, email: 254, subject: 160, message: 5_000, company: 200 } as const

type ContactPayload = Record<keyof typeof limits, string>

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !/[\r\n]/.test(email)
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

async function readBody(request: Request): Promise<unknown> {
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) throw new RangeError('Body too large')
  const reader = request.body?.getReader()
  if (!reader) throw new SyntaxError('Empty body')
  const chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BODY_BYTES) {
        await reader.cancel()
        throw new RangeError('Body too large')
      }
      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
  return JSON.parse(new TextDecoder().decode(bytes))
}

export async function POST(request: Request) {
  let raw: unknown
  try { raw = await readBody(request) } catch (error) {
    const tooLarge = error instanceof RangeError
    return NextResponse.json({ ok: false, error: tooLarge ? 'Message is too large.' : 'Invalid request body.' }, { status: tooLarge ? 413 : 400 })
  }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }
  const input = raw as Record<string, unknown>
  const body = {} as ContactPayload
  for (const key of Object.keys(limits) as (keyof ContactPayload)[]) {
    const value = input[key] ?? ''
    if (typeof value !== 'string' || value.length > limits[key]) {
      return NextResponse.json({ ok: false, error: `Please check the ${key} field and its length.` }, { status: 422 })
    }
    body[key] = value.trim()
  }
  // A filled hidden field is dropped; do not send bot content to the inbox.
  if (body.company) return NextResponse.json({ ok: true, accepted: true })
  const { name, email, subject, message } = body
  if (!name || !subject || !message || !isValidEmail(email) || /[\r\n]/.test(subject)) {
    return NextResponse.json({ ok: false, error: 'Please provide a name, valid email, subject and message.' }, { status: 422 })
  }
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.CONTACT_FROM_EMAIL?.trim()
  const to = process.env.CONTACT_TO_EMAIL?.trim() || 'aakshatagarwal2004@gmail.com'
  if (!apiKey || !from) {
    console.warn('[contact] Email service is not configured.')
    return NextResponse.json({ ok: true, accepted: false, reason: 'not_configured' })
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: AbortSignal.timeout(12_000),
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from, to: [to], reply_to: email, subject: `[Portfolio] ${subject}`,
        text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        html: `<div style="font-family:system-ui,sans-serif;line-height:1.6"><h2>New portfolio message</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p></div>`,
      }),
    })
    if (!response.ok) {
      console.warn('[contact] Email provider rejected the request. HTTP status:', response.status)
      return NextResponse.json({ ok: true, accepted: false, reason: 'provider_error' })
    }
    const result = await response.json() as { id?: unknown }
    if (typeof result.id !== 'string' || !result.id) throw new Error('No provider acknowledgement')
    // Provider acceptance is not proof of inbox delivery. No automatic retries.
    return NextResponse.json({ ok: true, accepted: true })
  } catch {
    console.warn('[contact] Email provider acknowledgement could not be confirmed.')
    return NextResponse.json({ ok: true, accepted: false, reason: 'delivery_uncertain' })
  }
}
