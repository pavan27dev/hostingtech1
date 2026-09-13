import { useSEO, organizationJsonLd } from '@/hooks'
import { siteConfig } from '@/config/site'
import { Hero } from '@/components/sections/Hero'
import {
  ValueGrid, ServicesGrid, WhyChooseUs, HowItWorks, CRMShowcase, EcommerceShowcase,
  PortfolioGrid, PricingSection, FAQSection, InstagramSection, FinalCTA,
} from '@/components/sections/HomeSections'

export default function HomePage() {
  useSEO({
    title: `${siteConfig.name} | Websites, CRM, E-Commerce & Digital Marketing`,
    description: 'Build and grow your business with professional websites, CRM, e-commerce, digital marketing and business automation solutions.',
    path: '/',
    jsonLd: [
      organizationJsonLd,
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
  })

  return (
    <>
      <Hero />
      <ValueGrid />
      <ServicesGrid />
      <WhyChooseUs />
      <HowItWorks />
      <CRMShowcase />
      <EcommerceShowcase />
      <PortfolioGrid limit={3} />
      <PricingSection />
      <FAQSection />
      {/* <InstagramSection /> */}
      <FinalCTA />
    </>
  )
}
