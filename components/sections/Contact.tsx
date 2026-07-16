'use client'

import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone, Github, Linkedin, Copy, Check, Send, Loader2 } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { isValidEmail } from '@/lib/utils'
import { track } from '@/lib/analytics'

type Status = 'idle' | 'submitting' | 'success' | 'fallback' | 'error'

export function Contact() {
  const { contact } = portfolio
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', company: '' })

  const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    form.subject || 'Hello from your portfolio',
  )}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name}`)}`

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      track('email_click')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // Honeypot: if filled, silently treat as success (likely a bot).
    if (form.company) {
      setStatus('success')
      return
    }
    if (!form.name.trim() || !form.subject.trim() || !form.message.trim()) {
      setError('Please fill in your name, subject and message.')
      return
    }
    if (!isValidEmail(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = (await res.json()) as { ok: boolean; delivered?: boolean; error?: string }
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Something went wrong.')
      track('contact_submit')
      setStatus(data.delivered ? 'success' : 'fallback')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const inputBase =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition focus:border-accent-violet/60 focus:outline-none focus:ring-1 focus:ring-accent-violet/40'

  const methods = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'in/aakshatagarwal', href: contact.linkedin },
    { icon: Github, label: 'GitHub', value: `@${portfolio.github.username}`, href: contact.github },
    { icon: MapPin, label: 'Location', value: contact.location, href: '' },
  ]

  return (
    <section id="contact" className="section-pad border-t border-white/[0.06]">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something valuable with"
          accent="data & technology."
          description="I'm open to data, AI/ML, Python, backend and analytics opportunities, as well as relevant collaborations and professional conversations."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Contact methods */}
          <Reveal>
            <div className="glass h-full rounded-3xl p-6 sm:p-8">
              <ul className="space-y-4">
                {methods.map((m) => {
                  const Icon = m.icon
                  const inner = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-accent-violet">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-ink-faint">{m.label}</span>
                        <span className="block truncate text-sm text-ink">{m.value}</span>
                      </span>
                    </>
                  )
                  return (
                    <li key={m.label}>
                      {m.href ? (
                        <a
                          href={m.href}
                          {...(m.href.startsWith('http')
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-white/[0.03]"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 p-2">{inner}</div>
                      )}
                    </li>
                  )
                })}
              </ul>

              <button
                type="button"
                onClick={copyEmail}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent-violet/50"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" /> Email copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" /> Copy email address
                  </>
                )}
              </button>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8" noValidate>
              {/* Honeypot (hidden from users, catches bots) */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputBase}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputBase}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={inputBase}
                  placeholder="What's this about?"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputBase} resize-none`}
                  placeholder="Tell me a little about the role, project or idea…"
                />
              </div>

              {error && (
                <p role="alert" className="mt-3 text-sm text-accent-coral">
                  {error}
                </p>
              )}

              {status === 'success' && (
                <p role="status" className="mt-3 text-sm text-emerald-400">
                  Thanks — your message has been sent. I&apos;ll get back to you soon.
                </p>
              )}

              {status === 'fallback' && (
                <p role="status" className="mt-3 text-sm text-ink-muted">
                  Email delivery isn&apos;t configured on this deployment yet, but your message is
                  ready to send —{' '}
                  <a href={mailtoHref} className="font-semibold text-accent-violet underline">
                    open it in your email app
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-violet px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" /> Send message
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
