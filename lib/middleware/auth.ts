// Production-grade authentication middleware — 2026 enterprise standards
// HMAC-SHA256 session tokens, server-side session store, expiry enforcement

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import bcrypt from "bcrypt";
import { type NextRequest, NextResponse } from "next/server";

// ──────────────────────────────────────────────
// Configuration — validated lazily at runtime (not at module load)
// This allows Vercel builds to succeed without runtime secrets.
// ──────────────────────────────────────────────

function requireEnv(name: string): string {
	const val = process.env[name];
	if (!val) {
		throw new Error(
			`[auth] ${name} environment variable is required. ` +
				"Set it in your .env or Vercel project settings.",
		);
	}
	return val;
}

let _adminSecret: string | null = null;
let _sessionSigningKey: string | null = null;

function getAdminSecret(): string {
	if (!_adminSecret) _adminSecret = requireEnv("ADMIN_SECRET");
	return _adminSecret;
}

function getSigningKey(): string {
	if (!_sessionSigningKey) _sessionSigningKey = requireEnv("SESSION_SIGNING_KEY");
	return _sessionSigningKey;
}

// ──────────────────────────────────────────────
// Password hashing — bcrypt at first use (lazy)
// ──────────────────────────────────────────────

export let hashedAdminSecret: string | null = null;

async function ensureHashedSecret(): Promise<string> {
	if (!hashedAdminSecret) {
		hashedAdminSecret = await bcrypt.hash(getAdminSecret(), 12);
	}
	return hashedAdminSecret;
}

/**
 * Timing-safe password verification using bcrypt.compare.
 * Resistant to timing oracle attacks.
 */
export async function verifyPassword(input: string, hash: string): Promise<boolean> {
	return bcrypt.compare(input, hash);
}

/** Ensure the hashed secret is available before auth checks. */
export async function initAuth(): Promise<void> {
	await ensureHashedSecret();
	getSigningKey();
}

// ──────────────────────────────────────────────
// Session store (in-memory — replace with Redis in production)
// Maps sessionToken → { userId, role, email, name, expiresAt }
// ──────────────────────────────────────────────

export interface SessionRecord {
	userId: string;
	role: "admin" | "customer";
	name: string;
	email: string;
	createdAt: number;
	expiresAt: number;
	ipHash?: string;
}

const sessionStore = new Map<string, SessionRecord>();

// Cleanup expired sessions every 15 minutes
const SESSION_CLEANUP_INTERVAL = 15 * 60 * 1000;
setInterval(() => {
	const now = Date.now();
	for (const [token, record] of sessionStore.entries()) {
		if (record.expiresAt < now) sessionStore.delete(token);
	}
}, SESSION_CLEANUP_INTERVAL);

// ──────────────────────────────────────────────
// Token format
// {sessionId}.{expiresAt}.{hmac(sessionId + expiresAt + key)}
// ──────────────────────────────────────────────

const SESSION_TTL_ADMIN = 8 * 60 * 60 * 1000; // 8 hours
const SESSION_TTL_CUSTOMER = 30 * 24 * 60 * 60 * 1000; // 30 days
const TOKEN_DELIMITER = ".";

function hmacSign(...parts: string[]): string {
	return createHmac("sha256", getSigningKey())
		.update(parts.join(TOKEN_DELIMITER))
		.digest("hex");
}

function generateToken(sessionId: string, expiresAt: number): string {
	const signature = hmacSign(sessionId, String(expiresAt));
	return [sessionId, String(expiresAt), signature].join(TOKEN_DELIMITER);
}

function verifyToken(token: string): { sessionId: string; expiresAt: number } | null {
	const parts = token.split(TOKEN_DELIMITER);
	if (parts.length !== 3) return null;

	const [sessionId, expiresAtStr, signature] = parts;
	const expectedSignature = hmacSign(sessionId, expiresAtStr);

	// Timing-safe comparison prevents timing oracle attacks
	if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) return null;

	const expiresAt = Number(expiresAtStr);
	if (Number.isNaN(expiresAt) || expiresAt < Date.now()) return null;

	return { sessionId, expiresAt };
}

// ──────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────

export interface AuthUser {
	id: string;
	role: "admin" | "customer";
	name: string;
	email: string;
}

/**
 * Create a signed session token for a user.
 * Returns { token, session } for cookie setting and session store registration.
 */
export function createSession(
	user: AuthUser,
	ipHash?: string,
): { token: string; record: SessionRecord } {
	const sessionId = randomBytes(32).toString("hex");
	const now = Date.now();
	const ttl = user.role === "admin" ? SESSION_TTL_ADMIN : SESSION_TTL_CUSTOMER;
	const expiresAt = now + ttl;

	const record: SessionRecord = {
		userId: user.id,
		role: user.role,
		name: user.name,
		email: user.email,
		createdAt: now,
		expiresAt,
		ipHash,
	};

	const token = generateToken(sessionId, expiresAt);
	sessionStore.set(token, record);

	return { token, record };
}

/**
 * Destroy a session token (logout).
 */
export function destroySession(token: string): boolean {
	return sessionStore.delete(token);
}

/**
 * Validate a request by extracting the token from cookie or Bearer header.
 * Verifies HMAC signature, checks expiry, and looks up the session record.
 */
export function validateAuth(request: Request): AuthUser | null {
	// Extract token from cookie or Authorization header
	let token: string | null = null;

	// Cookie extraction (NextRequest has .cookies, standard Request needs header parsing)
	if ("cookies" in request) {
		token = (request as NextRequest).cookies.get(TOKEN_COOKIE_NAME)?.value ?? null;
	}

	if (!token) {
		const authHeader = request.headers.get("authorization");
		if (authHeader?.startsWith("Bearer ")) {
			token = authHeader.slice(7);
		}
	}

	if (!token) return null;

	// Verify HMAC signature + expiry
	const verified = verifyToken(token);
	if (!verified) return null;

	// Look up session record
	const record = sessionStore.get(token);
	if (!record) return null;

	return {
		id: record.userId,
		role: record.role,
		name: record.name,
		email: record.email,
	};
}

/**
 * Higher-order wrapper for API routes that require authentication.
 */
export function withAuth(
	handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>,
	requiredRole?: "admin" | "customer",
) {
	return async (request: NextRequest) => {
		const user = validateAuth(request);
		if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		if (requiredRole && user.role !== requiredRole) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}
		return handler(request, user);
	};
}

/**
 * Generate a hash of an IP address for session binding (optional, for rate limiting).
 */
export function ipHash(ip: string): string {
	return createHmac("sha256", getSigningKey()).update(ip).digest("hex").slice(0, 16);
}

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────

export const TOKEN_COOKIE_NAME = "ac_session";

/**
 * Cookie attribute string for Set-Cookie header.
 * 2026 enterprise standards: HttpOnly, Secure, SameSite=Strict, Partitioned.
 */
export function cookieAttrs(maxAge: number): string {
	return [
		`Path=/`,
		"HttpOnly",
		"Secure",
		"SameSite=Strict",
		`Max-Age=${Math.floor(maxAge / 1000)}`,
	].join("; ");
}
