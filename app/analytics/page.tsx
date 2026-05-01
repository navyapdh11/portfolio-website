import type { Metadata } from "next";
import AnalyticsContent from "./AnalyticsContent";

export const metadata: Metadata = {
	title: "Analytics | AASTACLEAN - Complete Metrics Dashboard",
	description:
		"AASTACLEAN Analytics - Full metrics, observability, competitor tracking, CRO insights, and performance dashboards.",
	keywords: "analytics, metrics, dashboard, observability, performance, tracking",
	authors: [{ name: "AASTACLEAN" }],
	openGraph: {
		title: "Analytics | AASTACLEAN",
		description: "Complete metrics and observability dashboard",
		type: "website",
		locale: "en_AU",
		siteName: "AASTACLEAN",
		url: "https://aastaclean.com.au/analytics",
	},
};

export default function AnalyticsPage() {
	return <AnalyticsContent />;
}
