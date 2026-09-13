import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { cn } from '@/utils/cn'

interface Props {
  children: ReactNode
  className?: string
  /** Max tilt in degrees from mouse position */
  maxTilt?: number
  /** Extra rotateX applied as the element scrolls through the viewport */
  scrollTilt?: number
  /** Scale/lift on hover */
  lift?: boolean
}

/**
 * Perspective card that tilts toward the mouse and "stands up" as it scrolls
 * into view — the signature 3D-on-scroll effect used for dashboard mockups.
 */
export function Tilt3D({ children, className, maxTilt = 8, scrollTilt = 14, lift = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [maxTilt, -maxTilt]), { stiffness: 150, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-maxTilt, maxTilt]), { stiffness: 150, damping: 20 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scrollRx = useTransform(scrollYProgress, [0, 1], [scrollTilt, 0])
  const scrollY = useTransform(scrollYProgress, [0, 1], [60, 0])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [0.94, 1])

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  if (reduce) return <div className={className}>{children}</div>

  return (
    <div className="perspective">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: scrollRx, y: scrollY, scale: scrollScale, transformStyle: 'preserve-3d' }}
        className="will-change-transform"
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
          whileHover={lift ? { y: -6 } : undefined}
          className={cn('will-change-transform', className)}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}
