import { portfolio } from '@/data/portfolio'
import { skillIcons } from '@/lib/icons'
import type { Proficiency } from '@/types'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

const levelSegments: Record<Proficiency, number> = {
  Strong: 4,
  'Working knowledge': 3,
  Familiar: 2,
  'Currently learning': 1,
}

const levelColor: Record<Proficiency, string> = {
  Strong: 'bg-accent-cyan',
  'Working knowledge': 'bg-accent-violet',
  Familiar: 'bg-accent-blue',
  'Currently learning': 'bg-accent-coral',
}

/** Honest 4-segment proficiency indicator (not a fake percentage bar). */
function LevelDots({ level }: { level: Proficiency }) {
  const filled = levelSegments[level]
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={cn('h-1.5 w-4 rounded-full', i <= filled ? levelColor[level] : 'bg-white/10')}
        />
      ))}
    </span>
  )
}

// Larger tiles for the first two categories create an asymmetric bento.
const tileSpan = (index: number) =>
  index === 0 || index === 3 ? 'lg:col-span-4' : 'lg:col-span-4'

export function Skills() {
  return (
    <section id="skills" className="section-pad border-t border-white/[0.06] bg-base-900/30">
      <div className="container-page">
        <SectionHeading
          eyebrow="Technical Capabilities"
          title="A working toolkit for"
          accent="data & intelligent systems."
          description="Grouped by how they're used day-to-day. Proficiency is shown honestly — from strong, hands-on skills to areas I'm actively learning."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {portfolio.skills.map((group, i) => {
            const Icon = skillIcons[group.icon]
            return (
              <Reveal
                key={group.title}
                className={cn('lg:col-span-4', tileSpan(i))}
                y={20}
                delay={(i % 3) * 0.05}
              >
                <div className="glass card-hover h-full rounded-3xl p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-violet/10 text-accent-violet">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-base font-semibold text-ink">{group.title}</h3>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {group.skills.map((skill) => (
                      <li key={skill.name} className="flex items-center justify-between gap-3">
                        <span className="text-sm text-ink">{skill.name}</span>
                        <span className="flex items-center gap-2">
                          <span className="hidden text-[10px] text-ink-faint sm:inline">
                            {skill.level}
                          </span>
                          <LevelDots level={skill.level} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Legend */}
        <Reveal className="mt-6" delay={0.1}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted">
            {(Object.keys(levelSegments) as Proficiency[]).map((lvl) => (
              <li key={lvl} className="flex items-center gap-2">
                <span className={cn('h-1.5 w-4 rounded-full', levelColor[lvl])} />
                {lvl}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
