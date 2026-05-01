// AASTACLEAN — Audit Logger for API route write operations
// Logs admin actions with before/after state for compliance
import { prisma } from "@/lib/prisma";

export interface AuditEntry {
	actor: string;
	action: "create" | "update" | "delete" | "login" | "logout";
	resource: string;
	resourceId?: string;
	before?: Record<string, unknown> | null;
	after?: Record<string, unknown> | null;
	ip?: string;
	userAgent?: string;
}

export async function logAudit(entry: AuditEntry): Promise<void> {
	try {
		await prisma.auditLog.create({
			data: {
				actor: entry.actor,
				action: entry.action,
				resource: entry.resource,
				resourceId: entry.resourceId ?? null,
				before: (entry.before as any) ?? null,
				after: (entry.after as any) ?? null,
				ip: entry.ip ?? "",
				userAgent: entry.userAgent ?? "",
			},
		});
	} catch {
		// Silently fail — audit logging should not break user requests
	}
}

export function extractRequestContext(request: Request): Pick<AuditEntry, "ip" | "userAgent"> {
	return {
		ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown",
		userAgent: request.headers.get("user-agent") || "",
	};
}
