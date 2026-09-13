# Digital Solutions Company Website

A production-quality, lead-generation website for a digital solutions company — websites, e-commerce, CRM, digital marketing, admin dashboards and business automation.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS · React Router 7 · Framer Motion (scroll animations) · React Three Fiber / Three.js (3D scenes)

---

## 1. Quick start

```bash
npm install          # .npmrc already sets legacy-peer-deps for react-three peer ranges
cp .env.example .env # then fill in your details
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the production build
```

Requires Node 18+.

## 2. Fill in your company details (one place)

Everything business-specific lives in **`src/config/site.ts`** and is overridable via `.env`:

| Setting | `.env` variable | Example |
|---|---|---|
| Company name | `VITE_COMPANY_NAME` | `Acme Digital` |
| Short name (chatbot header) | `VITE_COMPANY_SHORT_NAME` | `Acme` |
| Public site URL (canonical / OG) | `VITE_SITE_URL` | `https://www.acme.in` |
| Email / phone / address / city | `VITE_CONTACT_EMAIL` … | |
| **WhatsApp number** | `VITE_WHATSAPP_NUMBER` | `917660889883` (already set as default) |
| Instagram / LinkedIn URLs | `VITE_INSTAGRAM_URL`, `VITE_LINKEDIN_URL` | |
| Starting prices | `VITE_PRICE_WEBSITE`, `VITE_PRICE_ECOMMERCE`, `VITE_PRICE_MARKETING` | `₹15,000` |
| Backend API base URL | `VITE_API_BASE_URL` | `https://api.acme.in/api/v1` |

Also update:
- `public/sitemap.xml` and `public/robots.txt` — replace `https://www.example.com` with your domain.
- `public/og-image.png` — add a 1200×630 social share image.
- Logo files: `public/logo.png` (full lockup), `public/logo-mark.png` (cloud icon), `public/favicon.png`, `public/apple-touch-icon.png`, `public/og-image.png` — replace these to change the logo everywhere.
- `src/data/*.ts` — services, portfolio, pricing, FAQ and blog content.

> ⚠️ **Security:** every `VITE_*` variable is bundled into the public JavaScript. Never put API keys, secrets, tokens or database credentials in `.env` or anywhere in `src/`. Sensitive operations belong in the Spring Boot backend.

## 3. Project structure

```
src/
├── config/          site.ts (business info), whatsapp.ts (click-to-chat links), navigation.ts
├── types/           lead.ts (Lead, LeadSource, LeadStatus…), admin.ts (future Admin / Super Admin / tenant types), content.ts
├── services/api/    apiClient.ts (fetch wrapper), endpoints.ts, leads.api.ts   ← connect Spring Boot here
├── utils/           tracking.ts (UTM / attribution capture, event tracking), cn.ts
├── hooks/           useSEO (title, meta, OG, canonical, JSON-LD), media-query & 3D capability hooks
├── data/            services, portfolio (demo projects), pricing, faq, blog
├── components/
│   ├── layout/      Navbar, Footer, Logo, PageHeader, WhatsAppButton, Layout
│   ├── ui/          Button, SectionHeading, ServiceCard, PortfolioCard, PricingCard, Accordion, FormFields, BrandIcons
│   ├── forms/       ContactForm (validation, honeypot, attribution, API submit)
│   ├── chatbot/     ChatBot.tsx (widget) + chatEngine.ts (rule-based intents & lead capture)
│   ├── motion/      Reveal / Stagger (scroll reveals), Tilt3D (mouse + scroll 3D tilt), Parallax
│   ├── three/       HeroScene, FloatingShapes, SceneBackground (scroll-driven Three.js), SceneErrorBoundary
│   ├── mockups/     DashboardPreview, CRMDashboardMockup, StoreMockup, charts (pure CSS/SVG — no stock images)
│   └── sections/    Hero + all home-page sections (reused by inner pages)
└── pages/           Home, Services, six service/solution pages, Portfolio, Pricing, About, Contact, Blog, Privacy, Terms, 404
```

