import { ArrowLeft } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'

export default function NotFound() {
  return (
    // The band surface re-declares the colour tokens, so everything below
    // re-tones to ink automatically — no hand-written dark-mode variables.
    <main className="surface surface--band flex min-h-screen items-center">
      <div className="container-page py-24">
        <p className="signal-label">Error / 404</p>
        <p className="tnum mt-8 font-display text-7xl font-bold tracking-[var(--track-display-tight)] text-ink sm:text-9xl">
          404
        </p>
        <h1 className="mt-5 font-display text-2xl font-bold text-ink">Page not found</h1>
        <p className="mt-3 max-w-md text-ink-muted">
          The page you’re looking for does not exist or may have moved.
        </p>
        <div className="mt-8">
          <MagneticButton href="/" variant="ghost" iconTrail={false}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </MagneticButton>
        </div>
      </div>
    </main>
  )
}
