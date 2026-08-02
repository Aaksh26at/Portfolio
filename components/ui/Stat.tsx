import { cn } from '@/lib/utils'

export type StatTone = 'ink' | 'signal' | 'data'
export type StatSize = 'sm' | 'md' | 'lg'

interface StatProps {
  value: string
  label: string
  tone?: StatTone
  size?: StatSize
  /** Mono + tabular figures. Default on — these are measurements. */
  mono?: boolean
  rule?: 'top' | 'left' | 'none'
  className?: string
}

const SIZE: Record<StatSize, string> = {
  sm: 'text-xl sm:text-2xl',
  md: 'text-2xl sm:text-3xl',
  lg: 'text-3xl sm:text-[2.75rem]',
}

const TONE: Record<StatTone, string> = {
  ink: 'text-ink',
  signal: 'text-signal-strong',
  data: 'text-data',
}

const RULE = {
  top: 'border-t border-[var(--color-rule-strong)] pt-5',
  left: 'border-l border-[var(--color-rule-strong)] pl-5',
  none: '',
} as const

/**
 * A measurement with its label.
 *
 * Replaces four separate inline implementations of the same
 * value-over-label pattern (RecruiterSnapshot, ProjectModal, the case
 * study metrics list, and the project plate grid).
 */
export function Stat({
  value,
  label,
  tone = 'ink',
  size = 'md',
  mono = true,
  rule = 'top',
  className,
}: StatProps) {
  return (
    <div className={cn(RULE[rule], className)}>
      <div
        className={cn(
          'font-semibold leading-none',
          mono ? 'tnum font-mono' : 'font-display',
          SIZE[size],
          TONE[tone],
        )}
      >
        {value}
      </div>
      <div className="mt-2 max-w-[18rem] text-xs leading-snug text-ink-muted sm:text-sm">
        {label}
      </div>
    </div>
  )
}
