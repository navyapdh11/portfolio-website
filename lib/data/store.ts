// Enterprise in-memory data store with proper typing
// In production, replace with PostgreSQL/Prisma

export interface Booking {
	id: string;
	customerId: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	service: string;
	address: string;
	suburb: string;
	state: string;
	date: string;
	time: string;
	frequency: string;
	addons: string[];
	status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
	totalPrice: number;
	notes: string;
	createdAt: string;
	updatedAt: string;
}

export interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	addresses: Address[];
	loyaltyPoints: number;
	totalBookings: number;
	totalSpent: number;
	lastBooking: string;
	status: "active" | "inactive" | "prospect";
	reviews: CustomerReview[];
	notifications: Notification[];
	createdAt: string;
}

export interface Address {
	id: string;
	street: string;
	suburb: string;
	state: string;
	postcode: string;
	isDefault: boolean;
}

export interface CustomerReview {
	id: string;
	bookingId: string;
	rating: number;
	comment: string;
	createdAt: string;
}

export interface Notification {
	id: string;
	type: "booking" | "payment" | "promo" | "system";
	title: string;
	message: string;
	read: boolean;
	createdAt: string;
}

export interface Quote {
	id: string;
	customerId: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	service: string;
	bedrooms: number;
	bathrooms: number;
	frequency: string;
	addons: string[];
	estimatedPrice: number;
	suburb: string;
	state: string;
	status: "new" | "contacted" | "quoted" | "accepted" | "rejected";
	createdAt: string;
}

export interface Service {
	id: string;
	title: string;
	icon: string;
	image: string;
	description: string;
	features: string[];
	basePrice: number;
	category: string;
	available: boolean;
	stock: number;
	createdAt: string;
}

export interface GalleryItem {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	category: string;
	tags: string[];
	featured: boolean;
	createdAt: string;
}

export interface PricingConfig {
	id: string;
	serviceId: string;
	basePrice: number;
	pricePerBedroom: number;
	pricePerBathroom: number;
	discounts: Discount[];
	surcharges: Surcharge[];
}

export interface Discount {
	id: string;
	type: "percentage" | "fixed";
	value: number;
	label: string;
	frequency: string;
}

export interface Surcharge {
	id: string;
	type: "distance" | "urgency" | "size";
	value: number;
	label: string;
	threshold: number;
}

export interface CartItem {
	id: string;
	serviceId: string;
	serviceTitle: string;
	price: number;
	quantity: number;
	addons: string[];
}

export interface AdminSettings {
	id: string;
	ctaTitle: string;
	ctaDescription: string;
	ctaButtonText: string;
	ctaButtonLink: string;
	heroTitle: string;
	heroSubtitle: string;
	trustStats: TrustStat[];
	socialLinks: SocialLink[];
}

export interface TrustStat {
	icon: string;
	value: string;
	label: string;
}

export interface SocialLink {
	platform: string;
	url: string;
	icon: string;
	followers: number;
	engagement: number;
}

// In-memory store
const bookings: Booking[] = [
	{
		id: "b1",
		customerId: "c1",
		customerName: "Sarah Wilson",
		customerEmail: "sarah@email.com",
		customerPhone: "0412345678",
		service: "House Cleaning",
		address: "123 Tate St",
		suburb: "West Leederville",
		state: "WA",
		date: "2026-05-01",
		time: "09:00",
		frequency: "weekly",
		addons: ["window-cleaning"],
		status: "confirmed",
		totalPrice: 180,
		notes: "",
		createdAt: "2026-04-25T10:00:00Z",
		updatedAt: "2026-04-25T10:00:00Z",
	},
	{
		id: "b2",
		customerId: "c2",
		customerName: "James Chen",
		customerEmail: "james@email.com",
		customerPhone: "0423456789",
		service: "End of Lease Cleaning",
		address: "45 Rokeby Rd",
		suburb: "Subiaco",
		state: "WA",
		date: "2026-05-03",
		time: "08:00",
		frequency: "one-time",
		addons: [],
		status: "pending",
		totalPrice: 320,
		notes: "Need bond receipt",
		createdAt: "2026-04-26T14:00:00Z",
		updatedAt: "2026-04-26T14:00:00Z",
	},
	{
		id: "b3",
		customerId: "c3",
		customerName: "Emma Rodriguez",
		customerEmail: "emma@email.com",
		customerPhone: "0434567890",
		service: "Commercial Cleaning",
		address: "Level 5, 100 St Georges Tce",
		suburb: "Perth CBD",
		state: "WA",
		date: "2026-05-02",
		time: "18:00",
		frequency: "daily",
		addons: ["carpet-cleaning", "window-cleaning"],
		status: "in-progress",
		totalPrice: 450,
		notes: "After hours only",
		createdAt: "2026-04-27T09:00:00Z",
		updatedAt: "2026-04-27T09:00:00Z",
	},
];

