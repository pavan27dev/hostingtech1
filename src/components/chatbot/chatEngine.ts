/**
 * Rule-based chat assistant.
 *
 * Deterministic and fully client-side: no LLM, no API keys. It answers common
 * questions with keyword intents, guides visitors through services and pricing,
 * collects a lead (name → phone → service) and hands off to WhatsApp or the
 * contact form. Extend `intents` to add more answers.
 */
import { siteConfig } from '@/config/site'
import { buildWhatsAppLink, whatsappMessages, type WhatsAppIntent } from '@/config/whatsapp'
import { faqs } from '@/data/faq'

export type QuickReply = { label: string; value: string }
export type BotAction =
  | { type: 'link'; label: string; href: string; external?: boolean }
  | { type: 'whatsapp'; label: string; intent: WhatsAppIntent; message?: string }

export interface BotMessage {
  id: string
  role: 'bot' | 'user'
  text: string
  quickReplies?: QuickReply[]
  actions?: BotAction[]
}

export interface LeadDraft {
  name?: string
  phone?: string
  service?: string
}

export type Stage = 'idle' | 'ask_name' | 'ask_phone' | 'ask_service' | 'done'

export interface ChatState {
  stage: Stage
  lead: LeadDraft
}

interface Intent {
  keys: string[]
  reply: string
  quickReplies?: QuickReply[]
  actions?: BotAction[]
}

const serviceReplies: QuickReply[] = [
  { label: 'Website', value: 'website' },
  { label: 'E-Commerce', value: 'ecommerce' },
  { label: 'CRM', value: 'crm' },
  { label: 'Digital Marketing', value: 'marketing' },
  { label: 'Dashboard', value: 'dashboard' },
  { label: 'Automation', value: 'automation' },
]

const defaultReplies: QuickReply[] = [
  { label: 'Our services', value: 'services' },
  { label: 'Pricing', value: 'pricing' },
  { label: 'Request a demo', value: 'demo' },
  { label: 'Talk to a human', value: 'human' },
]

