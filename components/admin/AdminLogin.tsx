'use client'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { LockKeyhole, Loader2, Eye, EyeOff } from 'lucide-react'

export function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter()
  const [password, setPassword] = useState(''), [visible, setVisible] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState('')
  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to sign in.')
      setPassword(''); router.refresh()
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to sign in. Please retry.') }
    finally { setBusy(false) }
  }
  return <main id="main" className="admin-login"><a className="admin-wordmark" href="/">aa<span>.</span> <small>Portfolio studio</small></a><div className="admin-login-grid"><section className="admin-login-intro"><p className="admin-eyebrow">YOUR WORK, YOUR SPACE</p><h1>A little control.<br /><span>A lot of possibility.</span></h1><p>Keep your portfolio current. Shape your story, share your work, and stay on top of new conversations.</p><div className="admin-login-note"><LockKeyhole size={20} /><span>A private workspace for the portfolio owner.</span></div></section><section className="admin-login-card" aria-labelledby="signin-heading"><span className="admin-lock"><LockKeyhole size={25} /></span><h2 id="signin-heading">Welcome back.</h2><p>Sign in to manage your portfolio.</p><form onSubmit={login}><label htmlFor="admin-password">Admin password</label><div className="admin-password"><input id="admin-password" type={visible ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required maxLength={256} autoComplete="current-password" disabled={!configured || busy} /><button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <EyeOff size={19} /> : <Eye size={19} />}</button></div>{error && <p className="admin-error" role="alert">{error}</p>}<button className="admin-primary admin-login-submit" disabled={!configured || busy}>{busy && <Loader2 size={17} className="admin-spin" />}{busy ? 'Signing in…' : 'Sign in'}</button></form>{!configured && <div className="admin-setup"><strong>One-time setup needed</strong><p>The admin area stays locked until its private credentials and database are connected.</p><ol><li>Run <code>scripts/admin-schema.sql</code> in your Supabase SQL editor.</li><li>Add the four <code>PORTFOLIO_…</code> variables listed in the repository’s <code>ADMIN-SETUP.md</code> to Vercel Production.</li><li>Redeploy, then sign in with your new admin password.</li></ol></div>}<a className="admin-back" href="/">Back to public portfolio</a></section></div><footer className="admin-login-footer">Aakshat Agarwal · Portfolio studio</footer></main>
}
