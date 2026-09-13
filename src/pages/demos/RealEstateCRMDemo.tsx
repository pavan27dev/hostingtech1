import { useState } from 'react'
import { AppFrame, Kpi, Panel, Table, statusPill } from './DemoShell'
import { BarChart, Donut, LineChart } from '@/components/mockups/charts'
import { LEAD_STATUSES, type LeadStatus } from '@/types/lead'

/* Sample data for demonstration only. */
interface DemoLead { id: number; name: string; property: string; budget: string; source: string; status: LeadStatus; next: string }
const seed: DemoLead[] = [
  { id: 1, name: 'Anita R.', property: '3BHK · Whitefield', budget: '₹1.2 Cr', source: 'Instagram', status: 'New', next: 'Call today 4 PM' },
  { id: 2, name: 'Rahul M.', property: '2BHK · HSR Layout', budget: '₹85 L', source: 'Website', status: 'Contacted', next: 'Site visit Sat' },
  { id: 3, name: 'Priya K.', property: 'Villa · Sarjapur', budget: '₹2.4 Cr', source: 'Referral', status: 'Qualified', next: 'Share brochure' },
  { id: 4, name: 'Suresh B.', property: 'Plot · Devanahalli', budget: '₹60 L', source: 'Google', status: 'Demo', next: 'Site visit done' },
  { id: 5, name: 'Meera S.', property: '3BHK · Electronic City', budget: '₹95 L', source: 'WhatsApp', status: 'Proposal', next: 'Awaiting reply' },
  { id: 6, name: 'Karthik V.', property: '4BHK · Indiranagar', budget: '₹3.1 Cr', source: 'Instagram', status: 'Negotiation', next: 'Price discussion' },
  { id: 7, name: 'Divya N.', property: '2BHK · Marathahalli', budget: '₹70 L', source: 'Facebook', status: 'Won', next: 'Agreement signed' },
]

