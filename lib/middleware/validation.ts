// Enterprise validation layer for all API routes
// Centralized schema validation, sanitization, and error handling

export interface ApiError {
  field?: string;
  message: string;
  code: string;
}

export interface ValidationResult<T = unknown> {
  success: boolean;
  data?: T;
  errors?: ApiError[];
}

export function sanitize(str: string): string {
  return str.replace(/[<>&"']/g, (c) => {
    const map: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#x27;' };
    return map[c] || c;
  });
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function validateRequired(body: Record<string, unknown>, fields: string[]): ValidationResult {
  const errors: ApiError[] = [];
  for (const field of fields) {
    if (!body[field] || (typeof body[field] === 'string' && !body[field].trim())) {
      errors.push({ field, message: `${field} is required`, code: 'REQUIRED' });
    }
  }
  return errors.length ? { success: false, errors } : { success: true };
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return /^[+]?[\d\s()-]{8,}$/.test(phone);
}

export function validateEnum<T extends string>(value: T, validValues: T[]): boolean {
  return validValues.includes(value);
}

export function validateNumber(value: unknown, min?: number, max?: number): boolean {
  const num = Number(value);
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
}

export function validateDate(dateStr: string): boolean {
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

export function sanitizeObject(obj: Record<string, unknown>, fields: string[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const field of fields) {
    if (typeof obj[field] === 'string') {
      result[field] = sanitize(obj[field] as string);
    } else {
      result[field] = obj[field];
    }
  }
  return result;
}

export async function safeJson(request: Request): Promise<{ data?: Record<string, unknown>; error?: string }> {
  try {
    const body = await request.json();
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return { error: 'Expected JSON object' };
    }
    return { data: body as Record<string, unknown> };
  } catch {
    return { error: 'Invalid JSON body' };
  }
}

export function formatValidationErrors(errors: ApiError[]): string {
  return errors.map(e => e.field ? `${e.field}: ${e.message}` : e.message).join(', ');
}

export async function parseAndValidate<T>(request: Request, validators: ((body: Record<string, unknown>) => ApiError[])[]): Promise<ValidationResult<T>> {
  try {
    const body = await request.json();
    const allErrors: ApiError[] = [];
    for (const validator of validators) {
      allErrors.push(...validator(body));
    }
    if (allErrors.length) {
      return { success: false, errors: allErrors };
    }
    return { success: true, data: body as T };
  } catch {
    return { success: false, errors: [{ message: 'Invalid JSON body', code: 'PARSE_ERROR' }] };
  }
}