const customers: Customer[] = [
	{
		id: "c1",
		name: "Sarah Wilson",
		email: "sarah@email.com",
		phone: "0412345678",
		addresses: [
			{
				id: "a1",
				street: "123 Tate St",
				suburb: "West Leederville",
				state: "WA",
				postcode: "6007",
				isDefault: true,
			},
		],
		loyaltyPoints: 450,
		totalBookings: 12,
		totalSpent: 2160,
		lastBooking: "2026-04-25",
		status: "active",
		reviews: [
			{
				id: "r1",
				bookingId: "b1",
				rating: 5,
				comment: "Excellent service!",
				createdAt: "2026-04-20",
			},
		],
		notifications: [
			{
				id: "n1",
				type: "booking",
				title: "Booking Confirmed",
				message: "Your cleaning is confirmed for May 1",
				read: false,
				createdAt: "2026-04-25",
			},
			{
				id: "n2",
				type: "promo",
				title: "20% Off Next Clean",
				message: "Loyalty discount applied!",
				read: false,
				createdAt: "2026-04-24",
			},
		],
		createdAt: "2025-10-15",
	},
	{
		id: "c2",
		name: "James Chen",
		email: "james@email.com",
		phone: "0423456789",
		addresses: [
			{
				id: "a2",
				street: "45 Rokeby Rd",
				suburb: "Subiaco",
				state: "WA",
				postcode: "6008",
				isDefault: true,
			},
		],
		loyaltyPoints: 180,
		totalBookings: 5,
		totalSpent: 1600,
		lastBooking: "2026-04-26",
		status: "active",
		reviews: [],
		notifications: [
			{
				id: "n3",
				type: "booking",
				title: "Booking Pending",
				message: "Your booking is being reviewed",
				read: false,
				createdAt: "2026-04-26",
			},
		],
		createdAt: "2026-01-20",
	},
	{
		id: "c3",
		name: "Emma Rodriguez",
		email: "emma@email.com",
		phone: "0434567890",
		addresses: [
			{
				id: "a3",
				street: "100 St Georges Tce",
				suburb: "Perth CBD",
				state: "WA",
				postcode: "6000",
				isDefault: true,
			},
		],
		loyaltyPoints: 890,
		totalBookings: 28,
		totalSpent: 12600,
		lastBooking: "2026-04-27",
		status: "active",
		reviews: [
			{
				id: "r2",
				bookingId: "b3",
				rating: 5,
				comment: "Best commercial cleaning!",
				createdAt: "2026-04-15",
			},
		],
		notifications: [],
		createdAt: "2025-06-10",
	},
];

const quotes: Quote[] = [
	{
		id: "q1",
		customerId: "c1",
		customerName: "Sarah Wilson",
		customerEmail: "sarah@email.com",
		customerPhone: "0412345678",
		service: "Deep Cleaning",
		bedrooms: 3,
		bathrooms: 2,
		frequency: "one-time",
		addons: [],
		estimatedPrice: 350,
		suburb: "West Leederville",
		state: "WA",
		status: "accepted",
		createdAt: "2026-04-24",
	},
];

