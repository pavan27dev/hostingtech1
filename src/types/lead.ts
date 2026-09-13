/** Mirrors the planned Spring Boot `Lead` entity / MySQL table. */

export const LEAD_SOURCES = [
  'Instagram',
  'Facebook',
  'Google',
  'Website',
  'WhatsApp',
  'LinkedIn',
  'Referral',
  'Direct',
] as const
export type LeadSource = (typeof LEAD_SOURCES)[number]

export const LEAD_STATUSES = [
  'New',
  'Contacted',
  'Qualified',
  'Demo',
  'Proposal',
  'Negotiation',
  'Won',
  'Lost',
] as const
export type LeadStatus = (typeof LEAD_STATUSES)[number]

export const SERVICE_OPTIONS = [
  'Website Development',
  'E-Commerce',
  'CRM',
  'Digital Marketing',
  'Admin Dashboard',
  'Business Automation',
  'Other',
] as const
export type ServiceOption = (typeof SERVICE_OPTIONS)[number]

export const BUDGET_OPTIONS = [
  'Below ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000+',
] as const
export type BudgetOption = (typeof BUDGET_OPTIONS)[number]

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/** Marketing attribution captured on the client (see utils/tracking.ts). */
export interface LeadAttribution {
  source: LeadSource
  landingPage: string
  campaign?: string
  medium?: string
  content?: string
  term?: string
  referrer?: string
  deviceType: DeviceType
  userAgent?: string
}

/** Payload sent to POST /api/v1/leads */
export interface CreateLeadRequest {
  name: string
  businessName?: string
  email: string
  phone: string
  service: ServiceOption
  budget?: BudgetOption | ''
  message: string
  source: LeadSource
  attribution: LeadAttribution
}

/** Entity returned by the backend */
export interface Lead extends Omit<CreateLeadRequest, 'attribution'> {
  leadId: string
  status: LeadStatus
  createdAt: string
  updatedAt?: string
  attribution?: LeadAttribution
}
