'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin gradient progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[80] h-0.5 origin-left bg-gradient-to-r from-accent via-accent-violet to-accent-cyan"
    />
  )
}
