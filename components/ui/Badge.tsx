import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type BadgeTone = 'neutral' | 'signal' | 'data' | 'success' | 'warning'
export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'ghost'
export type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  variant?: BadgeVariant
  size?: BadgeSize
  /** Leading status dot. `'live'` uses the success colour. */
  dot?: boolean | 'live'
  /** Mono + tabular figures, for counts and versions. */
  numeric?: boolean
  className?: string
  title?: string
}

const SIZE: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-1 text-[0.68rem]',
  md: 'px-3 py-1.5 text-[0.72rem] font-medium',
}

// tone x variant. Amber fills always carry ink labels, never paper —
// amber at L66 is ~2.4:1 against white but ~5.3:1 against warm ink.
const STYLE: Record<BadgeTone, Record<BadgeVariant, string>> = {
  neutral: {
    solid: 'border border-ink bg-ink text-[var(--color-paper)]',
    soft: 'border border-transparent bg-[var(--color-paper-3)] text-ink-muted',
    outline: 'border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-ink-muted',
    ghost: 'border border-transparent bg-transparent text-ink-muted',
  },
  signal: {
    solid: 'border border-signal bg-signal text-signal-ink',
    soft: 'border border-transparent bg-signal-soft text-signal-strong',
    outline: 'border border-signal bg-transparent text-signal-strong',
    ghost: 'border border-transparent bg-transparent text-signal-strong',
  },
  data: {
    solid: 'border border-data bg-data text-data-ink',
    soft: 'border border-transparent bg-data-soft text-data',
    outline: 'border border-data bg-transparent text-data',
    ghost: 'border border-transparent bg-transparent text-data',
  },
  success: {
    solid: 'border border-[var(--color-success)] bg-[var(--color-success)] text-[var(--color-paper)]',
    soft: 'border border-transparent bg-[var(--color-paper-3)] text-[var(--color-success)]',
    outline: 'border border-[var(--color-success)] bg-transparent text-[var(--color-success)]',
    ghost: 'border border-transparent bg-transparent text-[var(--color-success)]',
  },
  warning: {
    solid: 'border border-[var(--color-warning)] bg-[var(--color-warning)] text-[var(--color-signal-ink)]',
    soft: 'border border-transparent bg-[var(--color-paper-3)] text-[var(--color-warning)]',
    outline: 'border border-[var(--color-warning-rule)] bg-transparent text-[var(--color-warning)]',
    ghost: 'border border-transparent bg-transparent text-[var(--color-warning)]',
  },
}

/**
 * Chip primitive with a real tone axis.
 *
 * The previous Badge and Tag were visually identical — same border,
 * background, text colour and radius — with `live` as the only prop,
 * so every chip on the site rendered grey-on-grey.
 */
export function Badge({
  children,
  tone = 'neutral',
  variant = 'outline',
  size = 'sm',
  dot,
  numeric = false,
  className,
  title,
}: BadgeProps) {
  return (
    <span
      title={title}
      className={cn(
        'inline-flex items-center gap-2 whitespace-nowrap rounded-[var(--radius-pill)]',
        SIZE[size],
        STYLE[tone][variant],
        numeric && 'tnum font-mono',
        className,
      )}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className={cn(
            'h-1.5 w-1.5 shrink-0 rounded-full',
            dot === 'live' ? 'bg-[var(--color-success)]' : 'bg-current',
          )}
        />
      ) : null}
      {children}
    </span>
  )
}
