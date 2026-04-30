import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateRequired, sanitize, sanitizeEmail, validatePhone, safeJson } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';

export async function GET(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const bookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ data: bookings });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  try {
    const parsed = await safeJson(request);
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const body = parsed.data!;
    const validation = validateRequired(body, ['customerName', 'customerEmail', 'customerPhone', 'service', 'date']);
    if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

    const phone = String(body.customerPhone);
    if (!validatePhone(phone)) {
      return NextResponse.json({ error: [{ field: 'customerPhone', message: 'Invalid phone number', code: 'INVALID_PHONE' }] }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        customerId: String(body.customerId || null),
        customerName: sanitize(String(body.customerName)),
        customerEmail: sanitizeEmail(String(body.customerEmail)),
        customerPhone: sanitize(phone),
        service: sanitize(String(body.service)),
        address: sanitize(String(body.address || '')),
        suburb: sanitize(String(body.suburb || '')),
        state: sanitize(String(body.state || '')),
        date: new Date(String(body.date)),
        time: sanitize(String(body.time || '09:00')),
        frequency: sanitize(String(body.frequency || 'one-time')),
        addons: Array.isArray(body.addons) ? body.addons.map((a: unknown) => sanitize(String(a))) : [],
        totalPrice: Number(body.totalPrice) || 0,
        notes: sanitize(String(body.notes || '')),
      },
    });
    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
