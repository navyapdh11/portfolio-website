// AASTACLEAN — Analytics API (Prisma-backed)
import { NextResponse } from "next/server";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/middleware/rateLimit";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const rateLimit = checkRateLimit(`api:${clientIp}:GET:analytics`);
	const rateLimitHeaders = getRateLimitHeaders(rateLimit);
	if (!rateLimit.allowed) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429, headers: rateLimitHeaders },
		);
	}

	try {
		const bookings = await prisma.booking.findMany();
		const customers = await prisma.customer.findMany();
		const services = await prisma.service.findMany();
		const quotes = await prisma.quote.findMany();

		const completedBookings = bookings.filter((b) => b.status === "completed");
		const totalRevenue = completedBookings.reduce((sum, b) => sum + b.totalPrice, 0);
		const pendingRevenue = bookings
			.filter((b) => b.status === "pending" || b.status === "confirmed")
			.reduce((sum, b) => sum + b.totalPrice, 0);
		const avgBookingValue = bookings.length
			? bookings.reduce((sum, b) => sum + b.totalPrice, 0) / bookings.length
			: 0;
		const completionRate = bookings.length ? (completedBookings.length / bookings.length) * 100 : 0;

		const bookingsByStatus = bookings.reduce(
			(acc, b) => {
				acc[b.status] = (acc[b.status] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		const servicesByCategory = services.reduce(
			(acc, s) => {
				acc[s.category] = (acc[s.category] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		const recentActivity = [...bookings]
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
			.slice(0, 10);

		const topCustomers = [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);

		const stockAlerts = services.filter((s) => s.stock < 10);

		return NextResponse.json(
			{
				analytics: {
					totalRevenue,
					pendingRevenue,
					avgBookingValue,
					completionRate,
					totalBookings: bookings.length,
					totalCustomers: customers.filter((c) => c.status === "active").length,
					totalServices: services.filter((s) => s.available).length,
					totalStock: services.reduce((sum, s) => sum + s.stock, 0),
				},
				bookingsByStatus,
				servicesByCategory,
				recentActivity,
				stockAlerts,
				topCustomers,
				totalQuotes: quotes.length,
			},
			{ headers: rateLimitHeaders },
		);
	} catch {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500, headers: rateLimitHeaders },
		);
	}
}
