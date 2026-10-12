/** The canonical public domain for this site. */
export const PRODUCTION_URL = 'https://aakshat.in'

/**
 * Production always emits the canonical domain, even if the hosting provider
 * exposes a preview URL. Local development can override localhost when needed.
 */
const siteUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    : PRODUCTION_URL

/** Site-wide constants used for SEO metadata, sitemap and structured data. */
export const siteConfig = {
  name: 'Aakshat Agarwal',
  title: 'Aakshat Agarwal | Data Analyst & Python Developer in Jaipur',
  description:
    'Aakshat Agarwal is a data analyst and Python developer in Jaipur, India. Explore his machine learning, analytics, automation and data engineering projects.',
  url: siteUrl,
  keywords: [
    'Aakshat Agarwal',
    'Data Analyst Jaipur',
    'Python Developer Jaipur',
    'AI ML Fresher',
    'Data Science Portfolio',
    'Machine Learning Developer',
    'Power BI Developer',
    'SQL Data Analyst',
    'Backend Developer',
    'Data Engineering Fresher',
    'India Technology Portfolio',
  ],
  authorEmail: 'aakshatagarwal2004@gmail.com',
  linkedin: 'https://linkedin.com/in/aakshatagarwal',
  github: 'https://github.com/Aaksh26at',
} as const

/** Absolute URL helper for canonical / OG links. */
export function absoluteUrl(path = ''): string {
  const base = siteConfig.url.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
