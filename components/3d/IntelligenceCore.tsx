'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { SceneFallback } from './SceneFallback'

// Lazy-load the WebGL scene on the client only. The Three.js bundle never
// blocks page content and always has a token-driven static fallback.
const IntelligenceScene = dynamic(() => import('./IntelligenceScene'), {
  ssr: false,
  loading: () => <SceneFallback />,
})

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/** Uses the fallback for reduced-motion preferences or missing WebGL support. */
export function IntelligenceCore({ className }: { className?: string }) {
  const [render3D, setRender3D] = useState<boolean | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setRender3D(!reduced && supportsWebGL())
  }, [])

  return (
    <div
      className={className}
      role="img"
      aria-label="Interactive 3D data lattice connecting source signals to an analysis core"
    >
      {render3D === null ? <SceneFallback /> : render3D ? <IntelligenceScene /> : <SceneFallback />}
    </div>
  )
}
