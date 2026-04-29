# AASTACLEAN Portfolio Website -- Validation Audit

**Date:** 2026-04-29
**Project:** `C:\Users\User\portfolio-website`
**Framework:** Next.js 16.2.2 / React 19.2.4 / TypeScript 5.x / Tailwind CSS 4

---

## Score Summary

| Category | Score | Rating |
|---|---|---|
| SEO & Schema.org | **82/100** | Strong |
| Accessibility (a11y) | **38/100** | Needs Work |
| Security | **22/100** | Critical |
| Performance | **55/100** | Moderate |
| Code Quality | **68/100** | Good |
| Responsive Design | **85/100** | Strong |
| Conversion Rate Optimization | **74/100** | Good |
| Content Completeness | **78/100** | Strong |

**Weighted Average: 63/100**

---

## 1. SEO & Schema.org -- Score: 82/100

### What's Present

- **JSON-LD Schema Blocks (count by page):**

  | Page | Schema Types | Count |
  |---|---|---|
  | `app/layout.tsx` | None (only OpenGraph) | 0 |
  | `app/[state]/[suburb]/page.tsx` | LocalBusiness, Service (x8), FAQPage, BreadcrumbList | 1 `@graph` with 11 types |
  | `app/services/[service]/[state]/[city]/page.tsx` | Service, FAQPage, BreadcrumbList | 3 separate blocks |
  | `app/pricing/page.tsx` | None | 0 |
  | `app/contact/page.tsx` (ContactContent) | ContactPage, LocalBusiness | 1 block |

  **Total JSON-LD blocks:** ~6 distinct schema implementations across pages.

- **Meta Tags Per Page:** All dynamic pages include `title`, `description`, `keywords`, `authors`. Suburb page adds `geo.region`, `geo.placename`, `geo.position`, `ICBM`.

- **Canonical URLs:** Present on suburb pages (`alternates.canonical`), pricing page, service geo pages, and contact page. Missing from root layout and home page.

- **OpenGraph:** Implemented on layout (site-wide), pricing, suburb, service geo, and contact pages. Includes `title`, `description`, `type`, `locale`, `siteName`.

- **Twitter Cards:** Only on suburb pages (`twitter: { card: "summary_large_image" }`). Missing from layout, pricing, service geo, and contact pages.

- **Semantic HTML Structure:**
  - Home page (`app/page.tsx`): uses `<main>` wrapper, components use `<section>` with IDs (`#home`, `#services`, `#faq`, `#reviews`, `#booking`, `#contact`).
  - Suburb page: proper `<h1>` > `<h2>` > `<h3>` hierarchy, `<section>` elements, `<nav>` for breadcrumb, `<details>` for FAQ.
  - Service geo page: proper heading hierarchy, `<nav>` breadcrumb, `<section>` elements.
  - Pricing page: `<h1>` in hero, `<h2>` section headers, `<h3>` service titles, `<nav>` breadcrumb.
  - Contact page: `<h1>` hero, `<h2>` section headers, `<form>` with proper `<label>`/`for`/`id` pairing.

### Missing / Needs Improvement

| Issue | Severity | File(s) |
|---|---|---|
| No JSON-LD `Organization` or `WebSite` schema in root layout | Medium | `app/layout.tsx` |
| No canonical URL on root layout / home page | Medium | `app/layout.tsx`, `app/page.tsx` |
| Twitter Card meta only on suburb pages | Low | `app/pricing/page.tsx`, `app/services/.../page.tsx`, `app/contact/...` |
| No `<article>` semantic element used anywhere | Low | Multiple |
| Pricing page has no JSON-LD (Product or Service schema) | Medium | `app/pricing/page.tsx` |
| No `sitemap.xml` or `robots.txt` in `/public` | High | `/public/` |
| Home page lacks explicit `generateMetadata` export | Medium | `app/page.tsx` |
| Navbar search input has no `aria-label` | Low | `components/Navbar.tsx` |

---

## 2. Accessibility (a11y) -- Score: 38/100

### What's Present

