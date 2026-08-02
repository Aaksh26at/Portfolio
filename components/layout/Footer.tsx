import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '@/data/portfolio'

export function Footer() {
  const year = new Date().getFullYear()
  const links = portfolio.person.socials.filter((item) =>
    ['GitHub', 'LinkedIn', 'Email'].includes(item.label),
  )

  return (
    <footer className="pb-8 pt-20 sm:pb-10 sm:pt-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 border-t border-[var(--color-rule)] py-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <a href="/#home" className="font-outlier whitespace-nowrap text-base font-bold tracking-[-0.055em] text-ink">
              {portfolio.person.initials}
            </a>
            <span className="hidden h-4 w-px bg-[var(--color-rule)] sm:block" aria-hidden="true" />
            <p className="text-sm text-ink-muted">{portfolio.person.name} · Data, ML and Python systems</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {links.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="link-underline inline-flex min-h-11 items-center gap-1 whitespace-nowrap text-sm text-ink-muted"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="whitespace-nowrap text-xs text-ink-faint">© {year} · Jaipur, India</p>
          </nav>
        </div>
      </div>
    </footer>
  )
}
