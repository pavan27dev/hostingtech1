import { lazy, Suspense, useEffect, useRef } from 'react'
import { useCanRender3D } from '@/hooks'
import { SceneErrorBoundary } from './SceneErrorBoundary'

const FloatingShapes = lazy(() => import('./FloatingShapes'))

/**
 * Fixed full-page 3D backdrop that reacts to scroll. Lazy-loaded and skipped
 * on low-powered devices / reduced motion. Content sits above it (z-index).
 */
export function SceneBackground() {
  const can3D = useCanRender3D()
  const scrollRef = useRef(0)

  useEffect(() => {
    if (!can3D) return
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? window.scrollY / max : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [can3D])

  if (!can3D) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]">
      <SceneErrorBoundary>
        <Suspense fallback={null}>
          <FloatingShapes scrollRef={scrollRef} />
        </Suspense>
      </SceneErrorBoundary>
    </div>
  )
}
