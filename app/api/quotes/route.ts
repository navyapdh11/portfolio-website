import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateRequired, sanitize } from '@/lib/middleware/validation';

export async function GET() {
  const quotes = db.quotes.getAll();
  return NextResponse.json({ data: quotes });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = validateRequired(body, ['customerName', 'customerEmail', 'service']);
  if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

  const quote = db.quotes.create({
    customerId: body.customerId || '',
    customerName: sanitize(body.customerName),
    customerEmail: sanitize(body.customerEmail),
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
