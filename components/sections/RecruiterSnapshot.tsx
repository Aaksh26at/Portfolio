import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stat } from '@/components/ui/Stat'

export function RecruiterSnapshot() {
  const churn = portfolio.projects.find((project) => project.slug === 'customer-churn-prediction')
  const metrics = portfolio.snapshot.metrics

  return (
    // Strip: the figures sit directly on the band. Boxing them inside a
    // panel on a dark surface only muffled them.
    <section
      data-world="1"
      data-header-tone="band"
      aria-label="Recruiter snapshot"
      className="section surface surface--band"
    >
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title="Python systems, from workflow to delivery."
            eyebrow="Proof, not positioning"
            scale="sm"
            mark="none"
            measure="narrow"
          />
          <a
            href="#projects"
            className="link-underline inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink"
          >
            Inspect the work
            <ArrowUpRight className="h-4 w-4 text-signal" aria-hidden="true" />
          </a>
        </div>

        <Reveal
          variant="stagger"
          step={0.07}
          as="ul"
          className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {metrics.map((metric) => (
            <li key={metric.label}>
              <Stat value={metric.value} label={metric.label} tone="signal" size="lg" rule="top" />
            </li>
          ))}
        </Reveal>

        <p className="sr-only">{churn?.keyResult}</p>
      </div>
    </section>
  )
}
