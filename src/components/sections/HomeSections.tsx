import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import { InstagramIcon } from '@/components/ui/BrandIcons'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceCard, ValueCard } from '@/components/ui/ServiceCard'
import { PortfolioCard } from '@/components/ui/PortfolioCard'
import { PricingCard } from '@/components/ui/PricingCard'
import { Accordion } from '@/components/ui/Accordion'
import { Reveal, RevealItem, Stagger } from '@/components/motion/Reveal'
import { Tilt3D } from '@/components/motion/Tilt3D'
import { Parallax } from '@/components/motion/Parallax'
import { CRMDashboardMockup, crmModules } from '@/components/mockups/CRMDashboardMockup'
import { StoreMockup, ecommerceAdminFeatures } from '@/components/mockups/StoreMockup'
import { services, whyChooseUs, processSteps } from '@/data/services'
import { projects } from '@/data/portfolio'
import { pricingPlans, pricingNote } from '@/data/pricing'
import { faqs } from '@/data/faq'
import { siteConfig } from '@/config/site'
import { buildWhatsAppLink } from '@/config/whatsapp'
import { trackEvent } from '@/utils/tracking'
import { cn } from '@/utils/cn'

/* ── Trust / Value grid ───────────────────────────────────────────────────── */
export function ValueGrid() {
  return (
    <section className="section relative bg-ink-50/70" id="value">
      <div className="container-x">
        <SectionHeading eyebrow="What we do" title="Everything Your Business Needs to Grow Digitally" description="Six capabilities, one partner — from your first website to a fully automated business." />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <RevealItem key={s.slug} direction="depth"><ValueCard service={s} /></RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ── Detailed services ────────────────────────────────────────────────────── */
export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section relative" id="services">
      <div className="container-x">
        {heading && <SectionHeading eyebrow="Services" title="Solutions Built Around Your Business" description="Every engagement is scoped to your goals. Pick a service to see what's included." />}
        <Stagger className={cn('grid gap-5 lg:grid-cols-2', heading && 'mt-12')} stagger={0.06}>
          {services.map((s) => (
            <RevealItem key={s.slug} direction="depth"><ServiceCard service={s} /></RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ── Why choose us ────────────────────────────────────────────────────────── */
export function WhyChooseUs() {
  return (
    <section className="section relative bg-ink-900 text-white" id="why-us">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(52,97,255,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.25),transparent_55%)]" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow border-white/15 bg-white/10 text-white">Why us</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem]">Why Businesses Choose Us</h2>
          <p className="mt-4 text-white/70 sm:text-lg">A technology partner that builds for the long term.</p>
        </Reveal>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {whyChooseUs.map((w) => (
            <RevealItem key={w.title}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/10">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-500/20 text-accent-400"><Check className="h-5 w-5" /></span>
                <h3 className="mt-4 text-base font-bold text-white">{w.title}</h3>
                <p className="mt-1.5 text-sm text-white/65">{w.text}</p>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ── How it works timeline ────────────────────────────────────────────────── */
export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const line = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <section className="section relative" id="process">
      <div className="container-x">
        <SectionHeading eyebrow="How it works" title="From Idea to Launch in Five Simple Steps" description="A clear, transparent process — you always know what happens next." />
        <ol ref={ref} className="relative mx-auto mt-14 max-w-4xl">
          {/* Progress line */}
          <div aria-hidden className="absolute left-[23px] top-0 h-full w-0.5 bg-ink-100 lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div aria-hidden style={{ height: reduce ? '100%' : line }} className="absolute left-[23px] top-0 w-0.5 bg-gradient-to-b from-brand-500 to-accent-500 lg:left-1/2 lg:-translate-x-1/2" />
          {processSteps.map((s, i) => {
            const left = i % 2 === 0
            return (
              <li key={s.step} className={cn('relative flex gap-6 pb-10 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-0', left ? '' : '')}>
                <Reveal direction={left ? 'right' : 'left'} className={cn('order-2 lg:order-none', left ? 'lg:col-start-1 lg:pr-14 lg:text-right' : 'lg:col-start-2 lg:pl-14')}>
                  <div className="card p-6">
                    <span className="font-display text-sm font-bold text-brand-600">{s.step}</span>
                    <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-500">{s.text}</p>
                  </div>
                </Reveal>
                <span className="absolute left-0 top-6 z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-white bg-brand-600 font-display text-sm font-bold text-white shadow-glow lg:left-1/2 lg:-translate-x-1/2">
                  {i + 1}
                </span>
                <span className="w-12 shrink-0 lg:hidden" />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* ── CRM product section ──────────────────────────────────────────────────── */
export function CRMShowcase() {
  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-violet-50/70 to-white" id="crm">
      <Parallax speed={40} className="absolute -left-24 top-10 -z-0 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" rotate={20}><span /></Parallax>
      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal direction="right" className="lg:col-span-5">
            <span className="eyebrow border-violet-100 bg-violet-50 text-violet-700">CRM Platform</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">Manage Your Entire Business From One Dashboard</h2>
            <p className="mt-4 text-ink-500 sm:text-lg">Track every lead from first enquiry to closed deal. Assign follow-ups, monitor your team and see revenue in real time.</p>
            <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
              {crmModules.map((m) => (
                <li key={m} className="flex items-center gap-2 rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm font-medium text-ink-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />{m}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/solutions/crm" iconRight={<ArrowRight />} onClick={() => trackEvent('cta_click', { cta: 'crm_demo', placement: 'home' })}>Book a CRM Demo</Button>
              <Button href={buildWhatsAppLink('crm')} target="_blank" rel="noopener noreferrer" variant="outline" icon={<MessageCircle />}>Ask on WhatsApp</Button>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Tilt3D maxTilt={6} scrollTilt={18}><CRMDashboardMockup /></Tilt3D>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── E-commerce product section ───────────────────────────────────────────── */
export function EcommerceShowcase() {
  return (
    <section className="section relative overflow-hidden" id="ecommerce">
      <Parallax speed={50} className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" rotate={-20}><span /></Parallax>
      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <Tilt3D maxTilt={5} scrollTilt={16}><StoreMockup /></Tilt3D>
          </div>
          <Reveal direction="left" className="order-1 lg:order-2 lg:col-span-5">
            <span className="eyebrow border-emerald-100 bg-emerald-50 text-emerald-700">E-Commerce Platform</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">A Complete Online Store, Ready to Sell</h2>
            <p className="mt-4 text-ink-500 sm:text-lg">Customer storefront, product pages, cart, checkout and order tracking — backed by an admin panel that runs the business.</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-400">Admin features</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {ecommerceAdminFeatures.map((f) => (
                <li key={f} className="rounded-full border border-ink-100 bg-white px-3 py-1.5 text-sm text-ink-700">{f}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/solutions/ecommerce" iconRight={<ArrowRight />} onClick={() => trackEvent('cta_click', { cta: 'ecommerce_demo', placement: 'home' })}>Request E-Commerce Demo</Button>
              <Button href={buildWhatsAppLink('ecommerce')} target="_blank" rel="noopener noreferrer" variant="outline" icon={<MessageCircle />}>Ask on WhatsApp</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── Portfolio ────────────────────────────────────────────────────────────── */
export function PortfolioGrid({ limit, heading = true }: { limit?: number; heading?: boolean }) {
  const list = limit ? projects.slice(0, limit) : projects
  return (
    <section className="section relative bg-ink-50/70" id="portfolio">
      <div className="container-x">
        {heading && (
          <SectionHeading eyebrow="Portfolio" title="Software & Websites We Build" description="Concept builds that show what we deliver for each industry. These are demo projects, not client work." />
        )}
        <Stagger className={cn('grid gap-5 md:grid-cols-2 lg:grid-cols-3', heading && 'mt-12')} stagger={0.07}>
          {list.map((p) => (
            <RevealItem key={p.id} direction="depth"><div id={p.id} className="h-full scroll-mt-28"><PortfolioCard project={p} /></div></RevealItem>
          ))}
        </Stagger>
        {limit && (
          <Reveal className="mt-10 text-center"><Button to="/portfolio" variant="outline" iconRight={<ArrowRight />}>View Full Portfolio</Button></Reveal>
        )}
      </div>
    </section>
  )
}

/* ── Pricing ──────────────────────────────────────────────────────────────── */
export function PricingSection({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section relative" id="pricing">
      <div className="container-x">
        {heading && <SectionHeading eyebrow="Pricing" title="Transparent Starting Prices" description="Clear starting points for every service. Final pricing depends on your exact requirements." />}
        <Stagger className={cn('grid gap-6 lg:grid-cols-3', heading && 'mt-14')} stagger={0.1}>
          {pricingPlans.map((p) => (
            <RevealItem key={p.id} direction="depth"><PricingCard plan={p} /></RevealItem>
          ))}
        </Stagger>
        <Reveal className="mt-8 text-center text-sm text-ink-500">{pricingNote}</Reveal>
      </div>
    </section>
  )
}

/* ── FAQ ──────────────────────────────────────────────────────────────────── */
export function FAQSection() {
  return (
    <section className="section relative bg-ink-50/70" id="faq">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading align="left" eyebrow="FAQ" title="Frequently Asked Questions" description="Still have questions? Chat with us on WhatsApp and we'll answer right away." />
            <Reveal className="mt-6">
              <Button href={buildWhatsAppLink('general')} target="_blank" rel="noopener noreferrer" variant="whatsapp" icon={<MessageCircle />}>Ask on WhatsApp</Button>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-8" direction="depth"><Accordion items={faqs} /></Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── Instagram ────────────────────────────────────────────────────────────── */
export function InstagramSection() {
  const tiles = ['from-pink-100 to-rose-200', 'from-brand-100 to-violet-200', 'from-amber-100 to-orange-200', 'from-emerald-100 to-teal-200', 'from-violet-100 to-fuchsia-200', 'from-sky-100 to-brand-200']
  return (
    <section className="section relative" id="instagram">
      <div className="container-x">
        <SectionHeading eyebrow="Instagram" title="Follow Our Journey" description="Behind-the-scenes builds, client tips and product updates — follow us to see what we're working on." />
        <Stagger className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6" stagger={0.05}>
          {tiles.map((t, i) => (
            <RevealItem key={i}>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram post placeholder ${i + 1}`}
                className={cn('group relative block aspect-square overflow-hidden rounded-2xl bg-gradient-to-br transition hover:-translate-y-1', t)}
              >
                <span className="absolute inset-0 grid place-items-center text-ink-900/30 transition group-hover:text-ink-900/60"><InstagramIcon className="h-7 w-7" /></span>
              </a>
            </RevealItem>
          ))}
        </Stagger>
        <Reveal className="mt-8 text-center">
          <Button href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" variant="secondary" icon={<InstagramIcon />}>Follow us on Instagram</Button>
          <p className="mt-3 text-sm text-ink-400">{siteConfig.social.instagramHandle}</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Final CTA ────────────────────────────────────────────────────────────── */
export function FinalCTA() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-x">
        <Reveal direction="depth">
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-14 text-center text-white sm:px-12 sm:py-20">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(52,97,255,0.45),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.3),transparent_55%)]" />
            <div aria-hidden className="grid-bg absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)]" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Ready to Grow Your Business?</h2>
              <p className="mx-auto mt-4 max-w-xl text-white/75 sm:text-lg">Let's build the technology your business needs to grow.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button to="/contact" size="lg" iconRight={<ArrowRight />} onClick={() => trackEvent('cta_click', { cta: 'consultation', placement: 'final_cta' })}>Get Free Consultation</Button>
                <Button href={buildWhatsAppLink('consultation')} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" icon={<MessageCircle />} onClick={() => trackEvent('whatsapp_click', { placement: 'final_cta' })}>Chat on WhatsApp</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