const services: Service[] = [
	{
		id: "s1",
		title: "House Cleaning",
		icon: "🏠",
		image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
		description: "Regular maintenance cleaning for homes",
		features: ["Dusting", "Vacuuming", "Mopping", "Kitchen", "Bathroom"],
		basePrice: 120,
		category: "residential",
		available: true,
		stock: 50,
		createdAt: "2025-01-01",
	},
	{
		id: "s2",
		title: "End of Lease Cleaning",
		icon: "🔑",
		image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600",
		description: "Bond-back guaranteed cleaning",
		features: ["Deep Clean", "Bond Guarantee", "48hr Turnaround"],
		basePrice: 250,
		category: "residential",
		available: true,
		stock: 20,
		createdAt: "2025-01-01",
	},
	{
		id: "s3",
		title: "Commercial Cleaning",
		icon: "🏢",
		image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
		description: "Professional office cleaning",
		features: ["After Hours", "Custom Plans", "Insured"],
		basePrice: 180,
		category: "commercial",
		available: true,
		stock: 30,
		createdAt: "2025-01-01",
	},
	{
		id: "s4",
		title: "Carpet Cleaning",
		icon: "🧹",
		image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600",
		description: "Deep steam cleaning",
		features: ["Steam Clean", "Stain Removal", "Quick Dry"],
		basePrice: 90,
		category: "specialty",
		available: true,
		stock: 40,
		createdAt: "2025-01-01",
	},
	{
		id: "s5",
		title: "Window Cleaning",
		icon: "🪟",
		image: "https://images.unsplash.com/photo-1581094794329-c8112a472a14?w=600",
		description: "Crystal clear windows",
		features: ["Inside & Out", "High-Rise", "Streak-Free"],
		basePrice: 80,
		category: "specialty",
		available: true,
		stock: 35,
		createdAt: "2025-01-01",
	},
	{
		id: "s6",
		title: "Deep Cleaning",
		icon: "✨",
		image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
		description: "Intensive top-to-bottom clean",
		features: ["Full House", "Behind Appliances", "Sanitization"],
		basePrice: 300,
		category: "residential",
		available: true,
		stock: 15,
		createdAt: "2025-01-01",
	},
];

const galleryItems: GalleryItem[] = [
	{
		id: "g1",
		title: "CBD Office Tower",
		description: "Complete commercial cleaning",
		imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
		category: "commercial",
		tags: ["office", "tower"],
		featured: true,
		createdAt: "2026-01-15",
	},
	{
		id: "g2",
		title: "West Leederville Home",
		description: "Family home deep clean",
		imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
		category: "residential",
		tags: ["home", "deep-clean"],
		featured: true,
		createdAt: "2026-02-20",
	},
	{
		id: "g3",
		title: "Subiaco Apartment",
		description: "Bond-back end of lease",
		imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600",
		category: "end-of-lease",
		tags: ["bond", "apartment"],
		featured: false,
		createdAt: "2026-03-10",
	},
	{
		id: "g4",
		title: "Nedlands Medical Centre",
		description: "Medical-grade sanitization",
		imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600",
		category: "commercial",
		tags: ["medical", "sanitization"],
		featured: true,
		createdAt: "2026-04-05",
	},
];

let adminSettings: AdminSettings = {
	id: "settings-1",
	ctaTitle: "Ready to Work With Us?",
	ctaDescription:
		"Get a free quote for your cleaning project. Whether it's residential, commercial, or end-of-lease, we deliver exceptional results.",
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
};

