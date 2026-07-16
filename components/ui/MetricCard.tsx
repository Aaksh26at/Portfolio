import type { Metric } from '@/types'
import { cn } from '@/lib/utils'

export function MetricCard({ metric, className }: { metric: Metric; className?: string }) {
  return (
    <div
      className={cn(
        'glass card-hover rounded-2xl p-5',
        className,
      )}
    >
      <div className="font-display text-2xl font-bold text-gradient sm:text-3xl">{metric.value}</div>
      <div className="mt-1 text-xs leading-snug text-ink-muted sm:text-sm">{metric.label}</div>
    </div>
  )
}
