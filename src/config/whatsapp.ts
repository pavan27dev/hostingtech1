import { siteConfig, isPlaceholder } from './site'

/** Pre-filled WhatsApp messages keyed by intent / service. */
export const whatsappMessages = {
  general: 'Hello, I am interested in your digital solutions. I would like to know more.',
  website: 'Hello, I am interested in your website development service.',
  crm: 'Hello, I am interested in your CRM solution. I would like to request a demo.',
  ecommerce: 'Hello, I am interested in building an e-commerce website.',
  marketing: 'Hello, I am interested in your digital marketing services.',
  dashboard: 'Hello, I am interested in a custom admin dashboard for my business.',
  automation: 'Hello, I am interested in automating my business processes.',
  consultation: 'Hello, I would like to book a free consultation for my business.',
  pricing: 'Hello, I would like to get a quote for my project.',
} as const

export type WhatsAppIntent = keyof typeof whatsappMessages

/** Formats a submitted enquiry as a WhatsApp message so it lands in the business inbox. */
export function formatLeadMessage(lead: {
  name: string
  businessName?: string
  email: string
  phone: string
  service: string
  budget?: string
  message: string
  source?: string
  campaign?: string
}): string {
  const lines = [
    '*New Enquiry — Website Form*',
    '',
    `*Name:* ${lead.name}`,
    lead.businessName ? `*Business:* ${lead.businessName}` : null,
    `*Phone:* ${lead.phone}`,
    `*Email:* ${lead.email}`,
    `*Service:* ${lead.service}`,
    lead.budget ? `*Budget:* ${lead.budget}` : null,
    '',
    `*Message:*`,
    lead.message,
    '',
    lead.source ? `Source: ${lead.source}${lead.campaign ? ` · ${lead.campaign}` : ''}` : null,
  ]
  return lines.filter((l): l is string => l !== null).join('\n')
}

/**
 * Builds a WhatsApp click-to-chat URL.
 * Number must be international format without "+", spaces or symbols.
 */
export function buildWhatsAppLink(intent: WhatsAppIntent = 'general', customMessage?: string): string {
  const number = siteConfig.contact.whatsapp.replace(/[^\d]/g, '')
  const text = encodeURIComponent(customMessage ?? whatsappMessages[intent])
  // When the number is still a placeholder we return a safe link that still opens WhatsApp.
  if (!number || isPlaceholder(siteConfig.contact.whatsapp)) {
    return `https://wa.me/?text=${text}`
  }
  return `https://wa.me/${number}?text=${text}`
}
