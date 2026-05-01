import type { Metadata } from "next";
import AdsContent from "./AdsContent";

export const metadata: Metadata = {
	title: "Ads Manager | AASTACLEAN - Social Media & Google Ads",
	description:
		"AASTACLEAN Ads Manager - Create, manage, and track ads on Facebook, Instagram, Google, and more. Full CRO, SEO, GEO, AEO optimization.",
	keywords: "ads, social media ads, google ads, facebook ads, advertising, marketing, CRO",
	authors: [{ name: "AASTACLEAN" }],
	openGraph: {
		title: "Ads Manager | AASTACLEAN",
		description: "Manage ads across all platforms",
		type: "website",
		locale: "en_AU",
		siteName: "AASTACLEAN",
		url: "https://aastaclean.com.au/ads",
	},
};

export default function AdsPage() {
	return <AdsContent />;
}
