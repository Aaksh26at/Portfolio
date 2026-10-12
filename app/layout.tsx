import type { Metadata, Viewport } from 'next'
// Fraunces via the `opsz` subset: same 'Fraunces Variable' family name as
// index.css, but carries the optical-size axis (65.7 KB latin vs 35.8 KB)
// so `font-optical-sizing: auto` gives real display cuts at marquee sizes.
import '@fontsource-variable/fraunces/opsz.css'
import '@fontsource-variable/ibm-plex-sans'
// No variable build of IBM Plex Mono exists on Fontsource — two static
// weights only, and never the italics.
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/600.css'
import './globals.css'
import { siteConfig } from '@/lib/site'
import { portfolio } from '@/data/portfolio'
import { Analytics } from '@/components/Analytics'
import { ScrollDepth } from '@/components/motion/ScrollDepth'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const themeBootScript = `
(() => {
  const storageKey = 'aakshat-portfolio-theme';
  let saved = null;
  try { saved = window.localStorage.getItem(storageKey); } catch {}
  const theme = saved === 'light' || saved === 'dark'
    ? saved
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();
`

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Aakshat Agarwal',
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.webmanifest',
}

/** JSON-LD structured data (Person + WebSite) for rich results. */
function StructuredData() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: portfolio.person.name,
    jobTitle: 'Data Analyst, AI/ML and Python Developer',
    email: `mailto:${portfolio.person.email}`,
    url: siteConfig.url,
    mainEntityOfPage: siteConfig.url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'India',
    },
    sameAs: [siteConfig.github, siteConfig.linkedin],
    knowsAbout: [
      'Data Analysis',
      'Machine Learning',
      'Python',
      'SQL',
      'Business Intelligence',
      'Data Engineering',
    ],
  }
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { '@id': `${siteConfig.url}/#person` },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([person, website]) }}
    />
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-band focus:px-4 focus:py-2 focus:text-band-ink"
        >
          Skip to content
        </a>
        <StructuredData />
        <ScrollDepth />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
