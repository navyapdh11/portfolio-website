import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { sanitize, sanitizeEmail, validatePhone, safeJson } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const parsed = await safeJson(request);
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const body = parsed.data!;

  // Sanitize string fields in the update body
  const safeBody: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    if (key === 'status') {
      const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
      safeBody[key] = validStatuses.includes(value as string) ? value : 'pending';
    } else if (key === 'customerEmail' && typeof value === 'string') {
      safeBody[key] = sanitizeEmail(value);
    } else if (key === 'customerPhone' && typeof value === 'string') {
      if (!validatePhone(value)) {
        return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
      }
      safeBody[key] = sanitize(value);
    } else if (typeof value === 'string') {
      safeBody[key] = sanitize(value);
    } else {
      safeBody[key] = value;
    }
  }

  const booking = db.bookings.update(id, safeBody);
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, booking });
}
