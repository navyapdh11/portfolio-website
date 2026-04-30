import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateRequired, sanitize, sanitizeEmail, safeJson } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';

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
    const parsed = await safeJson(request);
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const body = parsed.data!;
    const validation = validateRequired(body, ['name', 'email', 'phone']);
    if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

    const customer = await prisma.customer.create({
      data: {
        name: sanitize(String(body.name)),
        email: sanitizeEmail(String(body.email)).toLowerCase().trim(),
        phone: sanitize(String(body.phone)),
        addresses: Array.isArray(body.addresses) ? body.addresses : [],
        loyaltyPoints: 0,
        totalBookings: 0,
        totalSpent: 0,
        status: 'prospect',
        reviews: [],
        notifications: [],
      },
    });
    return NextResponse.json({ success: true, customer }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
