'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { portfolio } from '@/data/portfolio'

/** Short, elegant intro: initials + a thin progress line, then reveals the
 *  page. Never blocks content for long and is skipped under reduced motion. */
export function Loader() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reduce) {
      setDone(true)
      return
    }
    let frame = 0
    let value = 0
    const tick = () => {
      value += Math.max(1, (100 - value) * 0.08)
      setProgress(Math.min(100, value))
      if (value < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 260)
      }
    }
    frame = requestAnimationFrame(tick)
    // Hard cap so the loader never overstays.
    const cap = setTimeout(() => setDone(true), 1800)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(cap)
    }
  }, [reduce])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-base-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-display text-5xl font-bold text-gradient"
            >
              {portfolio.person.initials}
            </motion.div>
            <div className="h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-violet to-accent-cyan"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink-faint">Loading portfolio</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
