import { useState, type FormEvent } from 'react'
import { Calendar, Clock, MapPin, MessageCircle, Phone, Star } from 'lucide-react'
import { cn } from '@/utils/cn'

/* ── Shared "browser window" frame for website demos ──────────────────────── */
function SiteFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-glow">
      <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-xs text-ink-400">{url}</span>
      </div>
      {children}
    </div>
  )
}

function DemoForm({ fields, cta, tone, done }: { fields: string[]; cta: string; tone: string; done: string }) {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true) }
  if (sent) return <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center text-sm font-medium text-emerald-800">{done}</div>
  return (
    <form onSubmit={submit} className="grid gap-2 sm:grid-cols-2">
      {fields.map((f) => <input key={f} required placeholder={f} aria-label={f} className={cn('h-11 rounded-lg border border-ink-200 px-3 text-sm', f.startsWith('Message') && 'sm:col-span-2')} />)}
      <button type="submit" className={cn('h-11 rounded-lg font-semibold text-white sm:col-span-2', tone)}>{cta}</button>
    </form>
  )
}

/* ── Restaurant website ───────────────────────────────────────────────────── */
const menu = {
  Starters: [['Paneer Tikka', 249], ['Chicken 65', 279], ['Veg Spring Rolls', 199]],
  Mains: [['Butter Chicken', 349], ['Dal Makhani', 259], ['Hyderabadi Biryani', 329], ['Palak Paneer', 269]],
  Desserts: [['Gulab Jamun', 129], ['Rasmalai', 149]],
} as const

