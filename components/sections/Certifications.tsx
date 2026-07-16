import { Award, BadgeCheck } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

export function Certifications() {
  return (
    <section id="certifications" className="section-pad border-t border-white/[0.06] bg-base-900/30">
      <div className="container-page">
        <SectionHeading
          eyebrow="Certifications"
          title="Simulations &"
          accent="continuous learning."
          description="Hands-on job simulations and certifications. Simulations are exactly that — practical, guided programmes, clearly distinct from employment."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.certifications.map((cert, i) => (
            <Reveal key={cert.title} className="flex" y={20} delay={(i % 3) * 0.06}>
              <div className="glass card-hover flex h-full flex-col rounded-3xl p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-violet/20 to-accent-cyan/10 text-accent-violet">
                    {cert.isSimulation ? (
                      <BadgeCheck className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Award className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                  <span className="text-xs font-medium text-ink-faint">{cert.year}</span>
                </div>

                <h3 className="mt-4 font-display text-base font-semibold leading-snug text-ink">
                  {cert.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-accent-cyan">{cert.provider}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{cert.description}</p>

                <span
                  className={cn(
                    'mt-4 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide',
                    cert.isSimulation
                      ? 'border border-amber-400/25 bg-amber-400/10 text-amber-200'
                      : 'border border-white/10 bg-white/[0.04] text-ink-muted',
                  )}
                >
                  {cert.isSimulation ? 'Job Simulation' : 'Certification'}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4" delay={0.1}>
          <p className="text-xs text-ink-faint">
            Note: The Deloitte and JPMorgan Chase items are Forage job simulations — practical
            training exercises, not employment at those companies.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
