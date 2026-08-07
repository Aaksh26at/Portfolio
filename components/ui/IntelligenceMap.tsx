'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from './Badge'
import { Panel } from './Panel'

type SignalId = 'diagnose' | 'forecast' | 'retain' | 'match' | 'file'

const signals: Array<{
  id: SignalId
  label: string
  inputLabel: string
  source: string
  metric: string
  detail: string
  output: string
  /** Which of the two output nodes this signal terminates at. */
  out: 'prediction' | 'report'
}> = [
  {
    id: 'diagnose',
    label: 'Diagnosis',
    inputLabel: 'Clinical data',
    source: '30 cell-nucleus features',
    metric: '97.07%',
    detail: 'malignant recall',
    output: 'malignant / benign',
    out: 'prediction',
  },
  {
    id: 'forecast',
    label: 'Fire risk',
    inputLabel: 'Weather data',
    source: '6 weather inputs',
    metric: '0.938',
    detail: 'ROC-AUC',
    output: 'fire probability',
    out: 'prediction',
  },
  {
    id: 'retain',
    label: 'Retention',
    inputLabel: 'Customer data',
    source: '7,043 customers',
    metric: '80.4%',
    detail: 'churners caught',
    output: 'churn probability',
    out: 'prediction',
  },
  {
    id: 'match',
    label: 'Job fit',
    inputLabel: 'Document text',
    source: 'resume + job text',
    metric: 'TF-IDF',
    detail: 'cosine similarity',
    output: 'skill-gap report',
    out: 'report',
  },
  {
    id: 'file',
    label: 'Bill filing',
    inputLabel: 'Utility portal',
    source: '34 utility accounts',
    metric: '3',
    detail: 'PDF layouts parsed',
    output: 'ledger row + filed PDF',
    out: 'report',
  },
]

// Node geometry is derived from array position rather than hand-placed, so the
// map stays correct when a project is added instead of silently highlighting
// the wrong line. Inputs fan down the left edge into the hub's left face.
const NODE_TOP = 94
const NODE_GAP = 80
const HUB_TOP = 224
const HUB_GAP = 15

const nodeY = (index: number) => NODE_TOP + index * NODE_GAP
const inputPath = (index: number) =>
  `M72 ${nodeY(index)} C176 ${nodeY(index)} 174 ${HUB_TOP + index * HUB_GAP} 270 ${HUB_TOP + index * HUB_GAP}`

const OUT_PATH = {
  prediction: 'M370 254 C452 254 468 128 564 128',
  report: 'M370 254 C452 254 468 382 564 382',
} as const

export function IntelligenceMap() {
  const [active, setActive] = useState<SignalId>('retain')
  const foundIndex = signals.findIndex((item) => item.id === active)
  const activeIndex = foundIndex === -1 ? 0 : foundIndex
  const signal = signals[activeIndex]

  return (
    // The map is evidence, not emphasis, so it reads in the cobalt data
    // family throughout — amber stays reserved for actions and marks.
    <Panel as="figure" tone="raised" clip pad="sm" data-depth="static">
      <figcaption className="flex items-center justify-between gap-4">
        <span className="signal-label">Applied intelligence map</span>
        <Badge tone="neutral" variant="ghost" dot="live">
          signal online
        </Badge>
      </figcaption>

      <div className="relative mt-4 aspect-[5/4] min-h-[20rem] overflow-hidden rounded-[calc(var(--radius-card)-0.4rem)] bg-[var(--color-paper)]">
        <svg
          viewBox="0 0 640 510"
          role="img"
          aria-label={`Intelligence system map. ${signal.source} flows through a model producing ${signal.output}; highlighted result: ${signal.metric} ${signal.detail}.`}
          className="pointer-events-none relative z-[var(--z-base)] h-full w-full"
        >
          <g fill="none" stroke="var(--color-rule-2)" strokeWidth="1">
            {signals.map((item, index) => (
              <path key={item.id} d={inputPath(index)} />
            ))}
            <path d={OUT_PATH.prediction} />
            <path d={OUT_PATH.report} />
          </g>

          <path
            d={inputPath(activeIndex)}
            fill="none"
            stroke="var(--color-data)"
            strokeWidth="2"
            strokeLinecap="round"
            className="signal-path"
          />
          <path
            d={OUT_PATH[signal.out]}
            fill="none"
            stroke="var(--color-data)"
            strokeWidth="2"
            strokeLinecap="round"
            className="signal-path"
          />

          {signals.map((item, index) => (
            <g key={item.id} opacity={active === item.id ? 1 : 0.48}>
              <circle cx="72" cy={nodeY(index)} r="11" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
              <circle cx="72" cy={nodeY(index)} r="3" fill={active === item.id ? 'var(--color-data)' : 'var(--color-muted)'} />
              <text x="96" y={nodeY(index) + 5} fill="var(--color-ink-2)" fontSize="13" fontFamily="var(--font-body)">
                {item.inputLabel}
              </text>
            </g>
          ))}

          <g>
            <circle cx="320" cy="254" r="72" fill="none" stroke="var(--color-rule)" />
            <circle cx="320" cy="254" r="54" fill="none" stroke="var(--color-rule-2)" strokeDasharray="3 7" />
            <text x="320" y="244" textAnchor="middle" fill="var(--color-ink-2)" fontSize="11" letterSpacing="1.5" fontFamily="var(--font-body)">
              MODEL / ANALYSIS
            </text>
            <text x="320" y="275" textAnchor="middle" fill="var(--color-ink)" fontSize="23" fontWeight="700" fontFamily="var(--font-display)">
              {signal.metric}
            </text>
          </g>

          <g opacity={signal.out === 'prediction' ? 1 : 0.42}>
            <circle cx="564" cy="128" r="11" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
            <circle cx="564" cy="128" r="3" fill="var(--color-data)" />
            <text x="548" y="98" textAnchor="end" fill="var(--color-ink-2)" fontSize="13" fontFamily="var(--font-body)">
              Prediction
            </text>
          </g>
          <g opacity={signal.out === 'report' ? 1 : 0.42}>
            <circle cx="564" cy="382" r="11" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
            <circle cx="564" cy="382" r="3" fill="var(--color-data)" />
            <text x="548" y="418" textAnchor="end" fill="var(--color-ink-2)" fontSize="13" fontFamily="var(--font-body)">
              Report
            </text>
          </g>
        </svg>

        <div className="absolute bottom-4 left-4 right-4 z-[var(--z-raised)] flex items-end justify-between gap-4 rounded-[var(--radius-control)] bg-[var(--color-paper-2)] p-3 sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
          <div>
            <p className="text-xs text-ink-muted">{signal.source} → {signal.output}</p>
            <p className="mt-1 font-display text-lg font-bold tracking-[var(--track-display)] text-ink">{signal.detail}</p>
          </div>
          <span className="tnum whitespace-nowrap font-mono text-2xl font-semibold text-data">{signal.metric}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" aria-label="Choose a project signal">
        {signals.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            aria-pressed={active === item.id}
            className={cn(
              'min-h-11 whitespace-nowrap rounded-[var(--radius-control)] border px-3 text-xs font-medium transition-colors duration-200',
              active === item.id
                ? 'border-data bg-[var(--color-data-soft)] text-ink'
                : 'border-[var(--color-rule-2)] text-ink-muted hover:border-[var(--color-rule)] hover:text-ink',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </Panel>
  )
}
