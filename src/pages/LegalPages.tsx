import { useSEO } from '@/hooks'
import { siteConfig } from '@/config/site'
import { PageHeader } from '@/components/layout/PageHeader'

/**
 * Legal templates — review with a legal professional before publishing.
 * Company details are pulled from siteConfig.
 */

function LegalLayout({ children, updated }: { children: React.ReactNode; updated: string }) {
  return (
    <section className="section relative pt-0">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 text-sm text-ink-400">Last updated: {updated}</p>
          <div className="space-y-8 text-ink-600 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink-900 [&_p]:mt-2 [&_p]:leading-relaxed [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">{children}</div>
        </div>
      </div>
    </section>
  )
}

export function PrivacyPolicyPage() {
  useSEO({ title: `Privacy Policy | ${siteConfig.name}`, description: `How ${siteConfig.name} collects, uses and protects your personal information.` })
  const c = siteConfig.name
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="How we collect, use and protect your information." />
      <LegalLayout updated="September 2026">
        <div><h2>1. Introduction</h2><p>{c} ("we", "our", "us") respects your privacy. This policy explains what information we collect through our website and services, how we use it, and the choices you have.</p></div>
        <div><h2>2. Information we collect</h2><ul><li><strong>Information you provide:</strong> name, business name, email address, phone number, the service you are interested in, budget and message when you submit an enquiry, chat with our assistant or contact us on WhatsApp.</li><li><strong>Marketing attribution:</strong> the campaign source, landing page and referrer (for example, that you arrived from an Instagram post) and your device type, so we can understand which channels bring enquiries.</li><li><strong>Technical data:</strong> standard analytics information such as browser type and pages visited.</li></ul></div>
        <div><h2>3. How we use your information</h2><ul><li>To respond to your enquiry and provide a consultation, quote or demo.</li><li>To deliver and support the services you purchase.</li><li>To improve our website and marketing.</li><li>To send you updates about our services, where you have agreed to receive them.</li></ul></div>
        <div><h2>4. Sharing</h2><p>We do not sell your personal information. We may share it with service providers who help us operate our business (such as hosting, email and messaging providers) under confidentiality obligations, or where required by law.</p></div>
        <div><h2>5. WhatsApp and third-party services</h2><p>When you contact us on WhatsApp, your messages are processed by WhatsApp in accordance with its own privacy policy. Links to Instagram, LinkedIn and other platforms are subject to those platforms' policies.</p></div>
        <div><h2>6. Data retention and security</h2><p>We retain enquiry data for as long as necessary to respond to you and manage our relationship. We use reasonable technical and organisational measures to protect your information.</p></div>
        <div><h2>7. Your rights</h2><p>You may request access to, correction of, or deletion of your personal information by contacting us at {siteConfig.contact.email}.</p></div>
        <div><h2>8. Contact</h2><p>Questions about this policy can be sent to {siteConfig.contact.email} or via WhatsApp at {siteConfig.contact.whatsapp}.</p></div>
      </LegalLayout>
    </>
  )
}

export function TermsPage() {
  useSEO({ title: `Terms & Conditions | ${siteConfig.name}`, description: `Terms and conditions for using the ${siteConfig.name} website and services.` })
  const c = siteConfig.name
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" description="The terms that apply when you use our website and services." />
      <LegalLayout updated="September 2026">
        <div><h2>1. Acceptance</h2><p>By using the {c} website or engaging our services, you agree to these terms. If you do not agree, please do not use the website.</p></div>
        <div><h2>2. Services</h2><p>We provide website development, e-commerce development, CRM solutions, digital marketing, admin dashboards and business automation. The scope, timeline and pricing of any engagement are defined in a written proposal or agreement.</p></div>
        <div><h2>3. Quotes and pricing</h2><p>Prices shown on this website are indicative starting points and exclude applicable taxes. Final pricing is confirmed in a written quote based on your requirements.</p></div>
        <div><h2>4. Payments</h2><p>Payment terms, milestones and refund conditions are set out in each project agreement. Work may be paused if payments are overdue.</p></div>
        <div><h2>5. Intellectual property</h2><p>Upon full payment, you own the custom deliverables created for your project, excluding third-party components, open-source software and our pre-existing tools, which remain under their respective licences.</p></div>
        <div><h2>6. Client responsibilities</h2><p>You are responsible for providing accurate content, timely feedback and any required accounts (domain, hosting, payment gateway, social media) and for ensuring you have rights to the materials you supply.</p></div>
        <div><h2>7. Portfolio</h2><p>Projects shown in our portfolio may be concept or demonstration builds and are labelled as such. We do not claim demo projects as client work.</p></div>
        <div><h2>8. Limitation of liability</h2><p>To the extent permitted by law, {c} is not liable for indirect or consequential losses arising from use of the website or services. Our total liability is limited to the fees paid for the relevant service.</p></div>
        <div><h2>9. Governing law</h2><p>These terms are governed by the laws of India. Disputes are subject to the jurisdiction of the courts at our registered location.</p></div>
        <div><h2>10. Contact</h2><p>Questions about these terms can be sent to {siteConfig.contact.email}.</p></div>
      </LegalLayout>
    </>
  )
}

export function NotFoundPage() {
  useSEO({ title: `Page not found | ${siteConfig.name}`, description: 'The page you are looking for does not exist.', noIndex: true })
  return (
    <PageHeader eyebrow="404" title="Page Not Found" description="The page you are looking for doesn't exist or has moved.">
      <a href="/" className="inline-flex h-12 items-center rounded-xl bg-brand-600 px-6 font-semibold text-white">Back to Home</a>
    </PageHeader>
  )
}
