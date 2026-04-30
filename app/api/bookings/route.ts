import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateRequired, sanitize, sanitizeEmail, validatePhone, safeJson } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';

export async function GET(request: Request) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const bookings = db.bookings.getAll();
  return NextResponse.json({ data: bookings });
}

export async function POST(request: Request) {
  const parsed = await safeJson(request);
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const body = parsed.data!;
  const validation = validateRequired(body, ['customerName', 'customerEmail', 'customerPhone', 'service', 'date']);
  if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

  const phone = String(body.customerPhone);
  if (!validatePhone(phone)) {
    return NextResponse.json({ error: [{ field: 'customerPhone', message: 'Invalid phone number', code: 'INVALID_PHONE' }] }, { status: 400 });
  }

  const booking = db.bookings.create({
    customerId: String(body.customerId || 'anonymous'),
    customerName: sanitize(String(body.customerName)),
    customerEmail: sanitizeEmail(String(body.customerEmail)),
    customerPhone: sanitize(phone),
    service: sanitize(String(body.service)),
    address: sanitize(String(body.address || '')),
    suburb: sanitize(String(body.suburb || '')),
    state: sanitize(String(body.state || '')),
    date: String(body.date),
    time: sanitize(String(body.time || '09:00')),
    frequency: sanitize(String(body.frequency || 'one-time')),
    addons: Array.isArray(body.addons) ? body.addons.map((a: unknown) => sanitize(String(a))) : [],
    status: 'pending',
    totalPrice: Number(body.totalPrice) || 0,
    notes: sanitize(String(body.notes || '')),
  });
  return NextResponse.json({ success: true, booking }, { status: 201 });
}
