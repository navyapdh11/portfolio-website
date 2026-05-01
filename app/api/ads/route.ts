// AASTACLEAN — Ad Campaigns API (Prisma-backed)
import { NextResponse } from "next/server";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/middleware/rateLimit";
import { safeJson } from "@/lib/middleware/validation";
import { prisma } from "@/lib/prisma";

// ─── Shared middleware ────────────────────────────────────────────────────
function checkAdminAuth(request: Request, method: string) {
	const { response } = csrfResponse(request);
	if (response) return { error: response };

	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };

	const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const limit = checkRateLimit(`api:${ip}:${method}:ads`);
	if (!limit.allowed) {
		return {
			error: NextResponse.json(
				{ error: "Too many requests. Please try again later." },
				{ status: 429, headers: getRateLimitHeaders(limit) },
			),
		};
	}
	return { headers: getRateLimitHeaders(limit) };
}

function buildCampaignData(body: Record<string, unknown>) {
	return {
		platform: String(body.platform ?? "google"),
		name: String(body.name ?? ""),
		status: "active" as const,
		budget: Number(body.budget) || 0,
		spent: Number(body.spent) || 0,
		impressions: Number(body.impressions) || 0,
		clicks: Number(body.clicks) || 0,
		conversions: Number(body.conversions) || 0,
		ctr: Number(body.ctr) || 0,
		roas: Number(body.roas) || 0,
	};
}

// ─── Route handlers ───────────────────────────────────────────────────────
export async function GET(request: Request) {
	const result = checkAdminAuth(request, "GET");
	if ("error" in result && result.error) return result.error as NextResponse;
	const headers = result.headers;

	try {
		const campaigns = await prisma.adCampaign.findMany({ orderBy: { createdAt: "desc" } });
		return NextResponse.json({ data: campaigns }, { headers });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	const result = checkAdminAuth(request, "POST");
	if ("error" in result && result.error) return result.error as NextResponse;
	const headers = result.headers;

	try {
		const parsed = await safeJson(request);
		if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
		const body = parsed.data ?? {};

		const campaign = await prisma.adCampaign.create({ data: buildCampaignData(body) });
		return NextResponse.json({ success: true, campaign }, { status: 201, headers });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500, headers });
	}
}

export async function PATCH(request: Request) {
	const result = checkAdminAuth(request, "PATCH");
	if ("error" in result && result.error) return result.error as NextResponse;
	const headers = result.headers;

	try {
		const parsed = await safeJson(request);
		if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
		const body = parsed.data as Record<string, unknown> | undefined;
		if (!body?.id) return NextResponse.json({ error: "ID required" }, { status: 400 });
		const { id, ...updates } = body;

		const campaign = await prisma.adCampaign.update({
			where: { id: id as string },
			data: updates as Partial<import("@prisma/client").AdCampaign>,
		});
		return NextResponse.json({ success: true, campaign }, { headers });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500, headers });
	}
}
