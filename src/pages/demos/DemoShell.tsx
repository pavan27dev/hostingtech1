import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { useSEO } from '@/hooks'
import { siteConfig } from '@/config/site'
import { buildWhatsAppLink } from '@/config/whatsapp'
import { Button } from '@/components/ui/Button'
import type { Project } from '@/types/content'

/**
 * Wrapper for every demo: a "Demo project · sample data" banner, the project
 * title, the demo body, and a conversion CTA. All demo data is illustrative.
 */
export function DemoShell({ project, children, intentMessage }: { project: Project; children: ReactNode; intentMessage: string }) {
  useSEO({
    title: `${project.name} Demo | ${siteConfig.name}`,
    description: `Interactive demo of a ${project.name.toLowerCase()} built by ${siteConfig.name} for ${project.industry.toLowerCase()} businesses. Sample data only.`,
    noIndex: true,
  })
  const wa = buildWhatsAppLink('general', intentMessage)

  return (
    <div className="bg-ink-50/70">
      <div className="border-b border-amber-200 bg-amber-50 text-amber-900">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-2 text-xs sm:text-sm">
          <span><strong>Demo project</strong> — a concept build with sample data, not a live client system.</span>
          <Link to="/portfolio" className="inline-flex items-center gap-1 font-semibold hover:underline"><ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio</Link>
        </div>
      </div>

      <div className="container-x py-8 sm:py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">{project.industry}</span>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{project.name}</h1>
            <p className="mt-2 max-w-2xl text-ink-500">{project.description}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => <li key={t} className="rounded-md bg-white px-2 py-1 text-[11px] font-medium text-ink-600 shadow-sm">{t}</li>)}
            </ul>
          </div>
          <Button href={wa} target="_blank" rel="noopener noreferrer" variant="whatsapp" icon={<MessageCircle />}>I want this for my business</Button>
        </div>

        {children}

        <div className="mt-10 rounded-3xl bg-ink-900 px-6 py-10 text-center text-white sm:px-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Want a {project.name.toLowerCase()} like this?</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/70">We customise every feature to your business. Get a free consultation and a clear quote.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/contact" size="lg">Get Free Consultation</Button>
            <Button href={wa} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" icon={<MessageCircle />}>Chat on WhatsApp</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Shared app-frame primitives used by the dashboard-style demos ────────── */

export function AppFrame({ brand, nav, active, onNav, children, accent = 'bg-brand-600' }: { brand: string; nav: string[]; active: string; onNav: (n: string) => void; children: ReactNode; accent?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-glow">
      <div className="flex min-h-[560px] flex-col md:flex-row">
        <aside className="border-b border-ink-100 bg-white md:w-56 md:shrink-0 md:border-b-0 md:border-r">
          <div className="flex items-center gap-2 px-4 py-4">
            <span className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold text-white ${accent}`}>{brand.slice(0, 2).toUpperCase()}</span>
            <span className="text-sm font-bold text-ink-900">{brand}</span>
          </div>
          <nav className="thin-scroll flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible" aria-label="Demo navigation">
            {nav.map((n) => (
              <button key={n} type="button" onClick={() => onNav(n)} className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm font-medium transition ${active === n ? 'bg-brand-50 text-brand-700' : 'text-ink-600 hover:bg-ink-50'}`}>
                {n}
              </button>
            ))}
          </nav>
        </aside>
        <div className="flex-1 bg-ink-50/60 p-4 sm:p-6">{children}</div>
      </div>
    </div>
  )
}

export function Kpi({ label, value, hint, tone = 'text-brand-700' }: { label: string; value: string; hint?: string; tone?: string }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-ink-400">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold text-ink-900">{value}</div>
      {hint && <div className={`mt-1 text-xs font-semibold ${tone}`}>{hint}</div>}
    </div>
  )
}

export function Panel({ title, children, action, className = '' }: { title: string; children: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-ink-100 bg-white p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
            {head.map((h) => <th key={h} className="py-2 pr-4 font-medium">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-ink-50/70">
              {r.map((c, j) => <td key={j} className="py-2.5 pr-4 text-ink-700">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const statusPill = (s: string) => {
  const map: Record<string, string> = {
    New: 'bg-brand-50 text-brand-700', Contacted: 'bg-amber-50 text-amber-700', Qualified: 'bg-violet-50 text-violet-700', Demo: 'bg-violet-50 text-violet-700',
    Proposal: 'bg-sky-50 text-sky-700', Negotiation: 'bg-orange-50 text-orange-700', Won: 'bg-emerald-50 text-emerald-700', Lost: 'bg-rose-50 text-rose-700',
    Paid: 'bg-emerald-50 text-emerald-700', Shipped: 'bg-sky-50 text-sky-700', Pending: 'bg-amber-50 text-amber-700', Delivered: 'bg-emerald-50 text-emerald-700', Active: 'bg-emerald-50 text-emerald-700', Paused: 'bg-ink-100 text-ink-600',
  }
  return <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${map[s] ?? 'bg-ink-100 text-ink-600'}`}>{s}</span>
}
