// AASTACLEAN — Earnings API (Prisma-backed)
import { NextResponse } from "next/server";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { safeJson } from "@/lib/middleware/validation";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	try {
		const earnings = await prisma.earning.findMany({ orderBy: { date: "desc" } });
		const totalEarned = earnings.reduce((sum, e) => sum + e.amount, 0);
		return NextResponse.json({
			data: earnings,
			stats: {
				totalEarned,
				totalJobs: earnings.length,
			},
		});
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

	try {
		const parsed = await safeJson(request);
		if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
		const body = parsed.data ?? {};

		const entry = await prisma.earning.create({
			data: {
				description: String(body.description || ""),
				amount: Number(body.amount) || 0,
				type: String(body.type || "income"),
				category: String(body.category || "service"),
				date: new Date(String(body.date || new Date())),
			},
		});
		return NextResponse.json({ success: true, entry }, { status: 201 });
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

	try {
		const body = await request.json();
		const { id } = body;
		if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

		await prisma.earning.delete({ where: { id } });
		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
