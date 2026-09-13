/**
 * Tiny SVG chart primitives for dashboard mockups. Values are illustrative
 * UI content only (not business metrics) and are labelled as sample data.
 */
import { cn } from '@/utils/cn'

export function LineChart({ points, className, color = '#3461ff', fill = true }: { points: number[]; className?: string; color?: string; fill?: boolean }) {
  const w = 100
  const h = 40
  const max = Math.max(...points)
  const min = Math.min(...points)
  const coords = points.map((p, i) => [(i / (points.length - 1)) * w, h - ((p - min) / (max - min || 1)) * (h - 6) - 3])
  const d = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const id = `g${color.replace('#', '')}`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={cn('h-full w-full', className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />}
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export function BarChart({ values, className, color = '#3461ff', secondary }: { values: number[]; className?: string; color?: string; secondary?: number[] }) {
  const max = Math.max(...values, ...(secondary ?? []))
  return (
    <div className={cn('flex h-full w-full items-end gap-[6%]', className)} aria-hidden>
      {values.map((v, i) => (
        <div key={i} className="flex h-full flex-1 items-end gap-[2px]">
          <div className="w-full rounded-t-sm" style={{ height: `${(v / max) * 100}%`, background: color }} />
          {secondary && <div className="w-full rounded-t-sm bg-ink-200" style={{ height: `${(secondary[i] / max) * 100}%` }} />}
        </div>
      ))}
    </div>
  )
}

export function Donut({ segments, className, size = 88 }: { segments: Array<{ value: number; color: string }>; className?: string; size?: number }) {
  const total = segments.reduce((a, s) => a + s.value, 0)
  const r = 15.9155
  let offset = 0
  return (
    <svg viewBox="0 0 42 42" width={size} height={size} className={className} aria-hidden>
      <circle cx="21" cy="21" r={r} fill="none" stroke="#e8edf5" strokeWidth="6" />
      {segments.map((s, i) => {
        const pct = (s.value / total) * 100
        const el = (
          <circle key={i} cx="21" cy="21" r={r} fill="none" stroke={s.color} strokeWidth="6" strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={-offset + 25} strokeLinecap="butt" />
        )
        offset += pct
        return el
      })}
    </svg>
  )
}

export function StatTile({ label, value, delta, tone = 'brand', className }: { label: string; value: string; delta?: string; tone?: 'brand' | 'emerald' | 'amber' | 'violet' | 'rose'; className?: string }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    violet: 'bg-violet-50 text-violet-700',
    rose: 'bg-rose-50 text-rose-700',
  }
  return (
    <div className={cn('rounded-xl border border-ink-100 bg-white p-3', className)}>
      <div className="text-[10px] font-medium uppercase tracking-wide text-ink-400">{label}</div>
      <div className="mt-1 flex items-end justify-between gap-2">
        <div className="font-display text-lg font-bold text-ink-900">{value}</div>
        {delta && <span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-semibold', tones[tone])}>{delta}</span>}
      </div>
    </div>
  )
}
