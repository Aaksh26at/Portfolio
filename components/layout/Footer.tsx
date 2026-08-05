import Link from 'next/link'
import { portfolio } from '@/data/portfolio'
import { SocialLinks } from '@/components/ui/SocialLinks'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    // Continues the band Contact opened, so the page closes on ink
    // rather than fading back out to paper.
    <footer className="surface surface--band pb-10 pt-14">
      <div className="container-page">
        <div className="flex flex-col gap-6 border-t border-[var(--color-rule)] pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/#home"
              className="font-outlier whitespace-nowrap text-base font-bold text-ink"
            >
              {portfolio.person.initials}
            </Link>
            <span className="hidden h-4 w-px bg-[var(--color-rule)] sm:block" aria-hidden="true" />
            <p className="text-sm text-ink-muted">{portfolio.person.name} · Data, ML and Python systems</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
            {/* Replaces the hand-rolled link list, which carried no
                analytics; SocialLinks already tracks each destination. */}
            <SocialLinks />
            <p className="whitespace-nowrap text-xs text-ink-faint">© {year} · Jaipur, India</p>
          </nav>
        </div>
      </div>
    </footer>
  )
}
