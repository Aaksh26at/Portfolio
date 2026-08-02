import type { Metric } from '@/types'
import { cn } from '@/lib/utils'

export function MetricCard({ metric, className }: { metric: Metric; className?: string }) {
  return (
    <div
      className={cn(
        'border-t border-[var(--color-rule-strong)] py-5',
        className,
      )}
    >
      <div className="font-display text-2xl font-semibold tracking-[-0.03em] text-accent sm:text-3xl">{metric.value}</div>
      <div className="mt-1 max-w-[18rem] text-xs leading-snug text-ink-muted sm:text-sm">{metric.label}</div>
    </div>
  )
}