// CRUD Operations
export const db = {
	bookings: {
		getAll: (): Booking[] => bookings,
		getById: (id: string): Booking | undefined => bookings.find((b) => b.id === id),
		create: (data: Omit<Booking, "id" | "createdAt" | "updatedAt">): Booking => {
			const booking: Booking = {
				...data,
				id: `b${Date.now()}`,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			bookings.push(booking);
			return booking;
		},
		update: (id: string, data: Partial<Booking>): Booking | undefined => {
			const idx = bookings.findIndex((b) => b.id === id);
			if (idx === -1) return undefined;
			bookings[idx] = {
				...bookings[idx],
				...data,
				updatedAt: new Date().toISOString(),
			};
			return bookings[idx];
		},
		delete: (id: string): boolean => {
			const idx = bookings.findIndex((b) => b.id === id);
			if (idx === -1) return false;
			bookings.splice(idx, 1);
			return true;
		},
		getByCustomerId: (customerId: string): Booking[] =>
			bookings.filter((b) => b.customerId === customerId),
	},
	customers: {
		getAll: (): Customer[] => customers,
		getById: (id: string): Customer | undefined => customers.find((c) => c.id === id),
		create: (data: Omit<Customer, "id" | "createdAt">): Customer => {
			const customer: Customer = {
				...data,
				id: `c${Date.now()}`,
				createdAt: new Date().toISOString(),
			};
			customers.push(customer);
			return customer;
		},
		update: (id: string, data: Partial<Customer>): Customer | undefined => {
			const idx = customers.findIndex((c) => c.id === id);
			if (idx === -1) return undefined;
			customers[idx] = { ...customers[idx], ...data };
			return customers[idx];
		},
		delete: (id: string): boolean => {
			const idx = customers.findIndex((c) => c.id === id);
			if (idx === -1) return false;
			customers.splice(idx, 1);
			return true;
		},
	},
	quotes: {
		getAll: (): Quote[] => quotes,
		getById: (id: string): Quote | undefined => quotes.find((q) => q.id === id),
		create: (data: Omit<Quote, "id" | "createdAt">): Quote => {
			const quote: Quote = {
				...data,
				id: `q${Date.now()}`,
				createdAt: new Date().toISOString(),
			};
			quotes.push(quote);
			return quote;
		},
		update: (id: string, data: Partial<Quote>): Quote | undefined => {
			const idx = quotes.findIndex((q) => q.id === id);
			if (idx === -1) return undefined;
			quotes[idx] = { ...quotes[idx], ...data };
			return quotes[idx];
		},
	},
	services: {
		getAll: (): Service[] => services,
		getById: (id: string): Service | undefined => services.find((s) => s.id === id),
		create: (data: Omit<Service, "id" | "createdAt">): Service => {
			const service: Service = {
				...data,
				id: `s${Date.now()}`,
				createdAt: new Date().toISOString(),
			};
			services.push(service);
			return service;
		},
		update: (id: string, data: Partial<Service>): Service | undefined => {
			const idx = services.findIndex((s) => s.id === id);
			if (idx === -1) return undefined;
			services[idx] = { ...services[idx], ...data };
			return services[idx];
		},
		delete: (id: string): boolean => {
			const idx = services.findIndex((s) => s.id === id);
			if (idx === -1) return false;
			services.splice(idx, 1);
			return true;
		},
	},
	gallery: {
		getAll: (): GalleryItem[] => galleryItems,
		getById: (id: string): GalleryItem | undefined => galleryItems.find((g) => g.id === id),
		create: (data: Omit<GalleryItem, "id" | "createdAt">): GalleryItem => {
			const item: GalleryItem = {
				...data,
				id: `g${Date.now()}`,
				createdAt: new Date().toISOString(),
			};
			galleryItems.push(item);
			return item;
		},
		update: (id: string, data: Partial<GalleryItem>): GalleryItem | undefined => {
			const idx = galleryItems.findIndex((g) => g.id === id);
			if (idx === -1) return undefined;
			galleryItems[idx] = { ...galleryItems[idx], ...data };
			return galleryItems[idx];
		},
		delete: (id: string): boolean => {
			const idx = galleryItems.findIndex((g) => g.id === id);
			if (idx === -1) return false;
			galleryItems.splice(idx, 1);
			return true;
		},
	},
	settings: {
		get: (): AdminSettings => adminSettings,
		update: (data: Partial<AdminSettings>): AdminSettings => {
			adminSettings = { ...adminSettings, ...data };
			return adminSettings;
		},
	},
};

// Analytics helpers
export function getAnalytics() {
	const totalRevenue = bookings
		.filter((b) => b.status === "completed")
		.reduce((sum, b) => sum + b.totalPrice, 0);
	const pendingRevenue = bookings
		.filter((b) => b.status === "pending" || b.status === "confirmed")
		.reduce((sum, b) => sum + b.totalPrice, 0);
	const avgBookingValue = bookings.length
		? bookings.reduce((sum, b) => sum + b.totalPrice, 0) / bookings.length
		: 0;
	const completionRate = bookings.length
		? (bookings.filter((b) => b.status === "completed").length / bookings.length) * 100
		: 0;

	return {
		totalRevenue,
		pendingRevenue,
		avgBookingValue,
		completionRate,
		totalBookings: bookings.length,
		totalCustomers: customers.filter((c) => c.status === "active").length,
		totalServices: services.filter((s) => s.available).length,
		totalStock: services.reduce((sum, s) => sum + s.stock, 0),
	};
}
