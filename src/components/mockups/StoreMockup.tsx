import { ShoppingBag, Heart, Search, Truck, CheckCircle2, Package } from 'lucide-react'
import { cn } from '@/utils/cn'
import { StatTile, LineChart } from './charts'

const Frame = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={cn('overflow-hidden rounded-xl border border-ink-100 bg-white shadow-card', className)}>
    <div className="flex items-center gap-1.5 border-b border-ink-100 bg-ink-50 px-3 py-1.5">
      <span className="h-2 w-2 rounded-full bg-ink-200" /><span className="h-2 w-2 rounded-full bg-ink-200" /><span className="h-2 w-2 rounded-full bg-ink-200" />
      <span className="ml-2 text-[10px] font-medium text-ink-500">{title}</span>
    </div>
    {children}
  </div>
)

const ProductTile = ({ tone }: { tone: string }) => (
  <div className="rounded-lg border border-ink-100 p-1.5">
    <div className={cn('mb-1.5 aspect-square rounded-md', tone)} />
    <div className="h-1.5 w-3/4 rounded bg-ink-200" />
    <div className="mt-1 flex items-center justify-between">
      <div className="h-1.5 w-1/3 rounded bg-ink-300" />
      <ShoppingBag className="h-2.5 w-2.5 text-brand-600" />
    </div>
  </div>
)

export function StoreMockup({ className }: { className?: string }) {
  return (
    <div className={cn('grid grid-cols-2 gap-3 md:grid-cols-3', className)} role="img" aria-label="E-commerce platform mockup: storefront, product page, cart, checkout, order tracking and admin dashboard (sample UI)">
      <Frame title="Customer Store">
        <div className="p-2.5">
          <div className="mb-2 flex items-center gap-1 rounded-md bg-ink-50 px-2 py-1 text-[9px] text-ink-400"><Search className="h-2.5 w-2.5" />Search products</div>
          <div className="grid grid-cols-2 gap-1.5">
            <ProductTile tone="bg-brand-100" /><ProductTile tone="bg-amber-100" /><ProductTile tone="bg-emerald-100" /><ProductTile tone="bg-rose-100" />
          </div>
        </div>
      </Frame>

      <Frame title="Product Page">
        <div className="flex gap-2 p-2.5">
          <div className="aspect-square w-1/2 rounded-md bg-violet-100" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-full rounded bg-ink-300" />
            <div className="h-1.5 w-2/3 rounded bg-ink-200" />
            <div className="h-2.5 w-1/2 rounded bg-brand-200" />
            <div className="flex gap-1 pt-1">
              <span className="rounded bg-brand-600 px-2 py-1 text-[8px] font-semibold text-white">Add to Cart</span>
              <span className="grid h-5 w-5 place-items-center rounded border border-ink-200"><Heart className="h-2.5 w-2.5 text-rose-500" /></span>
            </div>
          </div>
        </div>
      </Frame>

      <Frame title="Shopping Cart">
        <div className="space-y-1.5 p-2.5">
          {['bg-brand-100', 'bg-emerald-100'].map((t, i) => (
            <div key={i} className="flex items-center gap-2 rounded-md border border-ink-100 p-1.5">
              <div className={cn('h-7 w-7 rounded', t)} />
              <div className="flex-1"><div className="h-1.5 w-3/4 rounded bg-ink-300" /><div className="mt-1 h-1.5 w-1/3 rounded bg-ink-200" /></div>
              <span className="rounded border border-ink-200 px-1 text-[8px] text-ink-500">− 1 +</span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-1 text-[9px] font-semibold text-ink-800"><span>Total</span><span className="h-2 w-10 rounded bg-ink-300" /></div>
          <span className="block rounded bg-brand-600 py-1 text-center text-[8px] font-semibold text-white">Checkout</span>
        </div>
      </Frame>

      <Frame title="Checkout">
        <div className="space-y-1.5 p-2.5">
          {['Full name', 'Address', 'City · PIN'].map((l) => (
            <div key={l} className="rounded-md border border-ink-200 px-2 py-1 text-[8px] text-ink-400">{l}</div>
          ))}
          <div className="flex gap-1 text-[8px]">
            {['UPI', 'Card', 'COD'].map((p, i) => <span key={p} className={cn('flex-1 rounded border px-1 py-1 text-center', i === 0 ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-500')}>{p}</span>)}
          </div>
          <span className="block rounded bg-emerald-600 py-1 text-center text-[8px] font-semibold text-white">Pay Securely</span>
        </div>
      </Frame>

      <Frame title="Order Tracking">
        <div className="p-2.5">
          <ol className="space-y-2 text-[9px]">
            {[['Order Placed', CheckCircle2, 'text-emerald-600'], ['Packed', Package, 'text-emerald-600'], ['Shipped', Truck, 'text-brand-600'], ['Delivered', CheckCircle2, 'text-ink-300']].map(([l, I, c]) => {
              const Icon = I as typeof CheckCircle2
              return (
                <li key={l as string} className="flex items-center gap-2">
                  <Icon className={cn('h-3 w-3', c as string)} />
                  <span className={cn(c === 'text-ink-300' ? 'text-ink-300' : 'text-ink-700')}>{l as string}</span>
                </li>
              )
            })}
          </ol>
        </div>
      </Frame>

      <Frame title="Admin Dashboard">
        <div className="space-y-1.5 p-2.5">
          <div className="grid grid-cols-2 gap-1.5">
            <StatTile label="Orders" value="—" className="p-2" />
            <StatTile label="Revenue" value="₹ —" tone="emerald" className="p-2" />
          </div>
          <div className="h-10 rounded-md border border-ink-100 p-1"><LineChart points={[3, 5, 4, 7, 8, 7, 10]} color="#14b8a6" /></div>
          <div className="flex flex-wrap gap-1 text-[7px] text-ink-500">
            {['Products', 'Inventory', 'Orders', 'Coupons', 'Reports'].map((m) => <span key={m} className="rounded bg-ink-50 px-1 py-0.5">{m}</span>)}
          </div>
        </div>
      </Frame>
    </div>
  )
}

export const ecommerceAdminFeatures = ['Products', 'Categories', 'Inventory', 'Orders', 'Customers', 'Payments', 'Coupons', 'Reports', 'Analytics']
export const ecommerceScreens = ['Customer Store', 'Product Page', 'Shopping Cart', 'Checkout', 'Order Tracking', 'Admin Dashboard']
