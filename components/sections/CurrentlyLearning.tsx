import { portfolio } from '@/data/portfolio'
import { Panel } from '@/components/ui/Panel'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

// The asymmetric mosaic: 5/7 then 7/5, so the grid never settles into
// four equal cards. Kept as a lookup rather than the inline template
// literal that previously computed it.
const SPAN = ['xl:col-span-5', 'xl:col-span-7', 'xl:col-span-7', 'xl:col-span-5']

export function CurrentlyLearning() {
  return (
    <section data-world="4" aria-label="Currently learning" className="section surface surface--inset">
      <div className="container-page">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title="What is being sharpened now."
            eyebrow="Live learning queue"
            scale="md"
            mark="none"
            measure="wide"
            titleClassName="max-w-4xl"
          />
          <span className="flex shrink-0 items-center gap-2 text-sm text-ink-muted">
            <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            active curriculum
          </span>
        </div>

        <Reveal
          variant="stagger"
          step={0.08}
          as="ol"
          className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-12"
        >
          {portfolio.currentlyLearning.map((item, index) => (
            <li key={item.title} className={SPAN[index % SPAN.length]}>
              <Panel
                tone="outline"
                pad="md"
                interactive
                className={index % 3 === 0 ? 'h-full min-h-64' : 'h-full min-h-52'}
              >
                <span className="tnum font-mono text-2xl font-semibold text-signal-strong">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-10 font-display text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
              </Panel>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
