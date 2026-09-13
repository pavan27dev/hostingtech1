/** The six service/solution pages, each driven by the ServicePage template. */
import { ServicePage } from './ServicePage'
import { CRMDashboardMockup } from '@/components/mockups/CRMDashboardMockup'
import { StoreMockup } from '@/components/mockups/StoreMockup'
import { DashboardPreview } from '@/components/mockups/DashboardPreview'

export function WebsiteDevelopmentPage() {
  return (
    <ServicePage
      slug="website-development"
      seoTitle="Website Development for Businesses"
      seoDescription="Modern, fast, responsive business websites with WhatsApp integration, contact forms and SEO — designed to generate leads."
      headline="Websites That Turn Visitors Into Enquiries"
      faqIndexes={[0, 5, 6, 7]}
      benefits={[
        { title: 'Mobile-first design', text: 'Most of your customers arrive from Instagram and Google on their phones. We design for that screen first.' },
        { title: 'Built for conversions', text: 'WhatsApp buttons, enquiry forms and clear calls-to-action on every page — not just a brochure.' },
        { title: 'SEO-ready from day one', text: 'Clean semantic code, fast loading, proper metadata and structured data so Google can find you.' },
      ]}
    />
  )
}

export function EcommercePage() {
  return (
    <ServicePage
      slug="ecommerce"
      seoTitle="E-Commerce Website Development"
      seoDescription="Complete online stores with product management, cart, checkout, online payments, order tracking, inventory and an admin dashboard."
      headline="A Complete Online Store, Ready to Sell"
      visual={<StoreMockup className="rounded-3xl border border-ink-100 bg-ink-50/70 p-4 shadow-glow sm:p-6" />}
      faqIndexes={[1, 5, 6, 8]}
      benefits={[
        { title: 'Sell 24/7', text: 'Customers browse, order and pay online — with UPI, cards and cash on delivery.' },
        { title: 'Run it from one panel', text: 'Products, inventory, orders, coupons and customers managed from a single admin dashboard.' },
        { title: 'Know your numbers', text: 'Sales analytics and reports show best-selling products, revenue trends and repeat customers.' },
      ]}
    />
  )
}

export function CRMPage() {
  return (
    <ServicePage
      slug="crm"
      seoTitle="Custom CRM Software for Small Businesses"
      seoDescription="Manage leads, customers, sales pipeline, follow-ups, tasks and employees from one CRM — with WhatsApp integration and analytics."
      headline="Manage Your Entire Business From One Dashboard"
      visual={<CRMDashboardMockup />}
      faqIndexes={[2, 4, 8, 9]}
      benefits={[
        { title: 'Never miss a follow-up', text: 'Every lead gets an owner, a status and a next action. Reminders keep your team on schedule.' },
        { title: 'See your pipeline', text: 'Track leads from New to Won across stages, and see where deals get stuck.' },
        { title: 'Made for your industry', text: 'Real estate, clinics, education, services — fields and workflows customised to how you sell.' },
      ]}
    />
  )
}

export function DigitalMarketingPage() {
  return (
    <ServicePage
      slug="digital-marketing"
      seoTitle="Digital Marketing Services — Instagram, Meta & Google Ads"
      seoDescription="Instagram and Facebook marketing, content and reels, Meta Ads, Google Ads, SEO and lead generation with monthly reports."
      headline="Reach the Right Customers, Consistently"
      faqIndexes={[3, 8]}
      benefits={[
        { title: 'Content that converts', text: 'Reels, posts and stories designed to drive enquiries, not just likes.' },
        { title: 'Paid ads with attribution', text: 'Every campaign link is tagged so you know exactly which ad produced which lead.' },
        { title: 'Monthly reporting', text: 'Clear reports on reach, leads and cost per lead — no jargon.' },
      ]}
    />
  )
}

export function AdminDashboardsPage() {
  return (
    <ServicePage
      slug="admin-dashboards"
      seoTitle="Custom Admin Dashboards & Business Analytics"
      seoDescription="Sales, customer, revenue, lead and employee dashboards with real-time charts, reports and analytics for complete business visibility."
      headline="See Your Whole Business at a Glance"
      visual={<DashboardPreview />}
      faqIndexes={[9, 8]}
      benefits={[
        { title: 'Real-time visibility', text: 'Sales, leads, revenue and team activity update as they happen.' },
        { title: 'Reports in one click', text: 'Export daily, weekly or monthly reports to PDF or Excel.' },
        { title: 'Connects to your tools', text: 'Pull data from your CRM, store, payment gateway or spreadsheets.' },
      ]}
    />
  )
}

export function BusinessAutomationPage() {
  return (
    <ServicePage
      slug="business-automation"
      seoTitle="Business Automation — WhatsApp, Email & Workflow Automation"
      seoDescription="Automate lead follow-ups, customer notifications, WhatsApp and email messages, reports and workflows to save time and grow faster."
      headline="Let Software Handle the Repetitive Work"
      faqIndexes={[4, 8]}
      benefits={[
        { title: 'Instant lead response', text: 'New enquiries get an automatic WhatsApp or email reply within seconds, any time of day.' },
        { title: 'Fewer manual tasks', text: 'Order confirmations, reminders, invoices and reports generated automatically.' },
        { title: 'Connected systems', text: 'Your website, CRM, store and marketing tools share data without copy-paste.' },
      ]}
    />
  )
}
