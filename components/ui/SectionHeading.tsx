import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal, type RevealVariant } from '@/components/ui/Reveal'

export type HeadingScale = 'sm' | 'md' | 'lg' | 'xl'

interface SectionHeadingProps {
  title: string
  /** Uppercase kicker above the title. */
  eyebrow?: string
  /** Chapter number, rendered mono and tabular as `01`. */
  index?: number
  description?: string
  scale?: HeadingScale
  align?: 'start' | 'center' | 'end'
  /** `bar` is the short accent tick, `line` a full-width hairline. */
  mark?: 'bar' | 'line' | 'none'
  as?: 'h1' | 'h2' | 'h3'
  measure?: 'narrow' | 'default' | 'wide'
  /** Entrance for the title block. */
  reveal?: RevealVariant
  id?: string
  className?: string
  titleClassName?: string
  /** Slot below the description — CTAs, links, meta. */
  children?: ReactNode
}

const SCALE: Record<HeadingScale, string> = {
  sm: 'text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.02]',
  md: 'text-[clamp(2.4rem,4.6vw,3.9rem)] leading-[0.98]',
  lg: 'text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.94]',
  xl: 'text-[clamp(3.2rem,7.2vw,6.6rem)] leading-[0.9]',
}

const MEASURE = {
  narrow: 'max-w-xl',
  default: 'max-w-3xl',
  wide: '',
} as const

const ALIGN = {
  start: 'text-left items-start',
  center: 'text-center items-center mx-auto',
  end: 'text-right items-end ml-auto',
} as const

/**
 * The single heading vocabulary for every section.
 *
 * Replaces nine hand-copied h2 blocks that differed only in cosmetic
 * clamp values, six verbatim copies of the accent tick, and eight
 * separate `.signal-label` eyebrows.
 */
export function SectionHeading({
  title,
  eyebrow,
  index,
  description,
  scale = 'lg',
  align = 'start',
  mark = 'bar',
  as: Tag = 'h2',
  measure = 'default',
  reveal = 'fade-rise',
  id,
  className,
  titleClassName,
  children,
}: SectionHeadingProps) {
  const hasMeta = Boolean(eyebrow || index !== undefined)

  return (
    <div className={cn('flex flex-col', ALIGN[align], MEASURE[measure], className)}>
      {hasMeta ? (
        <div className="mb-5 flex items-baseline gap-3">
          {index !== undefined ? (
            <span
              className="tnum font-mono text-xs font-medium text-signal-strong"
              aria-hidden="true"
            >
              {String(index).padStart(2, '0')}
            </span>
          ) : null}
          {eyebrow ? <p className="signal-label">{eyebrow}</p> : null}
        </div>
      ) : null}

      {mark === 'bar' ? (
        <Reveal
          variant="rule-draw"
          as="span"
          className="mb-6 block h-1 w-9 rounded-full bg-signal"
        />
      ) : null}
      {mark === 'line' ? (
        <Reveal
          variant="rule-draw"
          as="span"
          className="mb-6 block h-px w-full bg-[var(--color-rule)]"
        />
      ) : null}

      <Reveal variant={reveal} amount={0.4}>
        <Tag
          id={id}
          className={cn('font-display font-bold text-ink', SCALE[scale], titleClassName)}
        >
          {title}
        </Tag>
      </Reveal>

      {description ? (
        <Reveal variant="fade-rise" delay={0.08}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  )
}
