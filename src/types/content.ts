import type { LucideIcon } from 'lucide-react'
import type { WhatsAppIntent } from '@/config/whatsapp'

export interface Service {
  slug: string
  title: string
  shortTitle: string
  href: string
  icon: LucideIcon
  tagline: string
  description: string
  features: string[]
  cta: string
  whatsappIntent: WhatsAppIntent
  /** Which contact-form service option this maps to */
  serviceOption: string
  accent: 'brand' | 'accent' | 'violet' | 'amber' | 'rose' | 'emerald'
}

export interface Project {
  id: string
  name: string
  industry: string
  technologies: string[]
  description: string
  features: string[]
  /** Visual theme used by the generated preview illustration */
  preview: 'crm' | 'store' | 'restaurant' | 'dashboard' | 'marketing' | 'service'
  isDemo: true
}

export interface PricingPlan {
  id: string
  name: string
  priceLabel: string
  period?: string
  description: string
  features: string[]
  cta: string
  whatsappIntent: WhatsAppIntent
  highlighted?: boolean
}

export interface FAQItem {
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  content: string[]
}
