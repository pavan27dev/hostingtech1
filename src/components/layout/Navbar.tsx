import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X, MessageCircle } from 'lucide-react'
import { Logo } from './Logo'
import { Button } from '@/components/ui/Button'
import { mainNav } from '@/config/navigation'
import { buildWhatsAppLink } from '@/config/whatsapp'
import { trackEvent } from '@/utils/tracking'
import { cn } from '@/utils/cn'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const waLink = buildWhatsAppLink('general')

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'glass shadow-[0_1px_0_rgba(11,18,32,0.06),0_8px_24px_-16px_rgba(11,18,32,0.25)]' : 'bg-white/70 backdrop-blur-md',
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between lg:h-[72px]" aria-label="Main">
        <Logo height={54} />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <li key={item.label} className="group relative">
              <NavLink
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-brand-700' : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50',
                  )
                }
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />}
              </NavLink>
              {item.children && (
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="w-72 rounded-2xl border border-ink-100 bg-white p-2 shadow-card-hover">
                    {item.children.map((c) => (
                      <li key={c.href + c.label}>
                        <NavLink to={c.href} className="block rounded-xl px-3 py-2.5 hover:bg-brand-50">
                          <span className="block text-sm font-semibold text-ink-900">{c.label}</span>
                          {c.description && <span className="block text-xs text-ink-500">{c.description}</span>}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="sm"
            icon={<MessageCircle />}
            onClick={() => trackEvent('whatsapp_click', { placement: 'navbar' })}
          >
            WhatsApp Us
          </Button>
          <Button to="/contact" size="sm" onClick={() => trackEvent('cta_click', { cta: 'consultation', placement: 'navbar' })}>
            Get Free Consultation
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-ink-100 bg-white text-ink-800 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu — portaled to <body>: the blurred header creates a containing block that would trap a fixed child */}
      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 z-[45] overflow-y-auto border-t border-ink-100 bg-white lg:hidden"
          >
            <div className="container-x flex min-h-full flex-col py-4">
              <ul className="divide-y divide-ink-100">
                {mainNav.map((item) => (
                  <li key={item.label}>
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-3.5 text-base font-semibold text-ink-900"
                          aria-expanded={mobileExpanded === item.label}
                          onClick={() => setMobileExpanded((v) => (v === item.label ? null : item.label))}
                        >
                          {item.label}
                          <ChevronDown className={cn('h-4 w-4 transition-transform', mobileExpanded === item.label && 'rotate-180')} />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileExpanded === item.label && (
                            <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-2">
                              {item.children.map((c) => (
                                <li key={c.href + c.label}>
                                  <NavLink to={c.href} className="block rounded-lg px-3 py-2.5 text-sm text-ink-600 hover:bg-brand-50 hover:text-brand-700">
                                    {c.label}
                                  </NavLink>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <NavLink to={item.href} end={item.href === '/'} className={({ isActive }) => cn('block py-3.5 text-base font-semibold', isActive ? 'text-brand-700' : 'text-ink-900')}>
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-auto grid gap-2 pt-6">
                <Button to="/contact" size="lg" fullWidth>Get Free Consultation</Button>
                <Button href={waLink} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" fullWidth icon={<MessageCircle />}>
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </header>
  )
}
