// Rate limiter — in-memory LRU for Vercel serverless
// Note: In production, use Redis/Upstash for distributed rate limiting

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const DEFAULT_LIMIT = 30; // requests per window
const WINDOW_MS = 60 * 1000; // 1 minute

export function rateLimit(ip: string, limit = DEFAULT_LIMIT): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}

// Input sanitization
export function sanitize(str: string): string {
  return str
    .replace(/[<>]/g, "") // strip HTML tags
    .replace(/javascript:/gi, "")
    .trim()
    .slice(0, 500); // cap length
}

export function sanitizeEmail(email: string): string {
  const cleaned = email.toLowerCase().trim().slice(0, 255);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleaned)) throw new Error("Invalid email format");
  return cleaned;
}

export function sanitizePhone(phone: string): string {
  const cleaned = phone.replace(/[^\d+()-]/g, "").slice(0, 20);
  if (cleaned.length < 8) throw new Error("Invalid phone number");
  return cleaned;
}

// Validation helpers
export function validateRequired(
  body: Record<string, unknown>,
  fields: string[]
): string | null {
  for (const field of fields) {
    if (!body[field] || (typeof body[field] === "string" && !(body[field] as string).trim())) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
}

export function validateEnum(
  value: string,
  allowed: string[],
  fieldName: string
): string | null {
  if (!allowed.includes(value)) {
    return `Invalid ${fieldName}: must be one of ${allowed.join(", ")}`;
  }
  return null;
}