export function RestaurantDemo() {
  const [cat, setCat] = useState<keyof typeof menu>('Starters')
  return (
    <SiteFrame url="spicegarden-demo.example.com">
      <nav className="flex items-center justify-between border-b border-ink-100 px-5 py-3">
        <span className="font-display text-lg font-bold text-orange-700">Spice Garden</span>
        <ul className="hidden gap-5 text-sm text-ink-600 sm:flex"><li>Menu</li><li>Reservations</li><li>Gallery</li><li>Contact</li></ul>
        <a href="#reserve" className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white">Book a Table</a>
      </nav>
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-white px-5 py-14 text-center sm:py-20">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange-700">Authentic Indian Cuisine · HSR Layout</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-ink-900 sm:text-5xl">Fresh Flavours, Made Daily</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-500">Dine in, order on WhatsApp, or reserve a table for your family.</p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <a href="#menu" className="rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white">View Menu</a>
          <span className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" />Order on WhatsApp</span>
        </div>
        <div className="mt-6 flex items-center justify-center gap-1 text-amber-500">{[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}<span className="ml-2 text-xs text-ink-500">Google reviews (sample)</span></div>
      </section>
      <section id="menu" className="px-5 py-10 sm:px-8">
        <h3 className="text-center text-2xl font-bold">Our Menu</h3>
        <div className="mt-4 flex justify-center gap-2">{(Object.keys(menu) as (keyof typeof menu)[]).map((c) => <button key={c} type="button" onClick={() => setCat(c)} className={cn('rounded-full border px-4 py-1.5 text-sm font-medium', cat === c ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-ink-200 text-ink-600')}>{c}</button>)}</div>
        <ul className="mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
          {menu[cat].map(([n, p]) => (
            <li key={n} className="flex items-center gap-3 rounded-xl border border-ink-100 p-3">
              <div className="h-14 w-14 shrink-0 rounded-lg bg-gradient-to-br from-orange-200 to-amber-100" />
              <div className="flex-1"><div className="font-semibold text-ink-900">{n}</div><div className="text-xs text-ink-500">Chef's special</div></div>
              <div className="font-bold text-orange-700">₹{p}</div>
            </li>
          ))}
        </ul>
      </section>
      <section id="reserve" className="grid gap-8 bg-ink-50/70 px-5 py-10 sm:px-8 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold">Reserve a Table</h3>
          <p className="mt-1 text-sm text-ink-500">We'll confirm your booking on WhatsApp within minutes.</p>
          <ul className="mt-5 space-y-2 text-sm text-ink-600">
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-orange-600" />12:00 PM – 11:00 PM, all days</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-orange-600" />HSR Layout, Bengaluru (demo address)</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-600" />+91 00000 00000 (demo)</li>
          </ul>
        </div>
        <DemoForm fields={['Your name', 'Phone number', 'Date', 'Guests', 'Message (optional)']} cta="Book Table" tone="bg-orange-600" done="Table request received — we'll confirm on WhatsApp. (Demo)" />
      </section>
    </SiteFrame>
  )
}

/* ── Service business website (salon / clinic / gym) ─────────────────────── */
const services = [['Haircut & Styling', '₹499', '45 min'], ['Hair Colour', '₹1,999', '90 min'], ['Facial & Cleanup', '₹1,299', '60 min'], ['Bridal Makeup', '₹9,999', '3 hrs'], ['Manicure & Pedicure', '₹899', '60 min'], ['Hair Spa', '₹1,499', '60 min']]

export function ServiceBusinessDemo() {
  const [slot, setSlot] = useState('11:00 AM')
  return (
    <SiteFrame url="glowstudio-demo.example.com">
      <nav className="flex items-center justify-between border-b border-ink-100 px-5 py-3">
        <span className="font-display text-lg font-bold text-teal-700">Glow Studio</span>
        <ul className="hidden gap-5 text-sm text-ink-600 sm:flex"><li>Services</li><li>Pricing</li><li>Gallery</li><li>Contact</li></ul>
        <a href="#book" className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white">Book Appointment</a>
      </nav>
      <section className="grid items-center gap-8 bg-gradient-to-br from-teal-50 to-white px-5 py-12 sm:px-8 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Unisex Salon · Koramangala</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">Look Your Best, Every Day</h2>
          <p className="mt-3 text-ink-500">Expert stylists, premium products and easy online booking. Walk-ins welcome.</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a href="#book" className="rounded-lg bg-teal-600 px-5 py-2.5 text-center text-sm font-semibold text-white">Book Appointment</a>
            <span className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" />WhatsApp Us</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">{['from-teal-200 to-cyan-100', 'from-rose-200 to-pink-100', 'from-amber-200 to-orange-100', 'from-violet-200 to-fuchsia-100', 'from-sky-200 to-blue-100', 'from-emerald-200 to-lime-100'].map((g, i) => <div key={i} className={cn('aspect-square rounded-xl bg-gradient-to-br', g)} />)}</div>
      </section>
      <section className="px-5 py-10 sm:px-8">
        <h3 className="text-center text-2xl font-bold">Services & Pricing</h3>
        <ul className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([n, p, t]) => <li key={n} className="rounded-xl border border-ink-100 p-4"><div className="font-semibold text-ink-900">{n}</div><div className="mt-1 text-xs text-ink-500">{t}</div><div className="mt-2 font-bold text-teal-700">{p}</div></li>)}
        </ul>
      </section>
      <section id="book" className="grid gap-8 bg-ink-50/70 px-5 py-10 sm:px-8 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold">Book an Appointment</h3>
          <p className="mt-1 text-sm text-ink-500">Choose a time — confirmation is sent on WhatsApp.</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-ink-600"><Calendar className="h-4 w-4 text-teal-600" />Available today</div>
          <div className="mt-2 flex flex-wrap gap-2">{['10:00 AM', '11:00 AM', '12:30 PM', '2:00 PM', '4:00 PM', '6:00 PM'].map((s) => <button key={s} type="button" onClick={() => setSlot(s)} className={cn('rounded-lg border px-3 py-1.5 text-xs font-medium', slot === s ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-ink-200 text-ink-600')}>{s}</button>)}</div>
        </div>
        <DemoForm fields={['Your name', 'Phone number', 'Service', `Time: ${slot}`]} cta="Confirm Booking" tone="bg-teal-600" done="Booking request received — see you soon! (Demo)" />
      </section>
    </SiteFrame>
  )
}
