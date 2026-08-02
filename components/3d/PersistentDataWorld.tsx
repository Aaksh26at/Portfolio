'use client'

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const POINT_COUNT = 168
const STAGE_COUNT = 6

type PointerState = { x: number; y: number }

function seeded(index: number, salt: number) {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

function pointOnSegment(
  segment: readonly [number, number, number, number],
  progress: number,
) {
  return [
    THREE.MathUtils.lerp(segment[0], segment[2], progress),
    THREE.MathUtils.lerp(segment[1], segment[3], progress),
  ] as const
}

function createFormation(stage: number) {
  const positions = new Float32Array(POINT_COUNT * 3)

  for (let index = 0; index < POINT_COUNT; index += 1) {
    const offset = index * 3
    const progress = index / POINT_COUNT
    const jitter = (seeded(index, stage + 2) - 0.5) * 0.16

    if (stage === 0) {
      const y = 1 - progress * 2
      const radius = Math.sqrt(Math.max(0, 1 - y * y))
      const angle = index * Math.PI * (3 - Math.sqrt(5))
      positions[offset] = Math.cos(angle) * radius * 2.2
      positions[offset + 1] = y * 1.8
      positions[offset + 2] = Math.sin(angle) * radius * 2.2
      continue
    }

    if (stage === 1) {
      const centers = [
        [-2.2, 0.45, 0.1],
        [0.15, -0.55, -0.35],
        [2.25, 0.55, 0.25],
      ]
      const cluster = index % centers.length
      const local = Math.floor(index / centers.length)
      const angle = local * 2.39996
      const radius = 0.28 + seeded(index, 4) * 0.82
      positions[offset] = centers[cluster][0] + Math.cos(angle) * radius
      positions[offset + 1] = centers[cluster][1] + Math.sin(angle) * radius
      positions[offset + 2] = centers[cluster][2] + (seeded(index, 8) - 0.5) * 1.25
      continue
    }

    if (stage === 2) {
      const cluster = index % 4
      const local = Math.floor(index / 4)
      const angle = (local / (POINT_COUNT / 4)) * Math.PI * 2
      positions[offset] = -2.7 + cluster * 1.8 + Math.cos(angle) * 0.56
      positions[offset + 1] = Math.sin(angle) * (0.78 + cluster * 0.08)
      positions[offset + 2] = Math.sin(angle * 2) * 0.52 + (cluster - 1.5) * 0.12
      continue
    }

    if (stage === 3) {
      const x = -3.45 + progress * 6.9
      const angle = progress * Math.PI * 7
      positions[offset] = x
      positions[offset + 1] = Math.sin(angle) * 0.86
      positions[offset + 2] = Math.cos(angle) * 0.86
      continue
    }

    if (stage === 4) {
      const column = index % 14
      const row = Math.floor(index / 14)
      positions[offset] = (column - 6.5) * 0.43
      positions[offset + 1] = (row - 5.5) * 0.3 + column * 0.075
      positions[offset + 2] = Math.sin(column * 0.72 + row * 0.4) * 0.38
      continue
    }

    const segments: ReadonlyArray<readonly [number, number, number, number]> = [
      [-3.4, -1.8, -2.35, 1.85],
      [-2.35, 1.85, -1.25, -1.8],
      [-2.95, -0.35, -1.75, -0.35],
      [-0.45, -1.8, 0.65, 1.85],
      [0.65, 1.85, 1.72, -1.8],
      [0.02, -0.35, 1.25, -0.35],
    ]
    const segmentIndex = index % segments.length
    const sample = Math.floor(index / segments.length)
    const samplesPerSegment = Math.ceil(POINT_COUNT / segments.length)
    const segmentProgress = sample / Math.max(1, samplesPerSegment - 1)
    const [x, y] = pointOnSegment(segments[segmentIndex], segmentProgress)
    positions[offset] = x + jitter
    positions[offset + 1] = y + jitter * 0.5
    positions[offset + 2] = (seeded(index, 11) - 0.5) * 0.45
  }

  return positions
}

function readSceneColor(token: string) {
  const values = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim()
    .split(/\s+/)
    .map(Number)
  return new THREE.Color().setRGB(values[0] || 0, values[1] || 0, values[2] || 0, THREE.SRGBColorSpace)
}

function readNumberToken(token: string) {
  return Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue(token)) || 0
}

