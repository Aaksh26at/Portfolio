import type { Project } from '@/types'

const pointsA = [[68, 150], [92, 116], [118, 166], [145, 132], [165, 92], [202, 144], [226, 112]]
const pointsB = [[340, 110], [374, 138], [402, 90], [432, 154], [466, 118], [490, 78], [518, 134]]

function CancerVisual() {
  return (
    <svg viewBox="0 0 620 330" className="project-visual__plot h-full w-full" role="img" aria-label="Two diagnostic feature clusters separated by a classification boundary">
      <path d="M300 46 C268 104 330 196 288 286" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="7 9" />
      {pointsA.map(([x, y], index) => <circle key={`a-${index}`} cx={x} cy={y} r={8 + (index % 3) * 2} fill="var(--color-paper-3)" stroke="var(--color-muted)" />)}
      {pointsB.map(([x, y], index) => <circle key={`b-${index}`} cx={x} cy={y} r={8 + (index % 3) * 2} fill="var(--color-accent-soft)" stroke="var(--color-accent)" />)}
      <text x="62" y="286" fill="var(--color-muted)" fontSize="12" fontFamily="var(--font-body)">BENIGN CLUSTER</text>
      <text x="402" y="286" fill="var(--color-accent)" fontSize="12" fontFamily="var(--font-body)">MALIGNANT CLUSTER</text>
      <text x="300" y="310" textAnchor="middle" fill="var(--color-ink-2)" fontSize="12" fontFamily="var(--font-body)">30 ATTRIBUTES · 569 SAMPLES</text>
    </svg>
  )
}

function FireVisual() {
  return (
    <svg viewBox="0 0 620 330" className="project-visual__plot h-full w-full" role="img" aria-label="Fire weather inputs flowing into a risk index gauge">
      <g fill="none" stroke="var(--color-rule)" strokeWidth="1.5">
        <path d="M72 76 H248" /><path d="M72 132 H248" /><path d="M72 188 H248" /><path d="M72 244 H248" />
      </g>
      {['TEMPERATURE', 'HUMIDITY', 'WIND', 'RAINFALL'].map((label, index) => (
        <g key={label}>
          <circle cx="72" cy={76 + index * 56} r="7" fill={index === 0 ? 'var(--color-accent)' : 'var(--color-paper-3)'} stroke="var(--color-rule)" />
          <text x="92" y={80 + index * 56} fill="var(--color-ink-2)" fontSize="12" fontFamily="var(--font-body)">{label}</text>
        </g>
      ))}
      <path d="M314 242 A112 112 0 0 1 538 242" fill="none" stroke="var(--color-rule-2)" strokeWidth="24" strokeLinecap="round" />
      <path d="M314 242 A112 112 0 0 1 486 148" fill="none" stroke="var(--color-accent)" strokeWidth="24" strokeLinecap="round" />
      <line className="project-visual__needle" x1="426" y1="242" x2="482" y2="166" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="426" cy="242" r="9" fill="var(--color-ink)" />
      <text x="426" y="288" textAnchor="middle" fill="var(--color-ink)" fontSize="22" fontWeight="700" fontFamily="var(--font-display)">&lt;200ms</text>
      <text x="426" y="308" textAnchor="middle" fill="var(--color-muted)" fontSize="11" fontFamily="var(--font-body)">REST INFERENCE</text>
    </svg>
  )
}

