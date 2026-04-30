import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';
import { BookingSchema } from '@/lib/validation/schemas';

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
    const body = await request.json();
    const result = BookingSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const { name, email, phone, service, date } = result.data;
    const booking = await prisma.booking.create({
      data: {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        service: service,
        date: new Date(date),
        address: String(body.address || ''),
        suburb: String(body.suburb || ''),
        state: String(body.state || ''),
        time: String(body.time || '09:00'),
        frequency: String(body.frequency || 'one-time'),
        addons: Array.isArray(body.addons) ? body.addons.map((a: unknown) => String(a)) : [],
        totalPrice: Number(body.totalPrice) || 0,
        notes: String(body.notes || ''),
      },
    });
    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (err) {
    console.error('Booking creation error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
