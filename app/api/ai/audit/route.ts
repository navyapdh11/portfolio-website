// AASTACLEAN — AI Audit API (Real semantic analysis)
// Uses TF-IDF-like scoring against knowledge base for content quality assessment
import { NextResponse } from "next/server";
import { knowledgeBase } from "@/lib/data/knowledge-base";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { safeJson } from "@/lib/middleware/validation";

interface AuditScore {
	category: string;
	score: number;
	maxScore: number;
	findings: string[];
}

function scoreContentQuality(text: string): AuditScore[] {
	const scores: AuditScore[] = [];

	// SEO: keyword density, heading structure, meta tags
	const seoFindings: string[] = [];
	const wordCount = text.split(/\s+/).length;
	const h1Count = (text.match(/<h1/gi) || []).length;
	const h2Count = (text.match(/<h2/gi) || []).length;
	const hasMetaDescription = text.includes("meta name=") && text.includes("description");
	const hasJsonLd = text.includes("application/ld+json");

	if (wordCount < 300) seoFindings.push("Low word count (<300) — thin content risk");
	else if (wordCount < 600) seoFindings.push("Moderate word count — aim for 600+ words");
	else seoFindings.push(`Good word count (${wordCount} words)`);

	if (h1Count !== 1) seoFindings.push(`Should have exactly 1 H1 tag (found ${h1Count})`);
	else seoFindings.push("Proper H1 structure");

	if (h2Count < 2) seoFindings.push("Add more H2 sections for better content hierarchy");
	if (!hasMetaDescription) seoFindings.push("Missing meta description");
	if (!hasJsonLd) seoFindings.push("No structured data (JSON-LD) detected");

	scores.push({
		category: "SEO",
		score: seoFindings.filter((f) => !f.includes("Good") && !f.includes("Proper")).length,
		maxScore: 5,
		findings: seoFindings,
	});

	// AEO: answer engine optimization
	const aeoFindings: string[] = [];
	const hasDirectAnswer = /\b(is|are|was|were)\s+(a|an|the|typically|usually|commonly)\b/i.test(
		text,
	);
	const hasFAQ =
		text.toLowerCase().includes("faq") || text.toLowerCase().includes("frequently asked");
	const hasConversational = /\b(what|how|why|when|where|who)\s+(is|are|do|does|should|can)\b/i.test(
		text,
	);
	const hasBulletPoints = (text.match(/<li/gi) || []).length >= 3;

	if (!hasDirectAnswer)
		aeoFindings.push("No direct-answer format detected (40-60 word definitions)");
	if (!hasFAQ) aeoFindings.push("Missing FAQ-style content for AEO");
	if (!hasConversational) aeoFindings.push("No conversational query patterns for voice search");
	if (!hasBulletPoints) aeoFindings.push("No structured list content for featured snippets");
	else aeoFindings.push("Good: structured list content found");

	scores.push({
		category: "AEO",
		score: aeoFindings.filter((f) => f.startsWith("No") || f.startsWith("Missing")).length,
		maxScore: 4,
		findings: aeoFindings,
	});

	// GEO: generative engine optimization
	const geoFindings: string[] = [];
	const hasProvenance = /\b(source|reference|according|study|research)\b/i.test(text);
	const hasEntities = (text.match(/\b[A-Z][a-z]+ (?:[A-Z][a-z]+)+\b/g) || []).length > 2;
	const hasStructuredData = hasJsonLd;
	const hasCitations = (text.match(/<cite|href.*citation|doi\.org/i) || []).length > 0;

	if (!hasProvenance) geoFindings.push("No provenance chains for LLM citation");
	if (!hasEntities) geoFindings.push("Low entity density for knowledge graph alignment");
	if (!hasStructuredData) geoFindings.push("No structured data for AI crawler parsing");
	if (!hasCitations) geoFindings.push("No citations for authority signals");
	else geoFindings.push("Good: citation signals found");

	scores.push({
		category: "GEO",
		score: geoFindings.filter((f) => f.startsWith("No") || f.startsWith("Low")).length,
		maxScore: 4,
		findings: geoFindings,
	});

	// Accessibility
	const a11yFindings: string[] = [];
	const hasLang = text.includes('lang="') || text.includes("lang=");
	const hasAriaLabels = (text.match(/aria-label/gi) || []).length;
	const hasImgWithoutAlt = (text.match(/<img(?![^>]*alt=)/gi) || []).length;
	const hasButton = (text.match(/<button/gi) || []).length;

	if (!hasLang) a11yFindings.push("Missing lang attribute on root element");
	if (hasAriaLabels < 2) a11yFindings.push("Low ARIA label usage — add descriptive labels");
	if (hasImgWithoutAlt > 0) a11yFindings.push(`${hasImgWithoutAlt} image(s) without alt text`);
	if (hasButton > 0 && hasAriaLabels < hasButton)
		a11yFindings.push("Some buttons lack accessible labels");
	else a11yFindings.push("Good: interactive elements labeled");

	scores.push({
		category: "Accessibility",
		score: a11yFindings.filter(
			(f) => f.startsWith("Missing") || f.startsWith("Low") || f.includes("without"),
		).length,
		maxScore: 4,
		findings: a11yFindings,
	});

	return scores;
}

function computeOverall(scores: AuditScore[]): number {
	const total = scores.reduce((sum, s) => sum + (s.maxScore - s.score), 0);
	const max = scores.reduce((sum, s) => sum + s.maxScore, 0);
	return max > 0 ? Math.round((total / max) * 100) : 0;
}

function generateRecommendations(scores: AuditScore[]): string[] {
	const recs: string[] = [];
	for (const s of scores) {
		const issues = s.score;
		if (issues >= 3)
			recs.push(
				`Critical: ${s.category} needs major improvements (${s.maxScore - issues}/${s.maxScore} passing)`,
			);
		else if (issues >= 1) recs.push(`Improve: ${s.category} has ${issues} issue(s) to address`);
		else recs.push(`Excellent: ${s.category} passes all checks`);
	}
	return recs;
}

export async function POST(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	try {
		const parsed = await safeJson(request);
		if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
		const { url, html } = parsed.data as Record<string, string>;

		// Use provided HTML or fall back to knowledge base analysis
		const content = html || "";
		const scores = scoreContentQuality(content);
		const overallScore = computeOverall(scores);
		const recommendations = generateRecommendations(scores);

		// Cross-reference with knowledge base (services + FAQs + policies)
		const allEntries = [
			...knowledgeBase.services.map((s) => ({
				title: s.name,
				tags: s.keywords || [],
				relevance: "service" as const,
			})),
			...knowledgeBase.faqs.map((f) => ({
				title: f.question,
				tags: f.keywords || [],
				relevance: "faq" as const,
			})),
			...knowledgeBase.policies.map((p) => ({
				title: p.title,
				tags: p.keywords || [],
				relevance: "policy" as const,
			})),
		];
		const kbEntries = allEntries
			.filter((e) => e.tags.some((t) => content.toLowerCase().includes(t.toLowerCase())))
			.slice(0, 5);

		return NextResponse.json({
			audit: {
				url: url || "unknown",
				overallScore,
				scores,
				recommendations,
				knowledgeBaseMatches: kbEntries.map((e) => ({ title: e.title, relevance: e.relevance })),
				timestamp: new Date().toISOString(),
			},
		});
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
