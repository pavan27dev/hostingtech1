import type { ReactNode } from 'react'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import { useSEO } from '@/hooks'
import { siteConfig } from '@/config/site'
import { buildWhatsAppLink } from '@/config/whatsapp'
import { getService, services, processSteps } from '@/data/services'
import { faqs } from '@/data/faq'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Accordion } from '@/components/ui/Accordion'
import { ValueCard, accentClasses } from '@/components/ui/ServiceCard'
import { Reveal, RevealItem, Stagger } from '@/components/motion/Reveal'
import { Tilt3D } from '@/components/motion/Tilt3D'
import { FinalCTA } from '@/components/sections/HomeSections'
import { ContactForm } from '@/components/forms/ContactForm'
import { trackEvent } from '@/utils/tracking'
import { cn } from '@/utils/cn'

interface Props {
  slug: string
  seoTitle: string
  seoDescription: string
  /** Optional hero visual (mockup) */
  visual?: ReactNode
  /** Extra sections rendered after the feature grid */
  children?: ReactNode
  /** Indices of FAQ items most relevant to this service */
  faqIndexes?: number[]
  /** Headline overrides */
  headline?: string
  /** Explainer copy under features */
  benefits?: Array<{ title: string; text: string }>
}

export function ServicePage({ slug, seoTitle, seoDescription, visual, children, faqIndexes, headline, benefits }: Props) {
  const service = getService(slug)!
  const a = accentClasses[service.accent]

  useSEO({
    title: `${seoTitle} | ${siteConfig.name}`,
    description: seoDescription,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.description,
      provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
      areaServed: 'IN',
      url: `${siteConfig.url}${service.href}`,
    },
  })

  const related = services.filter((s) => s.slug !== slug).slice(0, 3)
  const pageFaqs = faqIndexes ? faqIndexes.map((i) => faqs[i]) : faqs.slice(0, 4)

  return (
    <>
      <PageHeader eyebrow={service.title} title={headline ?? service.tagline} description={service.description}>
        <Button to={`/contact?service=${encodeURIComponent(service.serviceOption)}`} size="lg" iconRight={<ArrowRight />} onClick={() => trackEvent('cta_click', { cta: service.cta, placement: 'service_page' })}>
          {service.cta}
        </Button>
        <Button href={buildWhatsAppLink(service.whatsappIntent)} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" icon={<MessageCircle />} onClick={() => trackEvent('whatsapp_click', { placement: 'service_page', intent: service.whatsappIntent })}>
          Chat on WhatsApp
        </Button>
      </PageHeader>

      {visual && (
        <section className="relative -mt-6 pb-16 sm:pb-20">
          <div className="container-x">
            <Tilt3D maxTilt={5} scrollTilt={14}>{visual}</Tilt3D>
          </div>
        </section>
      )}

      <section className="section relative bg-ink-50/70">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading align="left" eyebrow="What's included" title="Everything You Get" description="Every feature below is standard. Need more? We'll scope it into your custom quote." />
            </div>
            <Stagger className="grid gap-3 sm:grid-cols-2 lg:col-span-7" stagger={0.04}>
              {service.features.map((f) => (
                <RevealItem key={f}>
                  <div className="card flex items-center gap-3 px-4 py-3.5">
                    <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-lg', a.icon)}><Check className="h-4 w-4" /></span>
                    <span className="text-sm font-medium text-ink-800">{f}</span>
                  </div>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {benefits && (
        <section className="section relative">
          <div className="container-x">
            <SectionHeading eyebrow="Why it matters" title="Built to Bring You Customers" />
            <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
              {benefits.map((b) => (
                <RevealItem key={b.title} direction="depth">
                  <div className="card h-full p-6"><h3 className="text-lg font-bold">{b.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-500">{b.text}</p></div>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {children}

      <section className="section relative bg-ink-50/70">
        <div className="container-x">
          <SectionHeading eyebrow="Process" title="How We Work" />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.06}>
            {processSteps.map((s) => (
              <RevealItem key={s.step}>
                <div className="card h-full p-5"><span className="font-display text-sm font-bold text-brand-600">{s.step}</span><h3 className="mt-1 text-base font-bold">{s.title}</h3><p className="mt-1 text-sm text-ink-500">{s.text}</p></div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section relative" id="enquire">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading align="left" eyebrow="Get started" title={`Request a ${service.shortTitle} Quote`} description="Tell us about your business and we'll come back with a plan and pricing." />
              <Reveal className="mt-8" delay={0.1}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-400">Common questions</h3>
                <div className="mt-3"><Accordion items={pageFaqs} defaultOpen={null} /></div>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-7" direction="depth"><ContactForm /></Reveal>
          </div>
        </div>
      </section>

      <section className="section relative bg-ink-50/70">
        <div className="container-x">
          <SectionHeading eyebrow="Explore" title="Related Services" />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((s) => <RevealItem key={s.slug} direction="depth"><ValueCard service={s} /></RevealItem>)}
          </Stagger>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
