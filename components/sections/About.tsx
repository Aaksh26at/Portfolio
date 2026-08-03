import { ArrowDownRight } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function About() {
  const { about } = portfolio

  return (
    // Manifesto: no sticky rail, no card. The statement runs full width
    // and the prose sits beneath it in two columns, so this reads as a
    // page rather than another boxed panel.
    <section id="about" data-world="1" className="section surface surface--paper">
      <div className="container-page">
        <SectionHeading
          title="Analysis is the start. The product is the finish."
          eyebrow="Working principle"
          index={1}
          scale="xl"
          measure="wide"
          reveal="mask-wipe"
          titleClassName="max-w-[18ch]"
        />

        <Reveal variant="fade-rise" delay={0.08}>
          <p className="mt-12 max-w-4xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
            Start with the decision. Trace the evidence. Build only what makes the result easier to
            use.
          </p>
        </Reveal>

        <Reveal
          variant="stagger"
          step={0.08}
          className="mt-12 grid gap-x-16 gap-y-6 border-t border-[var(--color-rule)] pt-10 md:grid-cols-2"
        >
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-ink-muted sm:text-lg">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ul className="flex flex-wrap gap-2.5">
            {about.personalDetails.map((detail) => (
              <li key={detail}>
                <Badge tone="neutral" variant="outline" size="md">
                  {detail}
                </Badge>
              </li>
            ))}
          </ul>

          <a
            href="#projects"
            className="link-underline inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink"
          >
            Follow the evidence
            <ArrowDownRight className="h-4 w-4 text-signal-strong" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
