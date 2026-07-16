import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-grid px-6 text-center">
      <div className="bg-radial-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <p className="font-display text-7xl font-bold text-gradient sm:text-8xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-violet px-6 py-3 text-sm font-semibold text-white"
      >
        <Home className="h-4 w-4" aria-hidden="true" /> Back to home
      </Link>
    </main>
  )
}