function DataWorldScene({
  stageRef,
  pointerRef,
  paletteVersion,
}: {
  stageRef: MutableRefObject<number>
  pointerRef: MutableRefObject<PointerState>
  paletteVersion: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Group>(null)
  const pointsGeometryRef = useRef<THREE.BufferGeometry>(null)
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null)
  const { viewport } = useThree()

  const formations = useMemo(
    () => Array.from({ length: STAGE_COUNT }, (_, stage) => createFormation(stage)),
    [],
  )
  const currentPositions = useMemo(() => {
    const positions = new Float32Array(POINT_COUNT * 3)
    for (let index = 0; index < POINT_COUNT; index += 1) {
      const offset = index * 3
      positions[offset] = (seeded(index, 20) - 0.5) * 9
      positions[offset + 1] = (seeded(index, 21) - 0.5) * 6
      positions[offset + 2] = (seeded(index, 22) - 0.5) * 5
    }
    return positions
  }, [])
  const linePositions = useMemo(() => new Float32Array(Math.floor(POINT_COUNT / 3) * 6), [])
  const palette = {
    accent: readSceneColor('--world-color-accent'),
    ink: readSceneColor('--world-color-ink'),
    muted: readSceneColor('--world-color-muted'),
    pointSize: readNumberToken('--world-point-size'),
    lineOpacity: readNumberToken('--world-line-opacity'),
  }

  useFrame((_, delta) => {
    const stage = Math.min(STAGE_COUNT - 1, Math.max(0, stageRef.current))
    const target = formations[stage]
    const positionEase = 1 - Math.exp(-delta * 3.4)

    for (let index = 0; index < currentPositions.length; index += 1) {
      currentPositions[index] = THREE.MathUtils.lerp(currentPositions[index], target[index], positionEase)
    }

    let lineOffset = 0
    for (let index = 0; index < POINT_COUNT - 2; index += 3) {
      const start = index * 3
      const end = (index + 1) * 3
      linePositions[lineOffset] = currentPositions[start]
      linePositions[lineOffset + 1] = currentPositions[start + 1]
      linePositions[lineOffset + 2] = currentPositions[start + 2]
      linePositions[lineOffset + 3] = currentPositions[end]
      linePositions[lineOffset + 4] = currentPositions[end + 1]
      linePositions[lineOffset + 5] = currentPositions[end + 2]
      lineOffset += 6
    }

    const pointsAttribute = pointsGeometryRef.current?.getAttribute('position')
    const linesAttribute = linesGeometryRef.current?.getAttribute('position')
    if (pointsAttribute) pointsAttribute.needsUpdate = true
    if (linesAttribute) linesAttribute.needsUpdate = true

    const group = groupRef.current
    if (!group) return
    const wide = viewport.width > 8
    const offsets = [1.65, 1.75, 0.7, -1.1, 1.2, 0]
    const targetX = wide ? offsets[stage] : 0
    const targetScale = wide ? [1, 0.94, 0.94, 1.06, 0.98, 1.04][stage] : 0.78
    group.position.x = THREE.MathUtils.damp(group.position.x, targetX, 3.5, delta)
    group.position.y = THREE.MathUtils.damp(group.position.y, pointerRef.current.y * -0.18, 4, delta)
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, pointerRef.current.y * -0.1, 4, delta)
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, pointerRef.current.x * 0.14, 4, delta)
    group.scale.setScalar(THREE.MathUtils.damp(group.scale.x, targetScale, 3.5, delta))

    if (ringRef.current) {
      ringRef.current.rotation.x = THREE.MathUtils.damp(
        ringRef.current.rotation.x,
        0.72 + pointerRef.current.y * 0.16 + stage * 0.035,
        3,
        delta,
      )
      ringRef.current.rotation.y = THREE.MathUtils.damp(
        ringRef.current.rotation.y,
        pointerRef.current.x * 0.18 - stage * 0.06,
        3,
        delta,
      )
    }
  })

  return (
    <group ref={groupRef} name={`data-world-palette-${paletteVersion}`}>
      <points frustumCulled={false}>
        <bufferGeometry ref={pointsGeometryRef}>
          <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={palette.accent}
          size={palette.pointSize}
          sizeAttenuation
          transparent
          opacity={0.88}
          depthWrite={false}
        />
      </points>

      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={linesGeometryRef}>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={palette.muted}
          transparent
          opacity={palette.lineOpacity}
          depthWrite={false}
        />
      </lineSegments>

      <mesh>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshBasicMaterial color={palette.ink} wireframe transparent opacity={0.22} depthWrite={false} />
      </mesh>

      <group ref={ringRef}>
        <mesh rotation={[0, 0, 0.45]}>
          <torusGeometry args={[2.7, 0.008, 3, 96]} />
          <meshBasicMaterial color={palette.ink} transparent opacity={0.14} depthWrite={false} />
        </mesh>
        <mesh rotation={[1.05, 0.35, -0.2]}>
          <torusGeometry args={[1.72, 0.01, 3, 80]} />
          <meshBasicMaterial color={palette.accent} transparent opacity={0.24} depthWrite={false} />
        </mesh>
      </group>
    </group>
  )
}

export function PersistentDataWorld() {
  const stageRef = useRef(0)
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 })
  const [canRender, setCanRender] = useState(false)
  const [ready, setReady] = useState(false)
  const [paletteVersion, setPaletteVersion] = useState(0)

  useEffect(() => {
    const refreshPalette = () => setPaletteVersion((version) => version + 1)
    window.addEventListener('portfolio-theme-change', refreshPalette)
    return () => window.removeEventListener('portfolio-theme-change', refreshPalette)
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const canvas = document.createElement('canvas')
    const hasWebGL = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    setCanRender(hasWebGL && !reducedMotion.matches)

    const chapterMotion = window.matchMedia('(min-width: 40rem)')
    const chapters = chapterMotion.matches
      ? Array.from(document.querySelectorAll<HTMLElement>('[data-world]'))
      : []
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const stage = Number((entry.target as HTMLElement).dataset.world)
          if (Number.isFinite(stage)) stageRef.current = stage
        }
      },
      { rootMargin: '-38% 0px -38% 0px', threshold: 0 },
    )
    chapters.forEach((chapter) => observer.observe(chapter))

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return
      pointerRef.current.x = event.clientX / window.innerWidth - 0.5
      pointerRef.current.y = event.clientY / window.innerHeight - 0.5
    }
    const onPointerLeave = () => {
      pointerRef.current.x = 0
      pointerRef.current.y = 0
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)

    return () => {
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <div className="data-world" data-ready={ready ? 'true' : 'false'} aria-hidden="true">
      <div className="data-world__fallback" />
      {canRender ? (
        <Canvas
          className="data-world__canvas"
          camera={{ position: [0, 0, 8.5], fov: 48, near: 0.1, far: 40 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
          onCreated={() => setReady(true)}
        >
          <DataWorldScene
            stageRef={stageRef}
            pointerRef={pointerRef}
            paletteVersion={paletteVersion}
          />
        </Canvas>
      ) : null}
    </div>
  )
}
