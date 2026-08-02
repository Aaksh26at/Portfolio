import { ArrowDownRight, MapPin } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ResumeButton } from '@/components/ui/ResumeButton'

export function Hero() {
  const { hero, person } = portfolio

  return (
    <section id="home" data-world="0" aria-label="Introduction" className="section section--hero surface surface--paper overflow-hidden">
      <div className="container-page flex min-h-[72dvh] flex-col">
        <div className="grid gap-2 text-xs text-ink-muted sm:flex sm:flex-wrap sm:items-center sm:gap-x-5">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {hero.availability}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {person.location}
          </span>
        </div>

        <div className="mt-auto max-w-[72rem] pt-24">
          <h1 className="font-display text-[length:var(--text-marquee)] font-bold leading-[0.9] tracking-[-0.055em] text-ink">
            I turn raw data into working decisions.
          </h1>
        </div>

        <div className="mt-10 flex items-center justify-between gap-6 border-t border-[var(--color-rule)] pt-5 text-xs text-ink-muted">
          <span>Data analyst · AI/ML · Python</span>
          <span className="hidden whitespace-nowrap sm:block">Move pointer · Scroll to reshape the model</span>
        </div>
      </div>

      <div className="container-page pb-20 sm:pb-28">
        <div className="grid gap-8 border-t border-[var(--color-rule)] pt-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.55fr)] lg:items-start lg:gap-24">
          <p className="max-w-3xl text-lg leading-relaxed text-ink-muted sm:text-xl">
            {hero.paragraph}
          </p>

          <div>
            <div className="flex flex-col items-start gap-3 min-[26rem]:flex-row min-[26rem]:flex-wrap">
              <MagneticButton href="#projects" variant="primary">
                Explore the systems
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <ResumeButton variant="ghost" />
            </div>
            <p className="mt-6 text-xs leading-relaxed text-ink-faint">
              Python · SQL · Machine learning · Four documented systems
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
