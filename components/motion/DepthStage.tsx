'use client'

import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface DepthStageProps {
  children: ReactNode
  className?: string
  surfaceClassName?: string
  intensity?: number
}

/**
 * A local perspective stage for important visual artefacts.
 * Motion is pointer-driven, never autonomous, and is disabled for coarse
 * pointers and reduced-motion preferences.
 */
export function DepthStage({
  children,
  className,
  surfaceClassName,
  intensity = 3.5,
}: DepthStageProps) {
  const surfaceRef = useRef<HTMLDivElement>(null)
  const enabledRef = useRef(false)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => {
      enabledRef.current = finePointer.matches && !reducedMotion.matches
    }

    sync()
    finePointer.addEventListener('change', sync)
    reducedMotion.addEventListener('change', sync)

    return () => {
      finePointer.removeEventListener('change', sync)
      reducedMotion.removeEventListener('change', sync)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const setRotation = (rotateX: number, rotateY: number) => {
    if (!surfaceRef.current) return
    surfaceRef.current.style.setProperty('--local-rx', `${rotateX.toFixed(2)}deg`)
    surfaceRef.current.style.setProperty('--local-ry', `${rotateY.toFixed(2)}deg`)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabledRef.current || !surfaceRef.current) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      setRotation((0.5 - y) * intensity, (x - 0.5) * intensity)
    })
  }

  const handlePointerLeave = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => setRotation(0, 0))
  }

  return (
    <div
      className={cn('depth-stage', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ '--depth-stage-intensity': intensity } as CSSProperties}
    >
      <div ref={surfaceRef} className={cn('depth-stage__surface', surfaceClassName)}>
        {children}
      </div>
    </div>
  )
}
