import { useMemo, useState } from 'react'
import { Heart, Minus, Plus, Search, ShoppingBag, Trash2, X } from 'lucide-react'
import { Kpi, Panel, Table, statusPill } from './DemoShell'
import { LineChart } from '@/components/mockups/charts'
import { cn } from '@/utils/cn'

/* Sample catalogue for demonstration only. */
interface Product { id: number; name: string; category: string; price: number; tone: string; stock: number }
const catalogue: Product[] = [
  { id: 1, name: 'Wireless Earbuds', category: 'Electronics', price: 1999, tone: 'bg-brand-100', stock: 42 },
  { id: 2, name: 'Cotton Kurta', category: 'Fashion', price: 1299, tone: 'bg-amber-100', stock: 18 },
  { id: 3, name: 'Steel Water Bottle', category: 'Home', price: 649, tone: 'bg-emerald-100', stock: 120 },
  { id: 4, name: 'Running Shoes', category: 'Fashion', price: 2799, tone: 'bg-rose-100', stock: 9 },
  { id: 5, name: 'Smart LED Bulb', category: 'Electronics', price: 499, tone: 'bg-violet-100', stock: 0 },
  { id: 6, name: 'Ceramic Mug Set', category: 'Home', price: 899, tone: 'bg-sky-100', stock: 33 },
  { id: 7, name: 'Yoga Mat', category: 'Fitness', price: 1099, tone: 'bg-teal-100', stock: 25 },
  { id: 8, name: 'Bluetooth Speaker', category: 'Electronics', price: 2499, tone: 'bg-orange-100', stock: 14 },
]
const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

