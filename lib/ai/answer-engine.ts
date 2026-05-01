// AASTACLEAN Answer Engine — lightweight retrieval + answer generation
// Uses tokenization, stop-word removal, and TF-IDF-like keyword overlap scoring

import { knowledgeBase } from "../data/knowledge-base";

// ---------------------------------------------------------------------------
// Stop words — removed during tokenization
// ---------------------------------------------------------------------------
const STOP_WORDS = new Set([
	"a",
	"an",
	"the",
	"is",
	"are",
	"was",
	"were",
	"be",
	"been",
	"being",
	"do",
	"does",
	"did",
	"will",
	"would",
	"could",
	"should",
	"may",
	"might",
	"shall",
	"can",
	"need",
	"must",
	"have",
	"has",
	"had",
	"having",
	"i",
	"you",
	"he",
	"she",
	"it",
	"we",
	"they",
	"me",
	"him",
	"her",
	"us",
	"them",
	"my",
	"your",
	"his",
	"its",
	"our",
	"their",
	"what",
	"which",
	"who",
	"whom",
	"whose",
	"where",
	"when",
	"why",
	"how",
	"this",
	"that",
	"these",
	"those",
	"and",
	"but",
	"or",
	"nor",
	"so",
	"yet",
	"both",
	"either",
	"neither",
	"not",
	"only",
	"own",
	"same",
	"than",
	"too",
	"very",
	"just",
	"about",
	"above",
	"below",
	"between",
	"into",
	"through",
	"during",
	"before",
	"after",
	"of",
	"at",
	"by",
	"for",
	"with",
	"from",
	"to",
	"on",
	"in",
	"up",
	"out",
	"if",
	"then",
	"else",
	"because",
	"as",
	"until",
	"while",
	"am",
	"also",
	"more",
	"most",
	"some",
	"any",
	"all",
	"each",
	"every",
	"much",
	"many",
	"such",
	"no",
	"never",
	"always",
	"often",
	"sometimes",
	"here",
	"there",
	"again",
	"further",
	"once",
	"now",
	"do",
	"does",
	"did",
	"don't",
	"doesn't",
	"didn't",
	"i'm",
	"you're",
	"he's",
	"she's",
	"it's",
	"we're",
	"they're",
	"i've",
	"you've",
	"we've",
	"they've",
	"i'll",
	"you'll",
	"he'll",
	"she'll",
	"we'll",
	"they'll",
	"i'd",
	"you'd",
	"he'd",
	"she'd",
	"we'd",
	"they'd",
	"let",
	"make",
	"get",
	"go",
	"like",
	"want",
	"please",
	"tell",
	"say",
	"could",
	"would",
	"should",
	"can",
	"will",
]);

