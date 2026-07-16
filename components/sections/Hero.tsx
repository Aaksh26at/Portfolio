import { ArrowRight, MapPin } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { Badge } from '@/components/ui/Badge'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ResumeButton } from '@/components/ui/ResumeButton'
import { ProfilePortrait } from '@/components/ui/ProfilePortrait'
import { IntelligenceCore } from '@/components/3d/IntelligenceCore'
import { Reveal } from '@/components/ui/Reveal'

export function Hero() {
  const { hero, person } = portfolio

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-grid"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 bg-radial-glow" aria-hidden="true" />
      <div className="container-page relative grid min-h-screen grid-cols-1 items-center gap-12 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-24">
        {/* ---- Left: copy ---- */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <Badge live className="border-emerald-400/20 text-emerald-200/90">
              {hero.availability}
            </Badge>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {hero.heading}{' '}
              <span className="text-gradient">{hero.headingAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {hero.paragraph}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href="#projects" variant="primary">
                View My Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <ResumeButton variant="ghost" />
              <MagneticButton href="#contact" variant="soft" className="px-5">
                Let&apos;s Connect
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-faint">
              {hero.trustIndicators.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-violet" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---- Right: 3D core + portrait + floating metrics ---- */}
        <div className="relative order-1 mx-auto aspect-square w-full max-w-[440px] lg:order-2">
          {/* Ambient 3D scene sits behind the portrait, offset off the face */}
          <IntelligenceCore className="absolute inset-0 -z-0 scale-[1.35] sm:scale-125" />

          {/* Portrait */}
          <div className="absolute inset-x-8 bottom-2 top-10 z-10 flex items-end justify-center sm:inset-x-12">
            <ProfilePortrait
              priority
              className="w-full max-w-[280px] shadow-2xl shadow-black/40"
              objectPosition="center 25%"
            />
          </div>

          {/* Floating metric cards */}
          <div className="pointer-events-none absolute -left-2 top-6 z-20 motion-safe:animate-float sm:left-0">
            <div className="glass rounded-2xl px-4 py-3">
              <div className="font-display text-xl font-bold text-gradient">
                {hero.floatingMetrics[0]?.value}
              </div>
              <div className="text-[10px] text-ink-muted">{hero.floatingMetrics[0]?.label}</div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute -right-1 top-1/3 z-20 motion-safe:animate-float sm:right-0"
            style={{ animationDelay: '1.5s' }}
          >
            <div className="glass rounded-2xl px-4 py-3">
              <div className="font-display text-xl font-bold text-gradient">
                {hero.floatingMetrics[1]?.value}
              </div>
              <div className="text-[10px] text-ink-muted">{hero.floatingMetrics[1]?.label}</div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute bottom-6 right-2 z-20 motion-safe:animate-float sm:right-6"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3">
              <MapPin className="h-4 w-4 text-accent-cyan" aria-hidden="true" />
              <span className="text-[11px] font-medium text-ink">{person.location.split(',')[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
