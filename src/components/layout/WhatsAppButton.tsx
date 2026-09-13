import { motion } from 'framer-motion'
import { buildWhatsAppLink, type WhatsAppIntent } from '@/config/whatsapp'
import { trackEvent } from '@/utils/tracking'

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden {...props}>
    <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.6.8 5.1 2.2 7.2L3 29l6.2-2.1c2 1.1 4.3 1.7 6.8 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.3c-2.2 0-4.3-.6-6.1-1.7l-.4-.3-3.7 1.2 1.2-3.5-.3-.4A10.4 10.4 0 015.2 15.8C5.2 9.9 10 5.2 16 5.2s10.8 4.7 10.8 10.6S22 26.3 16 26.3zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
  </svg>
)

interface Props {
  intent?: WhatsAppIntent
}

/** Floating WhatsApp click-to-chat button — bottom-right on every page. */
export function WhatsAppButton({ intent = 'general' }: Props) {
  return (
    <motion.a
      href={buildWhatsAppLink(intent)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { placement: 'floating', intent })}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-sm font-semibold text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] sm:bottom-6 sm:right-6"
      aria-label="Chat on WhatsApp"
    >
      <span className="relative grid h-7 w-7 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/30" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </motion.a>
  )
}

export { WhatsAppIcon }