const intents: Intent[] = [
  {
    keys: ['hi', 'hello', 'hey', 'start', 'namaste'],
    reply: `Hi! I'm the ${siteConfig.name} assistant. I can tell you about our services, pricing, or connect you with our team. What would you like to do?`,
    quickReplies: defaultReplies,
  },
  {
    keys: ['services', 'what do you do', 'offer', 'solutions'],
    reply: 'We build websites, e-commerce stores, CRM systems, admin dashboards, run digital marketing and set up business automation. Which one interests you?',
    quickReplies: serviceReplies,
  },
  {
    keys: ['website', 'web site', 'landing page', 'portfolio site'],
    reply: 'Our websites are fast, mobile-responsive and SEO-friendly, with WhatsApp and contact-form integration built in. A standard business website usually launches in 1–3 weeks.',
    actions: [
      { type: 'link', label: 'Website Development', href: '/services/website-development' },
      { type: 'whatsapp', label: 'Discuss on WhatsApp', intent: 'website' },
    ],
    quickReplies: [{ label: 'Website pricing', value: 'pricing' }, { label: 'Get a quote', value: 'quote' }],
  },
  {
    keys: ['ecommerce', 'e-commerce', 'online store', 'shop', 'sell online'],
    reply: 'Our e-commerce platform includes products, categories, cart, checkout, online payments, order tracking, inventory and an admin dashboard.',
    actions: [
      { type: 'link', label: 'E-Commerce Solutions', href: '/solutions/ecommerce' },
      { type: 'whatsapp', label: 'Request E-Commerce Demo', intent: 'ecommerce' },
    ],
    quickReplies: [{ label: 'E-Commerce pricing', value: 'pricing' }, { label: 'Book a demo', value: 'demo' }],
  },
  {
    keys: ['crm', 'lead management', 'follow up', 'follow-up', 'sales pipeline'],
    reply: 'Our CRM manages leads, customers, sales pipeline, follow-ups, tasks, employees and reports — with WhatsApp integration so nothing slips through.',
    actions: [
      { type: 'link', label: 'CRM Solutions', href: '/solutions/crm' },
      { type: 'whatsapp', label: 'Request CRM Demo', intent: 'crm' },
    ],
    quickReplies: [{ label: 'Book a demo', value: 'demo' }, { label: 'Get a quote', value: 'quote' }],
  },
  {
    keys: ['marketing', 'instagram', 'ads', 'seo', 'social media', 'reels', 'facebook', 'google ads'],
    reply: 'We run Instagram & Facebook marketing, content and reels, Meta Ads, Google Ads and SEO — all focused on generating qualified leads, with monthly reports.',
    actions: [
      { type: 'link', label: 'Digital Marketing', href: '/services/digital-marketing' },
      { type: 'whatsapp', label: 'Grow My Business', intent: 'marketing' },
    ],
    quickReplies: [{ label: 'Marketing pricing', value: 'pricing' }, { label: 'Get a quote', value: 'quote' }],
  },
  {
    keys: ['dashboard', 'analytics', 'reports', 'admin panel'],
    reply: 'We build custom admin dashboards for sales, customers, revenue, leads and employees with real-time charts and exportable reports.',
    actions: [
      { type: 'link', label: 'Admin Dashboards', href: '/solutions/admin-dashboards' },
      { type: 'whatsapp', label: 'Build My Dashboard', intent: 'dashboard' },
    ],
  },
  {
    keys: ['automation', 'automate', 'workflow', 'notifications'],
    reply: 'Business automation covers lead automation, WhatsApp and email notifications, workflow automation and CRM automation — so repetitive work happens by itself.',
    actions: [
      { type: 'link', label: 'Business Automation', href: '/solutions/business-automation' },
      { type: 'whatsapp', label: 'Automate My Business', intent: 'automation' },
    ],
  },
  {
    keys: ['pricing', 'price', 'cost', 'how much', 'charges', 'rate', 'budget'],
    reply: `Websites start from ${siteConfig.pricing.website}, e-commerce from ${siteConfig.pricing.ecommerce} and digital marketing from ${siteConfig.pricing.marketing}/month. Custom pricing is available based on your requirements.`,
    actions: [{ type: 'link', label: 'See Pricing', href: '/pricing' }],
    quickReplies: [{ label: 'Get a custom quote', value: 'quote' }],
  },
  {
    keys: ['demo', 'trial', 'see it', 'show me'],
    reply: 'Happy to arrange a free demo. Which product would you like to see?',
    quickReplies: [
      { label: 'CRM demo', value: 'crm demo' },
      { label: 'E-Commerce demo', value: 'ecommerce demo' },
      { label: 'Dashboard demo', value: 'dashboard demo' },
    ],
  },
  {
    keys: ['time', 'how long', 'duration', 'timeline', 'days', 'weeks'],
    reply: 'A standard website takes 1–3 weeks. E-commerce, CRM and dashboards usually take 4–8 weeks depending on features. We confirm a timeline during your free consultation.',
  },
  {
    keys: ['hosting', 'deploy', 'domain', 'server'],
    reply: 'Yes — we handle domain setup, hosting, SSL and deployment, plus maintenance plans after launch.',
  },
  {
    keys: ['whatsapp', 'integration', 'integrate'],
    reply: 'We add WhatsApp click-to-chat across your website and can automate WhatsApp notifications for leads, orders and follow-ups.',
    actions: [{ type: 'whatsapp', label: 'Chat on WhatsApp', intent: 'general' }],
  },
  {
    keys: ['contact', 'email', 'phone', 'call', 'reach', 'location', 'address', 'where are you'],
    reply: `You can reach us on WhatsApp at ${siteConfig.contact.whatsappDisplay}, email ${siteConfig.contact.email}, or through our contact form. We are based in ${siteConfig.contact.city} and work with clients across India and abroad.`,
    actions: [
      { type: 'whatsapp', label: 'Chat on WhatsApp', intent: 'general' },
      { type: 'link', label: 'Contact Form', href: '/contact' },
    ],
  },
  {
    keys: ['human', 'agent', 'person', 'team', 'talk to', 'speak'],
    reply: 'Sure — the fastest way is WhatsApp. Or share your details and our team will call you back.',
    actions: [{ type: 'whatsapp', label: 'Chat on WhatsApp', intent: 'general' }],
    quickReplies: [{ label: 'Request a call back', value: 'callback' }],
  },
  {
    keys: ['thanks', 'thank you', 'great', 'ok', 'okay'],
    reply: 'You are welcome! Anything else I can help with?',
    quickReplies: defaultReplies,
  },
]

const normalize = (s: string) => s.toLowerCase().replace(/[^\w\s-]/g, ' ').replace(/\s+/g, ' ').trim()

function matchIntent(text: string): Intent | undefined {
  const t = normalize(text)
  let best: { intent: Intent; score: number } | undefined
  for (const intent of intents) {
    let score = 0
    for (const k of intent.keys) {
      if (t === k) score += 3
      else if (t.includes(k)) score += k.length > 4 ? 2 : 1
    }
    if (score > 0 && (!best || score > best.score)) best = { intent, score }
  }
  return best?.intent
}

function matchFaq(text: string) {
  const t = normalize(text)
  const words = t.split(' ').filter((w) => w.length > 3)
  let best: { faq: (typeof faqs)[number]; score: number } | undefined
  for (const faq of faqs) {
    const q = normalize(faq.question)
    const score = words.reduce((acc, w) => acc + (q.includes(w) ? 1 : 0), 0)
    if (score >= 2 && (!best || score > best.score)) best = { faq, score }
  }
  return best?.faq
}

const phoneOk = (s: string) => /^\+?[\d\s-]{8,15}$/.test(s.trim())
let counter = 0
const id = () => `m${Date.now().toString(36)}${(counter++).toString(36)}`

export const bot = (text: string, extra?: Partial<BotMessage>): BotMessage => ({ id: id(), role: 'bot', text, ...extra })
export const user = (text: string): BotMessage => ({ id: id(), role: 'user', text })

