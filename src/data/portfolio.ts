import type { Project } from '@/types/content'

/**
 * Demo projects — these showcase the kind of work we build. They are
 * concept builds, NOT real client projects, and are labelled as such in the UI.
 */
export const projects: Project[] = [
  {
    id: 'real-estate-crm',
    name: 'Real Estate CRM',
    industry: 'Real Estate',
    technologies: ['React', 'TypeScript', 'Spring Boot', 'MySQL'],
    description:
      'A CRM for property consultants to track enquiries, site visits, follow-ups and deal stages for every listing.',
    features: ['Lead pipeline by property', 'Site-visit scheduling', 'WhatsApp follow-ups', 'Agent performance reports'],
    preview: 'crm',
    isDemo: true,
  },
  {
    id: 'ecommerce-platform',
    name: 'E-Commerce Platform',
    industry: 'Retail',
    technologies: ['React', 'Tailwind', 'Spring Boot', 'Razorpay'],
    description:
      'A full online store with product catalogue, cart, checkout, online payments and an admin panel for orders and inventory.',
    features: ['Catalogue & filters', 'Cart & checkout', 'Order tracking', 'Inventory & coupons'],
    preview: 'store',
    isDemo: true,
  },
  {
    id: 'restaurant-website',
    name: 'Restaurant Website',
    industry: 'Food & Hospitality',
    technologies: ['React', 'Tailwind', 'WhatsApp API'],
    description:
      'A mobile-first restaurant website with digital menu, table reservation and WhatsApp ordering.',
    features: ['Digital menu', 'Reservation form', 'WhatsApp ordering', 'Google Maps & reviews'],
    preview: 'restaurant',
    isDemo: true,
  },
  {
    id: 'business-admin-dashboard',
    name: 'Business Admin Dashboard',
    industry: 'Services',
    technologies: ['React', 'TypeScript', 'Spring Boot', 'Charts'],
    description:
      'A central dashboard combining sales, customers, revenue and employee activity with exportable reports.',
    features: ['Revenue & sales KPIs', 'Employee activity', 'Role-based access', 'PDF / Excel exports'],
    preview: 'dashboard',
    isDemo: true,
  },
  {
    id: 'digital-marketing-dashboard',
    name: 'Digital Marketing Dashboard',
    industry: 'Marketing',
    technologies: ['React', 'Meta API', 'Google Ads API'],
    description:
      'A reporting dashboard that brings Instagram, Meta Ads and Google Ads performance into one view with lead attribution.',
    features: ['Campaign ROI', 'Lead source attribution', 'Content calendar', 'Monthly client reports'],
    preview: 'marketing',
    isDemo: true,
  },
  {
    id: 'service-business-website',
    name: 'Service Business Website',
    industry: 'Salon / Clinic / Gym',
    technologies: ['React', 'Tailwind', 'Booking Form'],
    description:
      'A conversion-focused website for appointment-based businesses with online booking and WhatsApp enquiry.',
    features: ['Service pages', 'Appointment booking', 'WhatsApp CTA', 'Local SEO setup'],
    preview: 'service',
    isDemo: true,
  },
]
