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

## 5. Tooling Standards (2026)

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

---

*Maintained by Gemini CLI 2026 Agentic Suite — updated April 2026*
