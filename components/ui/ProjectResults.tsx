import { projectResults } from '@/data/project-results'

export function ProjectResults({ slug, summary, metrics }: { slug: string; summary?: string; metrics?: { value: string; label: string }[] }) {
  const result = projectResults[slug]
  if (!result && !summary) return null
  return (
    <div className="project-results" aria-label="Project results">
      <p className="result-label">What it delivers</p>
      <p className="result-summary">{summary || result?.summary}</p>
      <dl className="result-metrics">
        {(metrics || result?.metrics || []).map(metric => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
      <p className="result-context">{result?.context}</p>
    </div>
  )
}
