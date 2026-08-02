import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { Tag } from '@/components/ui/Badge'
import { ProjectVisual } from '@/components/ui/ProjectVisual'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return portfolio.projects
    .filter((project) => project.status === 'shipped')
    .map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = portfolio.projects.find((item) => item.slug === params.slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — Aakshat Agarwal`,
      description: project.description,
    },
  }
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const project = portfolio.projects.find(
    (item) => item.slug === params.slug && item.status === 'shipped',
  )
  if (!project) notFound()

  return (
    <>
      <Header />
      <main id="main">
        <article data-world="2">
          <header>
            <div className="container-page pb-32 pt-24 lg:pb-20 lg:pt-14">
              <Link
                href="/#projects"
                className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm text-ink-muted transition-colors duration-150 hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to selected work
              </Link>

              <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end lg:gap-16">
                <div>
                  <p className="font-mono text-[0.67rem] uppercase tracking-[0.12em] text-accent">
                    Case study / {project.year}
                  </p>
                  <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-ink sm:text-6xl">
                    {project.title}
                  </h1>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                    {project.description}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink-muted">
                    Primary result
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold leading-snug tracking-[-0.025em] text-ink">
                    {project.keyResult}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <Tag
                        key={technology}
                        className="!border-[var(--color-rule)] !text-ink-muted"
                      >
                        {technology}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="container-page py-12 sm:py-16">
            <div className="h-56 overflow-hidden border border-[var(--color-rule-strong)] sm:h-80">
              <ProjectVisual project={project} />
            </div>

            {project.metrics.length > 0 ? (
              <dl className="mt-8 grid border-t border-[var(--color-rule-strong)] sm:grid-cols-4">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="border-b border-[var(--color-rule)] py-5 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
                  >
                    <dd className="font-display text-2xl font-semibold text-accent">{metric.value}</dd>
                    <dt className="mt-1 text-xs text-ink-muted">{metric.label}</dt>
                  </div>
                ))}
              </dl>
            ) : null}

            <section className="mt-16 grid border-t border-[var(--color-rule-strong)] lg:grid-cols-2">
              <div className="border-b border-[var(--color-rule)] py-8 lg:border-b-0 lg:border-r lg:pr-12">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-accent">
                  01 / Challenge
                </p>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.025em] text-ink">
                  The problem to solve
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">{project.problem}</p>
              </div>
              <div className="py-8 lg:pl-12">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-accent">
                  02 / Approach
                </p>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.025em] text-ink">
                  Technical direction
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">{project.approach}</p>
              </div>
            </section>

            {project.achievements.length > 0 ? (
              <section className="mt-16">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-accent">
                  03 / Outcomes
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-ink">
                  Key outcomes
                </h2>
                <ol className="mt-7 border-t border-[var(--color-rule-strong)]">
                  {project.achievements.map((achievement, index) => (
                    <li
                      key={achievement}
                      className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-[var(--color-rule)] py-4 text-sm leading-relaxed text-ink"
                    >
                      <span className="font-mono text-[0.64rem] text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {achievement}
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            <section className="mt-16">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-accent">
                04 / Process
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-ink">
                Process &amp; architecture
              </h2>
              <div className="mt-7 border-t border-[var(--color-rule-strong)]">
                {project.caseStudy.map((section, index) => (
                  <section
                    key={section.heading}
                    className="grid gap-3 border-b border-[var(--color-rule)] py-7 sm:grid-cols-[3rem_0.55fr_1.45fr]"
                  >
                    <span className="font-mono text-[0.64rem] text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-ink">{section.heading}</h3>
                    <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">{section.body}</p>
                  </section>
                ))}
              </div>
            </section>

            <div className="mt-12 flex flex-wrap gap-3 border-t border-[var(--color-rule-strong)] pt-7">
              {project.links.github ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-rule-strong)] px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-150 hover:border-ink"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  View code
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-rule)] px-5 py-2.5 text-sm text-ink-muted">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  Repository coming soon
                </span>
              )}
              {project.links.demo ? (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] bg-base-900 px-5 py-2.5 text-sm font-semibold text-[var(--color-night-ink)]"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live demo
                </a>
              ) : null}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
