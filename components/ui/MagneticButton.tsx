'use client'

import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'soft'
  className?: string
  download?: boolean | string
  external?: boolean
  ariaLabel?: string
}

const variants: Record<NonNullable<MagneticButtonProps['variant']>, string> = {
  primary:
    'bg-gradient-to-r from-accent to-accent-violet text-white shadow-[0_12px_30px_-10px_rgba(99,102,241,0.7)] hover:shadow-[0_16px_40px_-10px_rgba(139,92,246,0.8)]',
  ghost:
    'border border-white/15 bg-white/[0.03] text-ink hover:border-accent-violet/50 hover:bg-white/[0.06]',
  soft: 'bg-white/[0.06] text-ink hover:bg-white/[0.1]',
}

/** Button/link with a subtle magnetic pull toward the cursor.
 *  Falls back to a plain element under reduced-motion. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  download,
  external,
  ariaLabel,
}: MagneticButtonProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })

  const handleMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * 0.25)
    y.set(relY * 0.25)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const classes = cn(
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200',
    variants[variant],
    className,
  )

  const style = reduce ? undefined : { x: sx, y: sy }

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={onClick}
        className={classes}
        style={style}
        download={download}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={classes}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
}
