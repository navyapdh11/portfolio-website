import { NextResponse } from "next/server";
import {
	cookieAttrs,
	createSession,
	hashedAdminSecret,
	TOKEN_COOKIE_NAME,
	verifyPassword,
} from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/middleware/rateLimit";
import { safeJson } from "@/lib/middleware/validation";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
	// CSRF check
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	// Rate limit — 5 attempts per minute per IP
	const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const rateLimit = checkRateLimit(`login:${clientIp}`);
	const rateLimitHeaders = getRateLimitHeaders(rateLimit);

	if (!rateLimit.allowed) {
		return NextResponse.json(
			{ error: "Too many login attempts. Please try again later." },
			{ status: 429, headers: rateLimitHeaders },
		);
	}

	const parsed = await safeJson(request);
	if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
	const { email, password, role } = parsed.data as Record<string, string>;

	// Admin login — bcrypt comparison against hashed secret
	if (role === "admin") {
		const validPassword = await verifyPassword(password, hashedAdminSecret);
		if (validPassword) {
			const { token } = createSession(
				{
					id: "admin-1",
					role: "admin",
					name: "Administrator",
					email: "admin@aastaclean.com.au",
				},
				clientIp,
			);
			return NextResponse.json(
				{
					success: true,
					user: { id: "admin-1", role: "admin", name: "Administrator", email },
				},
				{
					status: 200,
					headers: {
						...rateLimitHeaders,
						"Set-Cookie": `${TOKEN_COOKIE_NAME}=${token}; ${cookieAttrs(8 * 60 * 60 * 1000)}`,
					},
				},
			);
		}
		return NextResponse.json(
			{ error: "Invalid credentials" },
			{ status: 401, headers: rateLimitHeaders },
		);
	}

	// Customer login
	if (role === "customer" && email) {
		const customer = await prisma.customer.findUnique({ where: { email } });
		if (customer) {
			const { token } = createSession(
				{
					id: customer.id,
					role: "customer",
					name: customer.name,
					email: customer.email,
				},
				clientIp,
			);
			return NextResponse.json(
				{
					success: true,
					user: {
						id: customer.id,
						role: "customer",
						name: customer.name,
						email: customer.email,
					},
				},
				{
					status: 200,
					headers: {
						...rateLimitHeaders,
						"Set-Cookie": `${TOKEN_COOKIE_NAME}=${token}; ${cookieAttrs(30 * 24 * 60 * 60 * 1000)}`,
					},
				},
			);
		}
	}

	return NextResponse.json(
		{ error: "Invalid credentials" },
		{ status: 401, headers: rateLimitHeaders },
	);
}
