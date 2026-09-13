import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'
import { useSEO } from '@/hooks'
import { siteConfig } from '@/config/site'
import { blogPosts, getPost } from '@/data/blog'
import { PageHeader } from '@/components/layout/PageHeader'
import { RevealItem, Stagger } from '@/components/motion/Reveal'
import { FinalCTA } from '@/components/sections/HomeSections'
import { Button } from '@/components/ui/Button'

const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export function BlogListPage() {
  useSEO({
    title: `Blog — Digital Growth Tips for Businesses | ${siteConfig.name}`,
    description: 'Practical articles on websites, CRM, e-commerce, digital marketing and automation for growing businesses.',
  })
  return (
    <>
      <PageHeader eyebrow="Blog" title="Ideas to Grow Your Business" description="Practical guides on websites, CRM, e-commerce, marketing and automation." />
      <section className="section relative">
        <div className="container-x">
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((p) => (
              <RevealItem key={p.slug} direction="depth">
                <article className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-brand-500 to-accent-500" aria-hidden />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">{p.category}</span>
                    <h2 className="mt-2 text-xl font-bold leading-snug"><Link to={`/blog/${p.slug}`} className="hover:text-brand-700">{p.title}</Link></h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{p.excerpt}</p>
                    <div className="mt-5 flex items-center gap-4 text-xs text-ink-400">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{fmt(p.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{p.readTime}</span>
                    </div>
                    <Link to={`/blog/${p.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                  </div>
                </article>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}

export function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  useSEO({
    title: post ? `${post.title} | ${siteConfig.name}` : `Article not found | ${siteConfig.name}`,
    description: post?.excerpt ?? '',
    type: 'article',
    noIndex: !post,
    jsonLd: post
      ? { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, datePublished: post.date, author: { '@type': 'Organization', name: siteConfig.name }, description: post.excerpt }
      : undefined,
  })
  if (!post) return <Navigate to="/blog" replace />

  return (
    <>
      <PageHeader eyebrow={post.category} title={post.title} description={post.excerpt} align="left">
        <div className="flex items-center gap-4 text-sm text-ink-400">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{fmt(post.date)}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime}</span>
        </div>
      </PageHeader>
      <article className="section relative pt-0">
        <div className="container-x">
          <div className="prose-custom mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-ink-600">
            {post.content.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="mx-auto mt-12 max-w-3xl border-t border-ink-100 pt-8">
            <Button to="/blog" variant="outline" icon={<ArrowLeft />}>Back to Blog</Button>
          </div>
        </div>
      </article>
      <FinalCTA />
    </>
  )
}
