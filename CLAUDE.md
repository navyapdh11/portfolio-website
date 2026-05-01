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

## 4. 2026 Best Practices Applied

### UX/UI (2026)
- **Core Web Vitals Targets:** LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **WCAG 2.2 Compliance:** Visible focus indicators, color contrast (4.5:1 min), descriptive aria labels, keyboard navigation.
- **Human-Crafted Aesthetics:** Deliberately "handmade" visual design as trust signal. Avoid glassmorphism that reduces text contrast or novelty navigation.
- **Accessibility:** Semantic HTML landmarks, skip links, `prefers-reduced-motion`, screen-reader-friendly forms.
- **Performance:** Dynamic imports for admin/3D, SSG for public pages, ISR for data-driven routes.

### SEO (2026)
- **E-E-A-T:** Author bios, service expertise, customer testimonials.
- **Structured Data (JSON-LD):** `LocalBusiness`, `Service`, `FAQPage`, `Article`, `BreadcrumbList` — validated via Google Rich Results Test.
- **Technical SEO:** XML sitemap, robots.txt, canonical URLs, mobile-first, unique `<title>` + `<meta description>` per page.
- **Content:** Location-specific suburb/service pages with unique content. Topic clusters around services + locations.

### AEO (Answer Engine Optimization)
- **Featured Snippets:** Opening definitions (40-60 words) on service/suburb pages. Q&A formatting with FAQ schema.
- **Voice Search:** Conversational phrasing for "best X near me" and "how much does Y cost in Z suburb".
- **FAQ Schema:** `FAQPage` JSON-LD with complete standalone answers.

### GEO (Generative Engine Optimization)
- **LLM Visibility:** Factual authority, data-backed claims, verified authorship, provenance chains.
- **Content Structure:** H1 → H2 → H3 hierarchy, concise opening definitions, bulleted lists, comparison tables.
- **AI Crawler Access:** `robots.txt` allows `GPTBot`, `ClaudeBot`, `PerplexityBot`. Content in initial HTML.
- **Brand Authority:** Original data-backed content over volume. Human editorial oversight on all public content.

### AI Integration (2026)
- **Server-Side AI:** LLM calls via API routes/server actions. Never expose keys client-side.
- **Streaming:** Use streaming for conversational UI. Graceful fallback on API failure.
- **Content Generation:** AI-assisted with human editorial oversight. Search engines penalize unreviewed AI content.

### Agentic Integration (2026)
- **Multi-Agent Orchestration:** Coordinator → Specialists → Verifier. Parallel execution for independent work.
- **Agentic Safety:** Least-privilege, sandboxed code, approval gates for destructive actions.
- **API-First:** All functionality via API. Structured JSON outputs with defined schemas.
- **Dual-Interface:** Serve both human users and autonomous AI agents. Semantic HTML, structured data.

---

## 5. Knowledge Management (WikiLLM)
- **3-Layer Architecture:** Raw Sources → `.wiki/` → `.wiki/schema/`.
- **PathRAG:** Relational retrieval for deep context.
- **Self-Healing:** Librarian workflow (repair links, orphans).

---

## 6. Skills & Capabilities (2026)

### AI Engineering Skill Triggers
Use the `!` prefix to invoke specialized skills as direct commands: `!<skill-name> <parameters>`.

| Skill | Trigger | Purpose |
|-------|---------|---------|
| Skill Creator | `!skill-creator` | Create/update specialized agent skills |
| WikiLLM Librarian | `!wikillm-librarian` | Self-heal wiki, bridge orphans, validate structure |
| Linter Agent | `!linter-agent` | Automated linting & Biome/Ruff formatting |
| NanoChat Optimizer | `!nanochat-optimizer` | Optimize/train SMLM models |
| Render Deploy | `!render-deploy` | Deploy services to Render infrastructure |
| Review | `!review` | Code review for security, quality, performance |

