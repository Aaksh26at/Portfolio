import { portfolio } from '@/data/portfolio'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Skills() {
  return (
    // The one section that keeps the 0.72/1.28 split-head — a matrix
    // genuinely wants a wide right column.
    <section id="skills" data-world="3" className="section surface surface--paper">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <SectionHeading
            title="The capability matrix."
            index={3}
            scale="lg"
            mark="line"
            measure="wide"
          />
          <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            A practical inventory of tools used to inspect data, build models, expose results and
            keep the delivery path reliable.
          </p>
        </div>

        <Panel
          tone="outline"
          clip
          className="mt-12"
          role="table"
          aria-label="Technical capability matrix"
        >
          <div
            className="hidden grid-cols-[minmax(14rem,0.7fr)_5rem_minmax(0,1.3fr)] gap-6 border-b border-[var(--color-rule)] px-7 py-4 text-xs text-ink-muted md:grid"
            role="row"
          >
            <span role="columnheader">Domain</span>
            <span role="columnheader">Tools</span>
            <span role="columnheader">Operating range</span>
          </div>

          <Reveal variant="stagger" step={0.05} amount={0.1}>
            {portfolio.skills.map((group) => {
              const strongCount = group.skills.filter((skill) => skill.level === 'Strong').length
              return (
                <div
                  key={group.title}
                  className="grid gap-5 border-b border-[var(--color-rule-2)] px-6 py-7 last:border-b-0 md:grid-cols-[minmax(14rem,0.7fr)_5rem_minmax(0,1.3fr)] md:items-start md:gap-6 md:px-7"
                  role="row"
                >
                  <div role="cell">
                    <h3 className="font-display text-xl font-bold text-ink">{group.title}</h3>
                    <p className="mt-2 text-xs text-ink-muted">
                      {strongCount > 0 ? `${strongCount} strong-use tools` : 'Developing range'}
                    </p>
                  </div>
                  <span className="tnum font-mono text-2xl font-semibold text-signal-strong" role="cell">
                    {String(group.skills.length).padStart(2, '0')}
                  </span>
                  <ul className="flex flex-wrap gap-2" role="cell">
                    {group.skills.map((skill) => (
                      <li key={skill.name}>
                        <Badge
                          tone={skill.level === 'Strong' ? 'signal' : 'neutral'}
                          variant={skill.level === 'Strong' ? 'soft' : 'outline'}
                          size="md"
                          title={skill.level}
                        >
                          {skill.name}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </Reveal>
        </Panel>
      </div>
    </section>
  )
}
