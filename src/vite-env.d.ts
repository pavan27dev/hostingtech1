/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COMPANY_NAME?: string
  readonly VITE_COMPANY_SHORT_NAME?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_CONTACT_PHONE?: string
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_WHATSAPP_DISPLAY?: string
  readonly VITE_ADDRESS?: string
  readonly VITE_CITY?: string
  readonly VITE_INSTAGRAM_URL?: string
  readonly VITE_INSTAGRAM_HANDLE?: string
  readonly VITE_LINKEDIN_URL?: string
  readonly VITE_PRICE_WEBSITE?: string
  readonly VITE_PRICE_ECOMMERCE?: string
  readonly VITE_PRICE_MARKETING?: string
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
