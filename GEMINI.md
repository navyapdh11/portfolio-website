# Gemini CLI — AASTACLEAN Portfolio: 2026 AI-Native Enterprise Standards

> **Project:** AASTACLEAN Portfolio Website | **Deploy:** https://portfolio-website-perth-tea.vercel.app | **Repo:** https://github.com/navyapdh11/portfolio-website

---

This project operates at **2026 AI-Native Enterprise Grade** standards.

## 1. AI-Native Architecture (Centaur Model)

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

## 2. Global Web Architecture (2026)

### China Patterns
- **Modular UI:** Bento Grid design system for information density.
- **AI-Integrated Apps:** Native AI agents in mini-program ecosystems.
- **Sovereign Infrastructure:** Local-first architecture (PIPL compliance, domestic vector DBs).

### India Patterns
- **Agentic Frameworks:** LangGraph/CrewAI for enterprise automation.
- **Vernacular AI:** Sarvam-inspired sovereign models for multi-language support.
- **Public Digital Infrastructure:** ONDC/Account Aggregator agents for real-time logistics and finance.

---

## 3. Shift-Left Security (2026 OWASP Standards)

### Automated Gates
- **Pre-Commit:** Secret scanning (gitleaks). No hardcoded credentials.
- **SBOM:** Automated Software Bill of Materials for all projects.
- **OWASP LLM Top 10:** Apply prompt injection prevention, output validation, least-privilege plugin design for all AI features.

### Web Security (OWASP 2025/2026)
- **Auth:** Role-based access control. No unprotected admin/dashboard routes.
- **Headers:** HSTS, X-Frame-Options, CSP, X-Content-Type-Options.
- **Input Validation:** Parameterized queries. CSP headers. Rate limiting.
- **Secrets:** Zero committed credentials. `.env.local` for dev, Vercel Env Vars for prod.

---

## 4. Performance & Optimization (2026 Standards)

### Next.js 16 Engine
- **Turbopack:** Default bundler. 2–5× faster production builds, up to 10× faster Fast Refresh.
- **Explicit Caching:** `"use cache"` directive for opt-in caching. SWR with `revalidateTag(tag, cacheLifeProfile)`.
- **React Compiler:** `reactCompiler: true` — automatic memoization, zero manual `useMemo`/`useCallback`.
- **Server Components:** Default to RSC. `"use client"` only for interactive components.

---

## 5. UX/UI, SEO, AI & Agentic Standards (2026)

### UX/UI (WCAG 2.2 / Core Web Vitals)
- **WCAG 2.2 (ISO 40500:2025):** Visible focus indicators, color contrast (4.5:1 min), descriptive aria labels, keyboard navigation, `prefers-reduced-motion`.
- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **Human-Crafted Aesthetics:** Deliberately "handmade" visual design as trust signal for AI-fatigued users. Avoid glassmorphism reducing text contrast, novelty navigation.
- **AI-Integrated UX:** Clear capability signaling, direct answers over dialogue, context-aware suggestions, human escalation paths.
- **AI as Co-User:** Dual-interface design — semantic HTML, structured data, machine-readable interactions.

### SEO (E-E-A-T + Technical)
- **E-E-A-T:** Author bios, service expertise, customer testimonials, external citations.
- **Structured Data:** `LocalBusiness`, `Service`, `FAQPage`, `Article`, `BreadcrumbList` — validated via Google Rich Results Test.
- **Technical:** XML sitemap, robots.txt, canonical URLs, mobile-first, unique `<title>` + `<meta description>` per page.
- **Content:** Location-specific pages with unique content. Topic clusters around services + locations.

### AEO (Answer Engine Optimization)
- **Featured Snippets:** Opening definitions (40-60 words) on service/suburb pages. Q&A formatting.
- **Voice Search:** Conversational phrasing for "best X near me" and cost queries.
- **FAQ Schema:** `FAQPage` JSON-LD with complete standalone answers.

### GEO (Generative Engine Optimization)
- **LLM Visibility:** Factual authority, data-backed claims, verified authorship, provenance chains.
- **Content Structure:** H1→H2→H3 hierarchy, concise opening definitions, bulleted lists, comparison tables.
- **AI Crawler Access:** `robots.txt` allows `GPTBot`, `ClaudeBot`, `PerplexityBot`. Content in initial HTML.
- **Brand Authority:** Original data-backed content over volume. Human editorial oversight.

### AI Integration
- **Server-Side:** LLM calls via API routes/server actions. Never expose keys client-side.
- **Streaming:** Streaming responses for conversational UI. Graceful fallback on failure.
- **Content Generation:** AI-assisted with human editorial oversight. Search engines penalize unreviewed AI content.
- **SMLM:** Flash Attention 3, RoPE, Sliding-Window KV Cache. Muon optimizer. GRPO for reasoning.

### DeepSeek V4 Optimizer
- **Architecture:** 671B total parameters, 37B activated per token via DeepSeekMoE (256 experts). Multi-head Latent Attention (MLA) for efficient context modeling.
- **FP8 Mixed Precision:** Native FP8 weights with BF16 fallback. W8A8 quantization for inference acceleration.
- **Multi-Token Prediction (MTP):** Enables speculative decoding for 2-3× faster inference. Improves training signal density.
- **Auxiliary-Loss-Free Load Balancing:** MoE expert routing without auxiliary loss penalties.
- **Integration:** Use `deepseek-v4-flash` for rapid inference (content generation, extraction). Use `deepseek-v4-pro` for complex reasoning (architecture decisions, security analysis). Enable `thinking` mode for multi-step tasks. Stream responses (`stream: true`).
- **Context Management:** Sliding window + summary compression. Truncate history while preserving semantic continuity.
- **Safety:** Validate all LLM outputs before downstream execution. Request confidence markers for critical decisions.

### Agentic Integration
- **Multi-Agent Orchestration:** Coordinator → Specialists → Verifier. Parallel execution for independent work.
- **Agentic Safety:** Least-privilege, sandboxed code, approval gates for destructive actions.
- **API-First:** All functionality via API. Structured JSON outputs with defined schemas.

---

## 6. Tooling Standards (2026)

- **JS/TS Formatting & Linting:** Biome. 10–100× faster. Flat config format.
- **Python:** Ruff. Unified formatter + linter.
- **TypeScript:** `tsc --noEmit` strict mode. No `any` without justification.
- **Testing:** Vitest (unit), Playwright (E2E). 80%+ coverage for business logic.

---

## 6. Supersession Log

| Date | Superseded | Replaced By | Reason |
|------|-----------|-------------|--------|
| 2026-04 | Next.js 14 implicit caching | Next.js 16 explicit `"use cache"` | Opt-in caching, predictable invalidation |
| 2026-04 | `middleware.ts` | `proxy.ts` | Clear Node.js runtime boundary |
| 2026-04 | Prettier + ESLint | Biome | 10–100× faster, unified tool |
| 2026-04 | Manual `useMemo`/`useCallback` | React Compiler auto-memoization | Zero manual code changes |
| 2026-04 | Implicit UX guidelines | WCAG 2.2, Core Web Vitals, human-crafted aesthetics | WCAG 2.2 (ISO 40500:2025), INP < 200ms, anti-AI-fatigue design |
| 2026-04 | Basic SEO | E-E-A-T, AEO, GEO | AI-overview optimization, provenance chains, AI crawler access |
| 2026-04 | No AI/agentic standards | Server-side AI, multi-agent orchestration | Safe LLM integration, hierarchical agents, API-first |

---

*Maintained by Gemini CLI 2026 Agentic Suite — updated April 2026*