export function EcommerceDemo() {
  const [tab, setTab] = useState<'Store' | 'Admin'>('Store')
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [wish, setWish] = useState<number[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [step, setStep] = useState<'cart' | 'checkout' | 'placed'>('cart')

  const cats = ['All', ...Array.from(new Set(catalogue.map((p) => p.category)))]
  const list = useMemo(() => catalogue.filter((p) => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())), [q, cat])
  const items = Object.entries(cart).map(([id, qty]) => ({ p: catalogue.find((x) => x.id === Number(id))!, qty }))
  const total = items.reduce((a, i) => a + i.p.price * i.qty, 0)
  const count = items.reduce((a, i) => a + i.qty, 0)
  const add = (id: number) => { setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 })); setCartOpen(true); setStep('cart') }
  const setQty = (id: number, qty: number) => setCart((c) => { const n = { ...c }; if (qty <= 0) delete n[id]; else n[id] = qty; return n })

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-glow">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50 px-4 py-2">
        {(['Store', 'Admin'] as const).map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', tab === t ? 'bg-white text-brand-700 shadow-sm' : 'text-ink-500')}>{t === 'Store' ? 'Customer Store' : 'Admin Dashboard'}</button>
        ))}
      </div>

      {tab === 'Store' ? (
        <div className="relative min-h-[560px]">
          {/* Store header */}
          <header className="flex flex-wrap items-center gap-3 border-b border-ink-100 px-4 py-3 sm:px-6">
            <span className="font-display text-lg font-bold text-ink-900">ShopDemo</span>
            <label className="relative ml-auto flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="h-9 w-full rounded-lg border border-ink-200 pl-9 pr-3 text-sm" aria-label="Search products" />
            </label>
            <button type="button" onClick={() => setCartOpen(true)} className="relative grid h-9 w-9 place-items-center rounded-lg border border-ink-200" aria-label={`Open cart (${count} items)`}>
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">{count}</span>}
            </button>
          </header>
          <div className="flex gap-2 overflow-x-auto px-4 py-3 sm:px-6 thin-scroll">
            {cats.map((c) => <button key={c} type="button" onClick={() => setCat(c)} className={cn('shrink-0 rounded-full border px-3 py-1 text-xs font-medium', cat === c ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600')}>{c}</button>)}
          </div>
          <div className="grid grid-cols-2 gap-3 px-4 pb-6 sm:px-6 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p) => (
              <article key={p.id} className="group rounded-xl border border-ink-100 p-2.5 transition hover:shadow-card">
                <div className={cn('relative mb-2 aspect-square rounded-lg', p.tone)}>
                  <button type="button" onClick={() => setWish((w) => (w.includes(p.id) ? w.filter((x) => x !== p.id) : [...w, p.id]))} aria-label="Add to wishlist" className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90">
                    <Heart className={cn('h-3.5 w-3.5', wish.includes(p.id) ? 'fill-rose-500 text-rose-500' : 'text-ink-500')} />
                  </button>
                  {p.stock === 0 && <span className="absolute left-2 top-2 rounded bg-ink-900/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">Out of stock</span>}
                </div>
                <div className="text-[11px] text-ink-400">{p.category}</div>
                <div className="truncate text-sm font-semibold text-ink-900">{p.name}</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-bold text-ink-900">{inr(p.price)}</span>
                  <button type="button" disabled={p.stock === 0} onClick={() => add(p.id)} className="rounded-md bg-brand-600 px-2 py-1 text-[11px] font-semibold text-white disabled:opacity-40">Add</button>
                </div>
              </article>
            ))}
            {list.length === 0 && <p className="col-span-full py-10 text-center text-sm text-ink-400">No products match your search.</p>}
          </div>

          {/* Cart drawer */}
          {cartOpen && (
            <div className="absolute inset-0 z-10 flex justify-end bg-ink-900/30" onClick={() => setCartOpen(false)}>
              <div className="flex h-full w-full max-w-sm flex-col bg-white shadow-2xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Shopping cart">
                <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
                  <span className="font-semibold">{step === 'cart' ? 'Your Cart' : step === 'checkout' ? 'Checkout' : 'Order Placed'}</span>
                  <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X className="h-4 w-4" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 thin-scroll">
                  {step === 'placed' ? (
                    <div className="py-10 text-center">
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-2xl">✓</div>
                      <h4 className="mt-3 font-bold">Thank you!</h4>
                      <p className="mt-1 text-sm text-ink-500">Order #DEMO-1042 confirmed. Tracking: Placed → Packed → Shipped → Delivered.</p>
                      <ol className="mx-auto mt-4 max-w-[200px] space-y-1 text-left text-xs">{['Order placed ✓', 'Packed ✓', 'Shipped', 'Delivered'].map((s, i) => <li key={s} className={i < 2 ? 'text-emerald-700' : 'text-ink-400'}>{s}</li>)}</ol>
                    </div>
                  ) : step === 'checkout' ? (
                    <div className="space-y-2">
                      {['Full name', 'Phone', 'Address line', 'City & PIN code'].map((l) => <input key={l} placeholder={l} className="h-10 w-full rounded-lg border border-ink-200 px-3 text-sm" aria-label={l} />)}
                      <div className="grid grid-cols-3 gap-2 pt-1 text-xs">{['UPI', 'Card', 'Cash on delivery'].map((p, i) => <span key={p} className={cn('rounded-lg border py-2 text-center', i === 0 ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-ink-200')}>{p}</span>)}</div>
                    </div>
                  ) : items.length === 0 ? (
                    <p className="py-10 text-center text-sm text-ink-400">Your cart is empty.</p>
                  ) : (
                    <ul className="space-y-2">
                      {items.map(({ p, qty }) => (
                        <li key={p.id} className="flex items-center gap-3 rounded-lg border border-ink-100 p-2">
                          <div className={cn('h-12 w-12 rounded-md', p.tone)} />
                          <div className="flex-1"><div className="text-sm font-semibold">{p.name}</div><div className="text-xs text-ink-500">{inr(p.price)}</div></div>
                          <div className="flex items-center gap-1">
                            <button type="button" onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease" className="grid h-6 w-6 place-items-center rounded border border-ink-200"><Minus className="h-3 w-3" /></button>
                            <span className="w-5 text-center text-sm">{qty}</span>
                            <button type="button" onClick={() => setQty(p.id, qty + 1)} aria-label="Increase" className="grid h-6 w-6 place-items-center rounded border border-ink-200"><Plus className="h-3 w-3" /></button>
                            <button type="button" onClick={() => setQty(p.id, 0)} aria-label="Remove" className="ml-1 text-ink-400 hover:text-rose-500"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {step !== 'placed' && (
                  <div className="border-t border-ink-100 p-4">
                    <div className="mb-3 flex justify-between text-sm"><span className="text-ink-500">Total</span><span className="font-bold">{inr(total)}</span></div>
                    <button type="button" disabled={items.length === 0} onClick={() => setStep(step === 'cart' ? 'checkout' : 'placed')} className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white disabled:opacity-40">{step === 'cart' ? 'Proceed to Checkout' : 'Pay & Place Order'}</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 bg-ink-50/60 p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Kpi label="Orders today" value="38" hint="▲ 9%" /><Kpi label="Revenue (month)" value="₹4.2 L" hint="▲ 14%" tone="text-emerald-700" /><Kpi label="Low stock" value="3" hint="Reorder needed" tone="text-rose-600" /><Kpi label="Customers" value="1,206" hint="+62 this month" tone="text-violet-700" />
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            <Panel title="Sales trend" className="lg:col-span-2"><div className="h-36"><LineChart points={[6, 8, 7, 10, 12, 11, 15, 14, 18, 17, 21, 24]} color="#14b8a6" /></div></Panel>
            <Panel title="Inventory">
              <ul className="space-y-2 text-sm">{catalogue.slice(0, 5).map((p) => <li key={p.id} className="flex justify-between"><span className="text-ink-700">{p.name}</span><span className={cn('font-semibold', p.stock < 10 ? 'text-rose-600' : 'text-ink-900')}>{p.stock}</span></li>)}</ul>
            </Panel>
          </div>
          <Panel title="Recent orders" action={<span className="text-xs text-ink-400">Coupons · Reports · Analytics</span>}>
            <Table head={['Order', 'Customer', 'Items', 'Amount', 'Payment', 'Status']} rows={[
              ['#1042', 'A. Sharma', '2', inr(3298), 'UPI', statusPill('Paid')], ['#1041', 'R. Iyer', '1', inr(2799), 'Card', statusPill('Shipped')], ['#1040', 'S. Khan', '3', inr(2047), 'COD', statusPill('Pending')], ['#1039', 'M. Das', '1', inr(1999), 'UPI', statusPill('Delivered')],
            ]} />
          </Panel>
        </div>
      )}
    </div>
  )
}
