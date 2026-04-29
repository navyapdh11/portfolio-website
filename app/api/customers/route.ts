import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateRequired, sanitize } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';

export async function GET(request: Request) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const customers = db.customers.getAll();
  return NextResponse.json({ data: customers });
}

export async function POST(request: Request) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const validation = validateRequired(body, ['name', 'email', 'phone']);
  if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

  const customer = db.customers.create({
    name: sanitize(body.name),
    email: body.email.toLowerCase().trim(),
    phone: body.phone,
    addresses: body.addresses || [],
    loyaltyPoints: 0,
    totalBookings: 0,
    totalSpent: 0,
    lastBooking: '',
    status: 'active',
    reviews: [],
    notifications: [],
  });
  return NextResponse.json({ success: true, customer }, { status: 201 });
}
