import { NextResponse } from "next/server";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/middleware/rateLimit";
import { prisma } from "@/lib/prisma";
import { BookingSchema } from "@/lib/validation/schemas";

export async function GET(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	try {
		const bookings = await prisma.booking.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json({ data: bookings });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	// Rate limit — 10 submissions per minute per IP
	const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const rateLimit = checkRateLimit(`api:${clientIp}:POST:bookings`);
	const rateLimitHeaders = getRateLimitHeaders(rateLimit);
	if (!rateLimit.allowed) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429, headers: rateLimitHeaders },
		);
	}

	try {
		const body = await request.json();
		const result = BookingSchema.safeParse(body);
		if (!result.success) {
			return NextResponse.json({ error: result.error.issues }, { status: 400 });
		}

		const { name, email, phone, service, date } = result.data;
		const booking = await prisma.booking.create({
			data: {
				customerName: name,
				customerEmail: email,
				customerPhone: phone,
				service: service,
				date: new Date(date),
				address: String(body.address || ""),
				suburb: String(body.suburb || ""),
				state: String(body.state || ""),
				time: String(body.time || "09:00"),
				frequency: String(body.frequency || "one-time"),
				addons: Array.isArray(body.addons) ? body.addons.map((a: unknown) => String(a)) : [],
				totalPrice: Number(body.totalPrice) || 0,
				notes: String(body.notes || ""),
			},
		});
		return NextResponse.json(
			{ success: true, booking },
			{ status: 201, headers: rateLimitHeaders },
		);
	} catch (_err) {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500, headers: rateLimitHeaders },
		);
	}
}
