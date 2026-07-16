import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  accent?: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <Reveal
      className={
        align === 'center'
          ? 'mx-auto max-w-2xl text-center'
          : 'max-w-2xl'
      }
    >
      <div
        className={
          align === 'center'
            ? 'mb-3 flex items-center justify-center gap-2'
            : 'mb-3 flex items-center gap-2'
        }
      >
        <span className="h-px w-8 bg-gradient-to-r from-accent-violet to-accent-cyan" />
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent-violet">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-[2.75rem]">
        {title}
        {accent ? <span className="text-gradient"> {accent}</span> : null}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{description}</p>
      ) : null}
    </Reveal>
  )
}
