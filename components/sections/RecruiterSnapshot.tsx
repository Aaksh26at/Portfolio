import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '@/data/portfolio'

export function RecruiterSnapshot() {
  const churn = portfolio.projects.find((project) => project.slug === 'customer-churn-prediction')
  const metrics = [
    { value: '96%', label: 'Clinical classification accuracy' },
    { value: '0.84', label: 'ROC-AUC on churn prediction' },
    { value: '<200ms', label: 'Fire-index API inference' },
    { value: '4', label: 'Documented data systems' },
  ]

  return (
    <section data-world="1" data-header-tone="band" aria-label="Recruiter snapshot" className="section surface surface--band">
      <div className="container-page">
        <div className="observatory-panel overflow-hidden">
          <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="signal-label">Proof, not positioning</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.035em] text-ink sm:text-3xl">
                Applied ML from dataset to interface.
              </h2>
            </div>
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink"
            >
              Inspect the work
              <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden="true" />
            </a>
          </div>

          <dl className="grid border-t border-[var(--color-rule-2)] sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="border-b border-[var(--color-rule-2)] px-6 py-7 sm:px-8 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <dt className="text-sm leading-snug text-ink-muted">{metric.label}</dt>
                <dd className="tnum mt-5 font-display text-4xl font-bold tracking-[-0.05em] text-ink sm:text-5xl">
                  {metric.value}
                </dd>
                <span className="mt-4 block h-1 w-8 rounded-full bg-accent" aria-hidden="true" />
              </div>
            ))}
          </dl>
          <p className="sr-only">{churn?.keyResult}</p>
        </div>
      </div>
    </section>
  )
}