export function greeting(): BotMessage {
  return bot(`Hi there! Welcome to ${siteConfig.name}. I can help you explore our services, pricing, or book a free consultation.`, { quickReplies: defaultReplies })
}

/** Core state machine: returns the bot's reply and the next state. */
export function respond(input: string, state: ChatState): { messages: BotMessage[]; state: ChatState } {
  const t = input.trim()
  const lower = normalize(t)

  // Lead-capture flow
  if (state.stage === 'ask_name') {
    if (t.length < 2) return { messages: [bot('Please tell me your name so our team knows who to contact.')], state }
    return {
      messages: [bot(`Nice to meet you, ${t}! What is the best phone / WhatsApp number to reach you?`)],
      state: { stage: 'ask_phone', lead: { ...state.lead, name: t } },
    }
  }
  if (state.stage === 'ask_phone') {
    if (!phoneOk(t)) return { messages: [bot('That does not look like a valid number. Please enter a phone number with country code, e.g. +91 98765 43210.')], state }
    return {
      messages: [bot('Got it. Which service are you interested in?', { quickReplies: serviceReplies })],
      state: { stage: 'ask_service', lead: { ...state.lead, phone: t } },
    }
  }
  if (state.stage === 'ask_service') {
    const lead = { ...state.lead, service: t }
    const summary = `Hello, I am ${lead.name}. I am interested in ${lead.service}. My number is ${lead.phone}. Please contact me.`
    return {
      messages: [
        bot(`Thanks ${lead.name}! Our team will contact you shortly about ${lead.service}. You can also send these details to us on WhatsApp right now, or fill the enquiry form for a detailed quote.`, {
          actions: [
            { type: 'whatsapp', label: 'Send on WhatsApp', intent: 'general', message: summary },
            { type: 'link', label: 'Open Enquiry Form', href: `/contact?service=${encodeURIComponent(lead.service ?? '')}&name=${encodeURIComponent(lead.name ?? '')}&phone=${encodeURIComponent(lead.phone ?? '')}` },
          ],
          quickReplies: defaultReplies,
        }),
      ],
      state: { stage: 'done', lead },
    }
  }

  // Trigger lead capture
  if (['quote', 'callback', 'call back', 'consultation', 'book', 'crm demo', 'ecommerce demo', 'dashboard demo'].some((k) => lower.includes(k))) {
    const service = lower.includes('crm') ? 'CRM' : lower.includes('ecommerce') ? 'E-Commerce' : lower.includes('dashboard') ? 'Admin Dashboard' : undefined
    return {
      messages: [bot(service ? `Great choice — let me arrange a ${service} demo. First, what is your name?` : 'Great! Let me take a few details so our team can reach you. What is your name?')],
      state: { stage: 'ask_name', lead: { service } },
    }
  }

  const intent = matchIntent(t)
  if (intent) {
    return { messages: [bot(intent.reply, { quickReplies: intent.quickReplies, actions: intent.actions })], state: { ...state, stage: 'idle' } }
  }
  const faq = matchFaq(t)
  if (faq) {
    return { messages: [bot(faq.answer, { quickReplies: defaultReplies })], state: { ...state, stage: 'idle' } }
  }
  return {
    messages: [
      bot('I am not sure I understood that, but our team can help. Would you like to chat on WhatsApp or request a call back?', {
        actions: [{ type: 'whatsapp', label: 'Chat on WhatsApp', intent: 'general' }],
        quickReplies: [{ label: 'Request a call back', value: 'callback' }, ...defaultReplies.slice(0, 2)],
      }),
    ],
    state: { ...state, stage: 'idle' },
  }
}

/** Full chat transcript formatted for WhatsApp, so the team sees the whole conversation. */
export function formatTranscript(messages: BotMessage[], lead: LeadDraft): string {
  const lines: string[] = ['*Website Chat Enquiry*', '']
  if (lead.name || lead.phone || lead.service) {
    if (lead.name) lines.push(`*Name:* ${lead.name}`)
    if (lead.phone) lines.push(`*Phone:* ${lead.phone}`)
    if (lead.service) lines.push(`*Interested in:* ${lead.service}`)
    lines.push('')
  }
  lines.push('*Chat history:*')
  for (const m of messages) lines.push(`${m.role === 'user' ? '👤 Visitor' : '🤖 Assistant'}: ${m.text}`)
  lines.push('', `Sent from ${siteConfig.name} website chat`)
  return lines.join('\n')
}

/**
 * Link for a bot action. WhatsApp actions carry the whole conversation so far
 * (plus the action's own message) so nothing the visitor said is lost.
 */
export const actionHref = (a: BotAction, transcript?: string) => {
  if (a.type !== 'whatsapp') return a.href
  const intro = a.message ?? whatsappMessages[a.intent]
  return buildWhatsAppLink(a.intent, transcript ? `${intro}\n\n${transcript}` : intro)
}
