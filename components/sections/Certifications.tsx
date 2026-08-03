import { portfolio } from '@/data/portfolio'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Certifications() {
  return (
    // Ledger on the amber wash: rows separated by rules only. The
    // wrapping panel was redundant once the section itself is a surface.
    <section id="certifications" data-world="4" className="section surface surface--wash-signal">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading
            title="Simulations, labelled honestly."
            eyebrow="Verified learning"
            scale="md"
            mark="line"
            measure="wide"
          />
          <p className="max-w-xl text-base leading-relaxed text-ink-muted">
            Professional exercises and certifications are kept distinct from employment—the value is
            in the work performed, not a borrowed logo.
          </p>
        </div>

        <Reveal
          variant="stagger"
          step={0.05}
          as="ol"
          className="mt-14 border-t border-[var(--color-rule)]"
        >
          {portfolio.certifications.map((certification, index) => (
            <li
              key={certification.title}
              className="grid gap-4 border-b border-[var(--color-rule)] py-8 md:grid-cols-[minmax(0,1fr)_12rem] md:gap-10"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    tone={certification.isSimulation ? 'neutral' : 'signal'}
                    variant={certification.isSimulation ? 'outline' : 'soft'}
                  >
                    {certification.isSimulation ? 'Job simulation' : 'Certification'}
                  </Badge>
                  <span className="tnum font-mono text-xs text-ink-muted">
                    {certification.year}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink sm:text-2xl">
                  {certification.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-signal-strong">
                  {certification.provider}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
                  {certification.description}
                </p>
              </div>
              <span className="tnum font-mono text-xs text-ink-faint md:text-right">
                archive entry {String(index + 1).padStart(2, '0')}
              </span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
