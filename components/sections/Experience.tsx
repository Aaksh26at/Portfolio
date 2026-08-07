import { Briefcase, MapPin } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Experience() {
  return (
    // Same ledger rhythm as Education — period at the left edge, rule-separated
    // rows — so work and study read as one continuous record rather than two
    // competing card stacks.
    <section id="experience" data-world="4" className="section surface surface--inset">
      <div className="container-page">
        <SectionHeading
          title="Work that someone depends on."
          eyebrow="Experience"
          index={4}
          scale="lg"
          measure="wide"
          description="Employment, kept separate from the project narratives and the job simulations—this is the work with a colleague waiting on the output."
        />

        <ol className="mt-14 border-t border-[var(--color-rule)]">
          {portfolio.experience.map((role, index) => (
            <Reveal
              key={`${role.organisation}-${role.role}`}
              variant="fade-rise"
              delay={index * 0.06}
              as="li"
              className="grid gap-4 border-b border-[var(--color-rule)] py-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10"
            >
              <span className="tnum font-mono text-sm text-signal-strong">{role.period}</span>
              <div>
                <h3 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {role.role}
                </h3>
                <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
                  <Briefcase className="h-3.5 w-3.5 text-signal-strong" aria-hidden="true" />
                  {role.organisation}
                </p>
                <ul className="mt-5 space-y-3">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="border-t border-[var(--color-rule)] pt-3 text-sm leading-relaxed text-ink-muted"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-center gap-2 text-xs text-ink-faint">
                  <MapPin className="h-3.5 w-3.5 text-signal-strong" aria-hidden="true" />
                  {role.location}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
