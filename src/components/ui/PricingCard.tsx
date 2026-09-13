import { Check, MessageCircle } from 'lucide-react'
import type { PricingPlan } from '@/types/content'
import { Button } from './Button'
import { buildWhatsAppLink } from '@/config/whatsapp'
import { trackEvent } from '@/utils/tracking'
import { cn } from '@/utils/cn'

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article className={cn('card relative flex h-full flex-col p-7 sm:p-8', plan.highlighted && 'border-brand-300 shadow-glow lg:-translate-y-2')}>
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">Most Popular</span>
      )}
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className="mt-1.5 text-sm text-ink-500">{plan.description}</p>
      <div className="mt-6">
        <span className="text-xs font-medium uppercase tracking-wider text-ink-400">Starting from</span>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-display text-4xl font-extrabold text-ink-900">{plan.priceLabel}</span>
          {plan.period && <span className="text-sm font-medium text-ink-500">{plan.period}</span>}
        </div>
      </div>
      <ul className="mt-7 space-y-2.5 text-sm text-ink-600">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3 w-3" /></span>
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto grid gap-2 pt-8">
        <Button to={`/contact?service=${encodeURIComponent(plan.name === 'Website' ? 'Website Development' : plan.name)}`} variant={plan.highlighted ? 'primary' : 'secondary'} fullWidth onClick={() => trackEvent('cta_click', { cta: plan.cta })}>
          {plan.cta}
        </Button>
        <Button href={buildWhatsAppLink(plan.whatsappIntent)} target="_blank" rel="noopener noreferrer" variant="outline" fullWidth icon={<MessageCircle />}>
          Ask on WhatsApp
        </Button>
      </div>
    </article>
  )
}
