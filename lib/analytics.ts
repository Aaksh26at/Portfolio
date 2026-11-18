/** Optional GA4 events. Visitor-entered contact content is never included. */
const configuredId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? ''
export const GA_ID = /^G-[A-Z0-9]{6,20}$/.test(configuredId) ? configuredId : ''

export type AnalyticsEvent =
  | 'resume_download'
  | 'github_click'
  | 'linkedin_click'
  | 'project_view'
  | 'contact_submit'
  | 'email_click'

type GtagWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  portfolioAnalyticsId?: string
  portfolioAnalyticsPath?: string
}

/** Queue initialization and early clicks even while Google's script is loading. */
export function initializeAnalytics(): GtagWindow | null {
  if (!GA_ID || typeof window === 'undefined') return null
  const w = window as GtagWindow
  if (w.portfolioAnalyticsId !== GA_ID) {
    w.dataLayer = w.dataLayer || []
    w.gtag = w.gtag || function (...args: unknown[]) { w.dataLayer?.push(args) }
    w.gtag('js', new Date())
    w.gtag('config', GA_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    })
    w.portfolioAnalyticsId = GA_ID
  }
  return w
}

/** Only allow fixed identifiers, never names, email addresses or message text. */
export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  const w = initializeAnalytics()
  if (!w) return
  const safe: Record<string, string> = {}
  if (event === 'project_view' && typeof params.project === 'string' && /^[a-z0-9-]{1,80}$/.test(params.project)) {
    safe.project = params.project
  }
  if (event === 'resume_download') safe.file_name = 'aakshat-agarwal.pdf'
  if (event === 'contact_submit') safe.form_id = 'portfolio_contact'
  w.gtag?.('event', event, { ...safe, send_to: GA_ID, transport_type: 'beacon' })
}

/** A view means arriving on a known case-study route, not clicking a preview. */
export function trackProjectRoute(pathname: string, projectSlugs: readonly string[]): void {
  const w = initializeAnalytics()
  if (!w || w.portfolioAnalyticsPath === pathname) return
  w.portfolioAnalyticsPath = pathname
  const slug = pathname.replace(/\/$/, '').split('/')
  if (slug.length === 3 && slug[1] === 'projects' && projectSlugs.includes(slug[2])) {
    track('project_view', { project: slug[2] })
  }
}
