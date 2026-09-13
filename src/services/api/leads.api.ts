import { api, isApiConfigured } from './apiClient'
import { endpoints } from './endpoints'
import type { CreateLeadRequest, Lead, LeadStatus } from '@/types/lead'

const PENDING_LEADS_KEY = 'pending_leads_v1'

/**
 * Submits a lead to the backend.
 *
 * Until VITE_API_BASE_URL is configured, leads are queued in localStorage so
 * nothing is lost during development, and the UI still shows a success state.
 * Swap `queueLocally` for a real call once the Spring Boot API is deployed —
 * no component code needs to change.
 */
export async function createLead(payload: CreateLeadRequest): Promise<Lead> {
  if (!isApiConfigured()) {
    return queueLocally(payload)
  }
  return api.post<Lead>(endpoints.leads.create, payload)
}

export const listLeads = () => api.get<Lead[]>(endpoints.leads.list)
export const getLead = (id: string) => api.get<Lead>(endpoints.leads.byId(id))
export const updateLeadStatus = (id: string, status: LeadStatus) =>
  api.patch<Lead>(endpoints.leads.updateStatus(id), { status })

function queueLocally(payload: CreateLeadRequest): Lead {
  const lead: Lead = {
    ...payload,
    leadId: `local-${Date.now().toString(36)}`,
    status: 'New',
    createdAt: new Date().toISOString(),
  }
  try {
    const existing: Lead[] = JSON.parse(localStorage.getItem(PENDING_LEADS_KEY) || '[]')
    localStorage.setItem(PENDING_LEADS_KEY, JSON.stringify([...existing, lead]))
  } catch {
    /* storage unavailable — ignore */
  }
  if (import.meta.env.DEV) {
    console.info('[leads] VITE_API_BASE_URL not set — lead queued locally:', lead)
  }
  return lead
}
