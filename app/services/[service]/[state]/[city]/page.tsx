import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Booking from "@/components/Booking";
import { serviceDetails } from "@/lib/constants/serviceDetails";
import { australianCities, cleaningServices } from "@/lib/constants/services";
import { allSuburbs, states } from "@/lib/data/suburbs";

// Service-specific SEO descriptions
const serviceDescriptions: Record<string, string> = {
	"domestic-cleaning":
		"Professional home cleaning with eco-friendly products. Bond-back guarantee, police-checked cleaners, and flexible scheduling.",
	"end-of-lease-cleaning":
		"Bond-back guaranteed end of lease cleaning. 72-hour re-clean policy, compliance with all state tenancy laws.",
	"commercial-cleaning":
		"Enterprise-grade commercial cleaning for offices, retail, and industrial spaces. WHS compliant, insured.",
	"office-cleaning":
		"Professional office cleaning with minimal disruption. After-hours service, NDA-compliant staff, eco-friendly products.",
	"industrial-cleaning":
		"Heavy-duty industrial cleaning for warehouses, factories, and manufacturing facilities. OHS/WHS compliant.",
	"builders-cleaning":
		"Post-construction cleaning for new builds and renovations. Debris removal, detailed finishes, safety-certified teams.",
	"retail-cleaning":
		"Retail store and shopping centre cleaning. Customer-safe hours, display-area precision, compliance with retail standards.",
	"strata-cleaning":
		"Strata and body corporate cleaning for common areas. Scheduled maintenance, strata-law compliant, insured.",
	"carpet-cleaning":
		"Deep carpet cleaning with hot water extraction. Stain removal, odour elimination, pet-safe products.",
	"window-cleaning":
		"Professional window cleaning for residential and commercial properties. High-rise certified, streak-free guarantee.",
	"deep-cleaning":
		"Comprehensive deep cleaning for homes and businesses. Top-to-bottom sanitization, allergen removal, eco-friendly.",
	"move-in-out-cleaning":
		"Move-in and move-out cleaning for properties. Bond-back ready, landlord-approved standards.",
	"oven-cleaning":
		"Specialized oven and rangehood cleaning. Grease removal, food-safe products, appliance-safe techniques.",
	"upholstery-cleaning":
		"Furniture and upholstery cleaning. Fabric-safe methods, stain removal, allergen reduction.",
	"tile-grout-cleaning":
		"Tile and grout restoration cleaning. Deep cleaning, resealing, colour restoration.",
	"pressure-washing":
		"High-pressure exterior cleaning for driveways, walls, and commercial facades. Eco-safe detergents.",
	"disinfection-sanitization":
		"Professional disinfection and sanitization services. Hospital-grade products, CDC-compliant protocols.",
	"laundry-services":
		"Commercial and domestic laundry services. Pickup and delivery, eco-friendly detergents, stain treatment.",
	"school-educational-cleaning":
		"School and educational facility cleaning. Child-safe products, term-time scheduling, health department compliant.",
	"medical-healthcare-cleaning":
		"Medical and healthcare facility cleaning. Infection control, TGA-compliant products, health department certified.",
};

const stateNames: Record<string, string> = {
	nsw: "New South Wales",
	vic: "Victoria",
	qld: "Queensland",
	wa: "Western Australia",
	sa: "South Australia",
	tas: "Tasmania",
	act: "ACT",
	nt: "Northern Territory",
};

const cityNames: Record<string, string> = {
	sydney: "Sydney",
	melbourne: "Melbourne",
	brisbane: "Brisbane",
	perth: "Perth",
	adelaide: "Adelaide",
	hobart: "Hobart",
	canberra: "Canberra",
	darwin: "Darwin",
};

