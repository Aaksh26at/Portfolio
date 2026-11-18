'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import type { Project } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { IntelligenceMap } from '@/components/ui/IntelligenceMap'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Panel } from '@/components/ui/Panel'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stat } from '@/components/ui/Stat'
import { ProjectVisual } from '@/components/ui/ProjectVisual'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { track } from '@/lib/analytics'

function ProjectPlate({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (project: Project) => void
}) {
  return (
    <Reveal variant="lift" delay={index * 0.05} amount={0.15}>
      <Panel
        as="article"
        tone="raised"
        interactive
        clip
        className="min-h-[36rem] lg:min-h-[72dvh]"
      >
        <div className="aspect-[16/10] min-h-[18rem] overflow-hidden border-b border-[var(--color-rule-2)] lg:aspect-auto lg:h-[46dvh]">
          <ProjectVisual project={project} />
        </div>

        <div className="p-6 sm:p-8 lg:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
            <span className="tnum font-mono">
              System {String(index + 1).padStart(2, '0')} · {project.year}
            </span>
            <Badge tone="data" variant="soft">
              {project.status}
            </Badge>
          </div>

          <div className="mt-6 grid gap-7 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
            <div>
              <h3 className="max-w-2xl font-display text-3xl font-bold leading-[1.02] text-ink sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                {project.tagline}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.technologies.slice(0, 5).map((technology) => (
                  <li key={technology}>
                    <Badge tone="neutral" variant="outline">
                      {technology}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 xl:w-[25rem]">
              {project.metrics.slice(0, 4).map((metric) => (
                <div key={metric.label}>
                  <dd>
                    <Stat
                      value={metric.value}
                      label={metric.label}
                      tone="data"
                      size="sm"
                      rule="top"
                    />
                  </dd>
                  <dt className="sr-only">{metric.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <MagneticButton onClick={() => onOpen(project)} variant="primary" size="sm">
              Quick study
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
            <a
              href={`/projects/${project.slug}`}
              className="link-underline inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink-muted hover:text-ink"
            >
              Read full case
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm text-ink-muted hover:text-ink"
              >
                <Github className="h-4 w-4" aria-hidden="true" /> Code
              </a>
            ) : null}
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm text-ink-muted hover:text-ink"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" /> {project.links.demoLabel || 'Demo'}
              </a>
            ) : null}
            {!project.links.github && project.links.sourceLabel ? <span className="text-xs text-ink-muted">{project.links.sourceLabel}</span> : null}
          </div>
        </div>
      </Panel>
    </Reveal>
  )
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const featured = portfolio.projects.filter((project) => project.featured)
  const otherProjects = portfolio.projects.filter((project) => !project.featured)

  const openProject = (project: Project) => {
    setSelected(project)
    track('project_view', { project: project.slug })
  }

  return (
    // The one section that keeps the sticky rail — four tall plates
    // genuinely justify it. Everywhere else it was repetition.
    <section id="projects" data-world="2" className="section surface surface--wash-data">
      <div className="container-page">
        <Reveal variant="fade-rise">
          <IntelligenceMap />
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(18rem,0.55fr)_minmax(0,1.45fr)] lg:gap-14 xl:gap-20">
          <div className="self-start lg:sticky lg:top-32">
            <SectionHeading
              title="Real workflows. Working software."
              eyebrow="Selected systems"
              index={2}
              scale="lg"
              measure="wide"
              description="Accounting operations, a deployed AI agent, document automation and customer analytics. Each case study explains the implementation, the evidence and its limits."
            />
            <div className="mt-9">
              <Stat
                value={String(featured.length).padStart(2, '0')}
                label="featured project case studies"
                tone="data"
                size="md"
                rule="top"
              />
            </div>
          </div>

          <div className="min-w-0 space-y-8 sm:space-y-12">
            {featured.map((project, index) => (
              <ProjectPlate
                key={project.slug}
                project={project}
                index={index}
                onOpen={openProject}
              />
            ))}
          </div>
        </div>
        {otherProjects.length ? (
          <div className="mt-16 border-t border-[var(--color-rule)] pt-8">
            <h3 className="font-display text-2xl font-bold text-ink">More experiments & earlier work</h3>
            <p className="mt-3 text-sm text-ink-muted">Earlier case studies stay available, with their original evaluation context.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {otherProjects.map((project) => (
                <Panel key={project.slug} tone="outline" pad="sm">
                  <a href={`/projects/${project.slug}`} className="group block min-h-11">
                    <span className="font-display text-lg font-semibold text-ink">{project.title}</span>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">{project.tagline}</p>
                    <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink">Read case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
                  </a>
                </Panel>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {selected ? <ProjectModal project={selected} onClose={() => setSelected(null)} /> : null}
      </AnimatePresence>
    </section>
  )
}
