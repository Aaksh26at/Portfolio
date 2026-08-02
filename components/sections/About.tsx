import { ArrowDownRight } from 'lucide-react'
import { portfolio } from '@/data/portfolio'

export function About() {
  const { about } = portfolio

  return (
    <section id="about" data-world="1" className="section surface surface--paper">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-32">
            <span className="mb-6 block h-1 w-9 rounded-full bg-accent" aria-hidden="true" />
            <h2 className="max-w-xl font-display text-[clamp(2.8rem,6vw,5.6rem)] font-bold leading-[0.94] tracking-[-0.055em] text-ink">
              Analysis is the start. The product is the finish.
            </h2>
            <a href="#projects" className="mt-8 inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink-muted">
              Follow the evidence
              <ArrowDownRight className="h-4 w-4 text-accent" aria-hidden="true" />
            </a>
          </div>

          <div className="observatory-panel p-6 sm:p-9 lg:p-12">
            <p className="signal-label">Working principle</p>
            <p className="mt-5 font-display text-2xl font-bold leading-tight tracking-[-0.035em] text-ink sm:text-3xl">
              Start with the decision. Trace the evidence. Build only what makes the result easier to use.
            </p>

            <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-ink-muted sm:text-lg">
              {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <ul className="mt-10 flex flex-wrap gap-2.5">
              {about.personalDetails.map((detail) => (
                <li
                  key={detail}
                  className="rounded-[var(--radius-pill)] border border-[var(--color-rule)] bg-[var(--color-paper-3)] px-4 py-2 text-sm text-ink-muted"
                >
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