export function RealEstateCRMDemo() {
  const [view, setView] = useState('Dashboard')
  const [leads, setLeads] = useState(seed)
  const [filter, setFilter] = useState<'All' | LeadStatus>('All')

  const move = (id: number, status: LeadStatus) => setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)))
  const shown = filter === 'All' ? leads : leads.filter((l) => l.status === filter)
  const count = (s: LeadStatus) => leads.filter((l) => l.status === s).length

  return (
    <AppFrame brand="PropCRM" nav={['Dashboard', 'Leads', 'Pipeline', 'Site Visits', 'Properties', 'Agents', 'Reports']} active={view} onNav={setView} accent="bg-violet-600">
      {view === 'Dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Kpi label="Total Leads" value={String(leads.length * 38)} hint="▲ 12% this month" />
            <Kpi label="Site Visits" value="42" hint="18 this week" tone="text-violet-700" />
            <Kpi label="Deals Won" value={String(count('Won') * 9)} hint="▲ 3 vs last month" tone="text-emerald-700" />
            <Kpi label="Pending Follow-ups" value="17" hint="6 due today" tone="text-rose-600" />
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            <Panel title="Enquiries per month" className="lg:col-span-2"><div className="h-40"><BarChart values={[22, 28, 25, 34, 40, 38, 46, 52, 49, 58, 63, 70]} color="#8b5cf6" /></div></Panel>
            <Panel title="Lead sources">
              <div className="flex items-center gap-4">
                <Donut size={96} segments={[{ value: 40, color: '#8b5cf6' }, { value: 25, color: '#3461ff' }, { value: 20, color: '#14b8a6' }, { value: 15, color: '#f59e0b' }]} />
                <ul className="space-y-1 text-xs text-ink-600">{['Instagram', 'Website', 'Referral', 'Google'].map((s, i) => <li key={s}><i className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: ['#8b5cf6', '#3461ff', '#14b8a6', '#f59e0b'][i] }} />{s}</li>)}</ul>
              </div>
            </Panel>
          </div>
          <Panel title="Today's follow-ups">
            <Table head={['Lead', 'Property', 'Action', 'Status']} rows={leads.slice(0, 4).map((l) => [<strong key="n">{l.name}</strong>, l.property, l.next, statusPill(l.status)])} />
          </Panel>
        </div>
      )}

      {view === 'Leads' && (
        <Panel title={`Leads (${shown.length})`} action={
          <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className="rounded-lg border border-ink-200 px-2 py-1 text-xs" aria-label="Filter by status">
            <option>All</option>{LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        }>
          <Table head={['Name', 'Property', 'Budget', 'Source', 'Status', 'Move to']} rows={shown.map((l) => [
            <strong key="n">{l.name}</strong>, l.property, l.budget, l.source, statusPill(l.status),
            <select key="m" value={l.status} onChange={(e) => move(l.id, e.target.value as LeadStatus)} className="rounded-md border border-ink-200 px-1.5 py-1 text-xs" aria-label={`Change status for ${l.name}`}>{LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}</select>,
          ])} />
          <p className="mt-3 text-xs text-ink-400">Try changing a status — the pipeline view updates live.</p>
        </Panel>
      )}

      {view === 'Pipeline' && (
        <div className="thin-scroll grid grid-flow-col auto-cols-[minmax(160px,1fr)] gap-3 overflow-x-auto pb-2">
          {LEAD_STATUSES.map((s) => (
            <div key={s} className="rounded-xl bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-ink-700"><span>{s}</span><span className="rounded-full bg-ink-100 px-1.5">{count(s)}</span></div>
              <div className="space-y-2">
                {leads.filter((l) => l.status === s).map((l) => (
                  <div key={l.id} className="rounded-lg border border-ink-100 p-2 text-xs">
                    <div className="font-semibold text-ink-900">{l.name}</div>
                    <div className="text-ink-500">{l.property}</div>
                    <div className="mt-1 font-medium text-violet-700">{l.budget}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'Site Visits' && (
        <Panel title="Scheduled site visits">
          <Table head={['Date', 'Lead', 'Property', 'Agent', 'Status']} rows={[
            ['Sat, 10:30 AM', 'Rahul M.', '2BHK · HSR Layout', 'Agent A', statusPill('Contacted')],
            ['Sat, 2:00 PM', 'Anita R.', '3BHK · Whitefield', 'Agent B', statusPill('New')],
            ['Sun, 11:00 AM', 'Priya K.', 'Villa · Sarjapur', 'Agent A', statusPill('Qualified')],
          ]} />
        </Panel>
      )}

      {view === 'Properties' && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[['3BHK Apartment', 'Whitefield', '₹1.2 Cr', 'bg-violet-100'], ['2BHK Apartment', 'HSR Layout', '₹85 L', 'bg-brand-100'], ['Luxury Villa', 'Sarjapur Road', '₹2.4 Cr', 'bg-amber-100'], ['Residential Plot', 'Devanahalli', '₹60 L', 'bg-emerald-100'], ['4BHK Penthouse', 'Indiranagar', '₹3.1 Cr', 'bg-rose-100'], ['2BHK Apartment', 'Marathahalli', '₹70 L', 'bg-sky-100']].map(([t, a, p, c]) => (
            <div key={t + a} className="overflow-hidden rounded-xl border border-ink-100 bg-white">
              <div className={`h-28 ${c}`} />
              <div className="p-3"><div className="font-semibold text-ink-900">{t}</div><div className="text-xs text-ink-500">{a}</div><div className="mt-1 font-bold text-violet-700">{p}</div></div>
            </div>
          ))}
        </div>
      )}

      {view === 'Agents' && (
        <Panel title="Agent performance">
          <Table head={['Agent', 'Leads', 'Site Visits', 'Deals', 'Conversion']} rows={[['Agent A', '64', '21', '7', '10.9%'], ['Agent B', '58', '17', '5', '8.6%'], ['Agent C', '41', '12', '4', '9.8%']]} />
        </Panel>
      )}

      {view === 'Reports' && (
        <div className="grid gap-3 lg:grid-cols-2">
          <Panel title="Revenue (commission) by month"><div className="h-40"><LineChart points={[4, 6, 5, 8, 9, 11, 10, 13, 15, 14, 18, 21]} color="#8b5cf6" /></div></Panel>
          <Panel title="Conversion by source"><div className="h-40"><BarChart values={[12, 9, 15, 7, 6]} color="#14b8a6" /></div><div className="mt-1 flex justify-between text-[10px] text-ink-400"><span>Instagram</span><span>Website</span><span>Referral</span><span>Google</span><span>Facebook</span></div></Panel>
        </div>
      )}
    </AppFrame>
  )
}
