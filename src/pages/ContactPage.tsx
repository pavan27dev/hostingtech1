import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { InstagramIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { useSEO, organizationJsonLd } from '@/hooks'
import { siteConfig } from '@/config/site'
import { buildWhatsAppLink } from '@/config/whatsapp'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/forms/ContactForm'
import { Reveal } from '@/components/motion/Reveal'
import { FAQSection } from '@/components/sections/HomeSections'
import { trackEvent } from '@/utils/tracking'

export default function ContactPage() {
  useSEO({
    title: `Contact Us — Free Consultation | ${siteConfig.name}`,
    description: 'Tell us about your business and requirements. Get a free consultation for websites, e-commerce, CRM, digital marketing and automation.',
    jsonLd: { ...organizationJsonLd, '@type': 'ContactPage' },
  })

  const items = [
    { icon: MessageCircle, label: 'WhatsApp', value: siteConfig.contact.whatsappDisplay, href: buildWhatsAppLink('general'), tone: 'bg-emerald-50 text-emerald-600' },
    { icon: Phone, label: 'Phone', value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}`, tone: 'bg-brand-50 text-brand-600' },
    { icon: Mail, label: 'Email', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, tone: 'bg-violet-50 text-violet-600' },
    { icon: MapPin, label: 'Location', value: siteConfig.contact.address, tone: 'bg-amber-50 text-amber-600' },
    { icon: Clock, label: 'Working hours', value: siteConfig.contact.hours, tone: 'bg-rose-50 text-rose-600' },
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 to-white">
        <div aria-hidden className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="container-x relative py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="right" className="lg:col-span-5">
              <span className="eyebrow">Contact us</span>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] sm:text-5xl">Let's Build Something Great Together</h1>
              <p className="mt-5 text-ink-500 sm:text-lg">Tell us about your business and requirements. Our team will get back to you.</p>

              <Button href={buildWhatsAppLink('general')} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" className="mt-8" icon={<MessageCircle />} onClick={() => trackEvent('whatsapp_click', { placement: 'contact_page' })}>
                Chat on WhatsApp — fastest reply
              </Button>

              <ul className="mt-10 space-y-4">
                {items.map((it) => (
                  <li key={it.label} className="flex items-start gap-4">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${it.tone}`}><it.icon className="h-5 w-5" /></span>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-ink-400">{it.label}</div>
                      {it.href ? (
                        <a href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="break-all font-medium text-ink-800 hover:text-brand-700">{it.value}</a>
                      ) : (
                        <div className="font-medium text-ink-800">{it.value}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex gap-2">
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-xl border border-ink-200 bg-white text-ink-600 hover:text-pink-600"><InstagramIcon className="h-4.5 w-4.5" /></a>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-xl border border-ink-200 bg-white text-ink-600 hover:text-brand-700"><LinkedinIcon className="h-4.5 w-4.5" /></a>
              </div>
            </Reveal>

            <Reveal direction="depth" className="lg:col-span-7">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
      <FAQSection />
    </>
  )
}
