import { NextResponse } from "next/server";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/middleware/rateLimit";
import { prisma } from "@/lib/prisma";
import { QuoteSchema } from "@/lib/validation/schemas";

// ─── Shared helpers ────────────────────────────────────────────────────────
function buildQuoteData(parsed: unknown, rawBody: Record<string, unknown>) {
	const data = parsed as Record<string, unknown>;
	return {
		customerId: String(rawBody.customerId ?? null),
		customerName: String(data.customerName),
		customerEmail: String(data.customerEmail),
		customerPhone: String(data.customerPhone ?? ""),
		service: String(data.service),
		bedrooms: Number(data.bedrooms) || 0,
		bathrooms: Number(data.bathrooms) || 0,
		frequency: String(data.frequency ?? "one-time"),
		addons: (data.addons as string[]) || [],
		estimatedPrice: Number(data.estimatedPrice) || 0,
		suburb: String(data.suburb ?? ""),
		state: String(data.state ?? ""),
	};
}

// ─── Route handlers ────────────────────────────────────────────────────────
export async function GET(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	try {
		const quotes = await prisma.quote.findMany({ orderBy: { createdAt: "desc" } });
		return NextResponse.json({ data: quotes });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const limit = checkRateLimit(`api:${ip}:POST:quotes`);
	const headers = getRateLimitHeaders(limit);
	if (!limit.allowed) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429, headers },
		);
	}

	try {
		const rawBody = await request.json();
		const result = QuoteSchema.safeParse(rawBody);
		if (!result.success) return NextResponse.json({ error: result.error.issues }, { status: 400 });

		const user = validateAuth(request);
		if (user && user.role !== "admin")
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });

		const quote = await prisma.quote.create({ data: buildQuoteData(result.data, rawBody) });
		return NextResponse.json({ success: true, quote }, { status: 201, headers });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500, headers });
	}
}
