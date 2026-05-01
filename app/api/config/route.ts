// AASTACLEAN — Config API (Prisma-backed)
import { NextResponse } from "next/server";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { safeJson } from "@/lib/middleware/validation";
import { prisma } from "@/lib/prisma";

const CONFIG_KEY = "app_config";

export async function GET(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	try {
		const config = await prisma.config.findUnique({ where: { key: CONFIG_KEY } });
		if (!config) {
			const defaults = {
				cta: {
					title: "Ready to Work With Us?",
					description: "Get a free quote for your cleaning project.",
				},
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
			await prisma.config.create({
				data: { key: CONFIG_KEY, value: defaults },
			});
			return NextResponse.json(defaults);
		}
		return NextResponse.json(config.value);
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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
		const updates = parsed.data as Record<string, unknown> | undefined;

		const existing = await prisma.config.findUnique({ where: { key: CONFIG_KEY } });
		const merged = existing
			? { ...(existing.value as Record<string, unknown>), ...updates }
			: updates;

		const config = await prisma.config.upsert({
			where: { key: CONFIG_KEY },
			create: { key: CONFIG_KEY, value: merged as import("@prisma/client").Prisma.InputJsonValue },
			update: { value: merged as import("@prisma/client").Prisma.InputJsonValue },
		});
		return NextResponse.json({ success: true, config: config.value });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
