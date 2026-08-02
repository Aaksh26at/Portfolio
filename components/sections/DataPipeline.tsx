import { portfolio } from '@/data/portfolio'

export function DataPipeline() {
  return (
    <section data-world="3" aria-label="How I work" className="pb-16 sm:pb-24 lg:pb-32">
      <div className="container-page">
        <div className="observatory-panel overflow-hidden px-6 py-10 sm:px-9 sm:py-12 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="signal-label">Signal path</p>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.05em] text-ink">
                Raw input. Defensible decision.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-ink-muted">
              Reliability comes before modelling. The path stays visible from the first row of raw data to the final prediction, dashboard or API response.
            </p>
          </div>

          <ol className="relative mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-7 lg:gap-2">
            <span className="absolute left-[7%] right-[7%] top-5 hidden h-px bg-[var(--color-rule)] lg:block" aria-hidden="true" />
            {portfolio.pipeline.map((stage, index) => (
              <li key={stage} className="relative rounded-[var(--radius-control)] bg-[var(--color-paper-3)] p-4 lg:bg-transparent lg:p-0">
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-xs font-semibold text-ink">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-4 max-w-[9rem] text-sm font-medium leading-snug text-ink">{stage}</p>
                <p className="mt-2 text-[0.68rem] text-ink-muted">{index === portfolio.pipeline.length - 1 ? 'usable output' : 'verified stage'}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
