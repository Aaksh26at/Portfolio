'use client'

import { socialIcons } from '@/lib/icons'
import { portfolio } from '@/data/portfolio'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import type { AnalyticsEvent } from '@/lib/analytics'

function eventFor(icon: string): AnalyticsEvent | null {
  if (icon === 'github') return 'github_click'
  if (icon === 'linkedin') return 'linkedin_click'
  if (icon === 'mail') return 'email_click'
  return null
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {portfolio.person.socials.map((social) => {
        const Icon = socialIcons[social.icon]
        const ev = eventFor(social.icon)
        const isExternal = social.href.startsWith('http')
        return (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={social.label}
              onClick={() => ev && track(ev)}
              className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-rule-strong)] text-ink-muted transition-colors duration-150 hover:border-ink hover:text-ink"
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