### UX/UI Engineering
- **WCAG 2.2 (ISO 40500:2025):** 9 new success criteria over 2.1 — focus appearance, drag gestures, target size (44×44px min), redundant input, accessible authentication, cognitive accessibility, mobile accessibility.
- **Core Web Vitals:** LCP < 2.5s (image compression, CDN, SSR, critical CSS), INP < 200ms (code splitting, web workers, debounced handlers, CSS containment), CLS < 0.1 (reserve space, avoid above-content insertion, CSS View Transitions).
- **Human-Crafted Aesthetics:** Deliberately "handmade" (non-AI-generated) visual design as primary trust signal for AI-fatigued users.
- **Visual Anti-Patterns:** Avoid glassmorphism reducing text contrast, animated backgrounds behind content, novelty navigation replacing established conventions.
- **Input-Agnostic Design:** Simultaneous support for mouse, keyboard, touch, voice input.
- **AI-Integrated UX:** Clear capability signaling, context-aware prompt suggestions, direct scannable answers, human escalation paths. Minimize AI chit-chat, maximize utility.
- **AI as Co-User:** Dual-interface — semantic HTML, ARIA labels, structured data, machine-readable + human-readable interaction patterns.
- **Accessibility Foundations:** Perceivable, Operable, Understandable, Robust. Skip links, `prefers-reduced-motion`, high contrast, screen-reader forms.
- **Responsive Imagery:** `<picture>` element + SVGs, `srcSet` and `sizes` attributes.
- **Theming:** Auto OS/browser preference adaptation (dark/light, reduced motion, high contrast).
- **Internationalization (i18n):** Multi-language prep, LTR/RTL writing modes, locale-specific formatting.
- **Design System:** Micro-layouts as reusable, context-agnostic primitives.

### SEO Engineering
- **E-E-A-T:** Experience, Expertise, Authoritativeness, Trustworthiness. Author bios, credentials, citations, external links.
- **People-First Content:** Unique, well-organized, regularly updated content solving user problems. Focus on searcher intent over keyword density.
- **Structured Data (JSON-LD):** `LocalBusiness`, `Service`, `FAQPage`, `QAPage`, `Article`, `BreadcrumbList`, `Organization` — validated via Google Rich Results Test.
- **Technical SEO:** Mobile-first indexing, CSS/JS accessibility for crawlers, descriptive URLs, `rel="canonical"` or 301 redirects, XML sitemaps, `robots.txt` + `noindex` control.
- **Metadata:** Concise, unique page titles and meta descriptions. `<meta name="keywords">` ignored.
- **Content Freshness:** Publication dates, update logs, canonical URLs. LLM recency checks favor fresh, versioned content.
- **Internal Linking:** Descriptive anchor text, logical site architecture, topic clusters.
- **Backlinks:** Data-backed claims, primary source citations increase citation probability.
- **E-Commerce SEO:** Product variants, merchant return/shipping policies, loyalty program schema.

### AEO (Answer Engine Optimization)
- **Featured Snippets:** Direct-answer formatting, clear hierarchical headings, concise opening definitions (40-60 words optimal), bulleted lists. Align with LLM retrieval/extraction patterns.
- **Question-Answer Structure:** Explicit Q&A matching natural conversational queries. Target "who, what, where, when, why, how" patterns.
- **Voice Search:** Conversational phrasing, full questions (not keyword fragments), long-tail multi-turn queries ("best X for Y near me that does Z"), local intent optimization.
- **FAQ Schema:** `FAQPage` JSON-LD — each FAQ is complete, standalone answer.
- **QA Schema:** `QAPage` for community Q&A — increases AI answer extraction eligibility.
- **How-To Schema:** `HowTo` with step-by-step instructions for procedural content.
- **Speakable Schema:** For text-to-speech playback content.
- **Entity Relationships:** Define clear what-is, how-to, comparison, pros-cons relationships for AI answer extraction.

### GEO (Generative Engine Optimization)
- **Factual Authority:** Data-backed claims, primary source citations, verified expert authorship. Increases LLM trust and citation probability.
- **Provenance Chain:** Clear authorship, publication dates, update history, external citations. LLMs favor verifiable provenance.
- **Anti-Hallucination Signals:** Explicit confidence markers, verifiable external links, avoid ambiguous phrasing. Reduces LLM content filtering.
- **Content Structure:** H1→H2→H3 hierarchy with semantic meaning, concise opening definitions (LLMs extract for answer generation), bulleted lists, comparison tables (side-by-side with explicit criteria).
- **AI Crawler Access:** Allow `GPTBot`, `ClaudeBot`, `PerplexityBot` in `robots.txt`. Blocking reduces generative engine visibility.
- **Clean Text:** Minimal ad clutter, clear content hierarchy. LLMs parse cleaner text from uncluttered pages.
- **SSR Over CSR:** Ensure content in initial HTML. Heavy client-side rendering prevents clean text extraction.
- **Originality Over Volume:** One authoritative, data-backed article outperforms ten thin articles.
- **Human Oversight:** Strict editorial oversight for accuracy, contextual alignment, genuine value. Search engines penalize formulaic AI-generated content.
- **Brand Personality:** Preserve distinct brand voice. Prevent homogenized, robotic tone that AI fatigue rejects.
- **Expert Authorship:** Named authors with verifiable credentials increase content trust signals.