// Generate metadata
export async function generateMetadata({
	params,
}: {
	params: Promise<{ service: string; state: string; city: string }>;
}): Promise<Metadata> {
	const { service: serviceSlug, state, city } = await params;
	const service = cleaningServices.find((s) => s.slug === serviceSlug);
	const stateName = stateNames[state] || state.toUpperCase();
	
	// Look up suburb name from database
	const suburb = allSuburbs.find(s => s.slug === city && s.state === state);
	const cityName = suburb?.name || (
		cityNames[city] ||
		city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
	);
	const postcode = suburb?.postcode || "";

	if (!service) return { title: "Service Not Found" };

	const title = `${service.name} in ${cityName}${postcode ? `, ${postcode}` : ""}, ${stateName} | AASTACLEAN`;
	const description =
		serviceDescriptions[serviceSlug] ||
		`${service.name} services in ${cityName}, ${stateName}. Professional, insured, and police-checked cleaners. Book online today.`;

	return {
		title,
		description,
		alternates: {
			canonical: `https://www.aastaclean.com.au/services/${serviceSlug}/${state}/${city}`,
		},
		openGraph: {
			title,
			description,
			type: "website",
			url: `https://www.aastaclean.com.au/services/${serviceSlug}/${state}/${city}`,
			locale: "en_AU",
		},
	};
}

// Generate static params for ALL service × suburb combos
// 22 services × 3,365 suburbs = 74,030 SSG pages
export async function generateStaticParams() {
	const params: { service: string; state: string; city: string }[] = [];
	for (const service of cleaningServices) {
		for (const sub of allSuburbs) {
			params.push({
				service: service.slug,
				state: sub.state,
				city: sub.slug,
			});
		}
	}
	return params;
}

