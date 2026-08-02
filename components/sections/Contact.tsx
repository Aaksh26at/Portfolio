'use client'

import { useState, type FormEvent } from 'react'
import { Check, Copy, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { isValidEmail } from '@/lib/utils'
import { track } from '@/lib/analytics'

type Status = 'idle' | 'submitting' | 'success' | 'fallback' | 'error'

export function Contact() {
  const { contact } = portfolio
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', company: '' })

  const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(form.subject || 'Hello from your portfolio')}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name}`)}`

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      track('email_click')
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    if (form.company) {
      setStatus('success')
      return
    }
    if (!form.name.trim() || !form.subject.trim() || !form.message.trim()) {
      setError('Name, subject and message are required. Add the missing detail, then send again.')
      return
    }
    if (!isValidEmail(form.email)) {
      setError('That email address is incomplete. Enter a valid address, then send again.')
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = (await response.json()) as { ok: boolean; delivered?: boolean; error?: string }
      if (!response.ok || !data.ok) throw new Error(data.error ?? 'The message could not be sent. Try email instead.')
      track('contact_submit')
      setStatus(data.delivered ? 'success' : 'fallback')
    } catch (caught) {
      setStatus('error')
      setError(caught instanceof Error ? caught.message : 'The message could not be sent. Try email instead.')
    }
  }

  const inputBase =
    'w-full min-h-12 rounded-[var(--radius-control)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-colors duration-200 hover:bg-[var(--color-paper-3)] focus:border-[var(--color-muted)]'

  const methods = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'in/aakshatagarwal', href: contact.linkedin },
    { icon: Github, label: 'GitHub', value: `@${portfolio.github.username}`, href: contact.github },
    { icon: MapPin, label: 'Location', value: contact.location, href: '' },
  ]

  return (
    <section id="contact" data-world="5" className="section-pad pt-4">
      <div className="container-page grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16 xl:gap-24">
        <div className="lg:sticky lg:top-32">
          <span className="mb-6 block h-1 w-9 rounded-full bg-accent" aria-hidden="true" />
          <h2 className="font-display text-[clamp(3rem,7vw,6.3rem)] font-bold leading-[0.9] tracking-[-0.065em] text-ink">
            Bring a hard data problem.
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Open to data, AI/ML, Python, backend and analytics opportunities—and conversations where analytical thinking needs to become a useful product.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {methods.map((method) => {
              const Icon = method.icon
              const body = (
                <>
                  <span className="flex items-center gap-2 text-xs text-ink-muted">
                    <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    {method.label}
                  </span>
                  <span className="mt-1.5 block break-all text-sm text-ink">{method.value}</span>
                </>
              )
              return (
                <li key={method.label} className="rounded-[var(--radius-control)] bg-[var(--color-paper-2)] p-4">
                  {method.href ? (
                    <a href={method.href} {...(method.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="block min-h-11">{body}</a>
                  ) : <div>{body}</div>}
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            onClick={copyEmail}
            className="mt-5 inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-[var(--radius-pill)] border border-[var(--color-rule)] px-4 text-sm font-medium text-ink"
          >
            {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? 'Email copied' : 'Copy email'}
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="observatory-panel p-6 sm:p-9 lg:p-10">
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="signal-label">Direct channel</p>
              <h3 className="mt-2 font-display text-3xl font-bold tracking-[-0.04em] text-ink">Start the conversation.</h3>
            </div>
            <Send className="h-7 w-7 text-accent" aria-hidden="true" />
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">Name</label>
              <input id="name" name="name" type="text" required aria-required="true" autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={inputBase} placeholder="Aarav Mehta" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">Email address</label>
              <input id="email" name="email" type="email" required aria-required="true" aria-invalid={Boolean(error) && !isValidEmail(form.email)} autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className={inputBase} placeholder="aarav@company.com" />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-ink">Subject</label>
            <input id="subject" name="subject" type="text" required aria-required="true" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} className={inputBase} placeholder="Data analyst role in Jaipur" />
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">Message</label>
            <textarea id="message" name="message" required aria-required="true" rows={7} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className={`${inputBase} min-h-40 resize-y`} placeholder="Share the role, problem or project context." />
          </div>

          <div className="min-h-7" id="contact-status">
            {error ? <p role="alert" className="mt-3 text-sm text-[var(--color-error)]">{error}</p> : null}
            {status === 'success' ? <p role="status" className="mt-3 text-sm text-[var(--color-success)]">Your message was sent. I’ll reply as soon as I can.</p> : null}
            {status === 'fallback' ? (
              <p role="status" className="mt-3 text-sm text-ink-muted">Delivery is not configured on this deployment. <a href={mailtoHref} className="font-semibold text-accent underline">Open this message in your email app</a>.</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] bg-[var(--color-ink)] px-6 text-sm font-semibold text-[var(--color-paper)] sm:w-auto"
          >
            {status === 'submitting' ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Sending…</> : <><Send className="h-4 w-4" aria-hidden="true" />Send message</>}
          </button>
        </form>
      </div>
    </section>
  )
}
