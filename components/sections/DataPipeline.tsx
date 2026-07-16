'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** Scroll-animated representation of Aakshat's working process.
 *  Stages light up sequentially with a travelling data pulse. */
export function DataPipeline() {
  const reduce = useReducedMotion()
  const stages = portfolio.pipeline

  return (
    <section aria-label="How I work" className="section-pad !py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="How I work"
          title="From raw data to"
          accent="a real decision."
          align="center"
        />

        <div className="mt-12 overflow-x-auto pb-4">
          <ol className="flex min-w-max items-center justify-center gap-2 sm:gap-3">
            {stages.map((stage, i) => (
              <li key={stage} className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 12 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                  className="group relative flex flex-col items-center"
                >
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] sm:h-16 sm:w-16">
                    <span className="font-display text-sm font-bold text-gradient">{i + 1}</span>
                    {!reduce && (
                      <motion.span
                        className="absolute inset-0 rounded-2xl ring-1 ring-accent-violet/50"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: [0, 1, 0] }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.6, delay: i * 0.12, repeat: Infinity, repeatDelay: stages.length * 0.2 }}
                      />
                    )}
                  </span>
                  <span className="mt-2 max-w-[80px] text-center text-[11px] font-medium leading-tight text-ink-muted sm:text-xs">
                    {stage}
                  </span>
                </motion.div>

                {i < stages.length - 1 && (
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>

        <p className="mx-auto mt-6 max-w-lg text-center text-sm text-ink-faint">
          A simple, repeatable flow behind every project — clean the data, understand it, model it,
          then ship the insight through an API or dashboard.
        </p>
      </div>
    </section>
  )
}
