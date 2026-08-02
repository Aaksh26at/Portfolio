'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type SignalId = 'diagnose' | 'forecast' | 'retain' | 'match'

const signals: Array<{
  id: SignalId
  label: string
  source: string
  metric: string
  detail: string
  output: string
}> = [
  {
    id: 'diagnose',
    label: 'Diagnosis',
    source: '30 clinical attributes',
    metric: '96%',
    detail: 'classification accuracy',
    output: 'malignant / benign',
  },
  {
    id: 'forecast',
    label: 'Fire risk',
    source: '4 weather inputs',
    metric: '<200ms',
    detail: 'REST inference',
    output: 'fire weather index',
  },
  {
    id: 'retain',
    label: 'Retention',
    source: '7,043 customers',
    metric: '0.84',
    detail: 'ROC-AUC',
    output: 'churn probability',
  },
  {
    id: 'match',
    label: 'Job fit',
    source: 'resume + job text',
    metric: 'TF-IDF',
    detail: 'cosine similarity',
    output: 'skill-gap report',
  },
]

export function IntelligenceMap() {
  const [active, setActive] = useState<SignalId>('retain')
  const signal = signals.find((item) => item.id === active) ?? signals[0]

  return (
    <figure className="observatory-panel relative overflow-hidden p-4 sm:p-6" data-depth="static">
      <figcaption className="flex items-center justify-between gap-4">
        <span className="signal-label">Applied intelligence map</span>
        <span className="flex items-center gap-2 text-xs text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          signal online
        </span>
      </figcaption>

      <div className="relative mt-4 aspect-[5/4] min-h-[20rem] overflow-hidden rounded-[calc(var(--radius-card)-0.4rem)] bg-[var(--color-paper)]">
        <svg
          viewBox="0 0 640 510"
          role="img"
          aria-label={`Intelligence system map. ${signal.source} flows through a model producing ${signal.output}; highlighted result: ${signal.metric} ${signal.detail}.`}
          className="pointer-events-none relative z-[var(--z-base)] h-full w-full"
        >
          <g fill="none" stroke="var(--color-rule-2)" strokeWidth="1">
            <path d="M72 90 C176 90 174 224 270 224" />
            <path d="M72 196 C172 196 176 244 270 244" />
            <path d="M72 302 C172 302 176 264 270 264" />
            <path d="M72 408 C176 408 174 284 270 284" />
            <path d="M370 254 C452 254 468 128 564 128" />
            <path d="M370 254 C452 254 468 382 564 382" />
          </g>

          <path
            d={
              active === 'diagnose'
                ? 'M72 90 C176 90 174 224 270 224'
                : active === 'forecast'
                  ? 'M72 196 C172 196 176 244 270 244'
                  : active === 'retain'
                    ? 'M72 302 C172 302 176 264 270 264'
                    : 'M72 408 C176 408 174 284 270 284'
            }
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            className="signal-path"
          />
          <path
            d={active === 'match' ? 'M370 254 C452 254 468 382 564 382' : 'M370 254 C452 254 468 128 564 128'}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            className="signal-path"
          />

          {[
            { y: 90, id: 'diagnose', label: 'Clinical data' },
            { y: 196, id: 'forecast', label: 'Weather data' },
            { y: 302, id: 'retain', label: 'Customer data' },
            { y: 408, id: 'match', label: 'Document text' },
          ].map((node) => (
            <g key={node.id} opacity={active === node.id ? 1 : 0.48}>
              <circle cx="72" cy={node.y} r="11" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
              <circle cx="72" cy={node.y} r="3" fill={active === node.id ? 'var(--color-accent)' : 'var(--color-muted)'} />
              <text x="96" y={node.y + 5} fill="var(--color-ink-2)" fontSize="13" fontFamily="var(--font-body)">
                {node.label}
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

          <g opacity={active === 'match' ? 0.42 : 1}>
            <circle cx="564" cy="128" r="11" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
            <circle cx="564" cy="128" r="3" fill="var(--color-accent)" />
            <text x="548" y="98" textAnchor="end" fill="var(--color-ink-2)" fontSize="13" fontFamily="var(--font-body)">
              Prediction
            </text>
          </g>
          <g opacity={active === 'match' ? 1 : 0.42}>
            <circle cx="564" cy="382" r="11" fill="var(--color-paper-3)" stroke="var(--color-rule)" />
            <circle cx="564" cy="382" r="3" fill="var(--color-accent)" />
            <text x="548" y="418" textAnchor="end" fill="var(--color-ink-2)" fontSize="13" fontFamily="var(--font-body)">
              Explanation
            </text>
          </g>
        </svg>

        <div className="absolute bottom-4 left-4 right-4 z-[var(--z-raised)] flex items-end justify-between gap-4 rounded-[var(--radius-control)] bg-[var(--color-paper-2)] p-3 sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
          <div>
            <p className="text-xs text-ink-muted">{signal.source} → {signal.output}</p>
            <p className="mt-1 font-display text-lg font-bold tracking-[-0.03em] text-ink">{signal.detail}</p>
          </div>
          <span className="tnum whitespace-nowrap font-display text-2xl font-bold text-accent">{signal.metric}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Choose a project signal">
        {signals.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            aria-pressed={active === item.id}
            className={cn(
              'min-h-11 whitespace-nowrap rounded-[var(--radius-control)] border px-3 text-xs font-medium transition-colors duration-200',
              active === item.id
                ? 'border-accent bg-[var(--color-accent-soft)] text-ink'
                : 'border-[var(--color-rule-2)] text-ink-muted hover:border-[var(--color-rule)] hover:text-ink',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </figure>
  )
}
