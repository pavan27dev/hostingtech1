import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'whatsapp' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-[0_8px_20px_-8px_rgba(29,63,245,0.6)] hover:shadow-[0_12px_28px_-8px_rgba(29,63,245,0.7)]',
  secondary: 'bg-ink-900 text-white hover:bg-ink-800',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1fb857] shadow-[0_8px_20px_-8px_rgba(37,211,102,0.6)]',
  ghost: 'bg-transparent text-ink-700 hover:bg-ink-50',
  outline: 'bg-white text-ink-900 border border-ink-200 hover:border-brand-300 hover:text-brand-700',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2 sm:h-14',
}

const base =
  'inline-flex items-center justify-center rounded-xl font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none'

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  icon?: ReactNode
  iconRight?: ReactNode
  fullWidth?: boolean
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; to?: undefined }
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined }
type LinkProps = CommonProps & { to: string; href?: undefined; onClick?: () => void }

export type ButtonLikeProps = ButtonProps | AnchorProps | LinkProps

export const Button = forwardRef<HTMLElement, ButtonLikeProps>(function Button(props, ref) {
  const { variant = 'primary', size = 'md', className, children, icon, iconRight, fullWidth, ...rest } = props
  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)
  const inner = (
    <>
      {icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{iconRight}</span>}
    </>
  )

  if ('to' in rest && rest.to) {
    const { to, onClick } = rest as LinkProps
    return (
      <Link to={to} onClick={onClick} className={classes} ref={ref as never}>
        {inner}
      </Link>
    )
  }
  if ('href' in rest && rest.href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a {...anchorProps} className={classes} ref={ref as never}>
        {inner}
      </a>
    )
  }
  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" {...buttonProps} className={classes} ref={ref as never}>
      {inner}
    </button>
  )
})
