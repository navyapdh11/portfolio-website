import { NextResponse } from "next/server";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { safeJson, sanitize, sanitizeEmail, validatePhone } from "@/lib/middleware/validation";
import { prisma } from "@/lib/prisma";

// ─── Sanitize a single field based on its known type ────────────────────────
function sanitizeField(key: string, value: unknown): Record<string, unknown> | NextResponse {
	if (key === "status") {
		const validStatuses = ["pending", "confirmed", "inProgress", "completed", "cancelled"];
		return { key, value: validStatuses.includes(value as string) ? value : "pending" };
	}
	if (key === "customerEmail" && typeof value === "string") {
		return { key, value: sanitizeEmail(value) };
	}
	if (key === "customerPhone" && typeof value === "string") {
		if (!validatePhone(value))
			return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
		return { key, value: sanitize(value) };
	}
	if (key === "date" && typeof value === "string") {
		return { key, value: new Date(value) };
	}
	if (typeof value === "string") {
		return { key, value: sanitize(value) };
	}
	return { key, value };
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	try {
		const { id } = await params;
		const parsed = await safeJson(request);
		if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
		const body = parsed.data ?? {};

		const safeBody: Record<string, unknown> = {};
		for (const [key, value] of Object.entries(body)) {
			const result = sanitizeField(key, value);
			if (result instanceof NextResponse) return result;
			safeBody[result.key as string] = result.value;
		}

		const booking = await prisma.booking.update({ where: { id }, data: safeBody });
		return NextResponse.json({ success: true, booking });
	} catch {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}
}
