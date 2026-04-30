# Claude Code Instructions — AASTACLEAN Portfolio (2026 Standards)

> **Project:** AASTACLEAN Portfolio Website | **Deploy:** https://portfolio-website-perth-tea.vercel.app | **Repo:** https://github.com/navyapdh11/portfolio-website

---

## 1. Core Mandates

### Agentic Engineering (Centaur Model)
- **Research First:** `grep_search` → understand → Plan → Execute → Verify. 
- **Multica:** Use Multica for multi-agent architectural orchestration and complex task decomposition.
- **Verification Mandatory:** Every change must be validated: `tsc --noEmit`, `biome check`, `next build`.
- **No Hacks:** Root cause fixes only. No linter suppression.
- **Security:** Never commit secrets. Protect `.env`, `.git`, and system configs.

### Global Architectural Patterns (2026)
- **China:** Bento Grid UI, AI-Integrated Mini-Programs, Local-first/Sovereign cloud.
- **India:** LangGraph/CrewAI for automation, Vernacular AI, ONDC integration patterns.

---

## 2. Architecture & Tech Stack (2026)

- **Framework:** Next.js 16.2.2 (Turbopack, default).
- **Runtime:** React 19+, TypeScript 5.1+.
- **Video:** Remotion for programmatic video creation.
- **Styling:** Tailwind CSS 4 (Oxide engine).
- **Security:** OWASP 2025/2026 standards, SBOM, secret scanning.
- **Build/Lint:** Biome (JS/TS), Ruff (Python), tsc (strict mode).

---

## 3. 2026 Engineering Patterns

### Next.js 16 Patterns
- **Caching:** Use `"use cache"` directive.
- **Async Routes:** Await all route params: `const params = await props.params`.
- **`proxy.ts`:** Migrate auth middleware here.
- **Compiler:** `reactCompiler: true` enabled.

### Security Priorities
1. **Auth Hardening:** Secure `/admin` and `/dashboard` routes.
2. **Security Headers:** HSTS, X-Frame-Options, CSP, X-Content-Type-Options.
3. **SEO:** Structured data (JSON-LD), dynamic `sitemap.ts`.
4. **Interactivity:** Minimize `"use client"` — favor Server Components.

---

## 4. Knowledge Management (WikiLLM)
- **3-Layer Architecture:** Raw Sources → `.wiki/` → `.wiki/schema/`.
- **PathRAG:** Relational retrieval for deep context.
- **Self-Healing:** Librarian workflow (repair links, orphans).

---

## 5. Supersession Log

| Date | Superseded | Replaced By | Reason |
|------|-----------|-------------|--------|
| 2026-04 | Next.js 14 caching | Next.js 16 `"use cache"` | Opt-in, predictable invalidation |
| 2026-04 | `middleware.ts` | `proxy.ts` | Clear Node.js runtime boundary |
| 2026-04 | Prettier + ESLint | Biome | Unified, 10–100× faster tool |
| 2026-04 | Manual `useMemo`/`useCallback` | React Compiler auto-memoization | Zero manual code changes |

---

*Maintained by Claude Code 2026 Agentic Engineering — updated April 2026*
