// AASTACLEAN — Microtasks API (Prisma-backed)
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
		const available = await prisma.microtask.findMany({
			where: { status: "pending" },
			orderBy: { createdAt: "desc" },
		});
		const completed = await prisma.microtask.findMany({
			where: { status: "completed" },
			orderBy: { updatedAt: "desc" },
		});
		const totalEarned = completed.reduce((sum, t) => sum + t.reward, 0);

		return NextResponse.json({
			available,
			completed,
			stats: {
				totalAvailable: available.length,
				totalCompleted: completed.length,
				totalEarned,
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
		const body = parsed.data as Record<string, unknown> | undefined;
		const taskId = body?.taskId as string | undefined;
		if (!taskId) return NextResponse.json({ error: "Task ID required" }, { status: 400 });

		const task = await prisma.microtask.findUnique({ where: { id: taskId } });
		if (!task || task.status !== "pending")
			return NextResponse.json({ error: "Task not found" }, { status: 404 });

		const updated = await prisma.microtask.update({
			where: { id: taskId as string },
			data: { status: "completed" },
		});
		return NextResponse.json({ success: true, task: updated });
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

		await prisma.microtask.delete({ where: { id } });
		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
