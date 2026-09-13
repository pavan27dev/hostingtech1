import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * Ambient 3D shapes that drift and rotate with page scroll. Rendered fixed
 * behind the page content (pointer-events: none) so every section feels 3D.
 */

interface Props {
  scrollRef: React.MutableRefObject<number>
  density?: number
}

const palette = ['#3461ff', '#14b8a6', '#8b5cf6', '#f59e0b', '#fb7185']

function Shapes({ scrollRef, density = 14 }: Props) {
  const group = useRef<THREE.Group>(null)
  const items = useMemo(() => {
    const rng = mulberry32(7)
    return Array.from({ length: density }, (_, i) => ({
      kind: i % 3,
      pos: [(rng() - 0.5) * 16, (rng() - 0.5) * 12, -2 - rng() * 6] as [number, number, number],
      rot: [rng() * Math.PI, rng() * Math.PI, 0] as [number, number, number],
      size: 0.25 + rng() * 0.5,
      color: palette[i % palette.length],
      speed: 0.3 + rng() * 0.8,
    }))
  }, [density])

  useFrame((state, dt) => {
    if (!group.current) return
    const s = scrollRef.current
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, s * 0.6, 2, dt)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, s * 6, 2, dt)
    group.current.children.forEach((c, i) => {
      c.rotation.x += dt * 0.2 * items[i].speed
      c.rotation.y += dt * 0.15 * items[i].speed
    })
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 9 - s * 1.5, 2, dt)
  })

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <Float key={i} speed={it.speed} floatIntensity={1.2} rotationIntensity={0.4}>
          <mesh position={it.pos} rotation={it.rot}>
            {it.kind === 0 && <icosahedronGeometry args={[it.size, 0]} />}
            {it.kind === 1 && <torusGeometry args={[it.size, it.size * 0.32, 12, 32]} />}
            {it.kind === 2 && <octahedronGeometry args={[it.size, 0]} />}
            <meshStandardMaterial color={it.color} roughness={0.45} metalness={0.1} transparent opacity={0.85} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function mulberry32(a: number) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function FloatingShapes(props: Props) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 45 }} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Shapes {...props} />
    </Canvas>
  )
}
