'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { SceneFallback } from './SceneFallback'

// Lazy-load the WebGL scene on the client only. The heavy three.js bundle is
// never part of the initial payload and never blocks page content.
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

/** Decides whether to render the interactive 3D scene or the CSS fallback.
 *  Uses the fallback for reduced-motion preference or missing WebGL support. */
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
      aria-label="Interactive 3D visualisation of a data intelligence core with connected nodes labelled Python, SQL, AI, ML and Analytics"
    >
      {/* Before hydration decision, and in the fallback case, show the static art. */}
      {render3D === null ? <SceneFallback /> : render3D ? <IntelligenceScene /> : <SceneFallback />}
    </div>
  )
}
