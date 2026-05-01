import type { Metadata } from "next";
import EarnContent from "./EarnContent";

export const metadata: Metadata = {
	title: "Earnings Dashboard | AASTACLEAN - Track Your Income",
	description:
		"AASTACLEAN Earnings Dashboard - Track your cleaning income, payouts, streaks, and performance metrics. View earnings history and export data.",
	keywords:
		"earnings, income, payout, cleaning jobs, money, earnings dashboard",
	authors: [{ name: "AASTACLEAN" }],
	openGraph: {
		title: "Earnings Dashboard | AASTACLEAN",
		description: "Track your cleaning income and payouts.",
		type: "website",
		locale: "en_AU",
		siteName: "AASTACLEAN",
		url: "https://aastaclean.com.au/earn",
	},
	alternates: {
		canonical: "https://aastaclean.com.au/earn",
	},
};

export default function EarnPage() {
	return <EarnContent />;
}
