import { NextResponse } from "next/server";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/middleware/rateLimit";
import { prisma } from "@/lib/prisma";
import { QuoteSchema } from "@/lib/validation/schemas";

export async function GET(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	try {
		const quotes = await prisma.quote.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json({ data: quotes });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	// Rate limit — 10 submissions per minute per IP
	const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const rateLimit = checkRateLimit(`api:${clientIp}:POST:quotes`);
	const rateLimitHeaders = getRateLimitHeaders(rateLimit);
	if (!rateLimit.allowed) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429, headers: rateLimitHeaders },
		);
	}

	try {
		const body = await request.json();
		const result = QuoteSchema.safeParse(body);
		if (!result.success) {
			return NextResponse.json({ error: result.error.issues }, { status: 400 });
		}

		const user = validateAuth(request);
		if (user && user.role !== "admin")
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });

		const data = result.data;
		const quote = await prisma.quote.create({
			data: {
				customerId: String(body.customerId || null),
				customerName: data.customerName,
				customerEmail: data.customerEmail,
				customerPhone: data.customerPhone || "",
				service: data.service,
				bedrooms: data.bedrooms || 0,
				bathrooms: data.bathrooms || 0,
				frequency: data.frequency || "one-time",
				addons: data.addons || [],
				estimatedPrice: data.estimatedPrice || 0,
				suburb: data.suburb || "",
				state: data.state || "",
			},
		});
		return NextResponse.json({ success: true, quote }, { status: 201, headers: rateLimitHeaders });
	} catch (_err) {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500, headers: rateLimitHeaders },
		);
	}
}
