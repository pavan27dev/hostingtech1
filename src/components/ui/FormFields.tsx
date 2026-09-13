import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

const fieldBase =
  'w-full rounded-xl border bg-white px-4 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:bg-ink-50'

interface BaseProps {
  label: string
  name: string
  error?: string
  required?: boolean
  hint?: string
}

function Label({ label, htmlFor, required, hint }: { label: string; htmlFor: string; required?: boolean; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink-800">
      <span>
        {label}
        {required && <span className="ml-0.5 text-rose-500" aria-hidden>*</span>}
      </span>
      {hint && <span className="text-xs font-normal text-ink-400">{hint}</span>}
    </label>
  )
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
      {error}
    </p>
  ) : null
}

export function TextField({ label, name, error, required, hint, className, ...rest }: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <Label label={label} htmlFor={name} required={required} hint={hint} />
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(fieldBase, 'h-12', error ? 'border-rose-300' : 'border-ink-200')}
        {...rest}
      />
      <ErrorText id={`${name}-error`} error={error} />
    </div>
  )
}

export function SelectField({ label, name, error, required, hint, className, options, placeholder, ...rest }: BaseProps & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[]; placeholder?: string }) {
  return (
    <div className={className}>
      <Label label={label} htmlFor={name} required={required} hint={hint} />
      <select
        id={name}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(fieldBase, 'h-12 appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3E%3Cpath stroke=%27%237c8aa5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3E%3C/svg%3E")] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10', error ? 'border-rose-300' : 'border-ink-200')}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ErrorText id={`${name}-error`} error={error} />
    </div>
  )
}

export function TextAreaField({ label, name, error, required, hint, className, ...rest }: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <Label label={label} htmlFor={name} required={required} hint={hint} />
      <textarea
        id={name}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(fieldBase, 'min-h-[132px] resize-y py-3', error ? 'border-rose-300' : 'border-ink-200')}
        {...rest}
      />
      <ErrorText id={`${name}-error`} error={error} />
    </div>
  )
}
