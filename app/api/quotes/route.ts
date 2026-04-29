import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateRequired, sanitize } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';

export async function GET(request: Request) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const quotes = db.quotes.getAll();
  return NextResponse.json({ data: quotes });
}

export async function POST(request: Request) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const validation = validateRequired(body, ['customerName', 'customerEmail', 'service']);
  if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

  const quote = db.quotes.create({
    customerId: body.customerId || '',
    customerName: sanitize(body.customerName),
    customerEmail: body.customerEmail.toLowerCase().trim(),
    customerPhone: body.customerPhone || '',
    service: sanitize(body.service),
    bedrooms: body.bedrooms || 0,
    bathrooms: body.bathrooms || 0,
    frequency: body.frequency || 'one-time',
    addons: body.addons || [],
    estimatedPrice: body.estimatedPrice || 0,
    suburb: sanitize(body.suburb || ''),
    state: sanitize(body.state || ''),
    status: 'new',
  });
  return NextResponse.json({ success: true, quote }, { status: 201 });
}
