# Claude Code Instructions — AASTACLEAN Portfolio

> **Project:** AASTACLEAN Portfolio Website | **Deploy:** https://portfolio-website-perth-tea.vercel.app | **Repo:** https://github.com/navyapdh11/portfolio-website

---

## 1. Core Mandates

### Agentic Engineering
- **Research First:** Always `grep_search` existing patterns before editing. Understand the codebase → Plan → Execute → Verify.
- **Verification Mandatory:** Every change must be followed by type check (`tsc --noEmit`), lint (`biome check`), and build (`next build`) validation.
- **No Hacks:** Do not suppress linter warnings or bypass TypeScript. Fix the root cause.
- **Security:** Never commit secrets. Protect `.env`, `.git`, and system configs.

### Linggen Anchors
- When code files contain `// linggen anchor: <path>` comments, read the referenced file under `.linggen/anchor/` for authoritative context.
- Primary anchor: `.linggen/anchor/best_practices_2026.md` — 2026 industry standards for AI-native development.

---

## 2. Architecture & Tech Stack

### Current Stack (2026)
- **Framework:** Next.js 16.2.2 (Turbopack, default bundler)
- **Runtime:** React 19+, TypeScript 5.1+
- **Styling:** Tailwind CSS 4 (Oxide engine)
- **3D:** Three.js + @react-three/fiber + @react-three/drei
- **Icons:** lucide-react
- **Animations:** Framer Motion
- **Deployment:** Vercel (free tier)

### Key Architecture
- **Dynamic Routes:** `/[state]/[suburb]` (891 suburb SSG), `/services/[service]/[state]/[city]` (157 service-city SSG)
- **Static Pages:** 38 static pages (home, services, about, contact, etc.)
- **Total Generated:** 1,086 pages
- **Admin Dashboard:** 3D bento grid, booking pipeline, gallery CMS, analytics
- **Customer Dashboard:** Bookings, payments, loyalty, reviews, cart
- **Data Layer:** In-memory store (`lib/data/store.ts`) — Prisma schema exists but not yet wired to database
- **API Layer:** API routes with validation and rate-limiting
- **Auth:** Middleware-based auth (needs hardening — see Audit)

---

## 3. 2026 Best Practices for This Project

### Next.js 16 Patterns
- **Explicit Caching:** Use `"use cache"` directive for opt-in caching. Dynamic code runs at request time by default.
- **Async Route APIs:** `params`, `searchParams`, `cookies()`, `headers()` must be awaited: `const params = await props.params`.
- **`proxy.ts` over `middleware.ts`:** Migrate auth middleware to `proxy.ts` for clear Node.js runtime boundary.
- **React Compiler:** Enable `reactCompiler: true` in next.config for automatic memoization.
- **Server Components:** Default to Server Components. Use `"use client"` only for interactive components.

### Security Priorities (from audit — score 61/100)
1. **Auth Hardening:** Protect `/admin` and `/dashboard` routes with proper authentication. No unprotected admin access.
2. **Security Headers:** Implement HSTS, X-Frame-Options, CSP, X-Content-Type-Options in `next.config.ts`.
3. **JSON-LD:** Add structured data to homepage for SEO.
4. **Sitemap:** Update `sitemap.ts` to include all 891 suburb pages dynamically.
5. **Component Optimization:** Reduce `"use client"` directives — move non-interactive components to Server Components.

### Booking Form Fix (Critical)
- **Issue:** Booking form doesn't submit to API (0% conversion).
- **Fix:** Wire form to Server Action or API route with proper validation, error handling, and success state.
- **Verification:** E2E test with Playwright after fix.

### Performance
- **SSR over SSG:** Consider migrating 891 suburb pages from SSG to SSR + cache for fresher content and faster builds.
- **Bundle Analysis:** Run `@next/bundle-analyzer` to identify oversized dependencies.
- **Image Optimization:** Configure `images.remotePatterns` and `images.localPatterns` per Next.js 16 security defaults.

---

## 4. Knowledge Management

### WikiLLM Integration
- **3-Layer Architecture:** Raw Sources → LLM-Maintained Wiki (`.wiki/`) → Schema (`.wiki/schema/`)
- **PathRAG:** Use relational path retrieval for deep semantic context over flat vector chunks.
- **Self-Healing:** Automated librarian workflow — repair wikilinks, bridge orphans, validate frontmatter.

### Nanochat SMLM
- **Integration:** `components/NanochatAssistant.tsx` — 1.9B parameter model for AI assistance.
- **Local Inference:** LM Studio for testing, GGUF quantization for edge deployment.

---

## 5. Tooling Standards

- **Formatting/Linting:** Biome for JS/TS (`biome check --write`). Ruff for Python (`ruff check --fix`).
- **Type Checking:** `tsc --noEmit` with strict mode.
- **Build:** `next build` — zero errors, zero warnings.
- **Testing:** Vitest for unit tests. Playwright for E2E.
- **Pre-Commit:** Secret scanning with `scripts/security_check.py`. No hardcoded credentials.

---

## 6. Project Context & Memory

### Supersession Log
| Date | Superseded | Replaced By | Reason |
|------|-----------|-------------|--------|
| 2026-04 | Next.js 14 implicit caching | Next.js 16 explicit `"use cache"` | Opt-in caching, predictable invalidation |
| 2026-04 | `middleware.ts` | `proxy.ts` (planned) | Clear Node.js runtime boundary |
| 2026-04 | Prettier + ESLint | Biome | 10-100× faster, unified tool |
| 2026-04 | All "use client" | Server Components default | SSR performance, reduced JS bundle |

### Active Priorities
- Fix booking form submission (0% conversion — critical revenue blocker)
- Add auth to `/admin` and `/dashboard` routes
- Implement security headers
- Add JSON-LD structured data to homepage
- Migrate from in-memory store to Prisma + SQLite/PostgreSQL
- Reduce `"use client"` components — audit each for actual interactivity need

---

*Maintained by Claude Code 2026 Agentic Engineering — updated April 2026*
