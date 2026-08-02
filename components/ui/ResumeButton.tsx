'use client'

import { FileText } from 'lucide-react'
import { MagneticButton } from './MagneticButton'
import { portfolio } from '@/data/portfolio'
import { track } from '@/lib/analytics'

interface ResumeButtonProps {
  variant?: 'primary' | 'ghost' | 'soft'
  className?: string
  label?: string
}

export function ResumeButton({ variant = 'ghost', className, label = 'Request Résumé' }: ResumeButtonProps) {
  return (
    <MagneticButton
      href={`mailto:${portfolio.person.email}?subject=${encodeURIComponent('Request for Aakshat Agarwal’s résumé')}`}
      variant={variant}
      className={className}
      onClick={() => track('email_click')}
      ariaLabel="Request Aakshat Agarwal's résumé by email"
    >
      <FileText className="h-4 w-4" aria-hidden="true" />
      {label}
    </MagneticButton>
  )
}
