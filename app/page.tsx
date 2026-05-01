import Script from "next/script";
import About from "@/components/About";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import { FAQSection } from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import Reviews from "@/components/Reviews";
import Coverage from "@/components/ServiceMap";
import Services from "@/components/Services";
import { TrustCertifications } from "@/components/TrustCertifications";

export default function Home() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": "https://www.aastaclean.com.au/#organization",
				name: "AASTACLEAN",
				url: "https://www.aastaclean.com.au",
				logo: "https://www.aastaclean.com.au/logo.png",
				description:
					"Enterprise-grade cleaning services across all Australian states. 20+ specialist services, 8,000+ suburbs, police-checked and fully insured.",
				telephone: "+61-8-9000-0000",
				email: "aastaclean@gmail.com",
				address: {
					"@type": "PostalAddress",
					streetAddress: "51 Tate Street",
					addressLocality: "West Leederville",
					addressRegion: "WA",
					postalCode: "6007",
					addressCountry: "AU",
				},
				sameAs: [
					"https://www.facebook.com/aastaclean",
					"https://www.instagram.com/aastaclean",
				],
				aggregateRating: {
					"@type": "AggregateRating",
					ratingValue: "4.9",
					reviewCount: "2847",
					bestRating: "5",
					worstRating: "1",
				},
			},
			{
				"@type": "LocalBusiness",
				"@id": "https://www.aastaclean.com.au/#localbusiness",
				name: "AASTACLEAN",
				image: "https://www.aastaclean.com.au/og-image.png",
				telephone: "+61-8-9000-0000",
				email: "aastaclean@gmail.com",
				address: {
					"@type": "PostalAddress",
					streetAddress: "51 Tate Street",
					addressLocality: "West Leederville",
					addressRegion: "WA",
					postalCode: "6007",
					addressCountry: "AU",
				},
				geo: {
					"@type": "GeoCoordinates",
					latitude: -31.9505,
					longitude: 115.8605,
				},
				url: "https://www.aastaclean.com.au",
				priceRange: "$$",
				openingHoursSpecification: [
					{
						"@type": "OpeningHoursSpecification",
						dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
						opens: "08:00",
						closes: "18:00",
					},
					{
						"@type": "OpeningHoursSpecification",
						dayOfWeek: "Saturday",
						opens: "09:00",
						closes: "16:00",
					},
				],
			},
			{
				"@type": "WebSite",
				"@id": "https://www.aastaclean.com.au/#website",
				url: "https://www.aastaclean.com.au",
				name: "AASTACLEAN",
				publisher: { "@id": "https://www.aastaclean.com.au/#organization" },
				potentialAction: {
					"@type": "SearchAction",
					target: "https://www.aastaclean.com.au/search?q={search_term_string}",
					"query-input": "required name=search_term_string",
				},
			},
			{
				"@type": "FAQPage",
				"@id": "https://www.aastaclean.com.au/#faq",
				mainEntity: [
					{
						"@type": "Question",
						name: "What areas do you service?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "We service all Australian metro and regional areas with 8,000+ suburbs covered, including Sydney, Melbourne, Brisbane, Perth, Adelaide, and all major cities.",
						},
					},
					{
						"@type": "Question",
						name: "Are your cleaners police checked and insured?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Absolutely. Every AASTACLEAN cleaner has a current National Police Check. We also hold $20M public liability insurance.",
						},
					},
					{
						"@type": "Question",
						name: "What is your bond-back guarantee?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "If you are not 100% satisfied with your end of lease clean, we will return and reclean at no extra cost. If the agent still rejects it, we will refund your full payment. We have a 99.7% first-time pass rate.",
						},
					},
					{
						"@type": "Question",
						name: "Do you bring your own cleaning supplies?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Yes! We bring all professional-grade, eco-friendly cleaning products and equipment. You do not need to provide anything.",
						},
					},
				],
			},
		],
	};

	return (
		<>
			<Script
				id="json-ld-homepage"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Navbar />
			<main id="main-content">
				<Hero />
				<TrustCertifications />
				<Services />
				<QuoteCalculator />
				<BeforeAfterGallery />
				<Coverage />
				<Pricing />
				<Reviews />
				<FAQSection />
				<Booking />
				<About />
				<Contact />
			</main>
			<Footer />
		</>
	);
}