### AI Integration
- **Server-Side AI:** LLM calls via API routes/server actions. Never expose keys client-side. Protect keys, control rate limiting.
- **Streaming Responses:** `stream: true` for conversational UI. Improves perceived latency and user engagement.
- **Context Window Management:** Conversation history truncation, sliding window context, summary-based compression for long conversations.
- **Fallback Patterns:** Graceful degradation on LLM API unavailability — cached responses, error states, offline functionality.
- **Content Generation:** AI-assisted with human editorial oversight. Search engines penalize unreviewed AI content.
- **Personalization:** Behavior-driven using interaction history, preferences, context. Balance AI automation with human editing.
- **Semantic Search:** Vector embeddings for query/content semantic matching beyond keyword search.
- **Automated Summarization:** Generate summaries, metadata, tags, categorization from existing content.
- **SMLM (Small Language Models):** Flash Attention 3, RoPE, Sliding-Window KV Caching. Muon optimizer. GRPO for reasoning alignment.
- **Local Inference:** LM Studio for local testing, quantized models (GGUF) for edge deployment.
- **Efficiency:** "No-Abstraction" PyTorch/Rust logic. Minimize redundant forward passes.
- **OWASP LLM Top 10:** Prompt injection prevention, output validation, least-privilege plugin design.

### Agentic Integration
- **Multi-Agent Orchestration:** Hierarchical pattern — Coordinator decomposes tasks, assigns to Specialists, Verifier validates. Parallel execution for independent work. Background execution for genuinely independent tasks.
- **Autonomous Workflows:** AI agents handle purchasing, scheduling, negotiation, data analysis. Align with actual economic workflows and user expectations.
- **Long-Running Processes:** Architecture supports extended AI processes for scientific computing, code modernization, enterprise workflows.
- **Scalable Oversight:** Automated alignment — LLMs monitor other AI processes for quality and safety.
- **Conflict Resolution:** Coordinator resolves agent conflicts by preferring most recent authoritative source.
- **Constitutional Classifiers:** Filter jailbreaks and unsafe prompts. Ensure agents remain secure during complex interactions.
- **Predictable Behavior:** Agents behave predictably and safely in production. Approval gates for destructive actions.
- **Least-Privilege Execution:** Minimum necessary access. No system-level modifications without user approval.
- **Sandboxed Execution:** Isolated environments. No network calls to unverified endpoints.
- **Frontier Safety:** Red teaming for autonomous system security implications — cybersecurity, biosecurity, data integrity.
- **API-First Design:** All functionality via API enables agent interaction. Structured JSON outputs with defined schemas.
- **Rate Limiting & Quotas:** Protect resources from abusive agent patterns. Monitor for unusual activity.
- **Audit Trails:** Log all agent actions for accountability, debugging, compliance.
- **Workflow Boundaries:** Clear boundaries for agent autonomy — what agents do independently vs. requiring human approval.

### Video Engineering (Remotion)
- **Programmatic Video:** React components mapped to video assets via Remotion.
- **Data-Driven Marketing:** Automated video generation from CMS content, testimonials, portfolio showcases.

### Global Architectural Expansion
- **China Patterns:** Bento Grid UIs, AI-Integrated mini-program workflows, sovereign infrastructure (PIPL compliance, local-first).
- **India Patterns:** Vernacular AI (multi-language), ONDC/Account Aggregator agents, GCC-style automated workflows.
- **Sovereign Data:** PIPL/local-first architecture, domestic vector DBs.

---

## 7. Supersession Log

| Date | Superseded | Replaced By | Reason |
|------|-----------|-------------|--------|
| 2026-04 | Next.js 14 caching | Next.js 16 `"use cache"` | Opt-in, predictable invalidation |
| 2026-04 | `middleware.ts` | `proxy.ts` | Clear Node.js runtime boundary |
| 2026-04 | Prettier + ESLint | Biome | Unified, 10–100× faster tool |
| 2026-04 | Manual `useMemo`/`useCallback` | React Compiler auto-memoization | Zero manual code changes |
| 2026-04 | Implicit UX guidelines | WCAG 2.2, Core Web Vitals, AI-Integrated UX | WCAG 2.2 (ISO 40500:2025), INP < 200ms, anti-AI-fatigue design |
| 2026-04 | Basic SEO | E-E-A-T, AEO, GEO | AI-overview optimization, provenance chains, AI crawler access |
| 2026-04 | No AI/agentic standards | Server-side AI, multi-agent orchestration | Safe LLM integration, hierarchical agents, API-first |

---

*Maintained by Claude Code 2026 Agentic Engineering — updated April 2026*
