'use client'

import { Children, createElement, isValidElement, type ReactNode } from 'react'
import type { ComponentType } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

export type RevealVariant =
  | 'fade-rise'
  | 'stagger'
  | 'rule-draw'
  | 'mask-wipe'
  | 'lift'
  | 'none'

/** Intrinsic tags Reveal can render. Kept as a closed set so the motion
 *  components can be looked up from a static map — calling motion(Tag)
 *  during render would create a new component type each pass and remount
 *  the subtree. */
export type RevealTag = 'div' | 'span' | 'ul' | 'ol' | 'li' | 'section' | 'article' | 'figure' | 'p'

// Every HTML motion component accepts the same base props used here, so
// one shared signature is enough at the use site.
type MotionBox = ComponentType<HTMLMotionProps<'div'>>

const MOTION: Record<RevealTag, MotionBox> = {
  div: motion.div,
  span: motion.span as MotionBox,
  ul: motion.ul as MotionBox,
  ol: motion.ol as MotionBox,
  li: motion.li as MotionBox,
  section: motion.section as MotionBox,
  article: motion.article as MotionBox,
  figure: motion.figure as MotionBox,
  p: motion.p as MotionBox,
}

interface RevealProps {
  children?: ReactNode
  /** Entrance style. Sections are assigned distinct variants so the page
   *  never reads as one animation repeated eleven times. */
  variant?: RevealVariant
  /** Seconds before the entrance starts. */
  delay?: number
  /** Seconds between children. `stagger` only. */
  step?: number
  /** Fraction of the element that must be visible to trigger. */
  amount?: number
  /** Re-run every time the element re-enters the viewport. */
  repeat?: boolean
  as?: RevealTag
  className?: string
}

// Matches --ease-out in tokens.css.
const EASE = [0.16, 1, 0.3, 1] as const

const VARIANTS: Record<Exclude<RevealVariant, 'none' | 'stagger'>, Variants> = {
  'fade-rise': {
    hidden: { opacity: 0, y: 24 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  },
  'rule-draw': {
    hidden: { opacity: 0, scaleX: 0 },
    shown: { opacity: 1, scaleX: 1, transition: { duration: 0.7, ease: EASE } },
  },
  'mask-wipe': {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    shown: {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 0.75, ease: EASE },
    },
  },
  lift: {
    hidden: { opacity: 0, y: 40, scale: 0.985 },
    shown: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: EASE },
    },
  },
}

const STAGGER_ITEM: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

/**
 * Scroll-triggered entrance wrapper.
 *
 * Reduced motion is checked in JS, not CSS: framer-motion drives inline
 * styles and WAAPI, which the `prefers-reduced-motion` media block in
 * globals.css cannot reach. When reduced, this renders a plain element
 * with no motion props at all.
 *
 * Children pass through as a prop, so sections using this stay Server
 * Components — only the wrapper itself is client-side.
 */
export function Reveal({
  children,
  variant = 'fade-rise',
  delay = 0,
  step = 0.06,
  amount = 0.25,
  repeat = false,
  as = 'div',
  className,
}: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced || variant === 'none') {
    return createElement(as, { className }, children)
  }

  const viewport = { once: !repeat, amount, margin: '0px 0px -12% 0px' }
  const MotionTag = MOTION[as]

  if (variant === 'stagger') {
    const items = Children.toArray(children).filter(isValidElement)
    return (
      <MotionTag
        data-reveal=""
        className={className}
        initial="hidden"
        whileInView="shown"
        viewport={viewport}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: step, delayChildren: delay } },
        }}
      >
        {items.map((child, index) => (
          <motion.div key={child.key ?? index} variants={STAGGER_ITEM} data-reveal="">
            {child}
          </motion.div>
        ))}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      data-reveal=""
      className={cn(variant === 'rule-draw' && 'origin-left', className)}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      variants={VARIANTS[variant]}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
