import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox, ContactShadows } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

/**
 * Hero 3D scene — abstract "software blocks" orbiting a glass core.
 * Light-theme friendly: pastel materials, soft shadows, no dark backgrounds.
 * `scroll` (0..1) is driven by the parent to rotate/zoom as the user scrolls.
 */

interface SceneProps {
  scrollRef: React.MutableRefObject<number>
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}

function Core({ scrollRef, mouseRef }: SceneProps) {
  const group = useRef<THREE.Group>(null)
  useFrame((state, dt) => {
    if (!group.current) return
    const s = scrollRef.current
    const targetY = state.clock.elapsedTime * 0.15 + s * Math.PI * 0.9 + mouseRef.current.x * 0.35
    const targetX = -0.2 + s * 0.6 + mouseRef.current.y * 0.25
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3, dt)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3, dt)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, 0.9 - s * 1.4, 3, dt)
    const sc = 1 - s * 0.25
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, sc, 3, dt))
  })

  return (
    <group ref={group} position={[0.6, 0.9, 0]}>
      {/* Glass core */}
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <RoundedBox args={[1.6, 1.6, 1.6]} radius={0.22} smoothness={6}>
          <meshPhysicalMaterial
            color="#dbe7ff"
            roughness={0.08}
            metalness={0.05}
            transmission={0.85}
            thickness={1.2}
            ior={1.35}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.95}
          />
        </RoundedBox>
      </Float>

      {/* Orbiting solid blocks */}
      <Orbit radius={2.3} count={6} size={0.42} color="#3461ff" speed={0.35} tilt={0.35} />
      <Orbit radius={3.1} count={8} size={0.26} color="#14b8a6" speed={-0.22} tilt={-0.5} />
      <Orbit radius={1.55} count={4} size={0.2} color="#f59e0b" speed={0.6} tilt={1.1} />
    </group>
  )
}

function Orbit({ radius, count, size, color, speed, tilt }: { radius: number; count: number; size: number; color: string; speed: number; tilt: number }) {
  const ref = useRef<THREE.Group>(null)
  const items = useMemo(() => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2), [count])
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += speed * dt
  })
  return (
    <group ref={ref} rotation={[tilt, 0, tilt * 0.4]}>
      {items.map((a, i) => (
        <Float key={i} speed={2} floatIntensity={0.3} rotationIntensity={0.6}>
          <RoundedBox args={[size, size, size]} radius={size * 0.2} position={[Math.cos(a) * radius, Math.sin(a * 2) * 0.25, Math.sin(a) * radius]}>
            <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
          </RoundedBox>
        </Float>
      ))}
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 120]} />
        <meshBasicMaterial color="#c9d6ff" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

export default function HeroScene(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 10.5], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      {/* Self-contained lighting — no external HDR assets */}
      <hemisphereLight args={['#ffffff', '#dbe7ff', 1.1]} />
      <directionalLight position={[4, 6, 5]} intensity={1.8} />
      <directionalLight position={[-5, -2, -4]} intensity={0.6} color="#dbe7ff" />
      <pointLight position={[0, 3, 3]} intensity={12} color="#8eb3ff" distance={12} />
      <Core {...props} />
      <ContactShadows position={[0, -2.6, 0]} opacity={0.28} scale={12} blur={2.6} far={4} color="#1d3ff5" />
    </Canvas>
  )
}
