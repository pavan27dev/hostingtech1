import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  /** Pixels of vertical travel across the viewport; negative moves opposite to scroll */
  speed?: number
  /** Optional rotation in degrees */
  rotate?: number
}

/** Scroll parallax layer — used to give sections depth. */
export function Parallax({ children, className, speed = 60, rotate = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate])
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div ref={ref} style={{ y, rotate: r }} className={className}>
      {children}
    </motion.div>
  )
}
