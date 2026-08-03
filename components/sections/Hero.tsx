import { ArrowDownRight, MapPin } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ResumeButton } from '@/components/ui/ResumeButton'
import { Reveal } from '@/components/ui/Reveal'

export function Hero() {
  const { hero, person } = portfolio

  return (
    <section
      id="home"
      data-world="0"
      aria-label="Introduction"
      className="section section--hero surface surface--paper overflow-hidden"
    >
      <div className="container-page flex min-h-[72dvh] flex-col">
        <Reveal variant="fade-rise">
          <div className="grid gap-2 text-xs text-ink-muted sm:flex sm:flex-wrap sm:items-center sm:gap-x-5">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              {hero.availability}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {person.location}
            </span>
          </div>
        </Reveal>

        <div className="mt-auto max-w-[72rem] pt-24">
          <Reveal variant="mask-wipe" amount={0.3}>
            <h1 className="font-display text-[length:var(--text-marquee)] font-bold leading-[0.9] tracking-[var(--track-display-tight)] text-ink">
              I turn raw data into working decisions.
            </h1>
          </Reveal>
        </div>

        <Reveal variant="fade-rise" delay={0.12}>
          <div className="mt-10 flex items-center justify-between gap-6 border-t border-[var(--color-rule)] pt-5 text-xs text-ink-muted">
            <span>Data analyst · AI/ML · Python</span>
            <span className="hidden whitespace-nowrap sm:block">
              Move pointer · Scroll to reshape the model
            </span>
          </div>
        </Reveal>
      </div>

      <div className="container-page pt-16">
        <div className="grid gap-8 border-t border-[var(--color-rule)] pt-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.55fr)] lg:items-start lg:gap-24">
          <Reveal variant="fade-rise">
            <p className="max-w-3xl text-lg leading-relaxed text-ink-muted sm:text-xl">
              {hero.paragraph}
            </p>
          </Reveal>

          <Reveal variant="fade-rise" delay={0.08}>
            <div className="flex flex-col items-start gap-3 min-[26rem]:flex-row min-[26rem]:flex-wrap">
              <MagneticButton href="#projects" variant="signal">
                Explore the systems
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <ResumeButton variant="ghost" />
            </div>
            <p className="mt-6 text-xs leading-relaxed text-ink-faint">
              Python · SQL · Machine learning · Four documented systems
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
