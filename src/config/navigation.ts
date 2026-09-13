export interface NavLink {
  label: string
  href: string
  description?: string
  children?: NavLink[]
}

export const solutionLinks: NavLink[] = [
  { label: 'CRM Solutions', href: '/solutions/crm', description: 'Leads, customers, sales & follow-ups in one place' },
  { label: 'E-Commerce Solutions', href: '/solutions/ecommerce', description: 'Complete online stores with admin panel' },
  { label: 'Admin Dashboards', href: '/solutions/admin-dashboards', description: 'Real-time visibility into your business' },
  { label: 'Business Automation', href: '/solutions/business-automation', description: 'Automate repetitive workflows' },
]

export const serviceLinks: NavLink[] = [
  { label: 'Website Development', href: '/services/website-development' },
  { label: 'E-Commerce Development', href: '/solutions/ecommerce' },
  { label: 'CRM Solutions', href: '/solutions/crm' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
  { label: 'Admin Dashboards', href: '/solutions/admin-dashboards' },
  { label: 'Business Automation', href: '/solutions/business-automation' },
]

export const mainNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', children: serviceLinks },
  { label: 'Solutions', href: '/solutions/crm', children: solutionLinks },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const companyLinks: NavLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const legalLinks: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
]
