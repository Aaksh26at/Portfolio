import { createElement, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}

/** Static content wrapper retained for API compatibility across sections. */
export function Reveal({ children, className, as = 'div' }: RevealProps) {
  return createElement(as, { className }, children)
}
