import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitize, sanitizeEmail, validatePhone, safeJson } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const parsed = await safeJson(request);
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const body = parsed.data!;

    const safeBody: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(body)) {
      if (key === 'status') {
        const validStatuses = ['pending', 'confirmed', 'inProgress', 'completed', 'cancelled'];
        safeBody[key] = validStatuses.includes(value as string) ? value : 'pending';
      } else if (key === 'customerEmail' && typeof value === 'string') {
        safeBody[key] = sanitizeEmail(value);
      } else if (key === 'customerPhone' && typeof value === 'string') {
        if (!validatePhone(value)) return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
        safeBody[key] = sanitize(value);
      } else if (key === 'date' && typeof value === 'string') {
        safeBody[key] = new Date(value);
      } else if (typeof value === 'string') {
        safeBody[key] = sanitize(value);
      } else {
        safeBody[key] = value;
      }
    }

    const booking = await prisma.booking.update({ where: { id }, data: safeBody as any });
    return NextResponse.json({ success: true, booking });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