## 4. Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/services` | Services overview |
| `/services/website-development` | Website Development |
| `/services/digital-marketing` | Digital Marketing |
| `/solutions/crm` | CRM Solutions |
| `/solutions/ecommerce` | E-Commerce Solutions |
| `/solutions/admin-dashboards` | Admin Dashboards |
| `/solutions/business-automation` | Business Automation |
| `/portfolio`, `/pricing`, `/about`, `/contact`, `/blog`, `/blog/:slug` | |
| `/privacy-policy`, `/terms` | Legal (review with a lawyer before publishing) |

`/contact?service=CRM` pre-selects the service dropdown (used by CTAs and the chatbot).

## 5. Enquiries → WhatsApp (7660889883)

When a visitor submits the contact form, the site immediately opens WhatsApp (in a new tab / the WhatsApp app on mobile) addressed to **+91 76608 89883** with the full enquiry pre-filled — name, business, phone, email, service, budget, message and the marketing source. The visitor taps **Send** and the enquiry lands in your WhatsApp inbox. The success screen also shows a "Send Enquiry on WhatsApp" button in case a popup blocker interfered. The chatbot's lead capture does the same.

This works with no backend. If you later want enquiries delivered *automatically* (without the visitor pressing Send), that needs the Spring Boot backend to call the WhatsApp Business API — the lead payload is already structured for it (see §6).

## 5a. Demo projects

Every portfolio card's **View Demo** opens a working, clickable demo at `/demo/<id>`:

| Demo | Route | Highlights |
|---|---|---|
| Real Estate CRM | `/demo/real-estate-crm` | Dashboard, filterable leads table, live pipeline board (change a status and watch it move), site visits, properties, agents, reports |
| E-Commerce Platform | `/demo/ecommerce-platform` | Searchable store with categories & wishlist, cart drawer with quantities, checkout → order placed & tracking; Admin tab with orders/inventory |
| Restaurant Website | `/demo/restaurant-website` | Hero, tabbed menu, reservation form, WhatsApp ordering |
| Business Admin Dashboard | `/demo/business-admin-dashboard` | KPIs with 7d/30d/12m range, sales, customers, employees, reports |
| Digital Marketing Dashboard | `/demo/digital-marketing-dashboard` | Campaign ROI, leads by channel, UTM attribution, content calendar |
| Service Business Website | `/demo/service-business-website` | Salon site with services/pricing and time-slot booking |

All demos are marked "Demo project · sample data" and are `noindex`. Code lives in `src/pages/demos/`.

## 5b. WhatsApp integration

`src/config/whatsapp.ts` builds `https://wa.me/<number>?text=<message>` links with pre-filled messages per intent (`general`, `website`, `crm`, `ecommerce`, `marketing`, `dashboard`, `automation`, `consultation`, `pricing`). The floating button, navbar, hero, service cards, pricing cards, footer and chatbot all use it. Links open in a new tab.

## 6. Lead capture & backend integration

**Flow:** `ContactForm` → `leadsApi.createLead()` → `POST {VITE_API_BASE_URL}/leads` (Spring Boot) → MySQL.

Until `VITE_API_BASE_URL` is set, leads are queued in `localStorage` (`pending_leads_v1`) so the UI works during development; the success message still shows.

**Payload (`CreateLeadRequest`, see `src/types/lead.ts`):**
```json
{
  "name": "…", "businessName": "…", "email": "…", "phone": "…",
  "service": "CRM", "budget": "₹25,000 – ₹50,000", "message": "…",
  "source": "Instagram",
  "attribution": {
    "source": "Instagram", "campaign": "instagram_crm", "medium": "social",
    "landingPage": "/solutions/crm?utm_source=instagram…", "referrer": "…",
    "deviceType": "mobile", "userAgent": "…"
  }
}
```
The backend should add `leadId`, `status` (`New`), `createdAt`. Lead statuses: New → Contacted → Qualified → Demo → Proposal → Negotiation → Won / Lost.

Expected response envelope (either works): `{ "success": true, "data": { …lead } }` or the lead object directly. Errors: non-2xx with `{ "message": "…" }`.

