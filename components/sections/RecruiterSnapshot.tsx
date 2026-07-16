import { CheckCircle2, Sparkles } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { Reveal } from '@/components/ui/Reveal'
import { ResumeButton } from '@/components/ui/ResumeButton'
import { Tag } from '@/components/ui/Badge'

export function RecruiterSnapshot() {
  const { snapshot } = portfolio

  return (
    <section aria-label="Recruiter snapshot" className="relative border-y border-white/[0.06] bg-base-900/40">
      <div className="container-page section-pad !py-16">
        <Reveal>
          <div className="mb-8 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent-violet" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
              Recruiter snapshot — the 15-second version
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Roles */}
          <Reveal className="lg:col-span-4" y={16}>
            <div className="glass card-hover h-full rounded-3xl p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Open to roles
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {snapshot.roles.map((role) => (
                  <li key={role}>
                    <Tag className="text-ink">{role}</Tag>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ResumeButton variant="primary" className="w-full" />
              </div>
            </div>
          </Reveal>

          {/* Strengths */}
          <Reveal className="lg:col-span-4" y={16} delay={0.05}>
            <div className="glass card-hover h-full rounded-3xl p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Core strengths
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {snapshot.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Metrics */}
          <Reveal className="lg:col-span-4" y={16} delay={0.1}>
            <div className="glass card-hover h-full rounded-3xl p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Proof in numbers
              </h3>
              <dl className="mt-4 grid grid-cols-2 gap-4">
                {snapshot.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <div className="font-display text-2xl font-bold text-gradient">{m.value}</div>
                      <div className="mt-0.5 text-xs leading-snug text-ink-muted">{m.label}</div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
