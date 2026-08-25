/** The deployed home of this site. Used as the production fallback below. */
export const PRODUCTION_URL = 'https://aakshatagarwal.vercel.app'

/**
 * `NEXT_PUBLIC_SITE_URL` wins where it is set, but it must not be the only
 * thing standing between production and a wrong absolute URL. It was unset on
 * Vercel through 2026-08-25, so the old `?? 'http://localhost:3000'` fallback
 * shipped: robots.txt pointed crawlers at `http://localhost:3000/sitemap.xml`,
 * and every `<loc>` in the sitemap named localhost too. Nothing errored — the
 * build is identical either way, and the damage is only visible in the
 * response. Falling back per environment keeps a missing variable from being
 * publishable again.
 */
const fallbackUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : PRODUCTION_URL

/** Site-wide constants used for SEO metadata, sitemap and structured data. */
export const siteConfig = {
  name: 'Aakshat Agarwal',
  title: 'Aakshat Agarwal | Data Analyst, AI/ML and Python Developer',
  description:
    'Portfolio of Aakshat Agarwal, a Jaipur-based data and technology professional working with Python, SQL, machine learning, data analytics, business intelligence, Flask, cloud tools and data pipelines.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl,
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
