'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink, Hammer } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import type { Project } from '@/types'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Badge'
import { ProjectVisual } from '@/components/ui/ProjectVisual'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'

// Asymmetric bento spans keyed by position — never three identical cards.
const spanFor = (index: number): string => {
  const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']
  return spans[index % spans.length]
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const isBuilding = project.status === 'building'

  return (
    <article className="glass card-hover group flex h-full flex-col overflow-hidden rounded-3xl">
      <div className="relative h-48 overflow-hidden sm:h-56">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <ProjectVisual project={project} />
        </div>
        {isBuilding && (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
            <Hammer className="h-3 w-3" aria-hidden="true" /> Currently Building
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-accent-violet">{project.year}</span>
          <span className="text-xs text-ink-faint">·</span>
          <span className="text-xs text-ink-faint">{project.keyResult}</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-bold text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
          {!isBuilding ? (
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent-violet"
            >
              Case study
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <span className="text-sm font-medium text-ink-faint">Case study coming soon</span>
          )}

          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('github_click')}
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
              aria-label={`${project.title} — GitHub repository`}
            >
              <Github className="h-4 w-4" aria-hidden="true" /> Code
            </a>
          ) : null}

          {project.links.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
              aria-label={`${project.title} — live demo`}
            >
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

  const openProject = (p: Project) => {
    setSelected(p)
    track('project_view', { project: p.slug })
  }

  return (
    <section id="projects" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected Work"
          title="Practical projects across ML, data &"
          accent="applications."
          description="Practical projects combining machine learning, data analysis, APIs and interactive applications."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {portfolio.projects.map((project, i) => (
            <Reveal key={project.slug} className={cn('flex', spanFor(i))} y={24} delay={i * 0.05}>
              <ProjectCard project={project} onOpen={openProject} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
