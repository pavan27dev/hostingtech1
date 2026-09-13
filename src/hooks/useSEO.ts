import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '@/config/site'

export interface SEOProps {
  title: string
  description: string
  /** Path relative to site root; defaults to current route */
  path?: string
  image?: string
  type?: 'website' | 'article'
  /** JSON-LD structured data */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  noIndex?: boolean
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-page SEO: title, description, canonical, Open Graph, Twitter and JSON-LD.
 * Framework-free so it can be swapped for SSR head management later.
 */
export function useSEO({ title, description, path, image, type = 'website', jsonLd, noIndex }: SEOProps) {
  const location = useLocation()

  useEffect(() => {
    const canonical = `${siteConfig.url.replace(/\/$/, '')}${path ?? location.pathname}`
    const ogImage = `${siteConfig.url.replace(/\/$/, '')}${image ?? siteConfig.ogImage}`

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noIndex ? 'noindex,nofollow' : 'index,follow')
    upsertLink('canonical', canonical)

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:site_name', siteConfig.name)
    upsertMeta('property', 'og:locale', siteConfig.locale)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    const id = 'page-jsonld'
    document.getElementById(id)?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = id
      script.text = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [title, description, path, image, type, jsonLd, noIndex, location.pathname])
}

/** Organization schema shared across pages */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: { '@type': 'PostalAddress', streetAddress: siteConfig.contact.address, addressLocality: siteConfig.contact.city, addressCountry: 'IN' },
  logo: `${siteConfig.url}${siteConfig.logo.full}`,
  sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
}
