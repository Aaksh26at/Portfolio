'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { GA_ID, trackProjectRoute } from '@/lib/analytics'

export function AnalyticsClient({ projectSlugs }: { projectSlugs: string[] }) {
  const pathname = usePathname()
  useEffect(() => {
    trackProjectRoute(pathname, projectSlugs)
  }, [pathname, projectSlugs])
  return <Script id="portfolio-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
}
