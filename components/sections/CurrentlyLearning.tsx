import { portfolio } from '@/data/portfolio'

export function CurrentlyLearning() {
  return (
    <section data-world="4" aria-label="Currently learning" className="pb-16 sm:pb-24 lg:pb-32">
      <div className="container-page">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="signal-label">Live learning queue</p>
            <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.7rem,6vw,5.3rem)] font-bold leading-[0.94] tracking-[-0.055em] text-ink">
              What is being sharpened now.
            </h2>
          </div>
          <span className="flex items-center gap-2 text-sm text-ink-muted">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            active curriculum
          </span>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-12">
          {portfolio.currentlyLearning.map((item, index) => (
            <li
              key={item.title}
              className={`observatory-panel p-6 sm:p-7 xl:col-span-6 ${index % 3 === 0 ? 'min-h-72' : 'min-h-56'} ${index === 0 || index === 3 ? 'xl:col-span-5' : ''} ${index === 1 || index === 2 ? 'xl:col-span-7' : ''}`}
              data-interactive="true"
            >
              <span className="tnum font-display text-4xl font-bold text-accent">0{index + 1}</span>
              <h3 className="mt-14 font-display text-xl font-bold tracking-[-0.03em] text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
