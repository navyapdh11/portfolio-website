// CSRF protection — Double-Submit Cookie Pattern
// 2026 enterprise standards: token in cookie + header, timing-safe comparison

import { randomBytes, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

const TRUSTED_ORIGINS = [
	process.env.NEXT_PUBLIC_BASE_URL || "https://www.aastaclean.com.au",
	"https://aastaclean.com.au",
	process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean) as string[];

export const CSRF_COOKIE_NAME = "csrf_token";
export const CSRF_HEADER_NAME = "X-CSRF-Token";

// ──────────────────────────────────────────────
// Token generation
// ──────────────────────────────────────────────

/**
 * Generate a cryptographically random CSRF token (32 bytes, hex-encoded).
 */
export function generateCsrfToken(): string {
	return randomBytes(32).toString("hex");
}

// ──────────────────────────────────────────────
// Cookie helper
// ──────────────────────────────────────────────

/**
 * Generate a Set-Cookie header value for the CSRF token.
 * Non-HttpOnly so client JS can read it for the double-submit pattern.
 */
export function csrfCookie(token?: string): string {
	const t = token || generateCsrfToken();
	return `${CSRF_COOKIE_NAME}=${t}; Path=/; Secure; SameSite=Strict`;
}

// ──────────────────────────────────────────────
// Verification
// ──────────────────────────────────────────────

/**
 * Extract the CSRF token value from the request's Cookie header.
 */
function extractCookieToken(request: Request): string | null {
	const cookieHeader = request.headers.get("cookie") || "";
	const match = cookieHeader.match(new RegExp(`(?:^|;)\\s*${CSRF_COOKIE_NAME}=([^;]+)`));
	return match ? match[1] || null : null;
}

export function csrfCheck(request: Request): {
	valid: boolean;
	error?: string;
	token?: string;
} {
	const method = request.method.toUpperCase();

	// For safe methods, generate a new token for the response
	if (!["POST", "PATCH", "PUT", "DELETE"].includes(method)) {
		return { valid: true, token: generateCsrfToken() };
	}

	// Double-submit cookie pattern: token must be present in both cookie and header
	const cookieToken = extractCookieToken(request);
	const headerToken = request.headers.get(CSRF_HEADER_NAME);

	if (!cookieToken || !headerToken) {
		return {
			valid: false,
			error: "CSRF validation failed — missing token in cookie or X-CSRF-Token header",
		};
	}

	// Timing-safe comparison prevents timing oracle attacks
	const cookieBuf = Buffer.from(cookieToken);
	const headerBuf = Buffer.from(headerToken);
	if (cookieBuf.length !== headerBuf.length || !timingSafeEqual(cookieBuf, headerBuf)) {
		return { valid: false, error: "CSRF validation failed — token mismatch" };
	}

	// Defense-in-depth: also validate Origin against trusted origins
	const origin = request.headers.get("origin");
	if (origin) {
		const isTrusted = TRUSTED_ORIGINS.some(
			(trusted) => trusted === origin || origin.endsWith(trusted.replace("https://", "")),
		);
		if (!isTrusted) {
			return {
				valid: false,
				error: `CSRF validation failed — untrusted Origin: ${origin}`,
			};
		}
	}

	return { valid: true };
}

/**
 * Standard CSRF check for API route handlers.
 * Returns a 403 NextResponse on failure, null on success.
 * For GET requests, also returns a Set-Cookie header to set the token.
 */
export function csrfResponse(request: Request): {
	response: NextResponse | null;
	cookie?: string;
} {
	const result = csrfCheck(request);
	if (!result.valid) {
		return {
			response: NextResponse.json({ error: result.error }, { status: 403 }),
		};
	}
	// For GET requests, provide a new CSRF token cookie
	if (result.token) {
		return { response: null, cookie: csrfCookie(result.token) };
	}
	return { response: null };
}

/**
 * Legacy compatibility: returns just the response (no cookie).
 * Use `csrfResponse` for the full result including cookie.
 */
export function csrfResponseLegacy(request: Request): NextResponse | null {
	const { response } = csrfResponse(request);
	return response;
}
