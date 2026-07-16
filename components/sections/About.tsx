import { portfolio } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { ProfilePortrait } from '@/components/ui/ProfilePortrait'

export function About() {
  const { about } = portfolio

  return (
    <section id="about" className="section-pad">
      <div className="container-page">
        <SectionHeading eyebrow="About" title="Analytical thinking, meets" accent="software craft." />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Portrait — used here at a different size/crop than the hero */}
          <Reveal className="order-1 mx-auto w-full max-w-xs lg:order-1 lg:max-w-sm">
            <div className="relative">
              <div
                className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/20 via-accent-violet/10 to-accent-cyan/20 blur-2xl"
                aria-hidden="true"
              />
              <ProfilePortrait
                className="rounded-[1.75rem]"
                rounded="rounded-[1.75rem]"
                objectPosition="center 20%"
                sizes="(max-width: 1024px) 60vw, 380px"
              />
            </div>
          </Reveal>

          <div className="order-2">
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {about.personalDetails.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-ink"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan" aria-hidden="true" />
                    {detail}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
