'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import type { Project } from '@/types'
import { Tag } from '@/components/ui/Badge'
import { ProjectVisual } from '@/components/ui/ProjectVisual'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { track } from '@/lib/analytics'

function ProjectPlate({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  return (
    <article className="observatory-panel min-h-[36rem] overflow-hidden lg:min-h-[72dvh]" data-interactive="true">
      <div className="aspect-[16/10] min-h-[18rem] overflow-hidden border-b border-[var(--color-rule-2)] lg:h-[46dvh] lg:aspect-auto">
        <ProjectVisual project={project} />
      </div>

      <div className="p-6 sm:p-8 lg:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
          <span className="tnum">System {String(index + 1).padStart(2, '0')} · {project.year}</span>
          <span className="rounded-full border border-[var(--color-rule)] px-3 py-1">{project.status}</span>
        </div>

        <div className="mt-6 grid gap-7 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div>
            <h3 className="max-w-2xl font-display text-3xl font-bold leading-[1.02] tracking-[-0.045em] text-ink sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">{project.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((technology) => <Tag key={technology}>{technology}</Tag>)}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[25rem]">
            {project.metrics.slice(0, 4).map((metric) => (
              <div key={metric.label} className="rounded-[var(--radius-control)] bg-[var(--color-paper-3)] p-3">
                <dd className="tnum font-display text-lg font-bold text-ink">{metric.value}</dd>
                <dt className="mt-1 text-[0.68rem] leading-tight text-ink-muted">{metric.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] bg-[var(--color-ink)] px-5 text-sm font-semibold text-[var(--color-paper)]"
          >
            Quick study
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <a href={`/projects/${project.slug}`} className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink-muted hover:text-ink">
            Read full case
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          {project.links.github ? (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm text-ink-muted">
              <Github className="h-4 w-4" aria-hidden="true" /> Code
            </a>
          ) : null}
          {project.links.demo ? (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm text-ink-muted">
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> Demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  const openProject = (project: Project) => {
    setSelected(project)
    track('project_view', { project: project.slug })
  }

  return (
    <section id="projects" data-world="2" className="section surface surface--wash-data">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(18rem,0.55fr)_minmax(0,1.45fr)] lg:gap-14 xl:gap-20">
        <div className="self-start lg:sticky lg:top-32">
          <span className="mb-6 block h-1 w-9 rounded-full bg-accent" aria-hidden="true" />
          <p className="signal-label">Selected systems</p>
          <h2 className="mt-4 font-display text-[clamp(3rem,6vw,5.8rem)] font-bold leading-[0.92] tracking-[-0.06em] text-ink">
            Four systems. Four kinds of signal.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
            Each chapter moves from an unreliable input to a decision someone can use—classification, forecasting, retention or document matching.
          </p>
          <div className="mt-9 flex items-center gap-5">
            <span className="tnum font-display text-4xl font-bold text-ink">04</span>
            <span className="max-w-[10rem] text-xs leading-relaxed text-ink-muted">end-to-end project narratives</span>
          </div>
        </div>

        <div className="min-w-0 space-y-8 sm:space-y-12">
          {portfolio.projects.map((project, index) => (
            <ProjectPlate key={project.slug} project={project} index={index} onOpen={openProject} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? <ProjectModal project={selected} onClose={() => setSelected(null)} /> : null}
      </AnimatePresence>
    </section>
  )
}
