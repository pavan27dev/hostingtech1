import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SelectField, TextAreaField, TextField } from '@/components/ui/FormFields'
import { BUDGET_OPTIONS, SERVICE_OPTIONS, type BudgetOption, type CreateLeadRequest, type ServiceOption } from '@/types/lead'
import { leadsApi, ApiError } from '@/services/api'
import { captureAttribution, trackEvent } from '@/utils/tracking'
import { buildWhatsAppLink, formatLeadMessage } from '@/config/whatsapp'

interface FormValues {
  name: string
  businessName: string
  email: string
  phone: string
  service: ServiceOption | ''
  budget: BudgetOption | ''
  message: string
  /** Honeypot — must stay empty */
  website: string
}

type Errors = Partial<Record<keyof FormValues, string>>

const validate = (v: FormValues): Errors => {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (!/^\+?[\d\s()-]{8,16}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.'
  if (!v.service) e.service = 'Please select a service.'
  if (v.message.trim().length < 10) e.message = 'Please describe your requirement (at least 10 characters).'
  return e
}

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [params] = useSearchParams()
  const preService = params.get('service') || ''
  const [values, setValues] = useState<FormValues>({
    name: params.get('name') || '',
    businessName: '',
    email: '',
    phone: params.get('phone') || '',
    service: (SERVICE_OPTIONS as readonly string[]).includes(preService) ? (preService as ServiceOption) : '',
    budget: '',
    message: '',
    website: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')
  const [waLink, setWaLink] = useState('')

  const set = (k: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (values.website) return // bot filled the honeypot
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus()
      return
    }
    setStatus('submitting')
    setServerError('')
    const attribution = captureAttribution()
    const payload: CreateLeadRequest = {
      name: values.name.trim(),
      businessName: values.businessName.trim() || undefined,
      email: values.email.trim(),
      phone: values.phone.trim(),
      service: values.service as ServiceOption,
      budget: values.budget,
      message: values.message.trim(),
      source: attribution.source,
      attribution,
    }
    // Deliver the enquiry to the business WhatsApp number with all details pre-filled.
    const link = buildWhatsAppLink('general', formatLeadMessage({ ...payload, budget: payload.budget || undefined, campaign: attribution.campaign }))
    setWaLink(link)
    // Open in the same click so mobile browsers don't block the popup.
    const popup = window.open(link, '_blank', 'noopener,noreferrer')
    try {
      await leadsApi.createLead(payload)
      trackEvent('lead_submitted', { service: payload.service, source: payload.source, campaign: attribution.campaign, whatsappOpened: Boolean(popup) })
      setStatus('success')
    } catch (err) {
      setServerError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again or contact us on WhatsApp.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card flex flex-col items-center p-8 text-center sm:p-12" role="status" aria-live="polite">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 className="h-8 w-8" /></span>
        <h3 className="mt-5 text-2xl font-bold">Thank you!</h3>
        <p className="mt-2 max-w-md text-ink-500">We received your enquiry. We'll contact you shortly.</p>
        <p className="mt-6 max-w-md text-sm text-ink-500">
          Your details have been opened in WhatsApp — just tap <strong>Send</strong> to deliver them to our team. If WhatsApp didn't open, use the button below.
        </p>
        <Button href={waLink || buildWhatsAppLink('general')} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" className="mt-3" icon={<MessageCircle />}>
          Send Enquiry on WhatsApp
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className={compact ? '' : 'card p-6 sm:p-8'} aria-label="Enquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full Name" name="name" required autoComplete="name" placeholder="Your name" value={values.name} onChange={set('name')} error={errors.name} />
        <TextField label="Business Name" name="businessName" autoComplete="organization" placeholder="Your business" value={values.businessName} onChange={set('businessName')} />
        <TextField label="Email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="you@example.com" value={values.email} onChange={set('email')} error={errors.email} />
        <TextField label="Phone Number" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" value={values.phone} onChange={set('phone')} error={errors.phone} />
        <SelectField label="Service" name="service" required options={SERVICE_OPTIONS} placeholder="Select a service" value={values.service} onChange={set('service')} error={errors.service} />
        <SelectField label="Budget" name="budget" options={BUDGET_OPTIONS} placeholder="Select a budget (optional)" value={values.budget} onChange={set('budget')} />
        <TextAreaField className="sm:col-span-2" label="Message" name="message" required placeholder="Tell us about your business and what you need…" value={values.message} onChange={set('message')} error={errors.message} />
        {/* Honeypot */}
        <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden>
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{serverError}</p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === 'submitting'} icon={status === 'submitting' ? <Loader2 className="animate-spin" /> : <Send />}>
          {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
        </Button>
        <p className="text-xs text-ink-400">By submitting, you agree to our privacy policy. We never share your details.</p>
      </div>
    </form>
  )
}
