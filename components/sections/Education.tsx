import { MapPin } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { Panel } from '@/components/ui/Panel'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Education() {
  return (
    // Ledger: a rule-separated timeline with the year at the left edge,
    // replacing two cards in a grid. Nothing here needed a box.
    <section id="education" data-world="4" className="section surface surface--paper">
      <div className="container-page">
        <SectionHeading
          title="Evidence has a history."
          index={5}
          scale="lg"
          measure="wide"
          description="Formal computer-science study, strengthened through project work that moves from analysis into shipped interfaces and APIs."
        />

        <ol className="mt-14 border-t border-[var(--color-rule)]">
          {portfolio.education.map((education, index) => (
            <Reveal
              key={education.degree}
              variant="fade-rise"
              delay={index * 0.06}
              as="li"
              className="grid gap-4 border-b border-[var(--color-rule)] py-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10"
            >
              <span className="tnum font-mono text-sm text-signal-strong">{education.period}</span>
              <div>
                <h3 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {education.degree}
                </h3>
                <p className="mt-3 text-sm text-ink-muted">{education.institution}</p>
                <p className="mt-4 flex items-center gap-2 text-xs text-ink-faint">
                  <MapPin className="h-3.5 w-3.5 text-signal-strong" aria-hidden="true" />
                  {education.location}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Panel tone="inset" pad="lg" className="mt-14">
          <p className="signal-label">Parallel learning track</p>
          <h3 className="mt-4 max-w-2xl font-display text-3xl font-bold text-ink">
            The curriculum outside the curriculum.
          </h3>
          <Reveal variant="stagger" step={0.05} as="ul" className="mt-8 grid gap-5 sm:grid-cols-2">
            {portfolio.learningJourney.map((item) => (
              <li
                key={item}
                className="border-t border-[var(--color-rule)] pt-4 text-sm leading-relaxed text-ink-muted"
              >
                {item}
              </li>
            ))}
          </Reveal>
        </Panel>
      </div>
    </section>
  )
}
