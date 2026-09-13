import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

/* Route-level code splitting keeps the initial bundle small. */
const HomePage = lazy(() => import('@/pages/HomePage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const PortfolioPage = lazy(() => import('@/pages/PortfolioPage'))
const PricingPage = lazy(() => import('@/pages/PricingPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const Solutions = {
  Website: lazy(() => import('@/pages/solutions').then((m) => ({ default: m.WebsiteDevelopmentPage }))),
  Ecommerce: lazy(() => import('@/pages/solutions').then((m) => ({ default: m.EcommercePage }))),
  CRM: lazy(() => import('@/pages/solutions').then((m) => ({ default: m.CRMPage }))),
  Marketing: lazy(() => import('@/pages/solutions').then((m) => ({ default: m.DigitalMarketingPage }))),
  Dashboards: lazy(() => import('@/pages/solutions').then((m) => ({ default: m.AdminDashboardsPage }))),
  Automation: lazy(() => import('@/pages/solutions').then((m) => ({ default: m.BusinessAutomationPage }))),
}
const DemoPage = lazy(() => import('@/pages/demos/DemoPage'))
const BlogListPage = lazy(() => import('@/pages/BlogPage').then((m) => ({ default: m.BlogListPage })))
const BlogPostPage = lazy(() => import('@/pages/BlogPage').then((m) => ({ default: m.BlogPostPage })))
const PrivacyPolicyPage = lazy(() => import('@/pages/LegalPages').then((m) => ({ default: m.PrivacyPolicyPage })))
const TermsPage = lazy(() => import('@/pages/LegalPages').then((m) => ({ default: m.TermsPage })))
const NotFoundPage = lazy(() => import('@/pages/LegalPages').then((m) => ({ default: m.NotFoundPage })))

function PageFallback() {
  return (
    <div className="container-x py-32 text-center" role="status" aria-live="polite">
      <span className="inline-block h-8 w-8 animate-spin rounded-full border-[3px] border-brand-200 border-t-brand-600" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/website-development" element={<Solutions.Website />} />
            <Route path="services/digital-marketing" element={<Solutions.Marketing />} />
            <Route path="solutions/crm" element={<Solutions.CRM />} />
            <Route path="solutions/ecommerce" element={<Solutions.Ecommerce />} />
            <Route path="solutions/admin-dashboards" element={<Solutions.Dashboards />} />
            <Route path="solutions/business-automation" element={<Solutions.Automation />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="demo/:id" element={<DemoPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="blog" element={<BlogListPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
