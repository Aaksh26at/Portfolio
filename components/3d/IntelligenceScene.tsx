'use client'

import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Line, AdaptiveDpr, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'

const ACCENTS = ['#22D3EE', '#06B6D4', '#0EA5E9', '#3B82F6']

interface NodeDef {
  position: [number, number, number]
  size: number
  color: string
  label?: string
}

/** Deterministic-enough node layout on a sphere (client-only, no SSR). */
function buildNodes(count: number): NodeDef[] {
  const nodes: NodeDef[] = []
  const labels = ['Python', 'SQL', 'AI', 'ML', 'Analytics']
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere distribution for even spacing
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    const r = 2.4
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)
    nodes.push({
      position: [x, y, z],
      size: 0.05 + (i % 3) * 0.02,
      color: ACCENTS[i % ACCENTS.length],
      label: i < labels.length ? labels[i] : undefined,
    })
  }
  return nodes
}

function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 2.4
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = radius * Math.sin(p) * Math.cos(t)
      arr[i * 3 + 1] = radius * Math.sin(p) * Math.sin(t)
      arr[i * 3 + 2] = radius * Math.cos(p)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.02
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#22D3EE"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function DataPulse({ from, to, color, offset }: { from: THREE.Vector3; to: THREE.Vector3; color: string; offset: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = (state.clock.elapsedTime * 0.35 + offset) % 1
    ref.current.position.lerpVectors(from, to, t)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  )
}

function Core({ nodes, isMobile }: { nodes: NodeDef[]; isMobile: boolean }) {
  const group = useRef<THREE.Group>(null)

  // Connect each node to its 2 nearest neighbours (kept sparse for clarity).
  const connections = useMemo(() => {
    const vecs = nodes.map((n) => new THREE.Vector3(...n.position))
    const conns: { a: THREE.Vector3; b: THREE.Vector3; color: string; offset: number }[] = []
    for (let i = 0; i < vecs.length; i++) {
      const dists = vecs
        .map((v, j) => ({ j, d: vecs[i].distanceTo(v) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
      for (const { j } of dists) {
        if (j > i) {
          conns.push({ a: vecs[i], b: vecs[j], color: nodes[i].color, offset: (i + j) * 0.13 })
        }
      }
    }
    return conns
  }, [nodes])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.08
    // subtle cursor parallax
    const px = state.pointer.x * 0.25
    const py = state.pointer.y * 0.25
    group.current.rotation.x += (py - group.current.rotation.x) * 0.05
    group.current.position.x += (px - group.current.position.x) * 0.05
  })

  return (
    <group ref={group}>
      {/* translucent glass-like core */}
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.5}>
        <Icosahedron args={[1.35, 1]}>
          <meshStandardMaterial
            color="#0EA5E9"
            transparent
            opacity={0.16}
            roughness={0.1}
            metalness={0.4}
            emissive="#0C4A6E"
            emissiveIntensity={0.4}
          />
        </Icosahedron>
        <Icosahedron args={[1.36, 1]}>
          <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.35} />
        </Icosahedron>
      </Float>

      {/* connection lines */}
      {connections.map((c, i) => (
        <Line
          key={`line-${i}`}
          points={[c.a, c.b]}
          color={c.color}
          lineWidth={0.6}
          transparent
          opacity={0.18}
        />
      ))}

      {/* data pulses (fewer on mobile) */}
      {connections.slice(0, isMobile ? 4 : connections.length).map((c, i) => (
        <DataPulse key={`pulse-${i}`} from={c.a} to={c.b} color={c.color} offset={c.offset} />
      ))}

      {/* nodes */}
      {nodes.map((n, i) => (
        <mesh key={`node-${i}`} position={n.position}>
          <sphereGeometry args={[n.size, 12, 12]} />
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* skill labels */}
      {nodes
        .filter((n) => n.label)
        .map((n, i) => (
          <Html
            key={`label-${i}`}
            position={n.position}
            center
            distanceFactor={9}
            zIndexRange={[10, 0]}
            wrapperClass="pointer-events-none"
          >
            <span className="whitespace-nowrap rounded-full border border-white/10 bg-base-800/80 px-2 py-0.5 text-[10px] font-medium text-ink-muted backdrop-blur">
              {n.label}
            </span>
          </Html>
        ))}
    </group>
  )
}

export default function IntelligenceScene() {
  const [isMobile, setIsMobile] = useState(false)
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    // Pause rendering while the tab is hidden to save GPU/battery.
    const onVisibility = () => setFrameloop(document.hidden ? 'never' : 'always')
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const nodes = useMemo(() => buildNodes(isMobile ? 7 : 11), [isMobile])
  const particleCount = isMobile ? 120 : 320

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, isMobile ? 1.5 : 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={40} color="#22D3EE" />
        <pointLight position={[-5, -3, 2]} intensity={30} color="#3B82F6" />
        <Core nodes={nodes} isMobile={isMobile} />
        <ParticleField count={particleCount} />
      </Suspense>
      <AdaptiveDpr pixelated={false} />
    </Canvas>
  )
}
