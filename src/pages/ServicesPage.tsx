import { ArrowRight, MessageCircle } from 'lucide-react'
import { useSEO } from '@/hooks'
import { siteConfig } from '@/config/site'
import { buildWhatsAppLink } from '@/config/whatsapp'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { ServicesGrid, WhyChooseUs, HowItWorks, FAQSection, FinalCTA } from '@/components/sections/HomeSections'

export default function ServicesPage() {
  useSEO({
    title: `Services — Websites, E-Commerce, CRM, Marketing & Automation | ${siteConfig.name}`,
    description: 'Explore our digital services: website development, e-commerce, CRM solutions, digital marketing, admin dashboards and business automation.',
  })
  return (
    <>
      <PageHeader eyebrow="Services" title="Digital Services for Growing Businesses" description="From your first website to a fully automated business — everything you need under one roof.">
        <Button to="/contact" size="lg" iconRight={<ArrowRight />}>Get Free Consultation</Button>
        <Button href={buildWhatsAppLink('general')} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" icon={<MessageCircle />}>Chat on WhatsApp</Button>
      </PageHeader>
      <ServicesGrid heading={false} />
      <WhyChooseUs />
      <HowItWorks />
      <FAQSection />
      <FinalCTA />
    </>
  )
}
