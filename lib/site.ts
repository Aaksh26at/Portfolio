/** Site-wide constants used for SEO metadata, sitemap and structured data. */
export const siteConfig = {
  name: 'Aakshat Agarwal',
  title: 'Aakshat Agarwal | Data Analyst, AI/ML and Python Developer',
  description:
    'Portfolio of Aakshat Agarwal, a Jaipur-based data and technology professional working with Python, SQL, machine learning, data analytics, business intelligence, Flask, cloud tools and data pipelines.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
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
