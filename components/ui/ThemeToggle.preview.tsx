import { Panel } from './Panel'
import { ThemeToggle, type ThemeToggleState } from './ThemeToggle'

const states: ThemeToggleState[] = [
  'default',
  'hover',
  'focus',
  'active',
  'disabled',
  'loading',
  'error',
  'success',
]

export function ThemeTogglePreview() {
  return (
    <Panel as="section" aria-label="Theme toggle states" tone="raised" pad="sm" className="max-w-sm">
      <h2 className="text-lg font-semibold text-ink">Theme toggle — eight states</h2>
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-8 gap-y-3">
        {states.map((state) => (
          <div key={state} className="contents">
            <span className="text-xs capitalize text-ink-muted">{state}</span>
            <ThemeToggle previewState={state} />
          </div>
        ))}
      </div>
    </Panel>
  )
}
