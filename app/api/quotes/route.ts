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
    const quotes = await prisma.quote.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ data: quotes });
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

    const user = validateAuth(request);
    if (user && user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const validation = validateRequired(body, ['customerName', 'customerEmail', 'service']);
    if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

    const quote = await prisma.quote.create({
      data: {
        customerId: String(body.customerId || null),
        customerName: sanitize(String(body.customerName)),
        customerEmail: sanitizeEmail(String(body.customerEmail)).toLowerCase().trim(),
        customerPhone: sanitize(String(body.customerPhone || '')),
        service: sanitize(String(body.service)),
        bedrooms: Number(body.bedrooms) || 0,
        bathrooms: Number(body.bathrooms) || 0,
        frequency: sanitize(String(body.frequency || 'one-time')),
        addons: Array.isArray(body.addons) ? body.addons.map((a: unknown) => sanitize(String(a))) : [],
        estimatedPrice: Number(body.estimatedPrice) || 0,
        suburb: sanitize(String(body.suburb || '')),
        state: sanitize(String(body.state || '')),
      },
    });
    return NextResponse.json({ success: true, quote }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
