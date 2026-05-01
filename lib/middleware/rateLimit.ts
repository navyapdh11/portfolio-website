// Sliding-window rate limiter — 2026 enterprise standards
// Per-IP request tracking with configurable limits

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_ATTEMPTS = 5; // Max 5 attempts per window

interface AttemptWindow {
	count: number;
	firstAttempt: number;
}

const rateLimitStore = new Map<string, AttemptWindow>();

// Cleanup expired windows every 2 minutes
setInterval(
	() => {
		const now = Date.now();
		for (const [key, window] of rateLimitStore.entries()) {
			if (now - window.firstAttempt > WINDOW_MS) {
				rateLimitStore.delete(key);
			}
		}
	},
	2 * 60 * 1000,
);

export function checkRateLimit(key: string): {
	allowed: boolean;
	remaining: number;
	resetAt: number;
} {
	const now = Date.now();
	const existing = rateLimitStore.get(key);

	if (!existing || now - existing.firstAttempt > WINDOW_MS) {
		// New window
		rateLimitStore.set(key, { count: 1, firstAttempt: now });
		return {
			allowed: true,
			remaining: MAX_ATTEMPTS - 1,
			resetAt: now + WINDOW_MS,
		};
	}

	existing.count++;

	if (existing.count > MAX_ATTEMPTS) {
		return {
			allowed: false,
			remaining: 0,
			resetAt: existing.firstAttempt + WINDOW_MS,
		};
	}

	return {
		allowed: true,
		remaining: MAX_ATTEMPTS - existing.count,
		resetAt: existing.firstAttempt + WINDOW_MS,
	};
}

export function getRateLimitHeaders(result: {
	allowed: boolean;
	remaining: number;
	resetAt: number;
}) {
	return {
		"X-RateLimit-Limit": String(MAX_ATTEMPTS),
		"X-RateLimit-Remaining": String(result.remaining),
		"X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
	};
}
