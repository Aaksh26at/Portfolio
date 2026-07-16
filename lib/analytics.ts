/** Lightweight, privacy-respecting analytics helper.
 *  No-ops entirely unless NEXT_PUBLIC_GA_ID is configured. */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''

export type AnalyticsEvent =
  | 'resume_download'
  | 'github_click'
  | 'linkedin_click'
  | 'project_view'
  | 'contact_submit'
  | 'email_click'

type GtagWindow = Window & {
  gtag?: (command: string, action: string, params?: Record<string, unknown>) => void
}

/** Fire a tracked event. Safe to call even when analytics is disabled. */
export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (!GA_ID || typeof window === 'undefined') return
  const w = window as GtagWindow
  w.gtag?.('event', event, params)
}
