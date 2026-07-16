'use client'

import { Download } from 'lucide-react'
import { MagneticButton } from './MagneticButton'
import { portfolio } from '@/data/portfolio'
import { track } from '@/lib/analytics'

interface ResumeButtonProps {
  variant?: 'primary' | 'ghost' | 'soft'
  className?: string
  label?: string
}

export function ResumeButton({ variant = 'ghost', className, label = 'Download Resume' }: ResumeButtonProps) {
  return (
    <MagneticButton
      href={portfolio.resumePath}
      download="Aakshat-Agarwal-Resume.pdf"
      variant={variant}
      className={className}
      onClick={() => track('resume_download')}
      ariaLabel="Download Aakshat Agarwal's resume as a PDF"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {label}
    </MagneticButton>
  )
}
