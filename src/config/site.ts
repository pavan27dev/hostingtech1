/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — single source of truth for business information.
 *
 *  Update the placeholders below (or override them via .env using the
 *  VITE_* variables) and the change propagates across the entire site.
 *  Only PUBLIC information belongs here. Never put API keys, secrets or
 *  database credentials in this file or in any VITE_* variable.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const env = import.meta.env

export const siteConfig = {
  /** Brand */
  name: env.VITE_COMPANY_NAME || 'HostingTech',
  shortName: env.VITE_COMPANY_SHORT_NAME || 'HostingTech',
  /** Logo assets in /public */
  logo: { full: '/logo.png', mark: '/logo-mark.png', alt: 'HostingTech — Cloud Service Provider' },
  tagline: 'Build. Grow. Automate.',
  description:
    'We help businesses grow digitally through modern websites, e-commerce platforms, CRM solutions, admin dashboards, digital marketing and business automation.',
  /** Public site URL, used for canonical + Open Graph URLs */
  url: env.VITE_SITE_URL || 'https://www.example.com',
  /** Default Open Graph image (place file in /public) */
  ogImage: '/og-image.png',
  locale: 'en_IN',

  /** Contact */
  contact: {
    email: env.VITE_CONTACT_EMAIL || '[EMAIL]',
    phone: env.VITE_CONTACT_PHONE || '+91 76608 89883',
    /** International format, digits only (e.g. 919876543210) */
    whatsapp: env.VITE_WHATSAPP_NUMBER || '917660889883',
    /** Human-readable WhatsApp number shown on the site */
    whatsappDisplay: env.VITE_WHATSAPP_DISPLAY || '+91 76608 89883',
    address: env.VITE_ADDRESS || 'HSR Layout, 4th Sector, Bengaluru, Karnataka',
    city: env.VITE_CITY || 'Bengaluru',
    hours: 'Mon – Sat, 10:00 AM – 7:00 PM IST',
  },

  /** Social */
  social: {
    instagram: env.VITE_INSTAGRAM_URL || '[INSTAGRAM URL]',
    linkedin: env.VITE_LINKEDIN_URL || '[LINKEDIN URL]',
    instagramHandle: env.VITE_INSTAGRAM_HANDLE || '@yourcompany',
  },

  /** Pricing starting points — displayed on /pricing and home */
  pricing: {
    website: env.VITE_PRICE_WEBSITE || '₹15,000',
    ecommerce: env.VITE_PRICE_ECOMMERCE || '₹25,000',
    marketing: env.VITE_PRICE_MARKETING || '₹10,000',
  },

  /** Year used in copyright */
  copyrightYear: 2026,
} as const

export type SiteConfig = typeof siteConfig

/** Returns true when a value is still an unfilled placeholder like "[EMAIL]" */
export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value.trim())
