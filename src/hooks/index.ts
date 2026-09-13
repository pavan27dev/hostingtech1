import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export { useSEO, organizationJsonLd } from './useSEO'

/** Scroll to top on route change (respects hash anchors). */
export function useScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
}

/** Tailwind-aligned media query hook */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false))
  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    setMatches(mql.matches)
    return () => mql.removeEventListener('change', handler)
  }, [query])
  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/**
 * Heuristic: skip expensive WebGL scenes on small / low-powered devices.
 * Rich 3D still renders on tablets and desktops.
 */
export function useCanRender3D() {
  const reduced = usePrefersReducedMotion()
  const mobile = useIsMobile()
  const [ok, setOk] = useState(false)
  useEffect(() => {
    if (reduced) return setOk(false)
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
    const lowMemory = (nav.deviceMemory ?? 8) < 2
    const saveData = nav.connection?.saveData === true
    const cores = navigator.hardwareConcurrency ?? 4
    setOk(!(lowMemory || saveData || (mobile && cores < 4)))
  }, [reduced, mobile])
  return ok
}
