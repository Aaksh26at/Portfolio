import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { Tag } from '@/components/ui/Badge'
import { ProjectVisual } from '@/components/ui/ProjectVisual'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface PageProps {
  params: { slug: string }
}

// Pre-render a static page for each shipped project at build time.
export function generateStaticParams() {
  return portfolio.projects
    .filter((p) => p.status === 'shipped')
    .map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = portfolio.projects.find((p) => p.slug === params.slug)
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
    (p) => p.slug === params.slug && p.status === 'shipped',
  )
  if (!project) notFound()

  return (
    <>
      <Header />
      <main id="main" className="pt-28">
        <article className="container-page pb-24">
          <Link
            href="/#projects"
            className="link-underline inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to projects
          </Link>

          <header className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-accent-violet">{project.year}</span>
              <span className="text-sm text-ink-faint">·</span>
              <span className="text-sm text-ink-faint">{project.keyResult}</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-ink-muted">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </header>

          <div className="mt-10 h-56 overflow-hidden rounded-3xl sm:h-72">
            <ProjectVisual project={project} />
          </div>

          {project.metrics.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="glass rounded-2xl p-5">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <div className="font-display text-2xl font-bold text-gradient">{m.value}</div>
                    <div className="mt-1 text-xs text-ink-muted">{m.label}</div>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {/* Overview / challenge / approach */}
          <section className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-accent-cyan">
                Challenge
              </h2>
              <p className="mt-2 text-ink-muted">{project.problem}</p>
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-accent-cyan">
                Technical approach
              </h2>
              <p className="mt-2 text-ink-muted">{project.approach}</p>
            </div>
          </section>

          {/* Key achievements */}
          {project.achievements.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-xl font-bold text-ink">Key outcomes</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.achievements.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm text-ink"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-violet" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Full process */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-ink">Process &amp; architecture</h2>
            <div className="mt-6 space-y-6 border-l border-white/10 pl-6">
              {project.caseStudy.map((section) => (
                <div key={section.heading} className="relative">
                  <span
                    className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent-violet"
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-cyan">
                    {section.heading}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{section.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Links */}
          <div className="mt-12 flex flex-wrap gap-3">
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent-violet/50"
              >
                <Github className="h-4 w-4" aria-hidden="true" /> View Code
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/[0.06] px-5 py-2.5 text-sm font-medium text-ink-faint">
                <Github className="h-4 w-4" aria-hidden="true" /> Repo coming soon
              </span>
            )}
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-violet px-5 py-2.5 text-sm font-semibold text-white"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live Demo
              </a>
            ) : null}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
