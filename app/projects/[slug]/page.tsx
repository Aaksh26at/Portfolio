import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { Badge } from '@/components/ui/Badge'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stat } from '@/components/ui/Stat'
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
          {/* Long Document: one calm reading column. Only the evidence
              plate takes a tinted surface — the chapters stay on paper. */}
          <header className="section section--hero surface surface--paper">
            <div className="container-page">
              <Reveal variant="fade-rise">
                <Link
                  href="/#projects"
                  className="link-underline inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm text-ink-muted transition-colors duration-150 hover:text-ink"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to selected work
                </Link>
              </Reveal>

              <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end lg:gap-16">
                <SectionHeading
                  as="h1"
                  title={project.title}
                  eyebrow={`Case study / ${project.year}`}
                  scale="md"
                  mark="none"
                  measure="wide"
                  reveal="mask-wipe"
                  description={project.description}
                />

                <Reveal variant="fade-rise" delay={0.12}>
                  <p className="signal-label">Primary result</p>
                  <p className="mt-3 font-display text-2xl font-bold leading-snug tracking-[var(--track-display)] text-ink">
                    {project.keyResult}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <li key={technology}>
                        <Badge tone="neutral" variant="outline">
                          {technology}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </header>

          <div className="section surface surface--wash-data">
            <div className="container-page">
              <Reveal variant="lift" amount={0.15}>
                <div className="h-56 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-rule-strong)] sm:h-80">
                  <ProjectVisual project={project} />
                </div>
              </Reveal>

              {project.metrics.length > 0 ? (
                <Reveal variant="fade-rise" delay={0.08}>
                  <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-4">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dd>
                          <Stat value={metric.value} label={metric.label} tone="data" size="md" />
                        </dd>
                        <dt className="sr-only">{metric.label}</dt>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              ) : null}
            </div>
          </div>

          <div className="section surface surface--paper">
            <div className="container-page">
              <div className="grid border-t border-[var(--color-rule-strong)] lg:grid-cols-2">
                <div className="border-b border-[var(--color-rule)] py-10 lg:border-b-0 lg:border-r lg:pr-12">
                  <SectionHeading
                    as="h2"
                    title="The problem to solve"
                    eyebrow="Challenge"
                    index={1}
                    scale="sm"
                    mark="none"
                    measure="wide"
                    description={project.problem}
                  />
                </div>
                <div className="py-10 lg:pl-12">
                  <SectionHeading
                    as="h2"
                    title="Technical direction"
                    eyebrow="Approach"
                    index={2}
                    scale="sm"
                    mark="none"
                    measure="wide"
                    description={project.approach}
                  />
                </div>
              </div>

              {project.achievements.length > 0 ? (
                <section className="mt-20">
                  <SectionHeading
                    title="Key outcomes"
                    eyebrow="Outcomes"
                    index={3}
                    scale="sm"
                    mark="none"
                    measure="wide"
                  />
                  <Reveal
                    variant="stagger"
                    as="ol"
                    className="mt-8 border-t border-[var(--color-rule-strong)]"
                  >
                    {project.achievements.map((achievement, index) => (
                      <li
                        key={achievement}
                        className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-[var(--color-rule)] py-4 text-sm leading-relaxed text-ink"
                      >
                        <span className="tnum font-mono text-[0.64rem] text-signal-strong">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {achievement}
                      </li>
                    ))}
                  </Reveal>
                </section>
              ) : null}

              <section className="mt-20">
                <SectionHeading
                  title="Process & architecture"
                  eyebrow="Process"
                  index={4}
                  scale="sm"
                  mark="none"
                  measure="wide"
                />
                <Reveal
                  variant="stagger"
                  className="mt-8 border-t border-[var(--color-rule-strong)]"
                >
                  {project.caseStudy.map((section, index) => (
                    <section
                      key={section.heading}
                      className="grid gap-3 border-b border-[var(--color-rule)] py-7 sm:grid-cols-[3rem_0.55fr_1.45fr]"
                    >
                      <span className="tnum font-mono text-[0.64rem] text-signal-strong">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-ink">
                        {section.heading}
                      </h3>
                      <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
                        {section.body}
                      </p>
                    </section>
                  ))}
                </Reveal>
              </section>

              <Reveal variant="fade-rise">
                <div className="mt-14 flex flex-wrap gap-3 border-t border-[var(--color-rule-strong)] pt-8">
                  {project.links.github ? (
                    <MagneticButton href={project.links.github} variant="ghost" external iconTrail={false}>
                      <Github className="h-4 w-4" aria-hidden="true" />
                      View code
                    </MagneticButton>
                  ) : (
                    <span className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-rule)] px-5 py-2.5 text-sm text-ink-muted">
                      <Github className="h-4 w-4" aria-hidden="true" />
                      Repository coming soon
                    </span>
                  )}
                  {project.links.demo ? (
                    <MagneticButton href={project.links.demo} variant="primary" external iconTrail={false}>
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Live demo
                    </MagneticButton>
                  ) : null}
                </div>
              </Reveal>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
