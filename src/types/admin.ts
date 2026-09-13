/**
 * FUTURE MODULES — type contracts for Admin, Client Admin, Employee and
 * Super Admin (multi-tenant SaaS). These are not rendered yet; they exist so
 * the frontend and Spring Boot backend agree on shapes from day one.
 */

import type { Lead, LeadSource, ServiceOption } from './lead'

/* ── Roles & auth ─────────────────────────────────────────────────────────── */

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'CLIENT_ADMIN' | 'EMPLOYEE'

export interface AuthUser {
  userId: string
  companyId?: string // null/undefined for SUPER_ADMIN
  name: string
  email: string
  role: UserRole
  permissions: string[]
}

export interface AuthTokens {
  accessToken: string // JWT issued by Spring Security
  expiresIn: number
}

/* ── Multi-tenant SaaS ────────────────────────────────────────────────────── */

export interface Company {
  companyId: string
  name: string
  industry?: string
  planId: string
  status: 'ACTIVE' | 'TRIAL' | 'SUSPENDED' | 'CANCELLED'
  createdAt: string
}

export interface Plan {
  planId: string
  name: string
  priceMonthly: number
  currency: 'INR' | 'USD'
  limits: { users: number; leads: number; storageMb: number }
  features: string[]
}

export interface Subscription {
  subscriptionId: string
  companyId: string
  planId: string
  startsAt: string
  endsAt: string
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELLED'
}

/* ── Admin dashboard ──────────────────────────────────────────────────────── */

export interface DashboardSummary {
  totalLeads: number
  newLeads: number
  qualifiedLeads: number
  customers: number
  revenue: number
  conversionRate: number
}

export interface MonthlyPoint {
  month: string // "2026-01"
  value: number
}

export interface DashboardCharts {
  leadsByMonth: MonthlyPoint[]
  revenueByMonth: MonthlyPoint[]
  leadsBySource: Array<{ source: LeadSource; count: number }>
  leadsByService: Array<{ service: ServiceOption; count: number }>
}

/* ── Modules (navigation map for the future admin app) ───────────────────── */

export const ADMIN_MODULES = [
  'Dashboard', 'Leads', 'Customers', 'Services', 'Projects', 'Pricing',
  'Contact Enquiries', 'Blog', 'Users', 'Settings', 'Analytics',
] as const

export const SUPER_ADMIN_MODULES = [
  'Companies', 'Customers', 'Users', 'Subscriptions', 'Plans', 'Services',
  'Revenue', 'Analytics', 'Permissions', 'System Settings',
] as const

export const CLIENT_ADMIN_MODULES = [
  'Dashboard', 'Leads', 'Customers', 'Employees', 'Orders', 'Products', 'Reports',
] as const

export const EMPLOYEE_MODULES = [
  'Assigned Leads', 'Customers', 'Tasks', 'Follow-ups', 'Sales',
] as const

export interface Customer {
  customerId: string
  companyId?: string
  name: string
  businessName?: string
  email: string
  phone: string
  convertedFromLead?: Lead['leadId']
  createdAt: string
}
