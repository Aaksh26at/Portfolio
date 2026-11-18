import { GA_ID } from '@/lib/analytics'
import { portfolio } from '@/data/portfolio'
import { AnalyticsClient } from '@/components/AnalyticsClient'

export function Analytics() {
  if (!GA_ID) return null
  return <AnalyticsClient projectSlugs={portfolio.projects.map(project => project.slug)} />
}
