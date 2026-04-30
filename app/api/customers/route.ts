import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';
import { CustomerSchema } from '@/lib/validation/schemas';

export async function GET(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const customers = await prisma.customer.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ data: customers });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const result = CustomerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const { name, email, phone, addresses } = result.data;
    const customer = await prisma.customer.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        phone,
        addresses: addresses || [],
        loyaltyPoints: 0,
        totalBookings: 0,
        totalSpent: 0,
        status: 'prospect',
        reviews: [],
        notifications: [],
      },
    });
    return NextResponse.json({ success: true, customer }, { status: 201 });
  } catch (err) {
    console.error('Customer creation error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