// FAQ generator per service
function getServiceFAQs(
	serviceSlug: string,
	cityName: string,
	stateName: string,
) {
	const faqs: Record<string, { q: string; a: string }[]> = {
		"domestic-cleaning": [
			{
				q: `How much does house cleaning cost in ${cityName}?`,
				a: `Prices start from $120 for a standard 2-bedroom home in ${cityName}, ${stateName}. Final pricing depends on property size, condition, and frequency. We offer 10-20% discounts for recurring bookings.`,
			},
			{
				q: `Are your cleaners police-checked and insured?`,
				a: `Yes. Every AASTACLEAN cleaner holds a current National Police Check, is fully insured with $20M public liability, and undergoes regular training.`,
			},
			{
				q: `Do I need to be home during the clean?`,
				a: `No. Many of our ${cityName} customers provide a key or access code. We offer secure key storage and real-time updates during the service.`,
			},
			{
				q: `What cleaning products do you use?`,
				a: `We use eco-friendly, non-toxic products safe for children and pets. If you have specific product preferences, we're happy to accommodate.`,
			},
			{
				q: `Can I book a one-off clean or only regular service?`,
				a: `Both! We offer one-time, weekly, fortnightly, and monthly cleaning schedules. Book online in under 2 minutes.`,
			},
		],
		"end-of-lease-cleaning": [
			{
				q: `Is your end of lease clean in ${cityName} bond-back guaranteed?`,
				a: `Absolutely. We offer a 72-hour bond-back guarantee. If your agent or landlord isn't satisfied, we'll re-clean at no extra cost.`,
			},
			{
				q: `How long does an end of lease clean take?`,
				a: `Typically 4-8 hours depending on property size. A 2-bedroom apartment in ${cityName} usually takes 4-5 hours; a 4-bedroom house takes 6-8 hours.`,
			},
			{
				q: `Do you clean according to the agent's checklist?`,
				a: `Yes. We follow the exact checklist provided by your property manager or landlord, plus our own 150+ point inspection.`,
			},
			{
				q: `Can you provide a compliance certificate?`,
				a: `Yes. We provide a detailed cleaning report and compliance certificate upon completion, accepted by all major ${stateName} property managers.`,
			},
			{
				q: `How far in advance should I book?`,
				a: `We recommend booking 3-5 days before your handover date. In ${cityName}, we often have next-day availability.`,
			},
		],
		"commercial-cleaning": [
			{
				q: `What areas do you cover for commercial cleaning in ${cityName}?`,
				a: `We service all commercial premises across ${cityName} and greater ${stateName}, including offices, retail, warehouses, and industrial facilities.`,
			},
			{
				q: `Are your cleaners trained in WHS compliance?`,
				a: `Yes. All staff hold current WHS certifications and follow Australian Standard AS/NZS 4801 for occupational health and safety.`,
			},
			{
				q: `Do you offer after-hours cleaning?`,
				a: `Yes. Most of our commercial clients in ${cityName} schedule cleaning outside business hours to minimize disruption.`,
			},
			{
				q: `What is your pricing structure?`,
				a: `We offer competitive per-square-meter pricing with volume discounts. Contact us for a free, no-obligation quote.`,
			},
			{
				q: `Do you supply your own equipment and products?`,
				a: `Yes. We bring all commercial-grade equipment and eco-friendly cleaning products. No cost to you.`,
			},
		],
		"office-cleaning": [
			{
				q: `How often should offices be cleaned in ${cityName}?`,
				a: `We recommend daily cleaning for offices with 20+ staff, and 3-5 times per week for smaller offices. We customize to your needs.`,
			},
			{
				q: `Do you clean after hours?`,
				a: `Yes. Our ${cityName} team operates before 7am and after 6pm to avoid disrupting your business.`,
			},
			{
				q: `What does office cleaning include?`,
				a: `Desk wiping, vacuuming, kitchen cleaning, bathroom sanitization, waste removal, and glass cleaning. Add-ons available.`,
			},
			{
				q: `Can you handle NDA requirements?`,
				a: `Yes. We sign NDAs for sensitive office environments, particularly in legal, financial, and medical sectors.`,
			},
			{
				q: `How do I get a quote for my office?`,
				a: `Book a free site assessment online, or call 1300 000 000. We'll provide a detailed quote within 24 hours.`,
			},
		],
	};

	// Default FAQs for services without specific ones
	return (
		faqs[serviceSlug] || [
			{
				q: `How much does ${serviceSlug.replace(/-/g, " ")} cost in ${cityName}?`,
				a: `Pricing varies by property size and scope. Contact us for a free, no-obligation quote. We offer competitive rates across ${stateName}.`,
			},
			{
				q: `Are your cleaners insured and police-checked?`,
				a: `Yes. Every cleaner holds a National Police Check and $20M public liability insurance.`,
			},
			{
				q: `Do you service all of ${cityName}?`,
				a: `Yes. We cover all suburbs in ${cityName} and surrounding areas across ${stateName}.`,
			},
			{
				q: `How do I book a service?`,
				a: `Book online in under 2 minutes. Select your service, date, and time. Instant confirmation.`,
			},
			{
				q: `What products do you use?`,
				a: `We use eco-friendly, non-toxic products. For specialized services, we use industry-grade equipment and solutions.`,
			},
		]
	);
}

