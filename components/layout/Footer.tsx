import { ArrowUp } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { SocialLinks } from '@/components/ui/SocialLinks'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] bg-base-900">
      <div className="container-page py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-violet text-sm font-bold text-white">
                {portfolio.person.initials}
              </span>
              <span className="font-display text-sm font-semibold text-ink">
                {portfolio.person.name}
              </span>
            </a>
            <p className="mt-3 max-w-sm text-sm text-ink-muted">
              Data Analyst, AI/ML enthusiast and Python developer based in Jaipur, India — open to
              data, AI/ML, backend and analytics opportunities.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <SocialLinks />
            <a
              href="#home"
              className="link-underline inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
            >
              Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {portfolio.person.name}. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS, Framer Motion &amp; React Three Fiber.</p>
        </div>
      </div>
    </footer>
  )
}
