import { Compass } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { Reveal } from '@/components/ui/Reveal'

export function CurrentlyLearning() {
  return (
    <section aria-label="Currently learning" className="section-pad !pt-0">
      <div className="container-page">
        <Reveal>
          <div className="glass-strong overflow-hidden rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-accent-cyan" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
                Now — currently learning
              </span>
            </div>
            <h3 className="mt-3 max-w-2xl font-display text-2xl font-bold text-ink sm:text-3xl">
              Deepening AI/ML systems, Python, SQL, data engineering and{' '}
              <span className="text-gradient">production-ready ML workflows.</span>
            </h3>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {portfolio.currentlyLearning.map((item, i) => (
                <div
                  key={item.title}
                  className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <span className="font-display text-xs font-bold text-accent-violet">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-2 text-sm font-semibold text-ink">{item.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