export default async function ServiceGeoPage({
	params,
}: {
	params: Promise<{ service: string; state: string; city: string }>;
}) {
	const { service: serviceSlug, state, city } = await params;
	const service = cleaningServices.find((s) => s.slug === serviceSlug);
	const details = serviceDetails[serviceSlug as keyof typeof serviceDetails];
	const stateName = stateNames[state] || state.toUpperCase();
	const stateAbbr =
		states.find((s) => s.slug === state)?.abbr || state.toUpperCase();
	
	// Look up suburb data
	const suburb = allSuburbs.find(s => s.slug === city && s.state === state);
	const cityName = suburb?.name || (
		cityNames[city] ||
		city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
	);
	const postcode = suburb?.postcode || "";

	if (!service) notFound();

	const faqs = getServiceFAQs(serviceSlug, cityName, stateName);

	// JSON-LD schema
	const serviceSchema = {
		"@context": "https://schema.org",
		"@type": "Service",
		serviceType: service.name,
		provider: {
			"@type": "LocalBusiness",
			name: "AASTACLEAN",
			telephone: "1300 000 000",
			url: "https://www.aastaclean.com.au",
			areaServed: {
				"@type": "State",
				name: stateName,
			},
		},
		areaServed: {
			"@type": "City",
			name: cityName,
			containedInPlace: { "@type": "State", name: stateName },
		},
		description: serviceDescriptions[serviceSlug] || service.name,
		offers: {
			"@type": "Offer",
			priceCurrency: "AUD",
			availability: "https://schema.org/InStock",
			url: `https://www.aastaclean.com.au/services/${serviceSlug}/${state}/${city}#booking`,
		},
	};

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.q,
			acceptedAnswer: { "@type": "Answer", text: faq.a },
		})),
	};

	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: "https://www.aastaclean.com.au",
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Services",
				item: "https://www.aastaclean.com.au/pricing",
			},
			{
				"@type": "ListItem",
				position: 3,
				name: service.name,
				item: `https://www.aastaclean.com.au/services/${serviceSlug}`,
			},
			{
				"@type": "ListItem",
				position: 4,
				name: `${cityName}, ${stateName}`,
				item: `https://www.aastaclean.com.au/services/${serviceSlug}/${state}/${city}`,
			},
		],
	};

	return (
		<main className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
			{/* Schema */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Breadcrumb */}
				<nav className="text-sm text-slate-500 mb-6 animate-fade-in">
					<Link href="/" className="hover:text-sky-500 transition-colors">
						Home
					</Link>
					<span className="mx-2">/</span>
					<Link
						href="/pricing"
						className="hover:text-sky-500 transition-colors"
					>
						Services
					</Link>
					<span className="mx-2">/</span>
					<a
						href={`/services/${serviceSlug}`}
						className="hover:text-sky-500 transition-colors"
					>
						{service.name}
					</a>
					<span className="mx-2">/</span>
					<span className="text-slate-700 dark:text-slate-300">
						{cityName}, {stateAbbr}
					</span>
				</nav>

				{/* Hero */}
				<div className="mb-12 animate-slide-in-left">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-subtle text-sm font-medium text-sky-600 dark:text-sky-400 mb-4">
						<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
						Available in {cityName}
					</div>
					<h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
						{service.name} in{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">
							{cityName}
						</span>
						, {stateAbbr}
					</h1>
					<p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl">
						{details?.description ||
							`Professional ${service.name.toLowerCase()} services in ${cityName}, ${stateName}. Insured, police-checked, and eco-friendly.`}
					</p>
				</div>

				{/* Bento Grid Features */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
					{details?.included?.slice(0, 6).map((item, i) => (
						<div
							key={i}
							className="bento-card glass p-6 rounded-2xl border border-white/20 hover-lift animate-fade-in"
							style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
						>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
									✓
								</div>
								<div>
									<h3 className="font-semibold text-slate-900 dark:text-white">
										{item}
									</h3>
									<p className="text-sm text-slate-500 dark:text-slate-400">
										Included in every clean
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Main Content + Booking */}
				<div className="grid lg:grid-cols-2 gap-12 mb-16">
					<div className="space-y-8">
						{/* Why Choose Us */}
						<div className="glass p-8 rounded-3xl border border-white/20 lightning-glow">
							<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
								Why Choose AASTACLEAN in {cityName}?
							</h2>
							<div className="space-y-4">
								{[
									{
										icon: "🛡️",
										title: "Bond-Back Guarantee",
										desc: "72-hour re-clean policy on all end of lease cleans.",
									},
									{
										icon: "👮",
										title: "Police-Checked Staff",
										desc: "Every cleaner holds a current National Police Check.",
									},
									{
										icon: "🌿",
										title: "Eco-Friendly Products",
										desc: "Non-toxic, biodegradable products safe for families and pets.",
									},
									{
										icon: "📋",
										title: "WHS Compliant",
										desc: "Full compliance with Australian workplace health and safety standards.",
									},
									{
										icon: "⏰",
										title: "Flexible Scheduling",
										desc: "Book same-day or schedule recurring cleans online.",
									},
								].map((item, i) => (
									<div
										key={i}
										className="flex gap-4 items-start animate-fade-in"
										style={{ animationDelay: `${0.1 * i}s`, opacity: 0 }}
									>
										<span className="text-2xl flex-shrink-0">{item.icon}</span>
										<div>
											<h3 className="font-semibold text-slate-900 dark:text-white">
												{item.title}
											</h3>
											<p className="text-sm text-slate-600 dark:text-slate-400">
												{item.desc}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Add-ons */}
						{details?.addons && details.addons.length > 0 && (
							<div className="glass p-8 rounded-3xl border border-white/20">
								<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
									Popular Add-Ons
								</h3>
								<div className="space-y-2">
									{details.addons.map((addon, i) => (
										<div
											key={i}
											className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 last:border-0"
										>
											<span className="text-slate-700 dark:text-slate-300">
												{addon.label}
											</span>
											<span className="font-semibold text-sky-600">
												+${addon.price.toFixed(2)}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Compliance */}
						<div className="glass-subtle p-6 rounded-2xl border border-white/15">
							<h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
								📜 Compliance & Standards
							</h3>
							<ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
								<li>
									• Australian Consumer Law (ACL) — Full consumer rights
									compliance
								</li>
								<li>• Work Health & Safety Act 2011 ({stateName})</li>
								<li>• Privacy Act 1988 (Cth) — Data protection compliant</li>
								<li>• AS/NZS 4801 — Occupational health & safety management</li>
								<li>• $20M Public Liability Insurance</li>
							</ul>
						</div>
					</div>

					{/* Booking */}
					<div
						id="booking"
						className="animate-scale-in"
						style={{ animationDelay: "0.3s", opacity: 0 }}
					>
						<div className="glass-strong rounded-3xl p-1.5 border border-white/25 shadow-2xl shadow-sky-500/10 sticky top-28">
							<div className="bg-gradient-to-br from-slate-50/80 to-white/80 dark:from-slate-800/80 dark:to-slate-900/80 rounded-[1.3rem] p-6">
								<Booking serviceSlug={serviceSlug} state={state} city={city} />
							</div>
						</div>
					</div>
				</div>

				{/* FAQs */}
				<div className="mb-16">
					<h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
						Frequently Asked Questions — {service.name} in {cityName}
					</h2>
					<div className="space-y-4">
						{faqs.map((faq, i) => (
							<details
								key={i}
								className="group glass rounded-2xl border border-white/20 overflow-hidden"
								style={{ animationDelay: `${i * 0.1}s` }}
							>
								<summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-slate-900 dark:text-white hover:text-sky-500 transition-colors list-none">
									{faq.q}
									<svg
										className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</summary>
								<div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
									{faq.a}
								</div>
							</details>
						))}
					</div>
				</div>

				{/* Nearby Areas */}
				<div className="glass p-8 rounded-3xl border border-white/20 mb-16">
					<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
						{service.name} Also Available Nearby
					</h2>
					<div className="flex flex-wrap gap-3">
						{allSuburbs
							.filter((sub) => sub.state === state && sub.slug !== city)
							.slice(0, 24)
							.map((sub) => (
								<a
									key={sub.slug}
									href={`/services/${serviceSlug}/${state}/${sub.slug}`}
									className="px-4 py-2 rounded-xl glass-subtle text-sm text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 dark:hover:text-sky-400 transition-all border border-white/10"
								>
									{sub.name}{" "}
									{sub.postcode && (
										<span className="text-slate-400">{sub.postcode}</span>
									)}
								</a>
							))}
					</div>
				</div>
			</div>
		</main>
	);
}
