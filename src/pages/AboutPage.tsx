import { ArrowRight, Compass, MessageCircle, Target } from 'lucide-react'
import { useSEO, organizationJsonLd } from '@/hooks'
import { siteConfig } from '@/config/site'
import { buildWhatsAppLink } from '@/config/whatsapp'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal, RevealItem, Stagger } from '@/components/motion/Reveal'
import { WhyChooseUs, HowItWorks, InstagramSection, FinalCTA } from '@/components/sections/HomeSections'
import { targetIndustries } from '@/data/services'

const stack = ['React', 'TypeScript', 'Tailwind CSS', 'Java', 'Spring Boot', 'MySQL', 'REST APIs', 'WhatsApp Business API', 'Meta Ads', 'Google Ads']

export default function AboutPage() {
  useSEO({
    title: `About Us — Technology That Helps Your Business Grow | ${siteConfig.name}`,
    description: 'We are a digital solutions company focused on helping businesses establish, grow and automate their digital operations.',
    jsonLd: organizationJsonLd,
  })
  return (
    <>
      <PageHeader eyebrow="About us" title="Technology That Helps Your Business Grow" description="We are a digital solutions company focused on helping businesses establish, grow and automate their digital operations.">
        <Button to="/contact" size="lg" iconRight={<ArrowRight />}>Work With Us</Button>
        <Button href={buildWhatsAppLink('general')} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" icon={<MessageCircle />}>Chat on WhatsApp</Button>
      </PageHeader>

      <section className="section relative">
        <div className="container-x">
          <Stagger className="grid gap-6 md:grid-cols-2">
            <RevealItem direction="depth">
              <div className="card h-full p-8 sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600"><Target className="h-6 w-6" /></span>
                <h2 className="mt-5 text-2xl font-bold">Our Mission</h2>
                <p className="mt-3 text-lg leading-relaxed text-ink-600">To make modern technology simple, accessible and affordable for growing businesses.</p>
              </div>
            </RevealItem>
            <RevealItem direction="depth">
              <div className="card h-full p-8 sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-50 text-teal-600"><Compass className="h-6 w-6" /></span>
                <h2 className="mt-5 text-2xl font-bold">Our Vision</h2>
                <p className="mt-3 text-lg leading-relaxed text-ink-600">To become a trusted technology partner for businesses worldwide.</p>
              </div>
            </RevealItem>
          </Stagger>

          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <Reveal direction="right">
              <SectionHeading align="left" eyebrow="Who we serve" title="Built for Businesses Like Yours" description="We work with owner-led businesses across India and are set up to serve international clients as well." />
              <ul className="mt-6 flex flex-wrap gap-2">
                {targetIndustries.map((i) => <li key={i} className="rounded-full border border-ink-100 bg-white px-3.5 py-1.5 text-sm text-ink-600">{i}</li>)}
              </ul>
            </Reveal>
            <Reveal direction="left">
              <SectionHeading align="left" eyebrow="How we build" title="Modern, Proven Technology" description="We build on a modern stack that scales — from a single landing page to a multi-tenant SaaS platform." />
              <ul className="mt-6 flex flex-wrap gap-2">
                {stack.map((s) => <li key={s} className="rounded-lg bg-ink-50 px-3 py-1.5 text-sm font-medium text-ink-700">{s}</li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <HowItWorks />
      <InstagramSection />
      <FinalCTA />
    </>
  )
}
