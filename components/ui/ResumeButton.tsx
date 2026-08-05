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

export function ResumeButton({ variant = 'ghost', className, label }: ResumeButtonProps) {
  // A published PDF is always the better answer: nobody emails a stranger to
  // ask for a résumé, they just leave. The mailto survives only as the
  // fallback for when no file has been published yet.
  const { resumePath, email, name } = portfolio.person
  const hasFile = resumePath.length > 0

  return (
    <MagneticButton
      href={
        hasFile
          ? resumePath
          : `mailto:${email}?subject=${encodeURIComponent(`Request for ${name}’s résumé`)}`
      }
      download={hasFile || undefined}
      variant={variant}
      className={className}
      onClick={() => track(hasFile ? 'resume_download' : 'email_click')}
      ariaLabel={hasFile ? `Download ${name}'s résumé (PDF)` : `Request ${name}'s résumé by email`}
    >
      <FileText className="h-4 w-4" aria-hidden="true" />
      {label ?? (hasFile ? 'Download Résumé' : 'Request Résumé')}
    </MagneticButton>
  )
}
