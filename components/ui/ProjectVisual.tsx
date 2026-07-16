import type { Project } from '@/types'

const accentMap: Record<Project['accent'], { from: string; to: string; text: string }> = {
  violet: { from: 'from-accent-violet/30', to: 'to-accent/10', text: 'text-accent-violet' },
  cyan: { from: 'from-accent-cyan/30', to: 'to-accent-blue/10', text: 'text-accent-cyan' },
  blue: { from: 'from-accent-blue/30', to: 'to-accent/10', text: 'text-accent-blue' },
  coral: { from: 'from-accent-coral/30', to: 'to-accent-violet/10', text: 'text-accent-coral' },
}

/** A clearly-labelled CONCEPTUAL interface mockup built from CSS/components.
 *  Never presented as a real screenshot of the deployed app. */
export function ProjectVisual({ project }: { project: Project }) {
  const a = accentMap[project.accent]

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${a.from} ${a.to}`}>
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <span className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-base-900/70 px-2 py-0.5 text-[10px] font-medium text-ink-faint backdrop-blur">
        Conceptual preview
      </span>

      <div className="relative flex h-full flex-col justify-center gap-3 p-6">
        {project.slug === 'breast-cancer-prediction' && (
          <>
            <div className="flex items-end gap-1.5" aria-hidden="true">
              {[40, 65, 45, 80, 55, 92, 70, 96].map((h, i) => (
                <div
                  key={i}
                  className="w-3 rounded-t bg-white/70"
                  style={{ height: `${h * 0.7}px`, opacity: 0.35 + i * 0.08 }}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="rounded-lg border border-white/10 bg-base-900/50 px-3 py-2 backdrop-blur">
                <div className={`font-display text-2xl font-bold ${a.text}`}>96%</div>
                <div className="text-[10px] text-ink-muted">Accuracy</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-base-900/50 px-3 py-2 backdrop-blur">
                <div className="font-display text-2xl font-bold text-ink">30</div>
                <div className="text-[10px] text-ink-muted">Attributes</div>
              </div>
            </div>
          </>
        )}

        {project.slug === 'fire-weather-index' && (
          <>
            <div className="grid grid-cols-2 gap-2" aria-hidden="true">
              {['Temp', 'Humidity', 'Wind', 'Rain'].map((kpi) => (
                <div key={kpi} className="rounded-lg border border-white/10 bg-base-900/50 px-3 py-2 backdrop-blur">
                  <div className="text-[10px] text-ink-muted">{kpi}</div>
                  <div className="h-1.5 w-full rounded-full bg-white/10">
                    <div className={`h-1.5 rounded-full bg-current ${a.text}`} style={{ width: '60%' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-1 self-start rounded-lg border border-white/10 bg-base-900/50 px-3 py-2 backdrop-blur">
              <div className={`font-display text-xl font-bold ${a.text}`}>&lt;200ms</div>
              <div className="text-[10px] text-ink-muted">REST inference</div>
            </div>
          </>
        )}

        {project.slug !== 'breast-cancer-prediction' && project.slug !== 'fire-weather-index' && (
          <div className="flex flex-col gap-2" aria-hidden="true">
            <div className="h-2 w-2/3 rounded-full bg-white/30" />
            <div className="h-2 w-1/2 rounded-full bg-white/20" />
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-10 rounded-lg border border-white/10 bg-base-900/40" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
