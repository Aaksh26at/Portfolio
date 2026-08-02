import { portfolio } from '@/data/portfolio'

export function Skills() {
  return (
    <section id="skills" data-world="3" className="section-pad">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <span className="mb-6 block h-1 w-9 rounded-full bg-accent" aria-hidden="true" />
            <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[0.94] tracking-[-0.055em] text-ink">
              The capability matrix.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            A practical inventory of tools used to inspect data, build models, expose results and keep the delivery path reliable.
          </p>
        </div>

        <div className="observatory-panel mt-12 overflow-hidden" role="table" aria-label="Technical capability matrix">
          <div className="hidden grid-cols-[minmax(14rem,0.7fr)_5rem_minmax(0,1.3fr)] gap-6 border-b border-[var(--color-rule)] px-7 py-4 text-xs text-ink-muted md:grid" role="row">
            <span role="columnheader">Domain</span>
            <span role="columnheader">Tools</span>
            <span role="columnheader">Operating range</span>
          </div>
          {portfolio.skills.map((group) => {
            const strongCount = group.skills.filter((skill) => skill.level === 'Strong').length
            return (
              <div
                key={group.title}
                className="grid gap-5 border-b border-[var(--color-rule-2)] px-6 py-7 last:border-b-0 md:grid-cols-[minmax(14rem,0.7fr)_5rem_minmax(0,1.3fr)] md:items-start md:gap-6 md:px-7"
                role="row"
              >
                <div role="cell">
                  <h3 className="font-display text-xl font-bold tracking-[-0.03em] text-ink">{group.title}</h3>
                  <p className="mt-2 text-xs text-ink-muted">{strongCount > 0 ? `${strongCount} strong-use tools` : 'Developing range'}</p>
                </div>
                <span className="tnum font-display text-3xl font-bold text-accent" role="cell">{String(group.skills.length).padStart(2, '0')}</span>
                <ul className="flex flex-wrap gap-2" role="cell">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="group rounded-[var(--radius-pill)] border border-[var(--color-rule)] bg-[var(--color-paper-3)] px-3 py-2 text-sm text-ink-muted"
                      title={skill.level}
                    >
                      <span className="text-ink">{skill.name}</span>
                      <span className="ml-2 text-[0.68rem] text-ink-faint">{skill.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
