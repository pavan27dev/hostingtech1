import type { BlogPost } from '@/types/content'

/** Starter articles — replace with backend-driven content via endpoints.blog later. */
export const blogPosts: BlogPost[] = [
  {
    slug: 'why-every-small-business-needs-a-crm',
    title: 'Why Every Small Business Needs a CRM in 2026',
    excerpt:
      'Leads slip through the cracks when they live in notebooks and chat threads. Here is how a simple CRM changes that.',
    category: 'CRM',
    date: '2026-08-12',
    readTime: '5 min read',
    content: [
      'Most small businesses lose customers not because of bad products, but because of missed follow-ups. An enquiry arrives on WhatsApp, a call comes in during a busy afternoon, a form is submitted on the website — and a week later nobody remembers who was supposed to reply.',
      'A CRM (Customer Relationship Management system) solves this by giving every lead a home. Each enquiry becomes a record with a status, an owner and a next action. Your team sees exactly who needs a call today, and you see how many leads turned into customers this month.',
      'The right CRM for a growing business is not the most complex one. It is the one your team will actually use every day: simple lead capture, a clear pipeline, reminders for follow-ups and reports you can read in a minute.',
    ],
  },
  {
    slug: 'instagram-to-customers-lead-funnel',
    title: 'From Instagram Followers to Paying Customers',
    excerpt:
      'Followers are not leads. Learn how to build a funnel that turns reels and stories into enquiries you can track.',
    category: 'Digital Marketing',
    date: '2026-07-28',
    readTime: '6 min read',
    content: [
      'Instagram is where many customers discover a business for the first time, but discovery is only the first step. Without a clear path from your profile to a conversation, followers stay followers.',
      'The funnel is simple: a reel or story creates interest, your bio link sends people to a focused landing page, and that page offers one obvious action — chat on WhatsApp or request a call back. Every link carries campaign tags so you know which content is producing enquiries.',
      'When those enquiries land in a CRM with their source attached, you can finally answer the most important marketing question: which posts bring customers, not just likes?',
    ],
  },
  {
    slug: 'what-should-a-business-website-cost',
    title: 'What Should a Business Website Actually Cost?',
    excerpt:
      'Pricing for websites varies wildly. Here is what drives the cost and how to decide what your business really needs.',
    category: 'Website Development',
    date: '2026-07-10',
    readTime: '4 min read',
    content: [
      'Website pricing depends on three things: the number of pages and features, the level of custom design, and whether you need integrations such as payments, booking or a CRM.',
      'A focused business website with a handful of pages, a contact form and WhatsApp integration is affordable and quick to launch. An e-commerce store or a custom web application involves more engineering and testing, so it costs more — but it also does more for your business.',
      'The best approach is to start with what generates leads today and add features as the business grows. A good technology partner will help you phase the investment instead of pushing everything at once.',
    ],
  },
]

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug)
