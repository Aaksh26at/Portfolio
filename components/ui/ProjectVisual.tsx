import type { Project } from '@/types'

const pointsA = [[68, 150], [92, 116], [118, 166], [145, 132], [165, 92], [202, 144], [226, 112]]
const pointsB = [[340, 110], [374, 138], [402, 90], [432, 154], [466, 118], [490, 78], [518, 134]]

function CancerVisual() {
  return (
    <svg viewBox="0 0 620 330" className="project-visual__plot h-full w-full" role="img" aria-label="Two diagnostic feature clusters separated by a classification boundary">
      <path d="M300 46 C268 104 330 196 288 286" fill="none" stroke="var(--color-data)" strokeWidth="2" strokeDasharray="7 9" />
      {pointsA.map(([x, y], index) => <circle key={`a-${index}`} cx={x} cy={y} r={8 + (index % 3) * 2} fill="var(--color-paper-3)" stroke="var(--color-muted)" />)}
      {pointsB.map(([x, y], index) => <circle key={`b-${index}`} cx={x} cy={y} r={8 + (index % 3) * 2} fill="var(--color-data-soft)" stroke="var(--color-data)" />)}
      <text x="62" y="286" fill="var(--color-muted)" fontSize="12" fontFamily="var(--font-body)">BENIGN CLUSTER</text>
      <text x="402" y="286" fill="var(--color-data)" fontSize="12" fontFamily="var(--font-body)">MALIGNANT CLUSTER</text>
      <text x="300" y="310" textAnchor="middle" fill="var(--color-ink-2)" fontSize="12" fontFamily="var(--font-body)">30 ATTRIBUTES · 569 SAMPLES</text>
    </svg>
  )
}

// The gauge is scaled so that empty is 0.500 — an always-fire baseline — and
// full is 1.0. Skill starts where the coin flip ends, which is the whole point
// of this project.
const fireInputs = ['TEMPERATURE', 'HUMIDITY', 'WIND', 'RAINFALL', 'MONTH', 'REGION']

function FireVisual() {
  return (
    <svg viewBox="0 0 620 330" className="project-visual__plot h-full w-full" role="img" aria-label="Six observed weather inputs feeding a classifier that scores 0.938 ROC-AUC against a 0.500 always-fire baseline">
      <g fill="none" stroke="var(--color-rule)" strokeWidth="1.5">
        {fireInputs.map((label, index) => <path key={label} d={`M72 ${52 + index * 42} H248`} />)}
      </g>
      {fireInputs.map((label, index) => (
        <g key={label}>
          <circle cx="72" cy={52 + index * 42} r="7" fill={index === 0 ? 'var(--color-data)' : 'var(--color-paper-3)'} stroke="var(--color-rule)" />
          <text x="92" y={56 + index * 42} fill="var(--color-ink-2)" fontSize="12" fontFamily="var(--font-body)">{label}</text>
        </g>
      ))}
      <path d="M314 242 A112 112 0 0 1 538 242" fill="none" stroke="var(--color-rule-2)" strokeWidth="24" strokeLinecap="round" />
      <path d="M314 242 A112 112 0 0 1 530 200" fill="none" stroke="var(--color-data)" strokeWidth="24" strokeLinecap="round" />
      <line className="project-visual__needle" x1="426" y1="242" x2="496" y2="213" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="426" cy="242" r="9" fill="var(--color-ink)" />
      <text x="426" y="288" textAnchor="middle" fill="var(--color-ink)" fontSize="22" fontWeight="700" fontFamily="var(--font-display)">0.938</text>
      <text x="426" y="308" textAnchor="middle" fill="var(--color-muted)" fontSize="11" fontFamily="var(--font-body)">ROC-AUC · BASELINE 0.500</text>
    </svg>
  )
}

