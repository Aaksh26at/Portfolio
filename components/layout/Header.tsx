'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const sectionIds = portfolio.nav.map((item) => item.href.replace('#', ''))

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overBand, setOverBand] = useState(false)
  const active = useScrollSpy(sectionIds)
  const reduced = useReducedMotion()
  const sentinelRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 })

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

  // Scroll state from a sentinel rather than a scroll listener — no
  // per-frame work on the main thread.
  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Invert the bar over ink bands so it never sits paper-on-ink.
  useEffect(() => {
    const bands = Array.from(document.querySelectorAll<HTMLElement>('[data-header-tone="band"]'))
    if (bands.length === 0) return
    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setOverBand(visible.size > 0)
      },
      // Watch only the strip the header occupies.
      { rootMargin: '0px 0px -92% 0px', threshold: 0 },
    )
    bands.forEach((band) => observer.observe(band))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute left-0 top-0 h-px w-px" />

      <header
        data-scrolled={scrolled || undefined}
        data-tone={overBand ? 'band' : undefined}
        className={cn(
          'fixed inset-x-0 top-0 z-[200] transition-[background-color,box-shadow,padding] duration-300',
          'px-5 sm:px-8 lg:px-12 xl:px-16',
          scrolled
            ? 'border-b border-[var(--color-rule)] bg-[oklch(var(--color-paper-lch)/0.86)] py-3 shadow-1 backdrop-blur-md backdrop-saturate-150'
            : 'py-5',
          overBand && 'surface--band !bg-[oklch(var(--color-band-lch)/0.88)]',
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex min-h-12 w-full max-w-[1440px] items-center justify-between gap-6"
        >
          <a
            href="/#home"
            className="group flex min-h-11 shrink-0 items-center gap-3 whitespace-nowrap"
            aria-label={`${portfolio.person.name} — home`}
          >
            <span className="font-outlier text-lg font-bold text-ink">
              {portfolio.person.initials}
            </span>
            <span className="h-5 w-px bg-[var(--color-rule)]" aria-hidden="true" />
            <span
              className={cn(
                'hidden text-xs font-medium text-ink-muted transition-opacity duration-300 sm:block',
                scrolled && 'opacity-0',
              )}
            >
              Data systems · Jaipur
            </span>
          </a>

          {/* Desktop index. useScrollSpy already ran on every page load;
              until now its result was only used in the mobile drawer. */}
          <ul className="hidden items-center gap-1 lg:flex">
            {portfolio.nav.map((item, index) => {
              const id = item.href.replace('#', '')
              const isActive = active === id
              return (
                <li key={item.href} className="relative">
                  <a
                    href={`/${item.href}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'group relative flex min-h-11 items-center gap-1.5 whitespace-nowrap px-3 text-xs font-medium transition-colors duration-200',
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    <span className="tnum font-mono text-[0.6rem] text-ink-faint opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                  {isActive ? (
                    <motion.span
                      layoutId={reduced ? undefined : 'nav-active'}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-signal"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              )
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />

            <a
              href={`mailto:${portfolio.person.email}?subject=${encodeURIComponent('Opportunity for Aakshat Agarwal')}`}
              className="hidden min-h-11 items-center gap-1.5 whitespace-nowrap border-b border-[var(--color-ink)] text-xs font-semibold text-ink transition-colors duration-200 hover:border-signal hover:text-signal md:inline-flex"
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
              className="grid h-11 w-11 place-items-center rounded-[var(--radius-control)] border border-[var(--color-control-rule)] bg-[var(--color-paper)] text-ink lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Scroll progress. Replaces the deleted ScrollProgress component,
            whose three-stop gradient design.md prohibits. */}
        <motion.span
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-signal"
          aria-hidden="true"
        />

        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="ml-auto mt-3 max-h-[calc(100dvh-6rem)] w-full max-w-[28rem] overflow-y-auto rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-3 shadow-3 lg:hidden"
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
                          isActive ? 'bg-signal-soft text-ink' : 'text-ink-muted',
                        )}
                      >
                        {item.label}
                        <span className="tnum font-mono text-[0.65rem] text-ink-faint">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
              <a
                href={`mailto:${portfolio.person.email}?subject=${encodeURIComponent('Opportunity for Aakshat Agarwal')}`}
                className="mt-3 flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] border border-signal bg-signal px-4 text-sm font-semibold text-signal-ink"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  )
}
