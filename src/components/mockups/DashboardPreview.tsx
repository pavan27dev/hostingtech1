import { BarChart, Donut, LineChart, StatTile } from './charts'
import { Bell, Search, LayoutDashboard, Users, TrendingUp, ListChecks, BarChart3, Settings } from 'lucide-react'
import { cn } from '@/utils/cn'

/* Illustrative sample values for the UI mockup only. */
const leads = [12, 18, 15, 22, 28, 26, 34, 31, 40, 38, 46, 52]
const revenue = [8, 11, 9, 14, 16, 15, 21, 19, 24, 23, 28, 31]

const nav = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Users, label: 'Leads' },
  { icon: TrendingUp, label: 'Sales' },
  { icon: ListChecks, label: 'Tasks' },
  { icon: BarChart3, label: 'Reports' },
  { icon: Settings, label: 'Settings' },
]

/** Hero mockup: analytics + CRM + sales/leads/revenue in one frame */
export function DashboardPreview({ className }: { className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-glow', className)} role="img" aria-label="Illustration of a business dashboard showing leads, revenue and CRM data (sample data)">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <div className="ml-3 hidden flex-1 items-center gap-2 rounded-md bg-white px-2 py-1 text-[11px] text-ink-400 sm:flex">
          <Search className="h-3 w-3" /> Search leads, customers, orders…
        </div>
        <Bell className="ml-auto h-3.5 w-3.5 text-ink-400" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-36 shrink-0 border-r border-ink-100 bg-white p-3 sm:block">
          <div className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-ink-400">Business OS</div>
          <ul className="space-y-1">
            {nav.map((n) => (
              <li key={n.label} className={cn('flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-medium', n.active ? 'bg-brand-50 text-brand-700' : 'text-ink-500')}>
                <n.icon className="h-3.5 w-3.5" /> {n.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <div className="flex-1 space-y-3 bg-ink-50/60 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-semibold text-ink-900">Overview</div>
              <div className="text-[10px] text-ink-400">Sample data · Last 12 months</div>
            </div>
            <span className="rounded-md bg-brand-600 px-2 py-1 text-[10px] font-semibold text-white">+ New Lead</span>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <StatTile label="Total Leads" value="1,284" delta="▲ 12%" />
            <StatTile label="Customers" value="342" delta="▲ 8%" tone="emerald" />
            <StatTile label="Revenue" value="₹ —" delta="▲ 15%" tone="violet" />
            <StatTile label="Conversion" value="26.6%" delta="▲ 2.1%" tone="amber" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-3 rounded-xl border border-ink-100 bg-white p-3 md:col-span-2">
              <div className="mb-2 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-ink-800">Leads & Revenue</span>
                <span className="flex items-center gap-3 text-ink-400">
                  <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-brand-500" />Leads</span>
                  <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-accent-500" />Revenue</span>
                </span>
              </div>
              <div className="relative h-24 sm:h-28">
                <div className="absolute inset-0"><LineChart points={leads} /></div>
                <div className="absolute inset-0"><LineChart points={revenue} color="#14b8a6" fill={false} /></div>
              </div>
            </div>
            <div className="col-span-3 rounded-xl border border-ink-100 bg-white p-3 md:col-span-1">
              <div className="mb-2 text-[11px] font-semibold text-ink-800">Lead Sources</div>
              <div className="flex items-center gap-3">
                <Donut size={72} segments={[{ value: 42, color: '#3461ff' }, { value: 24, color: '#14b8a6' }, { value: 18, color: '#8b5cf6' }, { value: 16, color: '#f59e0b' }]} />
                <ul className="space-y-1 text-[10px] text-ink-500">
                  <li><i className="mr-1 inline-block h-2 w-2 rounded-full bg-brand-500" />Instagram</li>
                  <li><i className="mr-1 inline-block h-2 w-2 rounded-full bg-accent-500" />Google</li>
                  <li><i className="mr-1 inline-block h-2 w-2 rounded-full bg-violet-500" />Website</li>
                  <li><i className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-500" />Referral</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-3 rounded-xl border border-ink-100 bg-white p-3 md:col-span-1">
              <div className="mb-2 text-[11px] font-semibold text-ink-800">Sales Performance</div>
              <div className="h-16"><BarChart values={[6, 9, 7, 11, 13, 12, 15]} secondary={[4, 6, 5, 8, 9, 8, 11]} /></div>
            </div>
            <div className="col-span-3 rounded-xl border border-ink-100 bg-white p-3 md:col-span-2">
              <div className="mb-2 text-[11px] font-semibold text-ink-800">Recent Leads</div>
              <ul className="divide-y divide-ink-100 text-[10px]">
                {[
                  ['Retail store enquiry', 'E-Commerce', 'New', 'bg-brand-50 text-brand-700'],
                  ['Clinic website', 'Website', 'Contacted', 'bg-amber-50 text-amber-700'],
                  ['Property consultant', 'CRM', 'Demo', 'bg-violet-50 text-violet-700'],
                ].map(([n, s, st, c]) => (
                  <li key={n} className="flex items-center justify-between py-1.5">
                    <span className="font-medium text-ink-800">{n}</span>
                    <span className="hidden text-ink-400 sm:inline">{s}</span>
                    <span className={cn('rounded px-1.5 py-0.5 font-semibold', c)}>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
