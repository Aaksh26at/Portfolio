'use client'

import Image from 'next/image'
import { useState } from 'react'
import { portfolio } from '@/data/portfolio'
import { cn } from '@/lib/utils'

interface ProfilePortraitProps {
  /** Priority-load in the hero; lazy elsewhere. */
  priority?: boolean
  className?: string
  sizes?: string
  /** Focus point / crop, adjustable per placement. */
  objectPosition?: string
  rounded?: string
}

/** Renders the profile photo from `portfolio.profileImage`.
 *  If the image is missing (not yet added), it gracefully shows an initials
 *  fallback instead of a broken image — so the layout never breaks. */
export function ProfilePortrait({
  priority = false,
  className,
  sizes = '(max-width: 768px) 80vw, 420px',
  objectPosition = 'center 30%',
  rounded = 'rounded-3xl',
}: ProfilePortraitProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', rounded, className)}>
      {/* soft gradient frame + glow, kept off the face */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-base-900/70 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/10',
          rounded,
        )}
      />

      {failed ? (
        <div className="flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-br from-base-600 via-base-700 to-base-900">
          <span className="font-display text-6xl font-bold text-gradient sm:text-7xl">
            {portfolio.person.initials}
          </span>
        </div>
      ) : (
        <Image
          src={portfolio.profileImage}
          alt={portfolio.person.name}
          width={840}
          height={1050}
          priority={priority}
          sizes={sizes}
          onError={() => setFailed(true)}
          className="aspect-[4/5] w-full object-cover"
          style={{ objectPosition }}
        />
      )}
    </div>
  )
}
