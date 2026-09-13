import { useState } from 'react'
import { AppFrame, Kpi, Panel, Table, statusPill } from './DemoShell'
import { BarChart, Donut, LineChart } from '@/components/mockups/charts'
import { cn } from '@/utils/cn'

/* Sample data for demonstration only. */

/* ── Business admin dashboard ─────────────────────────────────────────────── */
export function BusinessDashboardDemo() {
  const [view, setView] = useState('Dashboard')
  const [range, setRange] = useState<'7d' | '30d' | '12m'>('30d')
  const series = { '7d': [12, 15, 11, 18, 21, 19, 24], '30d': [8, 10, 9, 13, 12, 15, 17, 16, 19, 21, 20, 24], '12m': [40, 46, 44, 52, 58, 55, 63, 70, 68, 76, 84, 92] }[range]
  return (
    <AppFrame brand="BizAdmin" nav={['Dashboard', 'Sales', 'Customers', 'Employees', 'Reports', 'Settings']} active={view} onNav={setView}>
      {view === 'Dashboard' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink-900">Overview</h3>
            <div className="flex gap-1 rounded-lg bg-white p-1">{(['7d', '30d', '12m'] as const).map((r) => <button key={r} type="button" onClick={() => setRange(r)} className={cn('rounded-md px-2.5 py-1 text-xs font-semibold', range === r ? 'bg-brand-600 text-white' : 'text-ink-500')}>{r}</button>)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Kpi label="Revenue" value="₹8.4 L" hint="▲ 15% vs prev" tone="text-emerald-700" /><Kpi label="Sales" value="312" hint="▲ 8%" /><Kpi label="Customers" value="1,845" hint="+96 new" tone="text-violet-700" /><Kpi label="Active employees" value="24" hint="3 on leave" tone="text-amber-700" />
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            <Panel title="Revenue trend" className="lg:col-span-2"><div className="h-44"><LineChart points={series} /></div></Panel>
            <Panel title="Revenue by branch"><div className="flex items-center gap-4"><Donut size={96} segments={[{ value: 45, color: '#3461ff' }, { value: 30, color: '#14b8a6' }, { value: 25, color: '#f59e0b' }]} /><ul className="space-y-1 text-xs text-ink-600"><li>● HSR Layout — 45%</li><li>● Koramangala — 30%</li><li>● Whitefield — 25%</li></ul></div></Panel>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            <Panel title="Top employees this month"><Table head={['Employee', 'Sales', 'Revenue', 'Target']} rows={[['Ravi K.', '48', '₹1.9 L', '96%'], ['Sneha P.', '41', '₹1.6 L', '88%'], ['Arjun D.', '37', '₹1.4 L', '81%']]} /></Panel>
            <Panel title="Recent activity"><ul className="space-y-2 text-sm">{['New customer registered — R. Iyer', 'Invoice #2291 paid — ₹24,500', 'Employee Ravi K. closed 3 sales', 'Monthly report exported (PDF)'].map((a) => <li key={a} className="flex gap-2 text-ink-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />{a}</li>)}</ul></Panel>
          </div>
        </div>
      )}
      {view === 'Sales' && <Panel title="Sales"><div className="h-48"><BarChart values={[18, 22, 19, 27, 31, 29, 35, 38, 36, 42, 45, 50]} secondary={[14, 18, 16, 21, 25, 24, 28, 30, 29, 34, 37, 41]} /></div><p className="mt-2 text-xs text-ink-400">Blue: this year · Grey: last year</p><div className="mt-4"><Table head={['Invoice', 'Customer', 'Amount', 'Status']} rows={[['#2291', 'R. Iyer', '₹24,500', statusPill('Paid')], ['#2290', 'M. Das', '₹8,200', statusPill('Pending')], ['#2289', 'A. Sharma', '₹15,750', statusPill('Paid')]]} /></div></Panel>}
      {view === 'Customers' && <Panel title="Customers"><Table head={['Name', 'Phone', 'Orders', 'Lifetime value', 'Status']} rows={[['R. Iyer', '+91 ••••• 12345', '12', '₹1.4 L', statusPill('Active')], ['M. Das', '+91 ••••• 67890', '4', '₹32,000', statusPill('Active')], ['A. Sharma', '+91 ••••• 24680', '9', '₹98,500', statusPill('Active')], ['K. Nair', '+91 ••••• 13579', '1', '₹6,200', statusPill('Paused')]]} /></Panel>}
      {view === 'Employees' && <Panel title="Employees"><Table head={['Name', 'Role', 'Branch', 'Attendance', 'Performance']} rows={[['Ravi K.', 'Sales Executive', 'HSR Layout', '96%', '★★★★★'], ['Sneha P.', 'Sales Executive', 'Koramangala', '92%', '★★★★☆'], ['Arjun D.', 'Support', 'Whitefield', '89%', '★★★★☆']]} /></Panel>}
      {view === 'Reports' && <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{['Daily Sales Report', 'Monthly Revenue Report', 'Customer Report', 'Employee Performance', 'Inventory Report', 'Tax Summary (GST)'].map((r) => <div key={r} className="rounded-xl border border-ink-100 bg-white p-4"><div className="font-semibold text-ink-900">{r}</div><div className="mt-3 flex gap-2 text-xs"><span className="rounded-md bg-ink-100 px-2 py-1">PDF</span><span className="rounded-md bg-ink-100 px-2 py-1">Excel</span></div></div>)}</div>}
      {view === 'Settings' && <Panel title="Settings"><ul className="space-y-2 text-sm text-ink-700">{['Company profile', 'Branches & locations', 'Users & roles (Admin / Manager / Employee)', 'Notifications (WhatsApp, Email)', 'Integrations (Payments, CRM)'].map((s) => <li key={s} className="rounded-lg border border-ink-100 px-3 py-2">{s}</li>)}</ul></Panel>}
    </AppFrame>
  )
}

/* ── Digital marketing dashboard ──────────────────────────────────────────── */
const campaigns = [
  { name: 'CRM Reel — Aug', channel: 'Instagram', spend: 12000, leads: 48, status: 'Active' },
  { name: 'Website Offer', channel: 'Meta Ads', spend: 18000, leads: 61, status: 'Active' },
  { name: 'E-Commerce Search', channel: 'Google Ads', spend: 22000, leads: 39, status: 'Active' },
  { name: 'Salon Launch', channel: 'Facebook', spend: 6000, leads: 14, status: 'Paused' },
]

export function MarketingDashboardDemo() {
  const [view, setView] = useState('Overview')
  const totalSpend = campaigns.reduce((a, c) => a + c.spend, 0)
  const totalLeads = campaigns.reduce((a, c) => a + c.leads, 0)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return (
    <AppFrame brand="AdPulse" nav={['Overview', 'Campaigns', 'Leads by Source', 'Content Calendar', 'Reports']} active={view} onNav={setView} accent="bg-rose-500">
      {view === 'Overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Kpi label="Ad spend (month)" value={`₹${(totalSpend / 1000).toFixed(0)}K`} hint="4 campaigns" /><Kpi label="Leads" value={String(totalLeads)} hint="▲ 22%" tone="text-emerald-700" /><Kpi label="Cost per lead" value={`₹${Math.round(totalSpend / totalLeads)}`} hint="▼ 9% (better)" tone="text-emerald-700" /><Kpi label="Reach" value="184K" hint="▲ 31%" tone="text-rose-600" />
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            <Panel title="Leads per day" className="lg:col-span-2"><div className="h-40"><BarChart values={[9, 14, 11, 18, 22, 27, 19]} color="#fb7185" /></div><div className="mt-1 flex justify-between text-[10px] text-ink-400">{days.map((d) => <span key={d}>{d}</span>)}</div></Panel>
            <Panel title="Leads by channel"><div className="flex items-center gap-4"><Donut size={96} segments={[{ value: 48, color: '#fb7185' }, { value: 61, color: '#3461ff' }, { value: 39, color: '#f59e0b' }, { value: 14, color: '#8b5cf6' }]} /><ul className="space-y-1 text-xs text-ink-600"><li>● Instagram 48</li><li>● Meta Ads 61</li><li>● Google Ads 39</li><li>● Facebook 14</li></ul></div></Panel>
          </div>
          <Panel title="Campaign ROI"><Table head={['Campaign', 'Channel', 'Spend', 'Leads', 'Cost / lead', 'Status']} rows={campaigns.map((c) => [<strong key="n">{c.name}</strong>, c.channel, `₹${c.spend.toLocaleString('en-IN')}`, String(c.leads), `₹${Math.round(c.spend / c.leads)}`, statusPill(c.status)])} /></Panel>
        </div>
      )}
      {view === 'Campaigns' && <div className="grid gap-3 sm:grid-cols-2">{campaigns.map((c) => <div key={c.name} className="rounded-xl border border-ink-100 bg-white p-4"><div className="flex items-start justify-between"><div><div className="font-semibold text-ink-900">{c.name}</div><div className="text-xs text-ink-500">{c.channel} · utm_campaign={c.name.toLowerCase().replace(/[^a-z]+/g, '_')}</div></div>{statusPill(c.status)}</div><div className="mt-3 h-16"><LineChart points={[3, 5, 4, 7, 6, 9, 8, 11]} color="#fb7185" /></div><div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs"><div><div className="font-bold text-ink-900">₹{(c.spend / 1000).toFixed(0)}K</div><div className="text-ink-400">Spend</div></div><div><div className="font-bold text-ink-900">{c.leads}</div><div className="text-ink-400">Leads</div></div><div><div className="font-bold text-ink-900">₹{Math.round(c.spend / c.leads)}</div><div className="text-ink-400">CPL</div></div></div></div>)}</div>}
      {view === 'Leads by Source' && <Panel title="Attribution — where leads come from"><Table head={['Source', 'Campaign', 'Landing page', 'Leads', 'Converted']} rows={[['Instagram', 'instagram_crm', '/solutions/crm', '48', '9'], ['Meta Ads', 'instagram_website', '/services/website-development', '61', '12'], ['Google Ads', 'google_ecommerce', '/solutions/ecommerce', '39', '7'], ['Direct', '—', '/', '26', '4']]} /><p className="mt-3 text-xs text-ink-400">Every enquiry carries its UTM source, campaign and landing page, so you know exactly which post or ad produced it.</p></Panel>}
      {view === 'Content Calendar' && <div className="thin-scroll overflow-x-auto"><div className="grid min-w-[700px] grid-cols-7 gap-2">{days.map((d, i) => <div key={d} className="rounded-xl bg-white p-2"><div className="mb-2 text-xs font-semibold text-ink-700">{d}</div>{[['Reel', 'bg-rose-100 text-rose-700'], ['Story', 'bg-violet-100 text-violet-700'], ['Post', 'bg-brand-100 text-brand-700']].slice(0, (i % 3) + 1).map(([t, c]) => <div key={t} className={cn('mb-1 rounded-md px-2 py-1 text-[11px] font-medium', c)}>{t} · {['CRM tips', 'Client story', 'Offer', 'Behind the scenes'][(i + 1) % 4]}</div>)}</div>)}</div></div>}
      {view === 'Reports' && <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{['Monthly Client Report', 'Instagram Growth', 'Ads Performance', 'Lead Attribution', 'Content Performance', 'SEO Rankings'].map((r) => <div key={r} className="rounded-xl border border-ink-100 bg-white p-4"><div className="font-semibold text-ink-900">{r}</div><div className="mt-3 flex gap-2 text-xs"><span className="rounded-md bg-ink-100 px-2 py-1">PDF</span><span className="rounded-md bg-ink-100 px-2 py-1">Share link</span></div></div>)}</div>}
    </AppFrame>
  )
}
