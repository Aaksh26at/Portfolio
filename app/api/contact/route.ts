import { NextResponse } from 'next/server'

interface ContactPayload {
  name?: string
  email?: string
  subject?: string
  message?: string
  company?: string // honeypot
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: Request) {
  let body: ContactPayload
  try {
    body = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const { name = '', email = '', subject = '', message = '', company = '' } = body

  // Honeypot filled → pretend success, drop silently (bot).
  if (company) {
    return NextResponse.json({ ok: true, delivered: true })
  }

  if (!name.trim() || !subject.trim() || !message.trim() || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: 'Please provide a name, valid email, subject and message.' },
      { status: 422 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL ?? 'aakshatagarwal2004@gmail.com'

  // No email service configured → graceful fallback. The client offers a
  // mailto link so the message is never lost.
  if (!apiKey || !from) {
    return NextResponse.json({ ok: true, delivered: false })
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html: `
          <div style="font-family:system-ui,sans-serif;line-height:1.6">
            <h2>New portfolio message</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      return NextResponse.json({ ok: true, delivered: false })
    }
    return NextResponse.json({ ok: true, delivered: true })
  } catch {
    // Network/service error → fall back gracefully rather than failing hard.
    return NextResponse.json({ ok: true, delivered: false })
  }
}
