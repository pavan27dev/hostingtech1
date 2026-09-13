import { BarChart, Donut, LineChart, StatTile } from './charts'
import { cn } from '@/utils/cn'

/* Sample values for illustration only. */
const monthlyLeads = [20, 26, 24, 32, 38, 36, 44, 48, 52, 50, 58, 64]
const monthlyRevenue = [5, 7, 6, 9, 11, 10, 13, 14, 16, 15, 18, 21]
const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

export const crmModules = ['Leads', 'Customers', 'Sales', 'Tasks', 'Follow-ups', 'Employees', 'Reports', 'Analytics']

export function CRMDashboardMockup({ className }: { className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-glow', className)} role="img" aria-label="CRM dashboard mockup with leads, customers, conversions, revenue and follow-ups (sample data)">
      <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-brand-600 text-[10px] font-bold text-white">CRM</span>
          <span className="text-[12px] font-semibold text-ink-900">Sales Dashboard</span>
        </div>
        <div className="hidden gap-1 sm:flex">
          {crmModules.slice(0, 5).map((m, i) => (
            <span key={m} className={cn('rounded-md px-2 py-1 text-[10px] font-medium', i === 0 ? 'bg-brand-50 text-brand-700' : 'text-ink-500')}>{m}</span>
          ))}
        </div>
      </div>

      <div className="space-y-3 bg-ink-50/60 p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-6">
          <StatTile label="Total Leads" value="2,410" delta="▲ 9%" />
          <StatTile label="New Leads" value="184" delta="▲ 14%" tone="brand" />
          <StatTile label="Customers" value="612" delta="▲ 6%" tone="emerald" />
          <StatTile label="Conversions" value="25.4%" delta="▲ 1.8%" tone="amber" />
          <StatTile label="Revenue" value="₹ —" delta="▲ 12%" tone="violet" />
          <StatTile label="Pending Follow-ups" value="37" delta="Today" tone="rose" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2 rounded-xl border border-ink-100 bg-white p-3 md:col-span-1">
            <div className="mb-2 text-[11px] font-semibold text-ink-800">Monthly Leads</div>
            <div className="h-20"><BarChart values={monthlyLeads} /></div>
            <div className="mt-1 flex justify-between text-[8px] text-ink-300">{months.map((m, i) => <span key={i}>{m}</span>)}</div>
          </div>
          <div className="col-span-2 rounded-xl border border-ink-100 bg-white p-3 md:col-span-1">
            <div className="mb-2 text-[11px] font-semibold text-ink-800">Monthly Revenue</div>
            <div className="h-20"><LineChart points={monthlyRevenue} color="#14b8a6" /></div>
            <div className="mt-1 flex justify-between text-[8px] text-ink-300">{months.map((m, i) => <span key={i}>{m}</span>)}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2 rounded-xl border border-ink-100 bg-white p-3 md:col-span-1">
            <div className="mb-2 text-[11px] font-semibold text-ink-800">Lead Sources</div>
            <div className="flex items-center gap-4">
              <Donut size={76} segments={[{ value: 38, color: '#3461ff' }, { value: 22, color: '#14b8a6' }, { value: 16, color: '#8b5cf6' }, { value: 14, color: '#f59e0b' }, { value: 10, color: '#fb7185' }]} />
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-ink-500">
                {[['Instagram', 'bg-brand-500'], ['Google', 'bg-accent-500'], ['Website', 'bg-violet-500'], ['WhatsApp', 'bg-amber-500'], ['Referral', 'bg-rose-400']].map(([l, c]) => (
                  <li key={l}><i className={cn('mr-1 inline-block h-2 w-2 rounded-full', c)} />{l}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-2 rounded-xl border border-ink-100 bg-white p-3 md:col-span-1">
            <div className="mb-2 text-[11px] font-semibold text-ink-800">Sales Performance</div>
            <ul className="space-y-2 text-[10px]">
              {[['Team A', 82, 'bg-brand-500'], ['Team B', 64, 'bg-accent-500'], ['Team C', 47, 'bg-violet-500']].map(([n, v, c]) => (
                <li key={n as string}>
                  <div className="mb-1 flex justify-between text-ink-500"><span>{n}</span><span>{v}%</span></div>
                  <div className="h-1.5 rounded-full bg-ink-100"><div className={cn('h-full rounded-full', c)} style={{ width: `${v}%` }} /></div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-ink-100 bg-white p-3">
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-ink-800">Pipeline</span>
            <span className="text-ink-400">Drag to move stage</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-[10px] sm:grid-cols-8">
            {['New', 'Contacted', 'Qualified', 'Demo', 'Proposal', 'Negotiation', 'Won', 'Lost'].map((s, i) => (
              <div key={s} className="rounded-lg bg-ink-50 p-2">
                <div className="mb-1 truncate font-semibold text-ink-700">{s}</div>
                <div className="space-y-1">
                  {Array.from({ length: Math.max(1, 3 - (i % 3)) }).map((_, j) => <div key={j} className="h-4 rounded bg-white shadow-sm" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
