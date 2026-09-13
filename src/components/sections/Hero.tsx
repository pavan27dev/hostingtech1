import { lazy, Suspense, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DashboardPreview } from '@/components/mockups/DashboardPreview'
import { Tilt3D } from '@/components/motion/Tilt3D'
import { buildWhatsAppLink } from '@/config/whatsapp'
import { targetIndustries } from '@/data/services'
import { trackEvent } from '@/utils/tracking'
import { useCanRender3D } from '@/hooks'
import { SceneErrorBoundary } from '@/components/three/SceneErrorBoundary'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const scrollRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const can3D = useCanRender3D()
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2])

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => (scrollRef.current = v))
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      unsub()
      window.removeEventListener('mousemove', onMove)
    }
  }, [scrollYProgress])

  return (
    <section ref={ref} className="relative overflow-hidden bg-white">
      {/* Backdrop */}
      <div aria-hidden className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(52,97,255,0.14),transparent)] blur-2xl" />
      <div aria-hidden className="absolute -right-32 top-40 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.16),transparent)] blur-2xl" />

      {/* 3D scene (right/behind on desktop) */}
      {can3D && (
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <SceneErrorBoundary>
            <Suspense fallback={null}>
              <HeroScene scrollRef={scrollRef} mouseRef={mouseRef} />
            </Suspense>
          </SceneErrorBoundary>
        </div>
      )}

      <div className="container-x relative pb-14 pt-14 sm:pt-20 lg:pb-24 lg:pt-28">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="eyebrow">
            Build. Grow. Automate.
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-5 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            Grow Your Business With <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">Smart Digital Solutions</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }} className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg lg:pr-6">
            Websites, E-Commerce, CRM, Digital Marketing and Business Automation designed to help your business attract customers, increase sales and operate smarter.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button to="/contact" size="lg" iconRight={<ArrowRight />} onClick={() => trackEvent('cta_click', { cta: 'consultation', placement: 'hero' })}>
              Get Free Consultation
            </Button>
            <Button href={buildWhatsAppLink('general')} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" icon={<MessageCircle />} onClick={() => trackEvent('whatsapp_click', { placement: 'hero' })}>
              Chat on WhatsApp
            </Button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 flex justify-center lg:justify-start">
            <Button to="/services" variant="ghost" size="sm" iconRight={<ChevronDown />}>View Our Services</Button>
          </motion.div>
        </motion.div>

        {/* Dashboard visual */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative mx-auto mt-12 max-w-5xl lg:mt-16">
          <Tilt3D maxTilt={5} scrollTilt={0}>
            <DashboardPreview />
          </Tilt3D>
          {/* Floating chips */}
          {!reduce && (
            <>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-2 top-8 hidden rounded-xl border border-ink-100 bg-white px-3 py-2 text-xs shadow-card md:block lg:-left-10">
                <div className="text-[10px] text-ink-400">New lead from Instagram</div>
                <div className="font-semibold text-ink-900">Restaurant website enquiry</div>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -right-2 bottom-10 hidden rounded-xl border border-ink-100 bg-white px-3 py-2 text-xs shadow-card md:block lg:-right-10">
                <div className="text-[10px] text-ink-400">WhatsApp follow-up</div>
                <div className="font-semibold text-emerald-600">Sent automatically ✓</div>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Industries strip */}
        <div className="mt-12 lg:mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-ink-400">Built for growing businesses</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {targetIndustries.map((i) => (
              <li key={i} className="rounded-full border border-ink-100 bg-white px-3.5 py-1.5 text-sm text-ink-600">{i}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
