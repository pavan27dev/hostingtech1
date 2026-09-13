import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  onClick?: () => void
  /** 'full' = cloud + wordmark lockup, 'mark' = cloud icon only */
  variant?: 'full' | 'mark'
  /** Height in px (width scales) */
  height?: number
}

/** Company logo — assets live in /public (see siteConfig.logo). */
export function Logo({ className, onClick, variant = 'full', height }: Props) {
  const isMark = variant === 'mark'
  const h = height ?? (isMark ? 36 : 44)
  return (
    <Link to="/" onClick={onClick} className={cn('inline-flex shrink-0 items-center', className)} aria-label={`${siteConfig.name} home`}>
      <img
        src={isMark ? siteConfig.logo.mark : siteConfig.logo.full}
        alt={siteConfig.logo.alt}
        height={h}
        style={{ height: h, width: 'auto' }}
        className="block select-none"
        decoding="async"
        fetchPriority="high"
      />
    </Link>
  )
}
