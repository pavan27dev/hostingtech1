import { useSEO } from '@/hooks'
import { siteConfig } from '@/config/site'
import { PageHeader } from '@/components/layout/PageHeader'
import { PricingSection, FAQSection, FinalCTA } from '@/components/sections/HomeSections'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal, RevealItem, Stagger } from '@/components/motion/Reveal'

const included = [
  { title: 'Free consultation', text: 'We understand your business before we quote — no obligation.' },
  { title: 'Transparent scope', text: 'A written scope and timeline before work begins, so there are no surprises.' },
  { title: 'Phased delivery', text: 'Start with what generates leads today and add features as you grow.' },
  { title: 'Post-launch support', text: 'Support and maintenance options for every plan.' },
]

export default function PricingPage() {
  useSEO({
    title: `Pricing — Website, E-Commerce & Digital Marketing | ${siteConfig.name}`,
    description: 'Transparent starting prices for websites, e-commerce stores and digital marketing. Custom pricing available based on your business requirements.',
  })
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Simple, Transparent Pricing" description="Starting prices for our most requested services. Every project is quoted on your actual requirements." />
      <PricingSection heading={false} />
      <section className="section relative bg-ink-50/70">
        <div className="container-x">
          <SectionHeading eyebrow="What's included" title="Every Plan Comes With" />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((i) => (
              <RevealItem key={i.title} direction="depth">
                <div className="card h-full p-6"><h3 className="text-base font-bold">{i.title}</h3><p className="mt-2 text-sm text-ink-500">{i.text}</p></div>
              </RevealItem>
            ))}
          </Stagger>
          <Reveal className="mt-10 text-center text-sm text-ink-500">Prices are indicative and exclude applicable taxes. Final quotes are shared after your free consultation.</Reveal>
        </div>
      </section>
      <FAQSection />
      <FinalCTA />
    </>
  )
}
