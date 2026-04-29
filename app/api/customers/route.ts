import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateRequired, sanitize, sanitizeEmail } from '@/lib/middleware/validation';

export async function GET() {
  const customers = db.customers.getAll();
  return NextResponse.json({ data: customers });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = validateRequired(body, ['name', 'email', 'phone']);
  if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

  const customer = db.customers.create({
    name: sanitize(body.name),
    email: sanitizeEmail(body.email),
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
