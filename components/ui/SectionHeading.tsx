interface SectionHeadingProps {
  eyebrow?: string
  title: string
  accent?: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  title,
  accent,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <span className="mb-5 block h-1 w-9 rounded-full bg-accent" aria-hidden="true" />
      <h2 className="font-display text-[clamp(2.35rem,5vw,4.9rem)] font-bold leading-[0.98] tracking-[-0.05em] text-ink">
        {title}{accent ? ` ${accent}` : null}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
