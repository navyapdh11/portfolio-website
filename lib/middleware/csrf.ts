// CSRF protection — Origin/Referer validation for state-changing requests
// 2026 enterprise standards: validates that same-origin requests originate from trusted origins

import { NextResponse } from 'next/server';

const TRUSTED_ORIGINS = [
  process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aastaclean.com.au',
  'https://aastaclean.com.au',
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean) as string[];

export function csrfCheck(request: Request): { valid: boolean; error?: string } {
  // Only check state-changing methods
  const method = request.method.toUpperCase();
  if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
    return { valid: true };
  }

  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  // No Origin header (e.g., curl, API clients) — allow but log
  if (!origin && !referer) {
    // For API calls with Bearer tokens, skip CSRF check
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) return { valid: true };
    // Cookie-based requests without Origin are suspicious
    return { valid: false, error: 'CSRF validation failed — missing Origin header' };
  }

  // Validate Origin against trusted origins
  const requestOrigin = origin || (referer ? new URL(referer).origin : null);
  if (!requestOrigin) return { valid: false, error: 'CSRF validation failed — unparseable Origin' };

  const isTrusted = TRUSTED_ORIGINS.some(
    trusted => trusted === requestOrigin || requestOrigin.endsWith(trusted.replace('https://', '')),
  );

  if (!isTrusted) {
    return { valid: false, error: `CSRF validation failed — untrusted Origin: ${requestOrigin}` };
  }

  return { valid: true };
}

export function csrfResponse(request: Request) {
  const result = csrfCheck(request);
  if (!result.valid) {
    return NextResponse.json({ error: result.error }, { status: 403 });
  }
  return null;
}
