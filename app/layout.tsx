import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/ErrorBoundary";
import NanochatAssistant from "@/components/NanochatAssistant";
import { ScrollFix } from "@/components/ScrollFix";
import SearchOverlay from "@/components/SearchOverlay";
import { WebVitalsRUM } from "@/components/WebVitalsRUM";

const interTight = Inter_Tight({
	variable: "--font-inter-tight",
	subsets: ["latin"],
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	display: "swap",
});

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	name: "AASTACLEAN",
	url: "https://www.aastaclean.com.au",
	knowsAbout: ["RAG Engineering", "LPU Optimization", "Agentic Systems", "Cloud Infrastructure"],
	areaServed: {
		"@type": "AdministrativeArea",
		name: "Perth",
	},
	potentialAction: {
		"@type": "SearchAction",
		target: "https://www.aastaclean.com.au/search?q={search_term_string}",
		"query-input": "required name=search_term_string",
	},
};

export const metadata: Metadata = {
	metadataBase: new URL("https://www.aastaclean.com.au"),
	title: {
		default: "AASTACLEAN | Australia's Premier Cleaning Services — Nationwide Coverage",
		template: "%s | AASTACLEAN",
	},
	description:
		"Enterprise-grade cleaning services across all Australian states. 20+ specialist services, 8,000+ suburbs, police-checked & fully insured. Book online today.",
	keywords:
		"cleaning services Australia, end of lease cleaning, commercial cleaning, domestic cleaning, carpet cleaning, window cleaning, nationwide cleaning, AASTACLEAN",
	authors: [{ name: "AASTACLEAN" }],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: "https://www.aastaclean.com.au",
	},
	openGraph: {
		title: "AASTACLEAN | Australia's Premier Cleaning Network",
		description:
			"Enterprise-grade cleaning services across all Australian states. 20+ specialist services, 8,000+ suburbs.",
		type: "website",
		locale: "en_AU",
		siteName: "AASTACLEAN",
		url: "https://www.aastaclean.com.au",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "AASTACLEAN — Professional Cleaning Services Australia Wide",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "AASTACLEAN | Australia's Premier Cleaning Network",
		description:
			"Enterprise-grade cleaning services across all Australian states. 20+ specialist services, 8,000+ suburbs.",
		images: ["/og-image.png"],
	},
	icons: {
		icon: "/favicon.ico",
	},
};

import FloatingHomeButton from "@/components/FloatingHomeButton";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn("h-full", "antialiased", interTight.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
			suppressHydrationWarning
		>
			<head>
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#0ea5e9" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className="min-h-full flex flex-col font-sans">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<TooltipProvider>
						<ErrorBoundary>
						<a
							href="#main-content"
							className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sky-500 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
						>
							Skip to main content
						</a>
						<WebVitalsRUM />
						<ScrollFix />
						<FloatingHomeButton />
						<SearchOverlay />
						{children}
						<NanochatAssistant />
					</ErrorBoundary>
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
