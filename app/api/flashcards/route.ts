// AASTACLEAN — Flashcards API (Prisma-backed)
import { NextResponse } from "next/server";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/middleware/rateLimit";
import { safeJson } from "@/lib/middleware/validation";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	try {
		const flashcards = await prisma.flashcard.findMany({
			orderBy: [{ category: "asc" }, { order: "asc" }],
		});
		return NextResponse.json({ data: flashcards });
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
	const rateLimit = checkRateLimit(`api:${clientIp}:POST:flashcards`);
	const rateLimitHeaders = getRateLimitHeaders(rateLimit);
	if (!rateLimit.allowed) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429, headers: rateLimitHeaders },
		);
	}

	try {
		const parsed = await safeJson(request);
		if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
		const body = parsed.data!;
		const maxOrder = await prisma.flashcard.aggregate({ _max: { order: true } });
		const card = await prisma.flashcard.create({
			data: {
				question: String(body.question || ""),
				answer: String(body.answer || ""),
				category: String(body.category || "general"),
				tags: Array.isArray(body.tags) ? body.tags : [],
				order: (maxOrder._max.order ?? 0) + 1,
			},
		});
		return NextResponse.json({ success: true, card }, { status: 201, headers: rateLimitHeaders });
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
		const parsed = await safeJson(request);
		if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
		const body = parsed.data as Record<string, unknown> | undefined;
		if (!body?.id) return NextResponse.json({ error: "ID required" }, { status: 400 });
		const { id, ...updates } = body;

		const card = await prisma.flashcard.update({
			where: { id: id as string },
			data: updates as Partial<import("@prisma/client").Flashcard>,
		});
		return NextResponse.json({ success: true, card });
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
	const rateLimit = checkRateLimit(`api:${clientIp}:DELETE:flashcards`);
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
		if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

		await prisma.flashcard.delete({ where: { id } });
		return NextResponse.json({ success: true }, { headers: rateLimitHeaders });
	} catch {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500, headers: rateLimitHeaders },
		);
	}
}
