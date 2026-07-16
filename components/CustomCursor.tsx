'use client'

import { useEffect, useRef, useState } from 'react'

/** Subtle desktop cursor: a small dot plus a lagging ring that grows over
 *  interactive elements. Disabled on touch devices and when the user prefers
 *  reduced motion. Never used to convey essential information. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    setEnabled(true)
    document.documentElement.classList.add('cursor-enabled')

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let ringX = 0
    let ringY = 0
    let mouseX = 0
    let mouseY = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-grow')
      ring.dataset.active = interactive ? 'true' : 'false'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('cursor-enabled')
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <div
        ref={dotRef}
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent-violet"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        data-active="false"
        className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-white/30 transition-[width,height,opacity] duration-200 data-[active=true]:border-accent-cyan/70 data-[active=true]:bg-accent-violet/10"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
