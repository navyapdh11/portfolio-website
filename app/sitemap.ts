import type { MetadataRoute } from "next";
import { cleaningServices } from "@/lib/constants/services";
import { allSuburbs, suburbsByState } from "@/lib/data/suburbs-barrel";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.aastaclean.com.au";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{ url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
		{
			url: `${BASE_URL}/pricing`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/services`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{
			url: `${BASE_URL}/projects`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{ url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
		{
			url: `${BASE_URL}/locations`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${BASE_URL}/privacy`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${BASE_URL}/terms`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
	];

	// Service pages (22)
	const servicePages: MetadataRoute.Sitemap = cleaningServices.map((s) => ({
		url: `${BASE_URL}/services/${s.slug}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: 0.85,
	}));

	// Service-city pages (22 × 8 = 176)
	const serviceCityPages: MetadataRoute.Sitemap = cleaningServices.flatMap((service) =>
		[
			{ slug: "sydney", state: "nsw" },
			{ slug: "melbourne", state: "vic" },
			{ slug: "brisbane", state: "qld" },
			{ slug: "perth", state: "wa" },
			{ slug: "adelaide", state: "sa" },
			{ slug: "hobart", state: "tas" },
			{ slug: "canberra", state: "act" },
			{ slug: "darwin", state: "nt" },
		].map((city) => ({
			url: `${BASE_URL}/services/${service.slug}/${city.state}/${city.slug}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.75,
		})),
	);

	// Suburb pages (3,365) — /[state]/[suburb]
	const suburbPages: MetadataRoute.Sitemap = allSuburbs.map((sub) => ({
		url: `${BASE_URL}/${sub.state}/${sub.slug}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: 0.8,
	}));

	// Service-suburb pages: limit to top 5 suburbs per state per service
	// (prevents memory overflow; long-tail pages discovered via internal linking)
	const topSuburbsByState: Record<string, string[]> = {};
	for (const [state, suburbs] of Object.entries(suburbsByState)) {
		topSuburbsByState[state] = suburbs.slice(0, 20).map((s) => s.slug);
	}
	const serviceSuburbPages: MetadataRoute.Sitemap = [];
	for (const service of cleaningServices) {
		for (const [state, suburbSlugs] of Object.entries(topSuburbsByState)) {
			for (const slug of suburbSlugs) {
				serviceSuburbPages.push({
					url: `${BASE_URL}/services/${service.slug}/${state}/${slug}`,
					lastModified: new Date(),
					changeFrequency: "weekly",
					priority: 0.7,
				});
			}
		}
	}

	// State landing pages
	const statePages: MetadataRoute.Sitemap = Object.keys(suburbsByState).map((state) => ({
		url: `${BASE_URL}/locations/${state}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: 0.7,
	}));

	const allPages = [
		...staticPages,
		...servicePages,
		...serviceCityPages,
		...suburbPages,
		...serviceSuburbPages,
		...statePages,
	];

	console.log(`🗺️  Sitemap: ${allPages.length} total URLs`);
	console.log(`   Static: ${staticPages.length}, Services: ${servicePages.length}`);
	console.log(`   Service-City: ${serviceCityPages.length}, Suburbs: ${suburbPages.length}`);
	console.log(
		`   Service-Suburb (top): ${serviceSuburbPages.length}, States: ${statePages.length}`,
	);
	console.log(`   Total SSG pages: ~74,000+ (including all service-suburb combos)`);

	return allPages;
}
