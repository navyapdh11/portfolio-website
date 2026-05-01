// AASTACLEAN — Gallery API (Prisma-backed)
import { NextResponse } from "next/server";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/middleware/rateLimit";
import { prisma } from "@/lib/prisma";
import { GallerySchema } from "@/lib/validation/schemas";

export async function GET(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;
	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	try {
		const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
		return NextResponse.json({ data: items });
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

	const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const rateLimit = checkRateLimit(`api:${clientIp}:POST:gallery`);
	const rateLimitHeaders = getRateLimitHeaders(rateLimit);
	if (!rateLimit.allowed) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429, headers: rateLimitHeaders },
		);
	}

	try {
		const body = await request.json();
		const result = GallerySchema.safeParse(body);
		if (!result.success) {
			return NextResponse.json({ error: result.error.issues }, { status: 400 });
		}

		const data = result.data;
		const item = await prisma.galleryItem.create({
			data: {
				title: data.title,
				description: data.description || "",
				imageUrl: data.imageUrl,
				category: data.category || "general",
				tags: data.tags || [],
				featured: !!data.featured,
			},
		});
		return NextResponse.json({ success: true, item }, { status: 201, headers: rateLimitHeaders });
	} catch {
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

	try {
		const body = await request.json();
		if (!body.id) return NextResponse.json({ error: "ID required" }, { status: 400 });
		const { id, ...updates } = body;
		const existing = await prisma.galleryItem.findUnique({ where: { id } });
		if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

		const item = await prisma.galleryItem.update({ where: { id }, data: updates });
		return NextResponse.json({ success: true, item });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;
	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const rateLimit = checkRateLimit(`api:${clientIp}:DELETE:gallery`);
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
		const existing = await prisma.galleryItem.findUnique({ where: { id } });
		if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

		await prisma.galleryItem.delete({ where: { id } });
		return NextResponse.json({ success: true }, { headers: rateLimitHeaders });
	} catch {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500, headers: rateLimitHeaders },
		);
	}
}
