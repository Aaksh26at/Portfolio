import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'
import { publicContent } from '@/lib/admin-store'

export const dynamic = 'force-dynamic'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, '')

  const content = await publicContent()
  const projectRoutes: MetadataRoute.Sitemap = content.projects
    .filter((p) => p.published)
    .map((p) => ({
      url: `${base}/projects/${p.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [
    {
      url: base,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectRoutes,
  ]
}
