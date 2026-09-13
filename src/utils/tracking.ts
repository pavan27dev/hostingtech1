import type { DeviceType, LeadAttribution, LeadSource } from '@/types/lead'

const STORAGE_KEY = 'attribution_v1'

/** Campaign naming convention for Instagram links (see README). */
export const campaigns = {
  instagram_website: { source: 'instagram', medium: 'social', campaign: 'instagram_website' },
  instagram_crm: { source: 'instagram', medium: 'social', campaign: 'instagram_crm' },
  instagram_ecommerce: { source: 'instagram', medium: 'social', campaign: 'instagram_ecommerce' },
  instagram_marketing: { source: 'instagram', medium: 'social', campaign: 'instagram_marketing' },
} as const

/** Build a UTM-tagged URL, e.g. for Instagram bio / reels. */
export function buildCampaignUrl(baseUrl: string, path: string, campaign: keyof typeof campaigns, content?: string) {
  const c = campaigns[campaign]
  const url = new URL(path, baseUrl)
  url.searchParams.set('utm_source', c.source)
  url.searchParams.set('utm_medium', c.medium)
  url.searchParams.set('utm_campaign', c.campaign)
  if (content) url.searchParams.set('utm_content', content)
  return url.toString()
}

export function detectDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop'
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

function mapSource(utmSource?: string | null, referrer?: string): LeadSource {
  const s = (utmSource || '').toLowerCase()
  if (s.includes('instagram') || s === 'ig') return 'Instagram'
  if (s.includes('facebook') || s === 'fb') return 'Facebook'
  if (s.includes('google')) return 'Google'
  if (s.includes('linkedin')) return 'LinkedIn'
  if (s.includes('whatsapp')) return 'WhatsApp'
  if (s.includes('referral')) return 'Referral'
  if (s) return 'Website'

  const r = (referrer || '').toLowerCase()
  if (r.includes('instagram')) return 'Instagram'
  if (r.includes('facebook') || r.includes('fb.')) return 'Facebook'
  if (r.includes('google')) return 'Google'
  if (r.includes('linkedin')) return 'LinkedIn'
  if (r.includes('whatsapp')) return 'WhatsApp'
  if (r) return 'Referral'
  return 'Direct'
}

/**
 * Captures first-touch attribution on the first page view of a session and
 * persists it so the contact form can attach it to the lead later.
 */
export function captureAttribution(): LeadAttribution {
  const existing = getAttribution()
  if (existing) return existing

  const params = new URLSearchParams(window.location.search)
  const attribution: LeadAttribution = {
    source: mapSource(params.get('utm_source'), document.referrer),
    landingPage: window.location.pathname + window.location.search,
    campaign: params.get('utm_campaign') || undefined,
    medium: params.get('utm_medium') || undefined,
    content: params.get('utm_content') || undefined,
    term: params.get('utm_term') || undefined,
    referrer: document.referrer || undefined,
    deviceType: detectDeviceType(),
    userAgent: navigator.userAgent,
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    /* ignore */
  }
  return attribution
}

export function getAttribution(): LeadAttribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as LeadAttribution) : null
  } catch {
    return null
  }
}

/**
 * Lightweight event hook. Wire this to GA4 / Meta Pixel later; for now it
 * pushes into `window.dataLayer` so tag managers can pick events up.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const w = window as Window & { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: name, ...params, ts: Date.now() })
  if (import.meta.env.DEV) console.debug('[track]', name, params)
}
