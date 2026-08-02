import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="surface-night flex min-h-screen items-center">
      <div className="container-page py-24">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--color-night-accent)]">
          Error / 404
        </p>
        <p className="mt-8 font-display text-7xl font-semibold tracking-[-0.06em] text-[var(--color-night-ink)] sm:text-9xl">
          404
        </p>
        <h1 className="mt-5 font-display text-2xl font-semibold text-[var(--color-night-ink)]">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-[var(--color-night-muted)]">
          The page you’re looking for does not exist or may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-night-rule)] px-5 py-2.5 text-sm font-semibold text-[var(--color-night-ink)] hover:border-[var(--color-night-ink)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </main>
  )
}
