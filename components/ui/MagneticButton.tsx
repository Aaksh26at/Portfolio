'use client'

import type { ReactNode } from 'react'
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
  primary: 'border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] hover:border-accent hover:bg-accent hover:text-[var(--color-accent-ink)]',
  ghost: 'border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-ink hover:border-[var(--color-muted)]',
  soft:
    'border border-transparent bg-[var(--color-paper-3)] text-ink hover:border-[var(--color-rule)]',
}

/** Shared action primitive. The historical name is retained for API compatibility. */
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
  const classes = cn(
    'group relative inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] px-5 py-2.5 text-sm font-semibold transition-colors duration-200',
    variants[variant],
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        download={download}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
