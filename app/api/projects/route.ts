// AASTACLEAN — Projects API (Prisma-backed)
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateAuth } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { safeJson } from "@/lib/middleware/validation";
import { prisma } from "@/lib/prisma";

const ProjectSchema = z.object({
	title: z.string().min(1, "Title is required"),
	category: z.string().min(1, "Category is required"),
	location: z.string().min(1, "Location is required"),
	description: z.string().optional(),
	beforeImage: z.string().url("Invalid image URL").optional(),
	afterImage: z.string().url("Invalid image URL").optional(),
});

export async function GET(request: Request) {
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	const user = validateAuth(request);
	if (!user || user.role !== "admin")
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	try {
		const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
		return NextResponse.json({ data: projects });
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
		const result = ProjectSchema.safeParse(parsed.data!);
		if (!result.success) return NextResponse.json({ error: result.error.issues }, { status: 400 });

		const project = await prisma.project.create({ data: result.data });
		return NextResponse.json({ success: true, project }, { status: 201 });
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
		const body = parsed.data as Record<string, unknown> | undefined;
		if (!body?.id) return NextResponse.json({ error: "ID required" }, { status: 400 });
		const { id, ...updates } = body;

		const existing = await prisma.project.findUnique({ where: { id: id as string } });
		if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

		const project = await prisma.project.update({
			where: { id: id as string },
			data: updates as Partial<import("@prisma/client").Project>,
		});
		return NextResponse.json({ success: true, project });
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

		await prisma.project.delete({ where: { id } });
		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
