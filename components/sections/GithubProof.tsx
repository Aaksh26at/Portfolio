import { Github, ArrowUpRight, FolderGit2 } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Badge'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function GithubProof() {
  const { github } = portfolio

  return (
    <section aria-label="Code and proof of work" className="section-pad">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Code & Proof of Work" title="Where the" accent="work lives." />
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-md text-ink-muted">
                Projects, experiments and learning-in-progress. Featured repositories are curated
                below — explore the full profile for everything else.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8">
                <MagneticButton href={github.profileUrl} external variant="primary">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  Explore GitHub
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              </div>
              <p className="mt-4 text-sm text-ink-faint">
                @{github.username} · github.com/{github.username}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {github.featuredRepos.map((repo, i) => {
              const hasUrl = repo.url.length > 0
              const Wrapper = hasUrl ? 'a' : 'div'
              return (
                <Reveal key={repo.name} y={20} delay={i * 0.06} className="flex">
                  <Wrapper
                    {...(hasUrl
                      ? { href: repo.url, target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="glass card-hover flex h-full flex-col rounded-2xl p-5"
                  >
                    <div className="flex items-center justify-between">
                      <FolderGit2 className="h-5 w-5 text-accent-violet" aria-hidden="true" />
                      {hasUrl ? (
                        <ArrowUpRight className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                      ) : (
                        <span className="text-[10px] font-medium text-ink-faint">Coming soon</span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-sm font-semibold text-ink">{repo.name}</h3>
                    <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-muted">
                      {repo.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {repo.tech.map((t) => (
                        <Tag key={t} className="text-[10px]">
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </Wrapper>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