- **`aria-label` attributes:** 9 instances total
  - `components/Navbar.tsx`: mobile menu toggle
  - `components/Footer.tsx`: social links (Facebook, Instagram)
  - `components/FloatingHomeButton.tsx`: back to home
  - `components/Contact.tsx`: social links
  - `app/contact/ContactContent.tsx`: social links (Facebook, Instagram, Google)

- **Focus-visible rule:** Single global rule in `app/globals.css:498`:
  ```css
  *:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
    border-radius: 4px;
  }
  ```

- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` rule present in `globals.css` -- disables animations/transitions.

- **Form labels:** Contact forms have proper `<label htmlFor="...">` paired with `id` on inputs.

- **HTML `lang="en"`:** Present in root layout.

### Missing / Critical Gaps

| Issue | Severity | File(s) |
|---|---|---|
| **Zero `role` attributes** anywhere in the codebase | High | All `.tsx` files |
| QuoteCalculator `<input type="range">` has no `aria-valuenow`, `aria-valuemin`, `aria-valuemax` | Medium | `components/QuoteCalculator.tsx` |
| Navbar search input has no `aria-label` | Medium | `components/Navbar.tsx` (line ~78) |
| Navbar dropdown menus not keyboard accessible (no `onKeyDown`, no `Escape` close) | High | `components/Navbar.tsx` |
| Mobile menu toggle not closable via keyboard (Escape key) | High | `components/Navbar.tsx` |
| `FAQSection` accordion uses `<button>` but no `aria-expanded` or `aria-controls` | Medium | `components/FAQSection.tsx` |
| Suburb page `<details>` FAQ has no `aria` attributes | Low | `app/[state]/[suburb]/page.tsx` |
| Booking component `<input type="date">` and `<input type="text">` have no `<label>` elements | High | `components/Booking.tsx` |
| No skip-to-content link | Medium | `app/layout.tsx` |
| Images using emoji as icons (no alt equivalent for screen readers) | Medium | Multiple components |
| Color contrast: sky-500 (#0ea5e9) on white may not meet WCAG AA 4.5:1 for small text | Low | `app/globals.css`, multiple |
| Navbar "Services" and "More" dropdowns share same `dropdownOpen` state (both open/close together) | Medium | `components/Navbar.tsx` |

---

## 3. Security -- Score: 22/100

### What's Present

- `target="_blank"` links use `rel="noopener noreferrer"` (correct pattern).
- TypeScript `strict: true` catches some type-level issues.

### Critical Findings

| Issue | Severity | File(s) |
|---|---|---|
| **No security headers** -- No CSP, X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy | Critical | `next.config.ts` |
| **No input validation/sanitization** on any API route POST/PATCH/DELETE | Critical | All `app/api/*/route.ts` |
| **No rate limiting** on any API endpoint | High | All `app/api/*/route.ts` |
| **No CSRF protection** on form submissions | High | `components/Contact.tsx`, `app/contact/ContactContent.tsx`, all API routes |
| **In-memory data stores** (arrays) used instead of database -- data lost on restart, no concurrency safety | High | `app/api/bookings/route.ts`, `app/api/quotes/route.ts`, `app/api/customers/route.ts`, `app/api/projects/route.ts`, `app/api/config/route.ts`, `app/api/services/route.ts` |
| **`dangerouslySetInnerHTML`** used for JSON-LD -- correct for this use case, but no sanitization on any user-facing HTML | Medium | `app/[state]/[suburb]/page.tsx`, `app/services/.../page.tsx`, `app/contact/ContactContent.tsx` |
| **No CORS headers** configured | Medium | `next.config.ts` |
| **Phone numbers and email exposed** in client-side code | Low | Multiple components |
| **AI audit route** imports and runs reasoning modules (`MCTS`, `GoT`, `CoT`) with no input validation | Medium | `app/api/ai/audit/route.ts` |
| **PATCH endpoints** on `services` and `projects` accept arbitrary object spread without validation | High | `app/api/services/route.ts`, `app/api/projects/route.ts` |
| **Admin routes** (`/api/admin/bookings`, `/api/admin/analytics`) have no authentication check | Critical | `app/api/admin/` |

### Security Headers (Missing from `next.config.ts`)

```typescript
// next.config.ts currently has ZERO security configuration:
const nextConfig: NextConfig = { /* config options here */ };
```

Recommended headers to add:
- `Content-Security-Policy`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

---

## 4. Performance -- Score: 55/100

### What's Present

- **Next.js 16.2.2** with App Router (server components by default).
- **`generateStaticParams`** used on suburb and service geo pages for SSG.
- **Tailwind CSS 4** with `@tailwindcss/postcss` (PurgeCSS-style tree shaking).
- **Google Fonts** via `next/font/google` (self-hosted, no render-blocking).
- **1 `next/image` usage** with `fill` + `object-cover` in `components/Services.tsx`.
- **CSS utility classes** (`hover-lift`, `animate-fade-in`, etc.) are all Tailwind-based -- no large custom CSS bundles.

### Missing / Needs Improvement

| Issue | Severity | File(s) |
|---|---|---|
| **`next.config.ts` is empty** -- no image optimization config, no compression, no redirect rules | High | `next.config.ts` |
| **No `next/dynamic` or `React.lazy`** -- all components are eagerly imported | Medium | `app/page.tsx` imports 14 components synchronously |
| **Only 1 `next/image` usage** -- blog and events pages use raw `<img>` tags | Medium | `app/blog/page.tsx`, `app/events/page.tsx` |
| **External Unsplash images** loaded without `domains` or `remotePatterns` config | High | `components/Services.tsx`, `next.config.ts` |
| **Heavy CSS animations** (20+ @keyframes, blur, transform3d) can cause jank on low-end devices | Low | `app/globals.css` |
| **No `loading="lazy"`** on most images (only the iframe has it) | Medium | `components/Services.tsx` |
| **No `sizes` attribute** on `<Image fill>` usage | Low | `components/Services.tsx` |
| **Client components overused** -- Hero, Navbar, Services, Booking, QuoteCalculator, Reviews, FAQSection, Contact all marked `"use client"` when much of their content could be server-rendered | Medium | 8+ component files |
| **No response caching** headers on API routes | Medium | All `app/api/` routes |
| **No font `display: swap`** -- Geist fonts use default swap behavior (acceptable but could be explicit) | Low | `app/layout.tsx` |

---

## 5. Code Quality -- Score: 68/100

### Metrics

| Metric | Value |
|---|---|
| Total `.tsx` files | 59 |
| Total `.ts` files (routes + lib) | ~50+ |
| Total `.css` files | 1 |
| Approximate total lines of code | 10,000-12,000 (estimated from file listing) |
| Average file size | ~100-200 lines |

### What's Present

- **TypeScript strict mode enabled** (`"strict": true` in `tsconfig.json`).
- **Type interfaces** defined for API data shapes (`Booking`, `Quote`, `Customer`, `Service`, `Suburb`, `State`).
- **Path aliases** configured (`@/*` maps to project root).
- **ESLint** configured with `eslint-config-next`.
- **Consistent component naming** (PascalCase).
- **Consistent file structure** (feature-based in `app/`, shared in `components/`, data in `lib/`).

### Issues

| Issue | Severity | File(s) |
|---|---|---|
| **Duplicate code**: Contact form exists in both `components/Contact.tsx` AND `app/contact/ContactContent.tsx` with nearly identical markup | High | Both files |
| **In-memory data stores** instead of database/Prisma usage (Prisma is installed but not used in API routes) | High | `app/api/` routes, `prisma/` directory exists |
| **`Booking.tsx` component** is overly simplistic with no validation, labels, or error handling | Medium | `components/Booking.tsx` |
| **`services/route.ts` PATCH** modifies array in place with no type safety on `body` spread | Medium | `app/api/services/route.ts` |
| **Shared `dropdownOpen` state** controls both "Services" and "More" dropdowns simultaneously | Bug | `components/Navbar.tsx` |
| **`QuoteCalculator`** mixes business logic (pricing math) in component rather than utility function | Low | `components/QuoteCalculator.tsx` |
| **`NanochatAssistant`** component not inspected but is 1062 lines | Medium | `components/NanochatAssistant.tsx` |
| **Hardcoded phone numbers** in multiple places (1300 000 000, 08 9000 0000, 0405 866 459) | Low | Multiple files |
| **Some routes return empty data** (`admin/bookings`, `admin/analytics`) | Medium | `app/api/admin/` |

---

## 6. Responsive Design -- Score: 85/100

### What's Present

- **Breakpoint usage across the project:**

  | Breakpoint | Approx. Occurrences |
  |---|---|
  | `sm:` | ~40+ |
  | `md:` | ~60+ |
  | `lg:` | ~55+ |
  | `xl:` | ~5 |

- **Mobile-first approach:** Most layouts use default mobile styles with `md:` and `lg:` overrides.

- **Grid/Flex layouts:** Extensive use of `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` patterns for responsive grids.

- **Responsive typography:** `text-4xl sm:text-5xl lg:text-6xl` patterns on headings.

- **Responsive spacing:** `px-4 sm:px-6 lg:px-8` on containers.

- **Viewport meta tag:** Handled by Next.js default (standard `<meta name="viewport">`).

- **`max-w-7xl mx-auto`** container pattern used consistently.

### Minor Gaps

| Issue | Severity | File(s) |
|---|---|---|
| Hero background gradient orbs have fixed pixel sizes that may overflow on very small screens | Low | `components/Hero.tsx` |
| Pricing bento cards could use `sm:grid-cols-2` for tablet (currently jumps from 1 to 3 columns) | Low | `app/pricing/page.tsx` |
| No `hover:` effects are disabled on touch devices (hover persists on mobile after tap) | Low | Multiple components |

---

## 7. Conversion Rate Optimization (CRO) -- Score: 74/100

### What's Present

| Element | Home Page | Pricing Page | Service Pages | Contact Page |
|---|---|---|---|---|
| Above-fold CTA | Yes (Get Free Quote + Phone) | Yes (Book links on every card) | Yes (Book Now) | Yes (Send Message form) |
| Value Proposition | Yes (20+ services, 8000+ suburbs) | Yes (Transparent pricing badge) | Yes (service-specific) | Partial |
| Trust Signals | Yes (5 badges + stats bar) | Yes (4 trust stats + CRO banner) | Yes (Why Choose Us section) | Partial |
| Social Proof | Yes (Reviews section) | Partial (trust stats only) | No dedicated reviews | No |
| Urgency/Scarcity | No | Yes (4 CRO items in banner) | Partial (same-day mention) | No |
| Price Anchoring | Yes (Quote Calculator) | Yes (per-service pricing) | Yes (add-on prices) | No |
| Trust Badges | Yes (Bond-back, Police, Insured, Eco, 5-star) | Yes | Yes | No |
| CTAs Count | 2 | 22+ (1 per service card + 2 bottom) | 2+ | 2 |
| FAQ Section | Yes (8 FAQs) | No | Yes (5 FAQs per service) | Yes (4 FAQs) |
| Compliance Info | No | No | Yes (ACL, WHS, Privacy) | Partial |
| Phone Number Visible | Yes | Yes (Custom Quote section) | Yes | Yes |

### Missing / Needs Improvement

| Issue | Severity | File(s) |
|---|---|---|
| No urgency countdown timers or limited-availability messaging | Medium | Home page, pricing page |
| No customer logos or partner badges | Low | Home page |
| No exit-intent popup or lead capture | Low | All pages |
| Pricing page has no FAQ section | Medium | `app/pricing/page.tsx` |
| No testimonials on service geo pages | Medium | `app/services/[service]/[state]/[city]/page.tsx` |
| No live chat widget (NanochatAssistant exists but functionality unknown) | Low | `components/NanochatAssistant.tsx` |
| No trust badges on contact page | Low | `app/contact/ContactContent.tsx` |
| Booking component has no trust signals near the form | Medium | `components/Booking.tsx` |

---

## 8. Content Completeness -- Score: 78/100

### Service Coverage

- **Total services defined:** 20 (in `lib/constants/services.ts`)
- **Services with detailed content:** All 20 have descriptions, included items, and add-ons in `lib/constants/serviceDetails.ts`.
- **Pricing page:** All 20 services listed with starting prices, models, units, and frequency discounts.

| Service | Description | Inclusions | Add-ons | Pricing | FAQs (geo page) |
|---|---|---|---|---|---|
| All 20 services | Yes | Yes (6-9 each) | Yes (4-6 each) | Yes | Yes (4-5 each) |

### Suburb Coverage

| State | Suburb Count |
|---|---|
| NSW | 130 |
| VIC | 130 |
| QLD | 120 |
| WA | 75 |
| SA | 90 |
| TAS | 50 |
| ACT | 65 |
| NT | 40 |
| **Total** | **~700 suburbs** |

- All suburbs have: name, slug, postcode, state, auto-generated FAQs, local area info, nearby suburbs links.
- Service geo pages cover 20 services x 8 cities = 160 static service-city combinations.

### Content Depth

| Element | Status |
|---|---|
| Service descriptions | Complete (20/20) |
| Service inclusions | Complete (20/20) |
| Service add-ons with pricing | Complete (20/20) |
| Service-specific FAQs (geo pages) | Partial (4 services have custom FAQs, 16 use generic template) |
| Suburb-specific FAQs | Auto-generated (all 700+) |
| Compliance documentation | Good (ACL, WHS, Privacy Act, AS/NZS 4801 mentioned) |
| Privacy Policy page | Exists (`app/privacy/`) |
| Terms of Service page | Exists (`app/terms/`) |
| Blog page | Exists (`app/blog/`) |
| Booking flow | Present but minimal (4 steps, no validation) |

### Missing

| Issue | Severity |
|---|---|
| 16 of 20 services use generic FAQ template on geo pages | Medium |
| No case studies or portfolio items (Projects API exists but has only 2 hardcoded entries) | Medium |
| No team/about page content with real staff photos or bios | Low |
| No testimonials database (Reviews component has 6 hardcoded reviews) | Medium |
| No real integration (Stripe, email service, CRM) | High |

---

## Prioritized Action Items

### P0 -- Critical (Fix Immediately)

1. **Add security headers** to `next.config.ts` (CSP, HSTS, X-Frame-Options, etc.)
2. **Add input validation** to all API POST/PATCH/DELETE routes
3. **Add rate limiting** to public-facing API endpoints (bookings, quotes, contact)
4. **Add authentication** to admin routes (`/api/admin/*`)
5. **Replace in-memory stores** with Prisma/database integration

### P1 -- High Priority (Fix This Sprint)

6. Add `aria-label` to all interactive elements lacking it (search input, dropdowns, accordion buttons)
7. Add `aria-expanded`, `aria-controls` to FAQSection and Navbar dropdowns
8. Add proper `<label>` elements to Booking component inputs
9. Add `next/image` `remotePatterns` config for Unsplash images
10. Implement keyboard navigation for Navbar mobile menu and dropdowns
11. Fix shared `dropdownOpen` state bug in Navbar
12. Add `sitemap.xml` and `robots.txt` to `/public`
13. Add canonical URL and JSON-LD to root layout

### P2 -- Medium Priority (Fix Next Sprint)

14. Add Twitter Card meta to all pages (not just suburb pages)
15. Add JSON-LD Product/Service schema to pricing page
16. Add `generateMetadata` to home page
17. Add skip-to-content link in layout
18. Convert more components to server components where possible
19. Add `next/dynamic` imports for heavy components
20. Add custom FAQs for remaining 16 services on geo pages
21. Add urgency/scarcity elements to home page
22. Add testimonials to service geo pages
23. Deduplicate Contact form code (shared component)

### P3 -- Low Priority (Backlog)

24. Add `role` attributes where appropriate (navigation, banner, main, complementary)
25. Add `aria-valuenow` to range inputs
26. Add hover:disabled patterns for touch devices
27. Add `sizes` attribute to `<Image fill>` usage
28. Add response caching headers to API routes
29. Build out case studies/portfolio content
30. Integrate real payment processing (Stripe)
