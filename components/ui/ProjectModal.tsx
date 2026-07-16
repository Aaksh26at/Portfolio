'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, Github, ExternalLink } from 'lucide-react'
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

  // Focus management: remember trigger, focus dialog, restore on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
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
    <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
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
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="glass-strong relative z-10 my-4 w-full max-w-3xl rounded-3xl"
      >
        <div className="relative h-44 overflow-hidden rounded-t-3xl sm:h-56">
          <ProjectVisual project={project} />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-base-900/70 text-ink backdrop-blur transition hover:bg-base-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium text-accent-violet">{project.year}</span>
            <h2 id="project-modal-title" className="font-display text-2xl font-bold text-ink">
              {project.title}
            </h2>
          </div>
          <p className="mt-3 text-ink-muted">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          {project.metrics.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <div className="font-display text-lg font-bold text-gradient">{m.value}</div>
                    <div className="text-[11px] text-ink-muted">{m.label}</div>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6 space-y-5">
            {project.caseStudy.map((section) => (
              <div key={section.heading}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-cyan">
                  {section.heading}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent-violet/50"
              >
                <Github className="h-4 w-4" /> View Code
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/[0.06] px-5 py-2.5 text-sm font-medium text-ink-faint">
                <Github className="h-4 w-4" /> Repo coming soon
              </span>
            )}
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-violet px-5 py-2.5 text-sm font-semibold text-white"
              >
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            ) : null}
            <a
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent-cyan/50"
            >
              Full case study <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
