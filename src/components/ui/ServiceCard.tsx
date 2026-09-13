import { Link } from 'react-router-dom'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import type { Service } from '@/types/content'
import { Button } from './Button'
import { buildWhatsAppLink } from '@/config/whatsapp'
import { trackEvent } from '@/utils/tracking'
import { cn } from '@/utils/cn'

export const accentClasses: Record<Service['accent'], { icon: string; ring: string; check: string }> = {
  brand: { icon: 'bg-brand-50 text-brand-600', ring: 'group-hover:border-brand-200', check: 'text-brand-600' },
  accent: { icon: 'bg-teal-50 text-teal-600', ring: 'group-hover:border-teal-200', check: 'text-teal-600' },
  violet: { icon: 'bg-violet-50 text-violet-600', ring: 'group-hover:border-violet-200', check: 'text-violet-600' },
  amber: { icon: 'bg-amber-50 text-amber-600', ring: 'group-hover:border-amber-200', check: 'text-amber-600' },
  rose: { icon: 'bg-rose-50 text-rose-600', ring: 'group-hover:border-rose-200', check: 'text-rose-600' },
  emerald: { icon: 'bg-emerald-50 text-emerald-600', ring: 'group-hover:border-emerald-200', check: 'text-emerald-600' },
}

/** Compact card used in the "Everything your business needs" grid. */
export function ValueCard({ service }: { service: Service }) {
  const a = accentClasses[service.accent]
  return (
    <Link to={service.href} className={cn('card card-hover group flex h-full flex-col p-6', a.ring)}>
      <span className={cn('mb-5 grid h-12 w-12 place-items-center rounded-xl', a.icon)}>
        <service.icon className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-bold">{service.shortTitle}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{service.description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
        Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

/** Detailed service card with feature list and CTAs. */
export function ServiceCard({ service, featured }: { service: Service; featured?: boolean }) {
  const a = accentClasses[service.accent]
  return (
    <article className={cn('card card-hover group flex h-full flex-col p-6 sm:p-8', featured && 'lg:col-span-2', a.ring)}>
      <div className="flex items-start gap-4">
        <span className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-xl', a.icon)}>
          <service.icon className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-xl font-bold">{service.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{service.description}</p>
        </div>
      </div>
      <ul className={cn('mt-6 grid gap-x-4 gap-y-2 text-sm text-ink-600', featured ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <Check className={cn('h-4 w-4 shrink-0', a.check)} /> {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-2 pt-7 sm:flex-row">
        <Button to={service.href} iconRight={<ArrowRight />} onClick={() => trackEvent('cta_click', { cta: service.cta, service: service.slug })}>
          {service.cta}
        </Button>
        <Button href={buildWhatsAppLink(service.whatsappIntent)} target="_blank" rel="noopener noreferrer" variant="outline" icon={<MessageCircle />} onClick={() => trackEvent('whatsapp_click', { placement: 'service_card', intent: service.whatsappIntent })}>
          WhatsApp
        </Button>
      </div>
    </article>
  )
}
