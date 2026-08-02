'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { usePointerOffset } from '@/hooks/usePointerOffset'

export type ButtonVariant = 'primary' | 'signal' | 'ghost' | 'soft'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  download?: boolean | string
  external?: boolean
  ariaLabel?: string
  /** Pointer-follow travel in px. 0 disables. */
  magnet?: number
  /** Slides a trailing icon 2px on hover. */
  iconTrail?: boolean
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] hover:border-signal hover:bg-signal hover:text-signal-ink',
  // Amber fill carries an ink label — never paper.
  signal:
    'border border-signal bg-signal text-signal-ink hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]',
  ghost:
    'border border-[var(--color-control-rule)] bg-transparent text-ink hover:border-ink hover:bg-[var(--color-paper-2)]',
  soft: 'border border-transparent bg-[var(--color-paper-3)] text-ink hover:border-[var(--color-rule)]',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 py-2 text-xs',
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-12 px-6 py-3 text-base',
}

/**
 * The shared action primitive, with its magnetism restored.
 *
 * Pointer-follow is delegated to usePointerOffset, which writes --mx/--my
 * as custom properties and is disabled for coarse pointers and reduced
 * motion. Keeping the transform in CSS means no React re-render per
 * pointer move.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  download,
  external,
  ariaLabel,
  magnet = 10,
  iconTrail = true,
}: MagneticButtonProps) {
  const { ref, onPointerMove, onPointerLeave } = usePointerOffset<HTMLElement>({
    strength: magnet,
  })

  const classes = cn(
    'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] font-semibold',
    'translate-x-[var(--mx,0)] translate-y-[var(--my,0)]',
    'transition-[color,background-color,border-color,box-shadow,transform] duration-200',
    iconTrail && '[&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:translate-x-0.5',
    SIZES[size],
    VARIANTS[variant],
    className,
  )

  const motionProps = { onPointerMove, onPointerLeave }

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={classes}
        download={download}
        aria-label={ariaLabel}
        {...motionProps}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </button>
  )
}
