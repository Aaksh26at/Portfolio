'use client'

import dynamic from 'next/dynamic'

const PersistentDataWorld = dynamic(
  () => import('@/components/3d/PersistentDataWorld').then((module) => module.PersistentDataWorld),
  {
    ssr: false,
    loading: () => (
      <div className="data-world" aria-hidden="true">
        <div className="data-world__fallback" />
      </div>
    ),
  },
)

export function ScrollDepth() {
  return <PersistentDataWorld />
}