function ChurnVisual() {
  return (
    <svg viewBox="0 0 620 330" className="project-visual__plot h-full w-full" role="img" aria-label="Customer retention curve and churn driver scores">
      <g stroke="var(--color-rule-2)" strokeWidth="1">
        {[80, 130, 180, 230, 280].map((y) => <line key={y} x1="58" x2="560" y1={y} y2={y} />)}
      </g>
      <path className="project-visual__signal" d="M58 252 C128 242 138 220 198 218 C260 214 274 174 338 168 C400 160 428 112 560 86" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 252 C128 242 138 220 198 218 C260 214 274 174 338 168 C400 160 428 112 560 86 L560 280 L58 280 Z" fill="var(--color-accent-soft)" opacity="0.42" />
      {[{ x: 198, y: 218 }, { x: 338, y: 168 }, { x: 560, y: 86 }].map((point, index) => <circle key={index} cx={point.x} cy={point.y} r="7" fill="var(--color-paper)" stroke="var(--color-accent)" strokeWidth="3" />)}
      <text x="58" y="55" fill="var(--color-ink)" fontSize="22" fontWeight="700" fontFamily="var(--font-display)">0.84 ROC-AUC</text>
      <text x="560" y="55" textAnchor="end" fill="var(--color-muted)" fontSize="11" fontFamily="var(--font-body)">7,043 CUSTOMERS · 78% RECALL</text>
      <text x="58" y="310" fill="var(--color-muted)" fontSize="11" fontFamily="var(--font-body)">LOW RETENTION SIGNAL</text>
      <text x="560" y="310" textAnchor="end" fill="var(--color-accent)" fontSize="11" fontFamily="var(--font-body)">HIGH CHURN SIGNAL</text>
    </svg>
  )
}

function ResumeVisual() {
  const matrix = [0.18, 0.84, 0.42, 0.66, 0.28, 0.72, 0.91, 0.52, 0.33, 0.78, 0.62, 0.47, 0.86, 0.58, 0.38]
  return (
    <svg viewBox="0 0 620 330" className="project-visual__plot h-full w-full" role="img" aria-label="Resume and job-description similarity matrix producing a skill-gap report">
      <text x="58" y="52" fill="var(--color-ink)" fontSize="18" fontWeight="700" fontFamily="var(--font-display)">RESUME</text>
      <text x="562" y="52" textAnchor="end" fill="var(--color-ink)" fontSize="18" fontWeight="700" fontFamily="var(--font-display)">JOB DESCRIPTION</text>
      <path d="M128 74 C198 74 210 160 274 160" fill="none" stroke="var(--color-rule)" strokeWidth="1.5" />
      <path d="M492 74 C420 74 408 160 346 160" fill="none" stroke="var(--color-rule)" strokeWidth="1.5" />
      {matrix.map((value, index) => {
        const column = index % 5
        const row = Math.floor(index / 5)
        return <rect className="project-visual__matrix-cell" key={index} x={235 + column * 31} y={112 + row * 31} width="23" height="23" rx="4" fill={value > 0.7 ? 'var(--color-accent)' : value > 0.45 ? 'var(--color-muted)' : 'var(--color-paper-3)'} opacity={0.55 + value * 0.45} />
      })}
      <path d="M310 214 V256" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="5 7" className="signal-path" />
      <rect x="176" y="256" width="268" height="48" rx="12" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
      <text x="310" y="286" textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="700" fontFamily="var(--font-display)">MATCH SCORE + SKILL GAP</text>
    </svg>
  )
}

export function ProjectVisual({ project }: { project: Project }) {
  const visual = project.slug === 'breast-cancer-prediction'
    ? <CancerVisual />
    : project.slug === 'fire-weather-index'
      ? <FireVisual />
      : project.slug === 'customer-churn-prediction'
        ? <ChurnVisual />
        : <ResumeVisual />

  return (
    <div className="project-visual relative flex h-full w-full flex-col overflow-hidden bg-[var(--color-paper)] text-ink">
      <div className="project-visual__meta flex items-center justify-between gap-4 px-5 pt-5 text-[0.68rem] text-ink-muted sm:px-7 sm:pt-6">
        <span>{project.title}</span>
        <span className="tnum whitespace-nowrap">{project.year} / {project.status}</span>
      </div>
      <div className="project-visual__canvas min-h-0 flex-1 p-2 sm:p-4">{visual}</div>
    </div>
  )
}
