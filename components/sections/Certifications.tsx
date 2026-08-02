import { portfolio } from '@/data/portfolio'

export function Certifications() {
  return (
    <section id="certifications" data-world="4" className="section surface surface--wash-signal">
      <div className="container-page">
        <div className="observatory-panel overflow-hidden">
          <div className="grid gap-6 px-6 py-9 sm:px-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:px-12 lg:py-12">
            <div>
              <p className="signal-label">Verified learning</p>
              <h2 className="mt-4 font-display text-[clamp(2.45rem,5vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.05em] text-ink">
                Simulations, labelled honestly.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted">
              Professional exercises and certifications are kept distinct from employment—the value is in the work performed, not a borrowed logo.
            </p>
          </div>

          <ol className="grid border-t border-[var(--color-rule-2)] lg:grid-cols-2">
            {portfolio.certifications.map((certification, index) => (
              <li
                key={certification.title}
                className="border-b border-[var(--color-rule-2)] p-6 sm:p-8 lg:[&:nth-child(odd)]:border-r"
              >
                <div className="flex items-center justify-between gap-4 text-xs text-ink-muted">
                  <span>{certification.isSimulation ? 'Job simulation' : 'Certification'}</span>
                  <span className="tnum">{certification.year}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.03em] text-ink">{certification.title}</h3>
                <p className="mt-2 text-sm font-medium text-accent">{certification.provider}</p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{certification.description}</p>
                <span className="tnum mt-6 block text-xs text-ink-faint">archive entry {String(index + 1).padStart(2, '0')}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
