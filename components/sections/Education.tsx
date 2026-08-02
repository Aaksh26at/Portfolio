import { MapPin } from 'lucide-react'
import { portfolio } from '@/data/portfolio'

export function Education() {
  return (
    <section id="education" data-world="4" className="section surface surface--paper">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <span className="mb-6 block h-1 w-9 rounded-full bg-accent" aria-hidden="true" />
            <h2 className="font-display text-[clamp(2.8rem,6vw,5.4rem)] font-bold leading-[0.94] tracking-[-0.055em] text-ink">
              Evidence has a history.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Formal computer-science study, strengthened through project work that moves from analysis into shipped interfaces and APIs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {portfolio.education.map((education, index) => (
              <article key={education.degree} className="observatory-panel p-6 sm:p-8" data-interactive="true">
                <div className="flex items-start justify-between gap-4">
                  <span className="tnum font-display text-4xl font-bold text-accent">0{index + 1}</span>
                  <span className="tnum whitespace-nowrap text-xs text-ink-muted">{education.period}</span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold leading-tight tracking-[-0.035em] text-ink">
                  {education.degree}
                </h3>
                <p className="mt-3 text-sm text-ink-muted">{education.institution}</p>
                <p className="mt-5 flex items-center gap-2 text-xs text-ink-faint">
                  <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {education.location}
                </p>
              </article>
            ))}
          </div>

          <div className="observatory-panel p-6 sm:p-8 lg:p-10">
            <p className="signal-label">Parallel learning track</p>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] text-ink">
              The curriculum outside the curriculum.
            </h3>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {portfolio.learningJourney.map((item) => (
                <li key={item} className="rounded-[var(--radius-control)] bg-[var(--color-paper-3)] p-4 text-sm leading-relaxed text-ink-muted">
                  <span className="mb-3 block h-1 w-5 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
