import { useSEO } from '@/hooks'
import { siteConfig } from '@/config/site'
import { PageHeader } from '@/components/layout/PageHeader'
import { PortfolioGrid, FinalCTA } from '@/components/sections/HomeSections'
import { Button } from '@/components/ui/Button'
import { buildWhatsAppLink } from '@/config/whatsapp'
import { MessageCircle } from 'lucide-react'

export default function PortfolioPage() {
  useSEO({
    title: `Portfolio — Websites, CRM & E-Commerce Projects | ${siteConfig.name}`,
    description: 'Explore demo projects showing the websites, CRM systems, e-commerce platforms and dashboards we build for restaurants, real estate, retail and service businesses.',
  })
  return (
    <>
      <PageHeader eyebrow="Portfolio" title="Software & Websites We Build" description="Concept builds that show what we deliver for each industry. Every project has a working demo you can click through — open one to try it.">
        <Button href={buildWhatsAppLink('general', 'Hello, I would like a live demo of your projects.')} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" icon={<MessageCircle />}>Request a Live Demo</Button>
      </PageHeader>
      <PortfolioGrid heading={false} />
      <FinalCTA />
    </>
  )
}