// ---------------------------------------------------------------------------
// Tokenization
// ---------------------------------------------------------------------------
function tokenize(text: string): string[] {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s'-]/g, " ")
		.split(/\s+/)
		.filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

// ---------------------------------------------------------------------------
// Scoring — TF-IDF-like keyword overlap
// ---------------------------------------------------------------------------
interface ScoredResult {
	score: number;
	source: "service" | "faq" | "policy" | "booking" | "area" | "contact";
	snippet: string;
	label: string;
}

function scoreText(queryTokens: string[], targetText: string, keywords: string[] = []): number {
	if (queryTokens.length === 0) return 0;

	const targetTokens = tokenize(targetText);
	const keywordTokens = keywords.flatMap((k) => tokenize(k));

	// Combine target tokens with keyword tokens (keywords weighted higher)
	const allTokens = [...targetTokens, ...keywordTokens, ...keywordTokens];

	let matches = 0;
	for (const qt of queryTokens) {
		for (const tt of allTokens) {
			if (tt === qt || tt.startsWith(qt) || qt.startsWith(tt)) {
				matches++;
				break;
			}
		}
	}

	// BM25-like scoring: matches / queryTokens normalized
	return matches / queryTokens.length;
}

// ---------------------------------------------------------------------------
// Retrieval — search across all knowledge sources
// ---------------------------------------------------------------------------
export function retrieve(query: string, topK: number = 5): ScoredResult[] {
	const queryTokens = tokenize(query);
	if (queryTokens.length === 0) return [];

	const results: ScoredResult[] = [];

	// Score services
	for (const svc of knowledgeBase.services) {
		const text = `${svc.name} ${svc.description}`;
		const score = scoreText(queryTokens, text, svc.keywords);
		if (score > 0) {
			results.push({
				score,
				source: "service",
				snippet: svc.description,
				label: svc.name,
			});
		}
	}

	// Score FAQs
	for (const faq of knowledgeBase.faqs) {
		const text = `${faq.question} ${faq.answer}`;
		const score = scoreText(queryTokens, text, faq.keywords);
		if (score > 0) {
			results.push({
				score,
				source: "faq",
				snippet: faq.answer,
				label: faq.question,
			});
		}
	}

	// Score policies
	for (const policy of knowledgeBase.policies) {
		const text = `${policy.title} ${policy.description}`;
		const score = scoreText(queryTokens, text, policy.keywords);
		if (score > 0) {
			results.push({
				score,
				source: "policy",
				snippet: policy.description,
				label: policy.title,
			});
		}
	}

	// Score service areas
	for (const area of knowledgeBase.serviceAreas) {
		const text = `${area.state} ${area.cities.join(" ")}`;
		const score = scoreText(queryTokens, text, area.cities);
		if (score > 0) {
			results.push({
				score,
				source: "area",
				snippet: `We service ${area.state} including ${area.cities.slice(0, 5).join(", ")}.`,
				label: `${area.state} Service Area`,
			});
		}
	}

	// Score booking steps
	const bookingText = knowledgeBase.bookingSteps
		.map((s) => `${s.title}: ${s.description}`)
		.join(" ");
	const bookingScore = scoreText(queryTokens, bookingText, [
		"book",
		"booking",
		"schedule",
		"step",
		"process",
	]);
	if (bookingScore > 0) {
		results.push({
			score: bookingScore,
			source: "booking",
			snippet: bookingText,
			label: "Booking Process",
		});
	}

	// Score contact info
	const contactText = `${knowledgeBase.contactInfo.phone} ${knowledgeBase.contactInfo.email} ${knowledgeBase.contactInfo.hours}`;
	const contactScore = scoreText(queryTokens, contactText, [
		"contact",
		"phone",
		"email",
		"call",
		"reach",
		"hours",
	]);
	if (contactScore > 0) {
		results.push({
			score: contactScore,
			source: "contact",
			snippet: `Phone: ${knowledgeBase.contactInfo.phone}, Email: ${knowledgeBase.contactInfo.email}, Hours: ${knowledgeBase.contactInfo.hours}`,
			label: "Contact Information",
		});
	}

	// Sort by score descending, take top K
	results.sort((a, b) => b.score - a.score);
	return results.slice(0, topK);
}

// ---------------------------------------------------------------------------
// Answer Generation — synthesize results into natural language
// ---------------------------------------------------------------------------
export function generateAnswer(_query: string, results: ScoredResult[]): string {
	if (results.length === 0) {
		return "I'm not sure I have the specific information you're looking for. Could you try rephrasing your question? You can ask about our services, pricing, booking process, service areas, or company policies. You can also contact us directly at 1300 AASTACLEAN or hello@aastaclean.com.au.";
	}

	const parts: string[] = [];

	// Group results by source
	const bySource = new Map<string, ScoredResult[]>();
	for (const r of results) {
		if (!bySource.has(r.source)) bySource.set(r.source, []);
		bySource.get(r.source)?.push(r);
	}

	// Build answer from top results
	for (const result of results.slice(0, 3)) {
		switch (result.source) {
			case "service": {
				const svc = knowledgeBase.services.find((s) => s.name === result.label);
				if (svc) {
					parts.push(
						`${svc.icon} **${svc.name}**: ${svc.description} Pricing ranges from ${svc.priceRange}.`,
					);
				}
				break;
			}
			case "faq": {
				parts.push(result.snippet);
				break;
			}
			case "policy": {
				parts.push(`**${result.label}**: ${result.snippet}`);
				break;
			}
			case "area": {
				parts.push(result.snippet);
				break;
			}
			case "booking": {
				const steps = knowledgeBase.bookingSteps
					.map((s) => `**Step ${s.step}:** ${s.title} — ${s.description}`)
					.join("\n\n");
				parts.push(`Here's how booking works:\n\n${steps}`);
				break;
			}
			case "contact": {
				parts.push(
					`You can reach us at:\n📞 Phone: ${knowledgeBase.contactInfo.phone}\n📧 Email: ${knowledgeBase.contactInfo.email}\n🕐 Hours: ${knowledgeBase.contactInfo.hours}`,
				);
				break;
			}
		}
	}

	// Combine with natural transitions
	if (parts.length === 1) {
		return parts[0];
	}

	return parts.join("\n\n---\n\n");
}

// ---------------------------------------------------------------------------
// Related Questions — suggest follow-ups based on retrieved results
// ---------------------------------------------------------------------------
export function getRelatedQuestions(query: string, results: ScoredResult[]): string[] {
	const suggestions: string[] = [];
	const seen = new Set<string>();

	for (const result of results.slice(0, 3)) {
		// For service results, suggest pricing and booking
		if (result.source === "service") {
			const pricingQ = `How much does ${result.label} cost?`;
			const bookingQ = `How do I book ${result.label}?`;
			if (!seen.has(pricingQ)) {
				suggestions.push(pricingQ);
				seen.add(pricingQ);
			}
			if (!seen.has(bookingQ)) {
				suggestions.push(bookingQ);
				seen.add(bookingQ);
			}
		}

		// For FAQ results, suggest related FAQs from same category
		if (result.source === "faq") {
			const faq = knowledgeBase.faqs.find((f) => f.question === result.label);
			if (faq) {
				const sameCategory = knowledgeBase.faqs.filter(
					(f) => f.category === faq.category && f.id !== faq.id,
				);
				for (const related of sameCategory.slice(0, 2)) {
					if (!seen.has(related.question)) {
						suggestions.push(related.question);
						seen.add(related.question);
					}
				}
			}
		}

		// For area results, suggest services and booking
		if (result.source === "area") {
			const servicesQ = "What services do you offer?";
			if (!seen.has(servicesQ)) {
				suggestions.push(servicesQ);
				seen.add(servicesQ);
			}
			const bookingQ = "How do I book a cleaning?";
			if (!seen.has(bookingQ)) {
				suggestions.push(bookingQ);
				seen.add(bookingQ);
			}
		}
	}

	// Fallback suggestions if we still don't have enough
	if (suggestions.length < 3) {
		const fallbacks = [
			"What is your bond-back guarantee?",
			"Do you use eco-friendly products?",
			"How do I get a free quote?",
			"Are your staff police-checked?",
			"What areas do you service?",
		];
		for (const fb of fallbacks) {
			if (suggestions.length >= 3) break;
			if (!seen.has(fb) && fb.toLowerCase() !== query.toLowerCase()) {
				suggestions.push(fb);
				seen.add(fb);
			}
		}
	}

	return suggestions.slice(0, 3);
}

// ---------------------------------------------------------------------------
// Quick Action Handlers
// ---------------------------------------------------------------------------
export const QUICK_ACTIONS: { label: string; icon: string; query: string }[] = [
	{
		label: "Get a Quote",
		icon: "💰",
		query: "How much do your services cost?",
	},
	{ label: "Book Now", icon: "📋", query: "How do I book a cleaning service?" },
	{ label: "Services", icon: "🏠", query: "What services do you offer?" },
];

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------
export interface AnswerEngineResponse {
	answer: string;
	relatedQuestions: string[];
	sources: ScoredResult[];
}

export function answerQuery(query: string): AnswerEngineResponse {
	const results = retrieve(query);
	const answer = generateAnswer(query, results);
	const relatedQuestions = getRelatedQuestions(query, results);

	return { answer, relatedQuestions, sources: results };
}
