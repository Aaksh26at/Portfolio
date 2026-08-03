import { portfolio } from '@/data/portfolio'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function DataPipeline() {
  return (
    // Strip: the schematic sits directly on the band. It was previously
    // a diagram boxed inside a panel inside a section — three nested
    // containers to draw one line.
    <section
      data-world="3"
      data-header-tone="band"
      aria-label="How I work"
      className="section surface surface--band"
    >
      <div className="container-page">
        <SectionHeading
          title="Raw input. Defensible decision."
          eyebrow="Signal path"
          scale="md"
          align="center"
          mark="none"
          description="Reliability comes before modelling. The path stays visible from the first row of raw data to the final prediction, dashboard or API response."
        />

        <ol className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-7 lg:gap-4">
          <Reveal
            variant="rule-draw"
            as="span"
            className="absolute left-[7%] right-[7%] top-5 hidden h-px bg-[var(--color-band-signal)] lg:block"
          />
          {portfolio.pipeline.map((stage, index) => (
            <Reveal
              key={stage}
              variant="fade-rise"
              delay={index * 0.07}
              as="li"
              className="relative"
            >
              <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-[var(--color-rule)] bg-[var(--color-band)] font-mono text-xs font-semibold text-signal">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mt-4 max-w-[9rem] text-sm font-medium leading-snug text-ink">{stage}</p>
              <p className="mt-2 text-[0.68rem] text-ink-muted">
                {index === portfolio.pipeline.length - 1 ? 'usable output' : 'verified stage'}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
