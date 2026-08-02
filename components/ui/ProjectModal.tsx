'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import type { Project } from '@/types'
import { Tag } from './Badge'
import { ProjectVisual } from './ProjectVisual'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[400] flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <motion.div
        className="fixed inset-0 bg-[var(--color-overlay)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 my-2 max-h-[calc(100dvh-2rem)] w-full max-w-4xl overflow-y-auto rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] shadow-[var(--shadow-card)]"
      >
        <div className="relative h-44 border-b border-[var(--color-rule-strong)] sm:h-56">
          <ProjectVisual project={project} />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-ink transition-colors duration-200 hover:border-[var(--color-muted)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-accent">
            {project.year} / Quick case study
          </p>
          <h2
            id="project-modal-title"
            className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-ink"
          >
            {project.title}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((technology) => <Tag key={technology}>{technology}</Tag>)}
          </div>

          {project.metrics.length > 0 ? (
            <dl className="mt-7 grid border-t border-[var(--color-rule-strong)] sm:grid-cols-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="border-b border-[var(--color-rule)] py-4 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0"
                >
                  <dd className="font-display text-xl font-semibold text-accent">{metric.value}</dd>
                  <dt className="mt-1 text-[0.68rem] text-ink-muted">{metric.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-8 border-t border-[var(--color-rule-strong)]">
            {project.caseStudy.map((section, index) => (
              <section
                key={section.heading}
                className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-[var(--color-rule)] py-5"
              >
                <span className="font-mono text-[0.63rem] text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{section.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{section.body}</p>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-rule-strong)] px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
              >
                <Github className="h-4 w-4" />
                View code
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-rule)] px-5 py-2.5 text-sm text-ink-muted">
                <Github className="h-4 w-4" />
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
                <ExternalLink className="h-4 w-4" />
                Live demo
              </a>
            ) : null}
            <a
              href={`/projects/${project.slug}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-rule-strong)] px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
            >
              Full case study
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
