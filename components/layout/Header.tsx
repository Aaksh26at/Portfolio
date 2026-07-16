'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { ResumeButton } from '@/components/ui/ResumeButton'
import { cn } from '@/lib/utils'

const sectionIds = portfolio.nav.map((n) => n.href.replace('#', ''))

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll and enable Escape-to-close while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[70] transition-all duration-300',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <div className="container-page">
        <nav
          aria-label="Primary"
          className={cn(
            'flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300',
            scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent',
          )}
        >
          <a
            href="#home"
            className="group flex items-center gap-2.5"
            aria-label={`${portfolio.person.name} — home`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-violet text-sm font-bold text-white">
              {portfolio.person.initials}
            </span>
            <span className="hidden font-display text-sm font-semibold text-ink sm:block">
              Aakshat Agarwal
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {portfolio.nav.map((item) => {
              const id = item.href.replace('#', '')
              const isActive = active === id
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ResumeButton variant="soft" className="px-4 py-2 text-xs" />
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-ink lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container-page lg:hidden"
          >
            <ul className="glass-strong mt-2 flex flex-col gap-1 rounded-2xl p-3">
              {portfolio.nav.map((item) => {
                const id = item.href.replace('#', '')
                const isActive = active === id
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                        isActive ? 'bg-white/[0.06] text-ink' : 'text-ink-muted hover:bg-white/[0.04] hover:text-ink',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
              <li className="px-1 pt-2">
                <ResumeButton variant="primary" className="w-full" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
