'use client'

import { useCallback, useEffect, useRef } from 'react'

interface PointerOffsetOptions {
  /** Maximum travel in px along each axis. */
  strength?: number
  /** Custom property names written on the target element. */
  varX?: string
  varY?: string
}

/**
 * Pointer-follow offset for a single element, expressed as CSS custom
 * properties so the transform stays in CSS and never triggers a React
 * render.
 *
 * Motion is opt-out by capability, matching the project's motion stance:
 * disabled for coarse pointers (where there is no hover to track) and
 * for `prefers-reduced-motion`. Both are watched live, so toggling the
 * OS setting takes effect without a reload.
 *
 * Extracted from the retired DepthStage component — `design.md` bans
 * panel tilt, but the capability guard it had was correct and is reused
 * here for button magnetism.
 */
export function usePointerOffset<T extends HTMLElement>({
  strength = 10,
  varX = '--mx',
  varY = '--my',
}: PointerOffsetOptions = {}) {
  const ref = useRef<T>(null)
  const enabledRef = useRef(false)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => {
      const next = finePointer.matches && !reducedMotion.matches
      enabledRef.current = next
      // Snap back to rest if the capability disappears mid-session.
      if (!next && ref.current) {
        ref.current.style.setProperty(varX, '0px')
        ref.current.style.setProperty(varY, '0px')
      }
    }

    sync()
    finePointer.addEventListener('change', sync)
    reducedMotion.addEventListener('change', sync)

    return () => {
      finePointer.removeEventListener('change', sync)
      reducedMotion.removeEventListener('change', sync)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [varX, varY])

  const write = useCallback(
    (x: number, y: number) => {
      const node = ref.current
      if (!node) return
      node.style.setProperty(varX, `${x.toFixed(2)}px`)
      node.style.setProperty(varY, `${y.toFixed(2)}px`)
    },
    [varX, varY],
  )

  const onPointerMove = useCallback(
    (event: { clientX: number; clientY: number; currentTarget: HTMLElement }) => {
      if (!enabledRef.current || strength === 0) return
      const rect = event.currentTarget.getBoundingClientRect()
      const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)

      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        write(
          Math.max(-1, Math.min(1, x)) * strength,
          Math.max(-1, Math.min(1, y)) * strength,
        )
      })
    },
    [strength, write],
  )

  const onPointerLeave = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => write(0, 0))
  }, [write])

  return { ref, onPointerMove, onPointerLeave }
}