function ChurnVisual() {
  return (
    <svg viewBox="0 0 620 330" className="project-visual__plot h-full w-full" role="img" aria-label="Customer retention curve and churn driver scores">
      <g stroke="var(--color-rule-2)" strokeWidth="1">
        {[80, 130, 180, 230, 280].map((y) => <line key={y} x1="58" x2="560" y1={y} y2={y} />)}
      </g>
      <path className="project-visual__signal" d="M58 252 C128 242 138 220 198 218 C260 214 274 174 338 168 C400 160 428 112 560 86" fill="none" stroke="var(--color-data)" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 252 C128 242 138 220 198 218 C260 214 274 174 338 168 C400 160 428 112 560 86 L560 280 L58 280 Z" fill="var(--color-data-soft)" opacity="0.42" />
      {[{ x: 198, y: 218 }, { x: 338, y: 168 }, { x: 560, y: 86 }].map((point, index) => <circle key={index} cx={point.x} cy={point.y} r="7" fill="var(--color-paper)" stroke="var(--color-data)" strokeWidth="3" />)}
      <text x="58" y="55" fill="var(--color-ink)" fontSize="22" fontWeight="700" fontFamily="var(--font-display)">80.4% CAUGHT</text>
      <text x="560" y="55" textAnchor="end" fill="var(--color-muted)" fontSize="11" fontFamily="var(--font-body)">7,043 CUSTOMERS · 0.845 ROC-AUC</text>
      <text x="58" y="310" fill="var(--color-muted)" fontSize="11" fontFamily="var(--font-body)">LOW RETENTION SIGNAL</text>
      <text x="560" y="310" textAnchor="end" fill="var(--color-data)" fontSize="11" fontFamily="var(--font-body)">HIGH CHURN SIGNAL</text>
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
        return <rect className="project-visual__matrix-cell" key={index} x={235 + column * 31} y={112 + row * 31} width="23" height="23" rx="4" fill={value > 0.7 ? 'var(--color-data)' : value > 0.45 ? 'var(--color-muted)' : 'var(--color-paper-3)'} opacity={0.55 + value * 0.45} />
      })}
      <path d="M310 214 V256" stroke="var(--color-data)" strokeWidth="2" strokeDasharray="5 7" className="signal-path" />
      <rect x="176" y="256" width="268" height="48" rx="12" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
      <text x="310" y="286" textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="700" fontFamily="var(--font-display)">MATCH SCORE + SKILL GAP</text>
    </svg>
  )
}

const billLayouts = [
  { label: 'ENGLISH', y: 58 },
  { label: 'ROMANIZED', y: 128 },
  { label: 'DEVANAGARI', y: 198 },
]

function BillsVisual() {
  return (
    <svg viewBox="0 0 620 330" className="project-visual__plot h-full w-full" role="img" aria-label="Three bill layouts routed through a layout classifier into one ledger row and a filed PDF">
      <g fill="none" stroke="var(--color-rule)" strokeWidth="1.5">
        <path d="M180 80 C216 80 220 148 254 148" />
        <path d="M180 150 H254" />
        <path d="M180 220 C216 220 220 152 254 152" />
        <path d="M382 150 C412 150 418 106 448 106" />
        <path d="M382 150 C412 150 418 194 448 194" />
      </g>
      {billLayouts.map((layout, index) => (
        <g key={layout.label}>
          <rect x="46" y={layout.y} width="134" height="44" rx="6" fill={index === 0 ? 'var(--color-data-soft)' : 'var(--color-paper-3)'} stroke={index === 0 ? 'var(--color-data)' : 'var(--color-rule)'} />
          <text x="113" y={layout.y + 27} textAnchor="middle" fill="var(--color-ink-2)" fontSize="11" fontFamily="var(--font-body)">{layout.label}</text>
        </g>
      ))}
      <rect x="254" y="116" width="128" height="68" rx="8" fill="var(--color-paper-3)" stroke="var(--color-data)" strokeWidth="2" />
      <text x="318" y="144" textAnchor="middle" fill="var(--color-ink)" fontSize="11" fontFamily="var(--font-body)">LAYOUT</text>
      <text x="318" y="162" textAnchor="middle" fill="var(--color-ink)" fontSize="11" fontFamily="var(--font-body)">CLASSIFIER</text>
      <rect x="448" y="84" width="126" height="44" rx="6" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
      <text x="511" y="111" textAnchor="middle" fill="var(--color-ink-2)" fontSize="11" fontFamily="var(--font-body)">LEDGER ROW</text>
      <rect x="448" y="172" width="126" height="44" rx="6" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
      <text x="511" y="199" textAnchor="middle" fill="var(--color-ink-2)" fontSize="11" fontFamily="var(--font-body)">FILED PDF</text>
      <text x="310" y="288" textAnchor="middle" fill="var(--color-ink)" fontSize="19" fontWeight="700" fontFamily="var(--font-display)">34 ACCOUNTS</text>
      <text x="310" y="308" textAnchor="middle" fill="var(--color-muted)" fontSize="11" fontFamily="var(--font-body)">40+ FIELDS PER BILL · HOURLY, UNATTENDED</text>
    </svg>
  )
}

