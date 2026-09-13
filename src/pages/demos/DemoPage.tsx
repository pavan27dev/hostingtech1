import { Navigate, useParams } from 'react-router-dom'
import { projects } from '@/data/portfolio'
import { DemoShell } from './DemoShell'
import { RealEstateCRMDemo } from './RealEstateCRMDemo'
import { EcommerceDemo } from './EcommerceDemo'
import { RestaurantDemo, ServiceBusinessDemo } from './WebsiteDemos'
import { BusinessDashboardDemo, MarketingDashboardDemo } from './DashboardDemos'

const demos: Record<string, { component: React.ComponentType; message: string }> = {
  'real-estate-crm': { component: RealEstateCRMDemo, message: 'Hello, I saw the Real Estate CRM demo and would like a similar CRM for my business.' },
  'ecommerce-platform': { component: EcommerceDemo, message: 'Hello, I saw the E-Commerce Platform demo and would like an online store for my business.' },
  'restaurant-website': { component: RestaurantDemo, message: 'Hello, I saw the Restaurant Website demo and would like a similar website.' },
  'business-admin-dashboard': { component: BusinessDashboardDemo, message: 'Hello, I saw the Business Admin Dashboard demo and would like a dashboard for my business.' },
  'digital-marketing-dashboard': { component: MarketingDashboardDemo, message: 'Hello, I saw the Digital Marketing Dashboard demo and would like to discuss marketing for my business.' },
  'service-business-website': { component: ServiceBusinessDemo, message: 'Hello, I saw the Service Business Website demo and would like a similar website with online booking.' },
}

export const demoPath = (id: string) => `/demo/${id}`

export default function DemoPage() {
  const { id = '' } = useParams()
  const project = projects.find((p) => p.id === id)
  const demo = demos[id]
  if (!project || !demo) return <Navigate to="/portfolio" replace />
  const Demo = demo.component
  return (
    <DemoShell project={project} intentMessage={demo.message}>
      <Demo />
    </DemoShell>
  )
}
