import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { Reveal } from '@/components/motion/Reveal'

interface Props {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className, as: Tag = 'h2' }: Props) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <Tag className="text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.75rem]">{title}</Tag>
      {description && <p className="mt-4 text-base leading-relaxed text-ink-500 sm:text-lg">{description}</p>}
    </Reveal>
  )
}
