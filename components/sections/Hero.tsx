import { ArrowDownRight, Github, Linkedin, MapPin } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ResumeButton } from '@/components/ui/ResumeButton'
import { Reveal } from '@/components/ui/Reveal'

export function Hero() {
  const { hero, person } = portfolio
  const profileLinks = person.socials.filter(
    (social) => social.icon === 'github' || social.icon === 'linkedin',
  )

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
              {person.name}
            </h1>
            <p className="mt-6 max-w-4xl font-display text-[length:var(--text-display-s)] font-bold leading-[1.05] tracking-[var(--track-display-tight)] text-ink">
              {person.role}
            </p>
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
            {/* 416px, not 26rem: Tailwind compares an arbitrary breakpoint
                against `screens`, which is in px, and silently emits nothing
                when the units differ — the row never turned horizontal. */}
            <div className="flex flex-col items-start gap-3 min-[416px]:flex-row min-[416px]:flex-wrap">
              <MagneticButton href="#projects" variant="signal">
                Explore the systems
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <ResumeButton variant="ghost" />
            </div>
            <nav className="mt-7 flex flex-wrap gap-3" aria-label="Professional profiles">
              {profileLinks.map((social) => {
                const Icon = social.icon === 'github' ? Github : Linkedin
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${person.name} on ${social.label}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-control-rule)] px-4 text-sm font-medium text-ink transition-colors duration-200 hover:border-signal hover:text-signal-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-strong"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {social.label}
                  </a>
                )
              })}
            </nav>
            <p className="mt-6 text-xs leading-relaxed text-ink-faint">
              Python · SQL · Machine learning · Five documented systems
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
