import { projectResults } from '@/data/project-results'

export function ProjectResults({ slug }: { slug: string }) {
  const result = projectResults[slug]
  if (!result) return null
  return (
    <div className="project-results" aria-label="Project results">
      <p className="result-label">What it delivers</p>
      <p className="result-summary">{result.summary}</p>
      <dl className="result-metrics">
        {result.metrics.map(metric => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
      <p className="result-context">{result.context}</p>
    </div>
  )
}
