'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { AdaptiveDpr, Line } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SceneFallback } from './SceneFallback'

interface ScenePalette {
  accent: THREE.Color
  ink: THREE.Color
  muted: THREE.Color
  surface: THREE.Color
  rule: THREE.Color
}

interface NodeDef {
  position: [number, number, number]
  size: number
}

const TOKEN_NAMES: Record<keyof ScenePalette, string> = {
  accent: '--color-accent',
  ink: '--color-ink',
  muted: '--color-muted',
  surface: '--color-paper-3',
  rule: '--color-rule',
}

function resolveCssColor(token: string): THREE.Color {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const context = canvas.getContext('2d', { willReadFrequently: true })

  if (!context || !value) return new THREE.Color()
  context.clearRect(0, 0, 1, 1)
  context.fillStyle = value
  context.fillRect(0, 0, 1, 1)
  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data
  return new THREE.Color().setRGB(
    red / 255,
    green / 255,
    blue / 255,
    THREE.SRGBColorSpace,
  )
}

function useScenePalette() {
  const [palette, setPalette] = useState<ScenePalette | null>(null)

  useEffect(() => {
    setPalette(
      Object.fromEntries(
        Object.entries(TOKEN_NAMES).map(([name, token]) => [name, resolveCssColor(token)]),
      ) as unknown as ScenePalette,
    )
  }, [])

  return palette
}

function buildNodes(count: number): NodeDef[] {
  return Array.from({ length: count }, (_, index) => {
    const phi = Math.acos(1 - (2 * (index + 0.5)) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * index
    const radius = 2.28
    return {
      position: [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ],
      size: 0.045 + (index % 3) * 0.018,
    }
  })
}

function buildParticlePositions(count: number) {
  const positions = new Float32Array(count * 3)
  for (let index = 0; index < count; index++) {
    const radius = 3.1 + ((index * 17) % 29) / 16
    const theta = index * 2.399963
    const phi = Math.acos(1 - (2 * (index + 0.5)) / count)
    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[index * 3 + 2] = radius * Math.cos(phi)
  }
  return positions
}

function ParticleField({ count, color }: { count: number; color: THREE.Color }) {
  const positions = useMemo(() => buildParticlePositions(count), [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color={color}
        transparent
        opacity={0.32}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function IntelligenceLattice({
  nodes,
  palette,
}: {
  nodes: NodeDef[]
  palette: ScenePalette
}) {
  const groupRef = useRef<THREE.Group>(null)
  const connections = useMemo(
    () =>
      nodes.map((node, index) => ({
        start: node.position,
        end: nodes[(index + 3) % nodes.length].position,
      })),
    [nodes],
  )

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.28,
      5,
      delta,
    )
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.42,
      5,
      delta,
    )
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      state.pointer.x * 0.16,
      5,
      delta,
    )
  })

  return (
    <group ref={groupRef} rotation={[0.12, -0.22, 0.04]}>
      <mesh>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial
          color={palette.surface}
          roughness={0.58}
          metalness={0.18}
          transparent
          opacity={0.62}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.215, 2]} />
        <meshBasicMaterial color={palette.accent} wireframe transparent opacity={0.58} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0.18, 0]}>
        <torusGeometry args={[1.68, 0.012, 8, 96]} />
        <meshBasicMaterial color={palette.rule} transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[0.35, Math.PI / 2, 0.42]}>
        <torusGeometry args={[1.93, 0.009, 8, 96]} />
        <meshBasicMaterial color={palette.muted} transparent opacity={0.36} />
      </mesh>

      {connections.map((connection, index) => (
        <Line
          key={`connection-${index}`}
          points={[connection.start, connection.end]}
          color={index % 4 === 0 ? palette.accent : palette.rule}
          lineWidth={0.6}
          transparent
          opacity={index % 4 === 0 ? 0.62 : 0.36}
        />
      ))}

      {nodes.map((node, index) => (
        <mesh key={`node-${index}`} position={node.position}>
          <sphereGeometry args={[node.size, 12, 12]} />
          <meshStandardMaterial
            color={index % 4 === 0 ? palette.accent : palette.ink}
            emissive={index % 4 === 0 ? palette.accent : palette.surface}
            emissiveIntensity={index % 4 === 0 ? 0.42 : 0.08}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function IntelligenceScene() {
  const palette = useScenePalette()
  const [isMobile, setIsMobile] = useState(false)
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 48rem)')
    const syncMobile = () => setIsMobile(mobileQuery.matches)
    const syncVisibility = () => setFrameloop(document.hidden ? 'never' : 'always')

    syncMobile()
    mobileQuery.addEventListener('change', syncMobile)
    document.addEventListener('visibilitychange', syncVisibility)

    return () => {
      mobileQuery.removeEventListener('change', syncMobile)
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])

  const nodes = useMemo(() => buildNodes(isMobile ? 8 : 12), [isMobile])

  if (!palette) return <SceneFallback />

  return (
    <Canvas
      aria-hidden="true"
      frameloop={frameloop}
      dpr={[1, isMobile ? 1.15 : 1.5]}
      camera={{ position: [0, 0, 6.3], fov: 43 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', touchAction: 'pan-y' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1.25} color={palette.ink} />
        <directionalLight position={[4, 5, 5]} intensity={2.1} color={palette.accent} />
        <directionalLight position={[-4, -2, 3]} intensity={0.8} color={palette.muted} />
        <IntelligenceLattice nodes={nodes} palette={palette} />
        <ParticleField count={isMobile ? 48 : 84} color={palette.muted} />
      </Suspense>
      <AdaptiveDpr pixelated={false} />
    </Canvas>
  )
}
