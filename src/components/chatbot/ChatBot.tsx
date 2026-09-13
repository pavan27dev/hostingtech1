import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, X, ExternalLink, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { trackEvent } from '@/utils/tracking'
import { cn } from '@/utils/cn'
import { actionHref, formatTranscript, greeting, respond, user, type BotMessage, type ChatState } from './chatEngine'
import { buildWhatsAppLink } from '@/config/whatsapp'

/** Floating assistant widget (bottom-left) — rule-based, no external calls. */
export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<BotMessage[]>([])
  const [state, setState] = useState<ChatState>({ stage: 'idle', lead: {} })
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(true)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) setMessages([greeting()])
    if (open) {
      setUnread(false)
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [open, messages.length])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const send = (text: string) => {
    const t = text.trim()
    if (!t || typing) return
    setMessages((m) => [...m, user(t)])
    setInput('')
    setTyping(true)
    trackEvent('chatbot_message', { stage: state.stage })
    const { messages: replies, state: next } = respond(t, state)
    setTimeout(() => {
      setMessages((m) => [...m, ...replies])
      setState(next)
      setTyping(false)
      if (next.stage === 'done') trackEvent('chatbot_lead_captured', { service: next.lead.service })
    }, 450 + Math.min(600, t.length * 12))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    send(input)
  }

  const last = messages[messages.length - 1]
  const transcript = formatTranscript(messages, state.lead)
  const transcriptLink = buildWhatsAppLink('general', transcript)

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-ink-900 text-white shadow-[0_12px_30px_-8px_rgba(11,18,32,0.6)] sm:bottom-6 sm:left-6"
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open}
        aria-controls="chat-panel"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        {!open && unread && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-500" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.section
            id="chat-panel"
            role="dialog"
            aria-label="Chat assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed inset-x-3 bottom-[5.5rem] z-40 flex h-[min(78vh,620px)] max-h-[calc(100vh-10.5rem)] flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card-hover sm:inset-x-auto sm:left-6 sm:w-[380px]"
          >
            {/* Header */}
            <header className="flex shrink-0 items-center gap-3 border-b border-ink-100 bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white p-1.5"><img src={siteConfig.logo.mark} alt="" className="h-full w-full object-contain" /></span>
              <div className="flex-1">
                <div className="text-sm font-semibold">{siteConfig.shortName} Assistant</div>
                <div className="text-[11px] text-white/80">Typically replies instantly</div>
              </div>
              <a href={transcriptLink} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { placement: 'chatbot_header' })} title="Send this chat to our WhatsApp" className="grid h-8 w-8 place-items-center rounded-full bg-[#25D366] hover:bg-[#1fb857]" aria-label="Continue this chat on WhatsApp"><MessageCircle className="h-4 w-4" /></a>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15"><X className="h-4 w-4" /></button>
            </header>

            {/* Messages */}
            <div ref={listRef} className="thin-scroll min-h-0 flex-1 space-y-3 overflow-y-auto bg-ink-50/60 p-4" aria-live="polite">
              {messages.map((m) => (
                <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn('max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed', m.role === 'user' ? 'rounded-br-md bg-brand-600 text-white' : 'rounded-bl-md border border-ink-100 bg-white text-ink-700')}>
                    <p>{m.text}</p>
                    {m.actions && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {m.actions.map((a) =>
                          a.type === 'whatsapp' ? (
                            <a key={a.label} href={actionHref(a, transcript)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { placement: 'chatbot', intent: a.intent })} className="inline-flex items-center gap-1 rounded-lg bg-[#25D366] px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1fb857]">
                              {a.label} <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <Link key={a.label} to={a.href} onClick={() => setOpen(false)} className="inline-flex items-center rounded-lg border border-brand-200 bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100">
                              {a.label}
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-ink-100 bg-white px-3.5 py-3">
                    {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-ink-300" style={{ animationDelay: `${i * 0.2}s` }} />)}
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            {!typing && last?.role === 'bot' && last.quickReplies && (
              <div className="thin-scroll flex shrink-0 gap-1.5 overflow-x-auto border-t border-ink-100 bg-white px-3 py-2">
                {last.quickReplies.map((q) => (
                  <button key={q.value} type="button" onClick={() => send(q.value)} className="shrink-0 rounded-full border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700">
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {/* Persistent WhatsApp handoff — sends the entire conversation */}
            {messages.length > 1 && (
              <a href={transcriptLink} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { placement: 'chatbot_footer' })} className="flex shrink-0 items-center justify-center gap-1.5 border-t border-ink-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100">
                <MessageCircle className="h-3.5 w-3.5" /> Send this chat to our team on WhatsApp
              </a>
            )}

            {/* Input */}
            <form onSubmit={onSubmit} className="flex shrink-0 items-center gap-2 border-t border-ink-100 bg-white p-3">
              <label htmlFor="chat-input" className="sr-only">Type your message</label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={state.stage === 'ask_phone' ? 'Your phone number…' : state.stage === 'ask_name' ? 'Your name…' : 'Type your message…'}
                className="h-10 flex-1 rounded-xl border border-ink-200 bg-ink-50/50 px-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:bg-white"
                autoComplete="off"
                inputMode={state.stage === 'ask_phone' ? 'tel' : 'text'}
              />
              <button type="submit" aria-label="Send" disabled={!input.trim() || typing} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:opacity-50">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
