import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateRequired, sanitize, sanitizeEmail } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';

export async function GET(request: Request) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const bookings = db.bookings.getAll();
  return NextResponse.json({ data: bookings });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = validateRequired(body, ['customerName', 'customerEmail', 'customerPhone', 'service', 'date']);
  if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

  const booking = db.bookings.create({
    customerId: body.customerId || 'anonymous',
    customerName: sanitize(body.customerName),
    customerEmail: sanitizeEmail(body.customerEmail),
    customerPhone: body.customerPhone,
    service: sanitize(body.service),
    address: sanitize(body.address || ''),
    suburb: sanitize(body.suburb || ''),
    state: sanitize(body.state || ''),
    date: body.date,
    time: body.time || '09:00',
    frequency: body.frequency || 'one-time',
    addons: body.addons || [],
    status: 'pending',
    totalPrice: body.totalPrice || 0,
    notes: sanitize(body.notes || ''),
  });
  return NextResponse.json({ success: true, booking }, { status: 201 });
}
