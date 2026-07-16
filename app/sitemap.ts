import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'
import { portfolio } from '@/data/portfolio'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '')

  const projectRoutes: MetadataRoute.Sitemap = portfolio.projects
    .filter((p) => p.status === 'shipped')
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
