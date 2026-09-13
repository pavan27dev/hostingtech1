import { siteConfig } from '@/config/site'
import type { PricingPlan } from '@/types/content'

export const pricingPlans: PricingPlan[] = [
  {
    id: 'website',
    name: 'Website',
    priceLabel: siteConfig.pricing.website,
    description: 'A professional, lead-generating website for your business.',
    features: ['Responsive design', 'Multiple pages', 'Contact form', 'WhatsApp integration', 'Basic SEO', 'Deployment'],
    cta: 'Get Website Quote',
    whatsappIntent: 'website',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    priceLabel: siteConfig.pricing.ecommerce,
    description: 'A complete online store with admin panel and payments.',
    features: ['Product management', 'Cart', 'Checkout', 'Payments', 'Orders', 'Admin dashboard', 'Analytics'],
    cta: 'Get E-Commerce Quote',
    whatsappIntent: 'ecommerce',
    highlighted: true,
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    priceLabel: siteConfig.pricing.marketing,
    period: '/ Month',
    description: 'Ongoing growth through social media, content and campaigns.',
    features: ['Social media', 'Content', 'Reels', 'Marketing campaigns', 'Lead generation', 'Monthly reports'],
    cta: 'Get Marketing Quote',
    whatsappIntent: 'marketing',
  },
]

export const pricingNote = 'Custom pricing is available based on business requirements.'
