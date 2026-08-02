'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const sectionIds = portfolio.nav.map((item) => item.href.replace('#', ''))
export function Header() {
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(sectionIds)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-[200] px-5 pt-5 sm:px-8 lg:px-12 xl:px-16">
      <nav
        aria-label="Primary"
        className="mx-auto flex min-h-12 w-full max-w-[1440px] items-center justify-between gap-4"
      >
        <a
          href="/#home"
          className="group flex min-h-11 items-center gap-3 whitespace-nowrap"
          aria-label={`${portfolio.person.name} — home`}
        >
          <span className="font-outlier text-lg font-bold tracking-[-0.08em] text-ink">
            {portfolio.person.initials}
          </span>
          <span className="h-5 w-px bg-[var(--color-rule)]" aria-hidden="true" />
          <span className="hidden text-xs font-medium text-ink-muted sm:block">Data systems · Jaipur</span>
        </a>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href={`mailto:${portfolio.person.email}?subject=${encodeURIComponent('Opportunity for Aakshat Agarwal')}`}
            className="hidden min-h-11 items-center gap-1.5 whitespace-nowrap border-b border-[var(--color-ink)] text-xs font-semibold text-ink md:inline-flex"
          >
            Contact
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-[var(--radius-control)] border border-[var(--color-rule)] bg-[var(--color-paper)] text-ink md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="ml-auto mt-3 max-h-[calc(100dvh-6rem)] w-full max-w-[28rem] overflow-y-auto rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-3 shadow-[var(--shadow-card)] md:hidden"
          >
            <ul>
              {portfolio.nav.map((item, index) => {
                const id = item.href.replace('#', '')
                const isActive = active === id
                return (
                  <li key={item.href}>
                    <a
                      href={`/${item.href}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex min-h-12 items-center justify-between whitespace-nowrap rounded-[var(--radius-control)] px-4 text-sm',
                        isActive ? 'bg-[var(--color-accent-soft)] text-ink' : 'text-ink-muted',
                      )}
                    >
                      {item.label}
                      <span className="tnum text-[0.65rem] text-ink-faint">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <a
              href={`mailto:${portfolio.person.email}?subject=${encodeURIComponent('Opportunity for Aakshat Agarwal')}`}
              className="mt-3 flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] bg-[var(--color-ink)] px-4 text-sm font-semibold text-[var(--color-paper)]"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