function AccountingVisual() {
  const inputs = ['BANK STATEMENTS', 'CONTRACT NOTES', 'RENT INVOICES', 'LOAN BALANCES']
  return (
    <svg viewBox="0 0 620 330" className="project-visual__plot h-full w-full" role="img" aria-label="Conceptual architecture: accounting inputs pass through mapping, reconciliation and review into approved Tally imports or read-only reports">
      {inputs.map((label, index) => (
        <g key={label}>
          <path d={`M190 ${66 + index * 57} C220 ${66 + index * 57} 220 155 244 155`} fill="none" stroke="var(--color-rule)" strokeWidth="1.5" />
          <rect x="36" y={46 + index * 57} width="154" height="40" rx="6" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
          <text x="113" y={71 + index * 57} textAnchor="middle" fill="var(--color-ink-2)" fontSize="11" fontFamily="var(--font-body)">{label}</text>
        </g>
      ))}
      <rect x="244" y="100" width="150" height="112" rx="9" fill="var(--color-data-soft)" stroke="var(--color-data)" strokeWidth="2" />
      <text x="319" y="131" textAnchor="middle" fill="var(--color-ink)" fontSize="18" fontWeight="700" fontFamily="var(--font-display)">REVIEW</text>
      <text x="319" y="159" textAnchor="middle" fill="var(--color-ink-2)" fontSize="12" fontFamily="var(--font-body)">Map · reconcile</text>
      <text x="319" y="182" textAnchor="middle" fill="var(--color-ink-2)" fontSize="12" fontFamily="var(--font-body)">Confirm · approve</text>
      <path d="M394 138 C426 138 420 100 448 100 M394 178 C426 178 420 221 448 221" fill="none" stroke="var(--color-data)" strokeWidth="1.8" />
      <rect x="448" y="66" width="138" height="68" rx="7" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
      <text x="517" y="94" textAnchor="middle" fill="var(--color-ink)" fontSize="13" fontWeight="600" fontFamily="var(--font-body)">TALLYPRIME</text>
      <text x="517" y="116" textAnchor="middle" fill="var(--color-muted)" fontSize="11" fontFamily="var(--font-body)">approved imports</text>
      <rect x="448" y="187" width="138" height="68" rx="7" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
      <text x="517" y="215" textAnchor="middle" fill="var(--color-ink)" fontSize="13" fontWeight="600" fontFamily="var(--font-body)">EXCEL / PDF</text>
      <text x="517" y="237" textAnchor="middle" fill="var(--color-muted)" fontSize="11" fontFamily="var(--font-body)">read-only reports</text>
      <text x="310" y="302" textAnchor="middle" fill="var(--color-muted)" fontSize="11" fontFamily="var(--font-body)">PYTHON · PYSIDE6 · HTTP/XML · CONCEPTUAL ARCHITECTURE</text>
    </svg>
  )
}

function JobAgentVisual() {
  return (
    <svg viewBox="0 0 620 330" className="project-visual__plot h-full w-full" role="img" aria-label="Conceptual architecture: public job sources feed resume-based matching and review, with a tracker, interview practice and scheduled digest; applicants submit their own applications">
      <rect x="38" y="77" width="156" height="154" rx="8" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
      <text x="116" y="107" textAnchor="middle" fill="var(--color-ink)" fontSize="13" fontWeight="600" fontFamily="var(--font-body)">JOB SOURCES</text>
      {['Himalayas', 'Remotive', '7 employer boards'].map((label, i) => <text key={label} x="116" y={143 + i * 29} textAnchor="middle" fill="var(--color-ink-2)" fontSize="12" fontFamily="var(--font-body)">{label}</text>)}
      <path d="M194 154 H240" fill="none" stroke="var(--color-data)" strokeWidth="2" />
      <rect x="240" y="103" width="156" height="103" rx="9" fill="var(--color-data-soft)" stroke="var(--color-data)" strokeWidth="2" />
      <text x="318" y="136" textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="700" fontFamily="var(--font-display)">MATCH + REVIEW</text>
      <text x="318" y="164" textAnchor="middle" fill="var(--color-ink-2)" fontSize="12" fontFamily="var(--font-body)">Resume facts</text>
      <text x="318" y="185" textAnchor="middle" fill="var(--color-ink-2)" fontSize="12" fontFamily="var(--font-body)">Tools + assistance</text>
      {['APPLICATION TRACKER', 'INTERVIEW PRACTICE', 'DAILY EMAIL'].map((label, i) => (
        <g key={label}>
          <path d={`M396 154 C422 154 420 ${77 + i * 77} 444 ${77 + i * 77}`} fill="none" stroke="var(--color-data)" strokeWidth="1.5" />
          <rect x="444" y={55 + i * 77} width="148" height="44" rx="6" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
          <text x="518" y={82 + i * 77} textAnchor="middle" fill="var(--color-ink-2)" fontSize="10.5" fontFamily="var(--font-body)">{label}</text>
        </g>
      ))}
      <text x="310" y="302" textAnchor="middle" fill="var(--color-muted)" fontSize="11" fontFamily="var(--font-body)">CONCEPTUAL ARCHITECTURE · APPLICATIONS REMAIN IN THE CANDIDATE'S HANDS</text>
    </svg>
  )
}

export function ProjectVisual({ project }: { project: Project }) {
  const visual = project.slug === 'kalash-accounts'
    ? <AccountingVisual />
    : project.slug === 'next-move-job-agent'
      ? <JobAgentVisual />
      : project.slug === 'breast-cancer-prediction'
    ? <CancerVisual />
    : project.slug === 'fire-weather-index'
      ? <FireVisual />
      : project.slug === 'customer-churn-prediction'
        ? <ChurnVisual />
        : project.slug === 'jvvnl-bill-automation'
          ? <BillsVisual />
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
