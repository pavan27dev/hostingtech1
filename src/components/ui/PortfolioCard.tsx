import { ExternalLink, FileText } from 'lucide-react'
import type { Project } from '@/types/content'
import { Button } from './Button'
import { cn } from '@/utils/cn'
import { LineChart, BarChart } from '@/components/mockups/charts'

/** Generated preview illustration per project type — no stock imagery. */
function ProjectPreview({ kind }: { kind: Project['preview'] }) {
  const base = 'absolute inset-0 p-4'
  switch (kind) {
    case 'crm':
      return (
        <div className={cn(base, 'bg-gradient-to-br from-violet-50 to-brand-50')}>
          <div className="grid h-full grid-cols-3 gap-2">
            {['New', 'Demo', 'Won'].map((s, i) => (
              <div key={s} className="rounded-lg bg-white/90 p-2 shadow-sm">
                <div className="mb-1.5 text-[9px] font-semibold text-ink-600">{s}</div>
                {Array.from({ length: 3 - i }).map((_, j) => <div key={j} className="mb-1 h-4 rounded bg-violet-100" />)}
              </div>
            ))}
          </div>
        </div>
      )
    case 'store':
      return (
        <div className={cn(base, 'bg-gradient-to-br from-emerald-50 to-teal-50')}>
          <div className="grid h-full grid-cols-3 gap-2">
            {['bg-emerald-200', 'bg-amber-200', 'bg-rose-200', 'bg-brand-200', 'bg-violet-200', 'bg-teal-200'].map((c, i) => (
              <div key={i} className="rounded-lg bg-white/90 p-1.5 shadow-sm">
                <div className={cn('mb-1 aspect-[4/3] rounded', c)} />
                <div className="h-1.5 w-2/3 rounded bg-ink-200" />
              </div>
            ))}
          </div>
        </div>
      )
    case 'restaurant':
      return (
        <div className={cn(base, 'bg-gradient-to-br from-amber-50 to-orange-50')}>
          <div className="flex h-full gap-3">
            <div className="flex-1 rounded-lg bg-white/90 p-3 shadow-sm">
              <div className="mb-2 h-2 w-1/2 rounded bg-amber-300" />
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="mb-1.5 flex justify-between"><div className="h-1.5 w-1/2 rounded bg-ink-200" /><div className="h-1.5 w-1/6 rounded bg-amber-200" /></div>
              ))}
            </div>
            <div className="w-1/3 rounded-lg bg-amber-200/70" />
          </div>
        </div>
      )
    case 'dashboard':
      return (
        <div className={cn(base, 'bg-gradient-to-br from-brand-50 to-ink-50')}>
          <div className="grid h-full grid-rows-[auto_1fr] gap-2">
            <div className="grid grid-cols-4 gap-1.5">{[0, 1, 2, 3].map((i) => <div key={i} className="h-8 rounded bg-white/90 shadow-sm" />)}</div>
            <div className="rounded-lg bg-white/90 p-2 shadow-sm"><LineChart points={[4, 6, 5, 8, 9, 8, 12, 11, 14]} /></div>
          </div>
        </div>
      )
    case 'marketing':
      return (
        <div className={cn(base, 'bg-gradient-to-br from-rose-50 to-pink-50')}>
          <div className="grid h-full grid-cols-2 gap-2">
            <div className="rounded-lg bg-white/90 p-2 shadow-sm"><BarChart values={[3, 5, 4, 7, 6, 9, 8]} color="#fb7185" /></div>
            <div className="grid grid-rows-3 gap-1.5">{['bg-rose-200', 'bg-pink-200', 'bg-fuchsia-200'].map((c, i) => <div key={i} className={cn('rounded-lg', c)} />)}</div>
          </div>
        </div>
      )
    default:
      return (
        <div className={cn(base, 'bg-gradient-to-br from-teal-50 to-cyan-50')}>
          <div className="flex h-full flex-col gap-2">
            <div className="h-1/2 rounded-lg bg-teal-200/70" />
            <div className="grid flex-1 grid-cols-3 gap-1.5">{[0, 1, 2].map((i) => <div key={i} className="rounded-lg bg-white/90 shadow-sm" />)}</div>
          </div>
        </div>
      )
  }
}

export function PortfolioCard({ project }: { project: Project }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-ink-100" aria-hidden>
        <ProjectPreview kind={project.preview} />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink-600 shadow-sm">Demo Project</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">{project.name}</h3>
            <p className="text-sm text-ink-400">{project.industry}</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-500">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <li key={t} className="rounded-md bg-ink-50 px-2 py-1 text-[11px] font-medium text-ink-600">{t}</li>
          ))}
        </ul>
        <ul className="mt-4 grid gap-1.5 text-sm text-ink-600 sm:grid-cols-2">
          {project.features.map((f) => (
            <li key={f} className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" />{f}</li>
          ))}
        </ul>
        <div className="mt-auto flex gap-2 pt-6">
          <Button to={`/demo/${project.id}`} size="sm" icon={<ExternalLink />}>
            View Demo
          </Button>
          <Button to={`/portfolio#${project.id}`} variant="outline" size="sm" icon={<FileText />}>
            View Case Study
          </Button>
        </div>
      </div>
    </article>
  )
}
