import { GraduationCap, MapPin } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export function Education() {
  return (
    <section id="education" className="section-pad">
      <div className="container-page">
        <SectionHeading eyebrow="Education" title="Academic" accent="foundation." />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Timeline */}
          <div className="relative">
            <div
              className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent-violet/50 via-white/10 to-transparent"
              aria-hidden="true"
            />
            <ol className="space-y-8">
              {portfolio.education.map((edu, i) => (
                <Reveal as="li" key={edu.degree} className="relative pl-14" delay={i * 0.08}>
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-accent-violet/30 bg-base-800">
                    <GraduationCap className="h-5 w-5 text-accent-violet" aria-hidden="true" />
                  </span>
                  <div className="glass rounded-2xl p-5">
                    <span className="text-xs font-semibold text-accent-cyan">{edu.period}</span>
                    <h3 className="mt-1 font-display text-lg font-semibold text-ink">{edu.degree}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{edu.institution}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-ink-faint">
                      <MapPin className="h-3 w-3" aria-hidden="true" /> {edu.location}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Learning journey */}
          <Reveal delay={0.1}>
            <div className="glass h-full rounded-3xl p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ink">Practical Learning Journey</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Beyond coursework, most of my growth comes from building — presented honestly as
                project-based learning and professional development, not employment.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {portfolio.learningJourney.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 text-sm text-ink"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-violet" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
