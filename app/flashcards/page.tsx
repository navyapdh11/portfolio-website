import type { Metadata } from "next";
import FlashcardsContent from "./FlashcardsContent";

export const metadata: Metadata = {
	title: "Strategy Flashcards | AASTACLEAN - Optimization Guide",
	description:
		"AASTACLEAN Strategy Flashcards - SEO, CRO, GEO, AEO optimization recommendations and best practices for cleaning businesses.",
	keywords: "flashcards, strategy, SEO, CRO, optimization, marketing, cleaning business",
	authors: [{ name: "AASTACLEAN" }],
	openGraph: {
		title: "Strategy Flashcards | AASTACLEAN",
		description: "Optimization strategy flashcards",
		type: "website",
		locale: "en_AU",
		siteName: "AASTACLEAN",
		url: "https://aastaclean.com.au/flashcards",
	},
};

export default function FlashcardsPage() {
	return <FlashcardsContent />;
}
