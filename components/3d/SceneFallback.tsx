/** Pure-CSS stand-in for the 3D scene. Shown while the canvas loads, when
 *  WebGL is unavailable, or when the user prefers reduced motion. */
export function SceneFallback() {
  const labels = ['Python', 'SQL', 'AI', 'ML', 'Analytics']
  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-hidden="true">
      <div className="relative h-64 w-64 sm:h-80 sm:w-80">
        {/* glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 via-accent-violet/20 to-accent-cyan/20 blur-3xl" />
        {/* core */}
        <div className="absolute inset-8 rounded-full border border-white/10 bg-gradient-to-br from-base-600/60 to-base-900/60 backdrop-blur-sm motion-safe:animate-float" />
        <div className="absolute inset-16 rounded-full border border-accent-violet/30" />
        <div className="absolute inset-24 rounded-full bg-gradient-to-br from-accent to-accent-violet opacity-60 blur-md" />
        {/* orbiting labels */}
        {labels.map((label, i) => {
          const angle = (i / labels.length) * Math.PI * 2
          const r = 46
          const x = 50 + Math.cos(angle) * r
          const y = 50 + Math.sin(angle) * r
          return (
            <span
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-base-800/80 px-2.5 py-1 text-[10px] font-medium text-ink-muted backdrop-blur"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {label}
            </span>
          )
        })}
      </div>
    </div>
  )
}
