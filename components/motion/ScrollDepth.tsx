'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null
  return <PersistentDataWorld />
}
