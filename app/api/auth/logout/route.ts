import { NextResponse } from "next/server";
import { cookieAttrs, destroySession, TOKEN_COOKIE_NAME } from "@/lib/middleware/auth";
import { csrfResponse } from "@/lib/middleware/csrf";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/middleware/rateLimit";

export async function POST(request: Request) {
	// CSRF protection
	const { response: csrfResp } = csrfResponse(request);
	if (csrfResp) return csrfResp;

	// Rate limit
	const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const rateLimit = checkRateLimit(`api:${clientIp}:POST:logout`);
	const rateLimitHeaders = getRateLimitHeaders(rateLimit);
	if (!rateLimit.allowed) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429, headers: rateLimitHeaders },
		);
	}
	const cookies = request.headers?.get?.("cookie") || "";
	const match = cookies.match(new RegExp(`(?:^|;)\\s*${TOKEN_COOKIE_NAME}=([^;]+)`));
	if (match) destroySession(match[1]);

	return NextResponse.json(
		{ success: true },
		{
			headers: {
				"Set-Cookie": `${TOKEN_COOKIE_NAME}=; ${cookieAttrs(0)}; Max-Age=0`,
			},
		},
	);
}
