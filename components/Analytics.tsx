import Script from 'next/script'
import { GA_ID } from '@/lib/analytics'

/** Injects Google Analytics only when NEXT_PUBLIC_GA_ID is configured.
 *  Renders nothing otherwise — no tracking without explicit setup. */
export function Analytics() {
  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
