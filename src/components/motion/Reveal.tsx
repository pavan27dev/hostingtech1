import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useMediaQuery } from '@/hooks'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none' | 'depth'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: Direction
  /** Amount of the element that must be visible before triggering */
  amount?: number
  once?: boolean
}

const offsets: Record<Direction, { x?: number; y?: number; z?: number; rotateX?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
  depth: { z: -120, rotateX: 12, y: 24 },
}

/** Scroll-triggered reveal wrapper. */
/** Horizontal offsets can cause side-scroll on narrow screens — fold them into 'up' below lg. */
function useSafeDirection(direction: Direction): Direction {
  const narrow = useMediaQuery('(max-width: 1023px)')
  return narrow && (direction === 'left' || direction === 'right') ? 'up' : direction
}

export function Reveal({ children, className, delay = 0, direction: dirProp = 'up', amount = 0.2, once = true }: RevealProps) {
  const reduce = useReducedMotion()
  const direction = useSafeDirection(dirProp)
  const o = offsets[direction]
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, ...o },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      style={direction === 'depth' ? { transformPerspective: 1200 } : undefined}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  stagger?: number
  amount?: number
}

/** Parent that staggers its `RevealItem` children. */
export function Stagger({ children, className, stagger = 0.08, amount = 0.15 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className, direction: dirProp = 'up' }: { children: ReactNode; className?: string; direction?: Direction }) {
  const reduce = useReducedMotion()
  const direction = useSafeDirection(dirProp)
  const o = offsets[direction]
  return (
    <motion.div
      className={className}
      style={direction === 'depth' ? { transformPerspective: 1200 } : undefined}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, ...o },
        visible: { opacity: 1, x: 0, y: 0, z: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}
