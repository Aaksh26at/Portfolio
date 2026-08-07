import { ArrowUpRight, Github } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { Badge } from '@/components/ui/Badge'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Panel } from '@/components/ui/Panel'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function GithubProof() {
  const { github } = portfolio

  return (
    // Duo: two equal-weight columns, no sticky rail. Repo rows are flush
    // panels that shift on hover rather than another bordered card stack.
    <section data-world="2" aria-label="Code and proof of work" className="section surface surface--paper">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            title="Code is the audit trail."
            index={6}
            scale="lg"
            measure="wide"
            description="Repositories hold the implementation detail behind the project narratives—data preparation, modelling choices and delivery code."
          />
          <div className="mt-8">
            <MagneticButton href={github.profileUrl} external variant="primary">
              <Github className="h-4 w-4" aria-hidden="true" />
              Open GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
            <p className="mt-4 font-mono text-xs text-ink-faint">@{github.username}</p>
          </div>
        </div>

        <ol className="border-t border-[var(--color-rule)]">
          {github.featuredRepos.map((repo, index) => {
            const hasUrl = repo.url.length > 0
            const body = (
              <>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">{repo.name}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                    {repo.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {repo.tech.map((technology) => (
                      <li key={technology}>
                        <Badge tone="neutral" variant="outline">
                          {technology}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
                {hasUrl ? (
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-signal-strong transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="whitespace-nowrap text-xs text-ink-faint">repository soon</span>
                )}
              </>
            )

            return (
              <Reveal
                key={repo.name}
                variant="lift"
                delay={index * 0.05}
                as="li"
                className="border-b border-[var(--color-rule)]"
              >
                <Panel tone="flush" interactive={hasUrl}>
                  {hasUrl ? (
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-[1fr_auto] gap-5 py-7 transition-transform duration-200 hover:translate-x-1"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="grid grid-cols-[1fr_auto] gap-5 py-7">{body}</div>
                  )}
                </Panel>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
