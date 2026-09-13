import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { InstagramIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { Logo } from './Logo'
import { siteConfig } from '@/config/site'
import { companyLinks, legalLinks, serviceLinks, solutionLinks } from '@/config/navigation'
import { buildWhatsAppLink } from '@/config/whatsapp'

const Column = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
  <div>
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-900">{title}</h3>
    <ul className="space-y-2.5">
      {links.map((l) => (
        <li key={l.href + l.label}>
          <Link to={l.href} className="text-sm text-ink-500 transition-colors hover:text-brand-700">{l.label}</Link>
        </li>
      ))}
    </ul>
  </div>
)

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-ink-100 bg-ink-50/80">
      <div className="container-x py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo height={64} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">{siteConfig.description}</p>
            <p className="mt-3 font-display text-sm font-bold text-brand-700">{siteConfig.tagline}</p>
            <div className="mt-5 flex gap-2">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="grid h-10 w-10 place-items-center rounded-xl border border-ink-200 bg-white text-ink-600 transition hover:border-pink-300 hover:text-pink-600">
                <InstagramIcon className="h-4.5 w-4.5" />
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn" className="grid h-10 w-10 place-items-center rounded-xl border border-ink-200 bg-white text-ink-600 transition hover:border-brand-300 hover:text-brand-700">
                <LinkedinIcon className="h-4.5 w-4.5" />
              </a>
              <a href={buildWhatsAppLink('general')} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="grid h-10 w-10 place-items-center rounded-xl border border-ink-200 bg-white text-ink-600 transition hover:border-emerald-300 hover:text-emerald-600">
                <MessageCircle className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <Column title="Services" links={serviceLinks} />
            <Column title="Solutions" links={solutionLinks} />
            <Column title="Company" links={companyLinks} />
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-900">Contact</h3>
            <ul className="space-y-3 text-sm text-ink-500">
              <li className="flex items-start gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <a href={buildWhatsAppLink('general')} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">WhatsApp: {siteConfig.contact.whatsappDisplay}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-brand-700">{siteConfig.contact.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <a href={`mailto:${siteConfig.contact.email}`} className="break-all hover:text-brand-700">{siteConfig.contact.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-200/70 pt-6 text-sm text-ink-500 sm:flex-row">
          <p>© {siteConfig.copyrightYear} {siteConfig.name}. All Rights Reserved.</p>
          <ul className="flex gap-6">
            {legalLinks.map((l) => (
              <li key={l.href}><Link to={l.href} className="hover:text-brand-700">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
