# Gemini CLI — AASTACLEAN Portfolio: 2026 Enterprise Standards

> **Project:** AASTACLEAN Portfolio Website | **Deploy:** https://portfolio-website-perth-tea.vercel.app | **Repo:** https://github.com/navyapdh11/portfolio-website

---

This project operates at **2026 AI-Native Enterprise Grade** standards.

## 1. AI-Native Architecture

### Agentic Integration
- **Nanochat SMLM (1.9B):** Integrated via `components/NanochatAssistant.tsx`. Local inference via LM Studio (GGUF quantized).
- **Knowledge Management:** WikiLLM 3-Layer Architecture active in `.wiki/` — Raw Sources → Curated Wiki → Schema.
- **Retrieval:** PathRAG relational mapping defined in `.wiki/schema/00_SCHEMA.md`. Deep semantic context over flat vector chunks.
- **Self-Healing Wiki:** Automated librarian — repair `[[wikilinks]]`, bridge orphans, validate YAML frontmatter.

### SMLM Engineering Standards
- **Architecture:** Flash Attention 3, RoPE, Sliding-Window KV Caching.
- **Optimizers:** Muon for convergence, GRPO for reasoning alignment.
- **Training Data:** FineWeb-EDU, SmolTalk. Parquet for efficient storage.
- **Efficiency:** "No-Abstraction" PyTorch/Rust logic. Minimize redundant forward passes.

---

## 2. Shift-Left Security

### Automated Gates
- **Pre-Commit:** `scripts/security_check.py` — secret detection, dependency supply-chain auditing.
- **SBOM:** Automated Software Bill of Materials for all projects.
- **OWASP LLM Top 10:** Apply prompt injection prevention, output validation, least-privilege plugin design for all AI features.

### Web Security (OWASP 2025/2026)
- **Auth:** Role-based access control. No unprotected admin/dashboard routes.
- **Headers:** HSTS, X-Frame-Options, CSP, X-Content-Type-Options.
- **Input Validation:** Parameterized queries. CSP headers. Rate limiting.
- **Secrets:** Zero committed credentials. `.env.local` for dev, Vercel Env Vars for prod.

---

## 3. Performance & Optimization (GreenOps)

### Next.js 16 Engine
- **Turbopack:** Default bundler. 2–5× faster production builds, up to 10× faster Fast Refresh.
- **Explicit Caching:** `"use cache"` directive for opt-in caching. SWR with `revalidateTag(tag, cacheLifeProfile)`.
- **React Compiler:** `reactCompiler: true` — automatic memoization, zero manual `useMemo`/`useCallback`.
- **Server Components:** Default to RSC. `"use client"` only for interactive components.

### Compute Efficiency
- **SSR over SSG:** Prefer SSR + caching over massive SSG (1,086 pages). Reduces build time, stale content.
- **Bundle Optimization:** Code splitting, dynamic imports, tree shaking. Monitor with `@next/bundle-analyzer`.
- **Image Security:** `images.remotePatterns` replaces `images.domains`. `images.localPatterns` required for local sources.
- **Token Throughput:** Optimize for low-entropy token usage in agentic workflows. Minimize redundant renders.

### Styling
- **Tailwind CSS 4:** Oxide engine. CSS-first configuration. Native utilities for text shadows, masks.
- **3D:** Three.js + @react-three/fiber + drei for interactive experiences.
- **Animations:** Framer Motion for transitions. View Transitions via React 19.2.

---

## 4. UX/UI Refinement

- **Glassmorphism:** Enhanced backdrop-blur and glass effects in `Navbar.tsx`.
- **AI-First Navigation:** Unified AI Librarian search bar integrated into core navigation.
- **Interactive Feedback:** Real-time quality scoring in Microtasks Hub.
- **3D Bento Grid:** Tilt effects + glassmorphism in admin dashboard.

---

## 5. Tooling Standards (2026)

- **JS/TS Formatting & Linting:** Biome (replacing Prettier + ESLint). 10-100× faster. Flat config format.
- **Python:** Ruff (replacing flake8, isort, pyupgrade). Unified formatter + linter.
- **TypeScript:** `tsc --noEmit` strict mode. No `any` without justification.
- **Testing:** Vitest for unit tests. Playwright for E2E. 80%+ coverage for business logic.
- **Build:** `next build` — zero errors, zero warnings.

---

## 6. Supersession Log

| Date | Superseded | Replaced By | Reason |
|------|-----------|-------------|--------|
| 2026-04 | Next.js 14 implicit caching | Next.js 16 explicit `"use cache"` | Opt-in caching, predictable invalidation |
| 2026-04 | `middleware.ts` | `proxy.ts` (planned) | Clear Node.js runtime boundary |
| 2026-04 | Prettier + ESLint | Biome | 10-100× faster, unified tool |
| 2026-04 | Manual `useMemo`/`useCallback` | React Compiler auto-memoization | Zero manual code changes |
| 2026-04 | Flat vector RAG | PathRAG relational | Deep semantic context over flat chunks |
| 2026-04 | `images.domains` | `images.remotePatterns` | Stricter domain validation |

---

*Maintained by Gemini CLI 2026 Agentic Suite — updated April 2026*
