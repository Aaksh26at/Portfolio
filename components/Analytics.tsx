import { GA_ID } from '@/lib/analytics'
import { publicContent } from '@/lib/admin-store'
import { AnalyticsClient } from '@/components/AnalyticsClient'

export async function Analytics() {
  if (!GA_ID) return null
  const content = await publicContent()
  return <AnalyticsClient projectSlugs={content.projects.filter(p => p.published).map(project => project.slug)} />
}
