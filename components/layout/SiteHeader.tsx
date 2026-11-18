'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const links = portfolio.nav.filter(item => item.href !== '#contact').map(item => ({ label: item.label, id: item.href.slice(1) }))
const sectionIds = ['home', ...links.map(link => link.id), 'contact']

export function Header() {
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(sectionIds)
  const root = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() } }
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false) }
    const resize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('keydown', key); window.addEventListener('pointerdown', outside); window.addEventListener('resize', resize)
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('pointerdown', outside); window.removeEventListener('resize', resize) }
  }, [open])
  return (
    <header ref={root} className="site-header">
      <nav className="container-page header-inner" aria-label="Primary">
        <Link href="/#home" className="site-wordmark" aria-label={`${portfolio.person.name} — home`}><span className="wordmark-icon">aa<span>.</span></span><span className="wordmark-name">Aakshat Agarwal<span>Python & automation</span></span></Link>
        <ul className="desktop-nav">{links.map(link => <li key={link.id}><Link href={`/#${link.id}`} aria-current={active === link.id ? 'location' : undefined}>{link.label}</Link></li>)}</ul>
        <div className="header-actions"><ThemeToggle /><Link className="header-contact" href="/#contact">Let’s talk<ArrowUpRight size={15} aria-hidden="true" /></Link><button ref={toggle} type="button" className="menu-toggle" onClick={() => setOpen(value => !value)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-menu">{open ? <X size={20} /> : <Menu size={20} />}</button></div>
      </nav>
      {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile"><ul>{[...links, { label: 'Contact', id: 'contact' }].map(link => <li key={link.id}><Link href={`/#${link.id}`} onClick={() => setOpen(false)} aria-current={active === link.id ? 'location' : undefined}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></Link></li>)}</ul></nav>}
    </header>
  )
}
