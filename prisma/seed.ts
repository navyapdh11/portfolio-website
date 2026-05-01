// AASTACLEAN — Database Seed Script
// Populates Prisma database with initial data for all models
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Seeding database...");

	// ─── Services ──────────────────────────────────────────────
	const services = await Promise.all([
		prisma.service.upsert({
			where: { slug: "house-cleaning" },
			update: {},
			create: {
				slug: "house-cleaning",
				title: "House Cleaning",
				icon: "🏠",
				imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
				description: "Regular maintenance cleaning for homes",
				features: ["Dusting", "Vacuuming", "Mopping", "Kitchen", "Bathroom"],
				basePrice: 120,
				category: "residential",
				available: true,
				stock: 50,
			},
		}),
		prisma.service.upsert({
			where: { slug: "end-of-lease-cleaning" },
			update: {},
			create: {
				slug: "end-of-lease-cleaning",
				title: "End of Lease Cleaning",
				icon: "🔑",
				imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600",
				description: "Bond-back guaranteed cleaning",
				features: ["Deep Clean", "Bond Guarantee", "48hr Turnaround"],
				basePrice: 250,
				category: "residential",
				available: true,
				stock: 20,
			},
		}),
		prisma.service.upsert({
			where: { slug: "commercial-cleaning" },
			update: {},
			create: {
				slug: "commercial-cleaning",
				title: "Commercial Cleaning",
				icon: "🏢",
				imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
				description: "Professional office cleaning",
				features: ["After Hours", "Custom Plans", "Insured"],
				basePrice: 180,
				category: "commercial",
				available: true,
				stock: 30,
			},
		}),
		prisma.service.upsert({
			where: { slug: "carpet-cleaning" },
			update: {},
			create: {
				slug: "carpet-cleaning",
				title: "Carpet Cleaning",
				icon: "🧹",
				imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600",
				description: "Deep steam cleaning",
				features: ["Steam Clean", "Stain Removal", "Quick Dry"],
				basePrice: 90,
				category: "specialty",
				available: true,
				stock: 40,
			},
		}),
		prisma.service.upsert({
			where: { slug: "window-cleaning" },
			update: {},
			create: {
				slug: "window-cleaning",
				title: "Window Cleaning",
				icon: "🪟",
				imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a472a14?w=600",
				description: "Crystal clear windows",
				features: ["Inside & Out", "High-Rise", "Streak-Free"],
				basePrice: 80,
				category: "specialty",
				available: true,
				stock: 35,
			},
		}),
		prisma.service.upsert({
			where: { slug: "deep-cleaning" },
			update: {},
			create: {
				slug: "deep-cleaning",
				title: "Deep Cleaning",
				icon: "✨",
				imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
				description: "Intensive top-to-bottom clean",
				features: ["Full House", "Behind Appliances", "Sanitization"],
				basePrice: 300,
				category: "residential",
				available: true,
				stock: 15,
			},
		}),
	]);
	console.log(`✅ ${services.length} services seeded`);

	// ─── Gallery ───────────────────────────────────────────────
	const gallery = await Promise.all([
		prisma.galleryItem.upsert({
			where: { id: "g1" },
			update: {},
			create: {
				id: "g1",
				title: "CBD Office Tower",
				description: "Complete commercial cleaning",
				imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
				category: "commercial",
				tags: ["office", "tower"],
				featured: true,
			},
		}),
		prisma.galleryItem.upsert({
			where: { id: "g2" },
			update: {},
			create: {
				id: "g2",
				title: "West Leederville Home",
				description: "Family home deep clean",
				imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
				category: "residential",
				tags: ["home", "deep-clean"],
				featured: true,
			},
		}),
		prisma.galleryItem.upsert({
			where: { id: "g3" },
			update: {},
			create: {
				id: "g3",
				title: "Subiaco Apartment",
				description: "Bond-back end of lease",
				imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600",
				category: "end-of-lease",
				tags: ["bond", "apartment"],
				featured: false,
			},
		}),
		prisma.galleryItem.upsert({
			where: { id: "g4" },
			update: {},
			create: {
				id: "g4",
				title: "Nedlands Medical Centre",
				description: "Medical-grade sanitization",
				imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600",
				category: "commercial",
				tags: ["medical", "sanitization"],
				featured: true,
			},
		}),
	]);
	console.log(`✅ ${gallery.length} gallery items seeded`);

	// ─── Flashcards ────────────────────────────────────────────
	const flashcards = await Promise.all([
		prisma.flashcard.upsert({
			where: { id: "fc1" },
			update: {},
			create: {
				id: "fc1",
				question: "What are the 3 most important local SEO factors?",
				answer:
					"1. Google Business Profile optimization\n2. Local keyword targeting (city + service)\n3. Customer reviews and ratings",
				category: "SEO",
				order: 1,
			},
		}),
		prisma.flashcard.upsert({
			where: { id: "fc2" },
			update: {},
			create: {
				id: "fc2",
				question: "What is the #1 CRO lever for cleaning sites?",
				answer: "Above-the-fold booking form with instant quote calculator",
				category: "CRO",
				order: 2,
			},
		}),
		prisma.flashcard.upsert({
			where: { id: "fc3" },
			update: {},
			create: {
				id: "fc3",
				question: "How does GEO differ from traditional SEO?",
				answer:
					"GEO optimizes for AI-generated answers (ChatGPT, Gemini) rather than search engine results pages",
				category: "GEO",
				order: 3,
			},
		}),
		prisma.flashcard.upsert({
			where: { id: "fc4" },
			update: {},
			create: {
				id: "fc4",
				question: "What format does AEO favor?",
				answer: "FAQ-style content with direct, concise answers to common questions",
				category: "AEO",
				order: 4,
			},
		}),
	]);
	console.log(`✅ ${flashcards.length} flashcards seeded`);

	// ─── Ad Campaigns ─────────────────────────────────────────
	const campaigns = await Promise.all([
		prisma.adCampaign.upsert({
			where: { id: "ad1" },
			update: {},
			create: {
				id: "ad1",
				platform: "facebook",
				name: "Spring Clean Special",
				status: "active",
				budget: 500,
				spent: 312,
				impressions: 45000,
				clicks: 890,
				conversions: 23,
				ctr: 1.98,
				roas: 4.2,
			},
		}),
		prisma.adCampaign.upsert({
			where: { id: "ad2" },
			update: {},
			create: {
				id: "ad2",
				platform: "instagram",
				name: "Before/After Gallery",
				status: "active",
				budget: 300,
				spent: 187,
				impressions: 28000,
				clicks: 560,
				conversions: 18,
				ctr: 2.0,
				roas: 3.8,
			},
		}),
		prisma.adCampaign.upsert({
			where: { id: "ad3" },
			update: {},
			create: {
				id: "ad3",
				platform: "google",
				name: "Perth Cleaning Search",
				status: "active",
				budget: 800,
				spent: 524,
				impressions: 12000,
				clicks: 340,
				conversions: 45,
				ctr: 2.83,
				roas: 5.2,
			},
		}),
	]);
	console.log(`✅ ${campaigns.length} ad campaigns seeded`);

	// ─── Microtasks ────────────────────────────────────────────
	const tasks = await Promise.all([
		prisma.microtask.upsert({
			where: { id: "t1" },
			update: {},
			create: {
				id: "t1",
				title: "Label cleaning products",
				description: "Label all cleaning products in this image",
				status: "pending",
				priority: "medium",
				reward: 0.5,
			},
		}),
		prisma.microtask.upsert({
			where: { id: "t2" },
			update: {},
			create: {
				id: "t2",
				title: "Transcribe voicemail",
				description: "Transcribe customer voicemail about cleaning needs",
				status: "pending",
				priority: "high",
				reward: 1.0,
			},
		}),
		prisma.microtask.upsert({
			where: { id: "t3" },
			update: {},
			create: {
				id: "t3",
				title: "Classify review sentiment",
				description: "Classify this review as positive, neutral, or negative",
				status: "pending",
				priority: "low",
				reward: 0.25,
			},
		}),
	]);
	console.log(`✅ ${tasks.length} microtasks seeded`);

	// ─── Projects ──────────────────────────────────────────────
	const projects = await Promise.all([
		prisma.project.upsert({
			where: { id: "proj1" },
			update: {},
			create: {
				id: "proj1",
				title: "CBD Office Tower - Commercial Complex",
				category: "Commercial Cleaning",
				location: "Perth CBD",
				description: "Complete weekly maintenance cleaning for a 20-story commercial tower.",
				beforeImage: "🏢",
			},
		}),
		prisma.project.upsert({
			where: { id: "proj2" },
			update: {},
			create: {
				id: "proj2",
				title: "West Leederville Family Home",
				category: "Residential Cleaning",
				location: "West Leederville",
				description: "Regular fortnightly cleaning service.",
				beforeImage: "🏠",
			},
		}),
	]);
	console.log(`✅ ${projects.length} projects seeded`);

	// ─── Admin Settings ────────────────────────────────────────
	const settings = await prisma.adminSettings.upsert({
		where: { id: "settings-1" },
		update: {},
		create: {
			id: "settings-1",
			ctaTitle: "Ready to Work With Us?",
			ctaDescription: "Get a free quote for your cleaning project.",
			ctaButtonText: "Get Free Quote",
			ctaButtonLink: "/contact",
			heroTitle: "Australia's #1 Enterprise-Grade AI-Driven Cleaning Operations",
			heroSubtitle: "Same-Day Domestic, Commercial & Bond-Back Excellence",
			trustStats: [
				{ icon: "⭐", value: "4.9/5", label: "Average Rating" },
				{ icon: "🏠", value: "2,847+", label: "Homes Cleaned" },
				{ icon: "👷", value: "50+", label: "Trusted Cleaners" },
				{ icon: "🛡️", value: "100%", label: "Bond-Back Guarantee" },
			],
			socialLinks: [
				{
					platform: "Facebook",
					url: "https://facebook.com/aastaclean",
					icon: "📘",
					followers: 2500,
					engagement: 4.2,
				},
				{
					platform: "Instagram",
					url: "https://instagram.com/aastaclean",
					icon: "📸",
					followers: 1800,
					engagement: 5.8,
				},
				{
					platform: "Google",
					url: "https://google.com/aastaclean",
					icon: "🔍",
					followers: 150,
					engagement: 8.5,
				},
			],
		},
	});
	console.log("✅ Admin settings seeded");

	console.log("\n🎉 Seed complete!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
