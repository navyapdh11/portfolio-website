"use client";

import { useState } from "react";

interface Flashcard {
	id: number;
	category: string;
	title: string;
	front: string;
	back: string;
	priority: "high" | "medium" | "low";
}

export default function FlashcardsContent() {
	const [activeCategory, setActiveCategory] = useState<string>("all");
	const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
	const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());

	const flashcards: Flashcard[] = [
		{
			id: 1,
			category: "SEO",
			title: "Title Tag Optimization",
			front: "What makes a perfect title tag for local cleaning services?",
			back: "Format: [Service] in [City] | [Brand]. Example: 'Deep Cleaning Services in Perth WA | AASTACLEAN'. Keep under 60 chars. Include primary keyword, city, and brand.",
			priority: "high",
		},
		{
			id: 2,
			category: "SEO",
			title: "Meta Description Best Practices",
			front: "How do I write a meta description that drives clicks?",
			back: "Write 150-160 chars with: CTA +Keyword + Location +Unique value. Example: 'Professional cleaning in Perth. Free quotes. 100% satisfaction guarantee. Book now!'",
			priority: "high",
		},
		{
			id: 3,
			category: "GEO",
			title: "Google Business Profile Optimization",
			front: "How do I maximize my GBP ranking?",
			back: "1) Complete ALL fields 2) Upload photos weekly 3) Respond to all reviews 4) Post weekly 5) Use Q&A feature 6) Add services with prices 7) Verify all locations",
			priority: "high",
		},
		{
			id: 4,
			category: "GEO",
			title: "Local Citation Building",
			front: "Where should I list my cleaning business?",
			back: "Priority: Google Business, Apple Maps, Bing Places, Yelp, TrueLocal, StartLocal, Hipages, ServiceSeeking. NAP must be consistent everywhere.",
			priority: "high",
		},
		{
			id: 5,
			category: "AEO",
			title: "Featured Snippet Optimization",
			front: "How do I win featured snippets?",
			back: "1) Answer questions directly in H2/H3 2) Use numbered lists 3) Include 'how-to' steps 4) Add schema markup 5) Keep answers under 50 words",
			priority: "medium",
		},
		{
			id: 6,
			category: "AEO",
			title: "FAQ Schema Implementation",
			front: "Why use FAQ schema and how?",
			back: "Google displays FAQs in SERPs. Use JSON-LD with Question/Answer pairs. Cover: services, pricing, areas, booking process, common objections.",
			priority: "medium",
		},
		{
			id: 7,
			category: "CRO",
			title: "Above the Fold CTAs",
			front: "What should be visible without scrolling?",
			back: "1) Phone number (clickable) 2) 'Get Quote' button 3) Trust badges 4) Operating hours 5) Service area. NO scroll required for key actions.",
			priority: "high",
		},
		{
			id: 8,
			category: "CRO",
			title: "Social Proof Placement",
			front: "Where do I place testimonials?",
			back: "Home: Hero trust badges. Services: Relevant reviews. Pricing: 'Trusted by 500+'. Contact: Full stories. All pages: Star rating in nav.",
			priority: "high",
		},
		{
			id: 9,
			category: "CRO",
			title: "Form Optimization",
			front: "How many fields should my quote form have?",
			back: "Maximum 5 fields: Name, Email, Phone, Service, Message. Use progressive disclosure. Show real-time validation. Add progress indicator.",
			priority: "medium",
		},
		{
			id: 10,
			category: "Content",
			title: "Blog Topic Clusters",
			front: "What content drives local cleaning traffic?",
			back: "Pillars: 1) How-to guides 2) Cleaning tips 3) Industry news 4) Before/after 5) Seasonal content. Map to search intent: informational + transactional.",
			priority: "medium",
		},
		{
			id: 11,
			category: "Content",
			title: "Local Content Strategy",
			front: "How do I create location-specific content?",
			back: "1) Area landing pages 2) Suburb-focused tips 3) Local events/weather connections 4) Community involvement 5) Neighborhood cleaning guides",
			priority: "medium",
		},
		{
			id: 12,
			category: "Ads",
			title: "Google Ads Structure",
			front: "How should I organize my Google Ads?",
			back: "Campaigns by: Service type (House/Commercial/End-of-lease). Ad Groups by: Room/area. Keywords: [service] + [location]. Use all extensions.",
			priority: "high",
		},
		{
			id: 13,
			category: "Ads",
			title: "Social Media Ad Strategy",
			front: "What works for cleaning ads on social?",
			back: "Facebook: Before/after photos + testimonials. Instagram: Reels of cleaning process. Retarget: Website visitors. Lookalike: 1% of customers.",
			priority: "medium",
		},
		{
			id: 14,
			category: "Review",
			title: "Review Acquisition",
			front: "How do I get more 5-star reviews?",
			back: "1) Ask at job completion 2) Send SMS within 1 hour 3) Make review link easy 4) Respond to ALL reviews 5) address negative publicly",
			priority: "high",
		},
		{
			id: 15,
			category: "Review",
			title: "Handling Negative Reviews",
			front: "What's the best response to a bad review?",
			back: "1) Apologize sincerely 2) Take offline (DM/phone) 3) Fix the issue 4) Request update publicly 5) Learn and improve",
			priority: "high",
		},
	];

	const categories = ["all", ...new Set(flashcards.map((c) => c.category))];

	const filteredCards =
		activeCategory === "all"
			? flashcards
			: flashcards.filter((c) => c.category === activeCategory);

	const toggleFlip = (id: number) => {
		const newFlipped = new Set(flippedCards);
		if (newFlipped.has(id)) {
			newFlipped.delete(id);
		} else {
			newFlipped.add(id);
		}
		setFlippedCards(newFlipped);
	};

	const toggleMastered = (id: number) => {
		const newMastered = new Set(masteredCards);
		if (newMastered.has(id)) {
			newMastered.delete(id);
		} else {
			newMastered.add(id);
		}
		setMasteredCards(newMastered);
	};

	const getCategoryColor = (category: string) => {
		const colors: Record<string, string> = {
			SEO: "bg-green-100 text-green-700",
			GEO: "bg-blue-100 text-blue-700",
			AEO: "bg-purple-100 text-purple-700",
			CRO: "bg-amber-100 text-amber-700",
			Content: "bg-pink-100 text-pink-700",
			Ads: "bg-red-100 text-red-700",
			Review: "bg-cyan-100 text-cyan-700",
		};
		return colors[category] || "bg-zinc-100 text-zinc-700";
	};

	const getPriorityColor = (priority: string) => {
		return priority === "high"
			? "text-red-600"
			: priority === "medium"
				? "text-amber-600"
				: "text-green-600";
	};

	return (
		<>
			<section className="py-8 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold mb-2">
								🎴 Strategy Flashcards
							</h1>
							<p className="text-amber-100">
								SEO, CRO, GEO, AEO optimization guide for cleaning businesses
							</p>
						</div>
						<div className="text-right">
							<p className="text-2xl font-bold">
								{masteredCards.size}/{flashcards.length}
							</p>
							<p className="text-sm text-amber-100">Cards mastered</p>
						</div>
					</div>
				</div>
			</section>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-6">
					<div className="flex flex-wrap gap-2">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setActiveCategory(cat)}
								className={`px-4 py-2 rounded-xl font-medium transition-colors ${
									activeCategory === cat
										? "bg-amber-600 text-white"
										: "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
								}`}
							>
								{cat === "all" ? "📚 All Cards" : cat}
							</button>
						))}
					</div>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredCards.map((card) => (
						<div
							key={card.id}
							className={`relative bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden transition-all ${
								flippedCards.has(card.id) ? "ring-2 ring-amber-500" : ""
							} ${masteredCards.has(card.id) ? "opacity-60" : ""}`}
						>
							<div className="p-5">
								<div className="flex justify-between items-start mb-3">
									<span
										className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(card.category)}`}
									>
										{card.category}
									</span>
									<span
										className={`text-xs ${getPriorityColor(card.priority)}`}
									>
										{card.priority === "high"
											? "🔴 HIGH"
											: card.priority === "medium"
												? "🟡 MEDIUM"
												: "🟢 LOW"}
									</span>
								</div>

								<h3 className="font-bold text-zinc-900 dark:text-white mb-3">
									{card.title}
								</h3>

								<div className="min-h-[100px]">
									{flippedCards.has(card.id) ? (
										<div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
											<p className="text-sm text-zinc-700 dark:text-zinc-300">
												{card.back}
											</p>
										</div>
									) : (
										<p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
											{card.front}
										</p>
									)}
								</div>

								<div className="flex gap-2 mt-4">
									<button
										onClick={() => toggleFlip(card.id)}
										className="flex-1 px-3 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors"
									>
										{flippedCards.has(card.id) ? "👁️ Hide" : "👁️ Show"}
									</button>
									<button
										onClick={() => toggleMastered(card.id)}
										className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
											masteredCards.has(card.id)
												? "bg-green-600 text-white"
												: "bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
										}`}
									>
										{masteredCards.has(card.id) ? "✅ Mastered" : "⬜ Master"}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl">
					<h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
						💡 Quick Action Checklist
					</h2>
					<div className="grid md:grid-cols-2 gap-4">
						{[
							{ action: "Complete Google Business Profile", status: true },
							{ action: "Add FAQ schema to website", status: false },
							{ action: "Set up review acquisition SMS", status: false },
							{ action: "Create area landing pages", status: false },
							{ action: "Optimize title tags", status: true },
							{ action: "Add trust badges to booking form", status: false },
						].map((item, i) => (
							<div key={i} className="flex items-center gap-3">
								<input
									type="checkbox"
									defaultChecked={item.status}
									className="w-5 h-5 rounded text-amber-600"
								/>
								<span className="text-zinc-700 dark:text-zinc-300">
									{item.action}
								</span>
							</div>
						))}
					</div>
				</div>
			</main>
		</>
	);
}
