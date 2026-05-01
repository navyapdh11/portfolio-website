import { NextResponse } from "next/server";
import { db } from "@/lib/data/store";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/middleware/rateLimit";
import { ServiceSchema } from "@/lib/validation/schemas";

export async function GET(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;
	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	try {
		const services = db.services.getAll();
		return NextResponse.json({ data: services });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;
	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	// Rate limit
	const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const rateLimit = checkRateLimit(`api:${clientIp}:POST:services`);
	const rateLimitHeaders = getRateLimitHeaders(rateLimit);
	if (!rateLimit.allowed) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429, headers: rateLimitHeaders },
		);
	}

	try {
		const body = await request.json();
		const result = ServiceSchema.safeParse(body);
		if (!result.success) {
			return NextResponse.json({ error: result.error.issues }, { status: 400 });
		}

		const data = result.data;
		const service = db.services.create({
			title: data.title,
			icon: data.icon || "🧹",
			image: data.image || "",
			description: data.description || "",
			features: data.features || [],
			basePrice: data.basePrice,
			category: data.category || "residential",
			available: data.available ?? true,
			stock: data.stock || 0,
		});
		return NextResponse.json(
			{ success: true, service },
			{ status: 201, headers: rateLimitHeaders },
		);
	} catch (_err) {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500, headers: rateLimitHeaders },
		);
	}
}

export async function PATCH(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;
	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	// Rate limit
	const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const rateLimit = checkRateLimit(`api:${clientIp}:PATCH:services`);
	const rateLimitHeaders = getRateLimitHeaders(rateLimit);
	if (!rateLimit.allowed) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429, headers: rateLimitHeaders },
		);
	}

	try {
		const body = await request.json();
		if (!body.id) return NextResponse.json({ error: "ID required" }, { status: 400 });
		const service = db.services.update(body.id as string, body);
		if (!service)
			return NextResponse.json({ error: "Not found" }, { status: 404, headers: rateLimitHeaders });
		return NextResponse.json({ success: true, service }, { headers: rateLimitHeaders });
	} catch {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500, headers: rateLimitHeaders },
		);
	}
}

export async function DELETE(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;
	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	// Rate limit
	const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const rateLimit = checkRateLimit(`api:${clientIp}:DELETE:services`);
	const rateLimitHeaders = getRateLimitHeaders(rateLimit);
	if (!rateLimit.allowed) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429, headers: rateLimitHeaders },
		);
	}

	try {
		const body = await request.json();
		const { id } = body;
		if (!db.services.delete(id as string))
			return NextResponse.json({ error: "Not found" }, { status: 404, headers: rateLimitHeaders });
		return NextResponse.json({ success: true }, { headers: rateLimitHeaders });
	} catch {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500, headers: rateLimitHeaders },
		);
	}
}
