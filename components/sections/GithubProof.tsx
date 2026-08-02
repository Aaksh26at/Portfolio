import { ArrowUpRight, Github } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { Tag } from '@/components/ui/Badge'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function GithubProof() {
  const { github } = portfolio

  return (
    <section data-world="2" aria-label="Code and proof of work" className="section surface surface--paper">
      <div className="container-page grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div className="self-start lg:sticky lg:top-32">
          <span className="mb-6 block h-1 w-9 rounded-full bg-accent" aria-hidden="true" />
          <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[0.94] tracking-[-0.055em] text-ink">
            Code is the audit trail.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
            Repositories hold the implementation detail behind the project narratives—data preparation, modelling choices and delivery code.
          </p>
          <MagneticButton href={github.profileUrl} external variant="primary" className="mt-8">
            <Github className="h-4 w-4" aria-hidden="true" />
            Open GitHub
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
          <p className="mt-4 text-xs text-ink-faint">@{github.username}</p>
        </div>

        <ol className="observatory-panel overflow-hidden">
          {github.featuredRepos.map((repo) => {
            const hasUrl = repo.url.length > 0
            const body = (
              <>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-[-0.03em] text-ink">{repo.name}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{repo.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{repo.tech.map((technology) => <Tag key={technology}>{technology}</Tag>)}</div>
                </div>
                {hasUrl ? <ArrowUpRight className="h-5 w-5 text-accent" aria-hidden="true" /> : <span className="whitespace-nowrap text-xs text-ink-faint">repository soon</span>}
              </>
            )

            return (
              <li key={repo.name} className="border-b border-[var(--color-rule-2)] last:border-b-0">
                {hasUrl ? (
                  <a href={repo.url} target="_blank" rel="noopener noreferrer" className="grid min-h-40 grid-cols-[1fr_auto] gap-5 p-6 sm:p-8">{body}</a>
                ) : (
                  <div className="grid min-h-40 grid-cols-[1fr_auto] gap-5 p-6 sm:p-8">{body}</div>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
