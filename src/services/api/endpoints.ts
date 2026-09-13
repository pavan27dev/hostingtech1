/** REST endpoint map — keep in sync with Spring Boot controllers. */
export const endpoints = {
  leads: {
    create: '/leads',
    list: '/leads',
    byId: (id: string) => `/leads/${id}`,
    updateStatus: (id: string) => `/leads/${id}/status`,
  },
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  dashboard: {
    summary: '/admin/dashboard/summary',
    charts: '/admin/dashboard/charts',
  },
  customers: { list: '/customers', byId: (id: string) => `/customers/${id}` },
  blog: { list: '/blog', bySlug: (slug: string) => `/blog/${slug}` },
  superAdmin: {
    companies: '/super-admin/companies',
    plans: '/super-admin/plans',
    subscriptions: '/super-admin/subscriptions',
  },
} as const
