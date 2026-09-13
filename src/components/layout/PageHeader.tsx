import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface Props {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'tinted'
}

/** Consistent hero header for inner pages. */
export function PageHeader({ eyebrow, title, description, children, align = 'center', tone = 'tinted' }: Props) {
  return (
    <section className={cn('relative overflow-hidden', tone === 'tinted' ? 'bg-gradient-to-b from-brand-50/80 to-white' : 'bg-white')}>
      <div aria-hidden className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div className={cn('container-x relative py-16 sm:py-20 lg:py-24', align === 'center' ? 'text-center' : '')}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] sm:text-5xl">{title}</h1>
          {description && <p className="mt-5 text-base text-ink-500 sm:text-lg">{description}</p>}
          {children && <div className={cn('mt-8 flex flex-col gap-3 sm:flex-row', align === 'center' && 'sm:justify-center')}>{children}</div>}
        </motion.div>
      </div>
    </section>
  )
}