**Suggested Spring Boot endpoint**
```java
@PostMapping("/api/v1/leads")
public ResponseEntity<ApiResponse<LeadDto>> create(@Valid @RequestBody CreateLeadRequest req) { … }
```
Enable CORS for your frontend origin. For the future admin app, `setAuthToken()` in `apiClient.ts` attaches a JWT `Authorization: Bearer` header; `endpoints.ts` already maps auth, dashboard, customers, blog and super-admin routes.

## 7. Marketing attribution & Instagram campaigns

`src/utils/tracking.ts` captures first-touch attribution on the first page view of a session: UTM source/medium/campaign/content/term, landing page, referrer and device type. It is attached to every lead.

Use these campaign links in Instagram bio / reels / stories:

| Campaign | Link |
|---|---|
| `instagram_website` | `https://yourdomain.com/services/website-development?utm_source=instagram&utm_medium=social&utm_campaign=instagram_website` |
| `instagram_crm` | `https://yourdomain.com/solutions/crm?utm_source=instagram&utm_medium=social&utm_campaign=instagram_crm` |
| `instagram_ecommerce` | `https://yourdomain.com/solutions/ecommerce?utm_source=instagram&utm_medium=social&utm_campaign=instagram_ecommerce` |
| `instagram_marketing` | `https://yourdomain.com/services/digital-marketing?utm_source=instagram&utm_medium=social&utm_campaign=instagram_marketing` |

Add `&utm_content=reel-aug-01` to distinguish individual posts. `buildCampaignUrl()` generates these programmatically.

Events (`whatsapp_click`, `cta_click`, `lead_submitted`, `chatbot_lead_captured`…) are pushed to `window.dataLayer`, ready for Google Tag Manager / GA4 / Meta Pixel.

## 8. AI chat assistant

`src/components/chatbot/` is a **rule-based** assistant — deterministic, client-side, no API keys. It answers service, pricing, timeline and contact questions (keyword intents + FAQ matching), runs a guided lead capture (name → phone → service) and hands off to WhatsApp or the pre-filled contact form.

Add or edit answers in the `intents` array in `chatEngine.ts`.

## 9. 3D & animations

- **Hero scene** (`HeroScene.tsx`): glass core with orbiting blocks; rotates/zooms with scroll and follows the mouse.
- **Page backdrop** (`SceneBackground.tsx`): floating shapes behind all content that drift with scroll.
- **Tilt3D**: dashboard mockups stand up in 3D as they scroll into view and tilt toward the cursor.
- **Reveal / Stagger / Parallax**: scroll-triggered depth reveals for every section.

All 3D is lazy-loaded (separate `three` chunk), wrapped in an error boundary (a WebGL failure can never blank the page), skipped for `prefers-reduced-motion`, and disabled on low-memory / data-saver devices (`useCanRender3D`). Tune intensity in those components or set `opacity` on `SceneBackground`.

## 10. SEO

Every page sets a unique title, description, canonical URL, Open Graph + Twitter tags and JSON-LD (Organization, WebSite, Service, BlogPosting, ContactPage) via `useSEO`. Semantic HTML, heading hierarchy, alt/aria labels, `sitemap.xml` and `robots.txt` are included. For prerendering / SSR later, `useSEO` is framework-agnostic and easy to swap.

## 11. Deployment

`npm run build` outputs static files to `dist/`. Deploy to Netlify, Vercel, Cloudflare Pages, S3/CloudFront or any static host. The app uses client-side routing — make sure all paths fall back to `index.html`:
- Netlify: `public/_redirects` is included.
- Vercel: add `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` to `vercel.json`.
- Nginx: `try_files $uri /index.html;`

## 12. Future modules (already typed)

`src/types/admin.ts` defines contracts for the Admin dashboard (summary, charts, modules), multi-tenant Super Admin (companies, plans, subscriptions), Client Admin and Employee roles, and `AuthUser`/JWT tokens. `services/api/endpoints.ts` maps the routes. Build the admin app as a separate route group (e.g. `/admin/*`) or a separate Vite app sharing these types.

## Content policy

No client names, logos, testimonials, statistics or results are invented. Portfolio items are labelled **Demo Project**. Dashboard mockups use clearly marked sample UI data.
