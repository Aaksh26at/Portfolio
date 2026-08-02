import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  className?: string
  live?: boolean
}

export function Badge({ children, className, live }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-rule)] bg-[var(--color-paper-3)] px-3 py-1.5 text-[0.7rem] font-medium text-ink-muted',
        className,
      )}
    >
      {live ? (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" aria-hidden="true" />
      ) : null}
      {children}
    </span>
  )
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--color-rule)] bg-[var(--color-paper-3)] px-2.5 py-1 text-[0.68rem] text-ink-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
