import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateRequired, sanitize } from '@/lib/middleware/validation';

export async function GET() {
  const services = db.services.getAll();
  return NextResponse.json({ data: services });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = validateRequired(body, ['title', 'basePrice']);
  if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

  const service = db.services.create({
    title: sanitize(body.title),
    icon: body.icon || '🧹',
    image: body.image || '',
    description: sanitize(body.description || ''),
    features: body.features || [],
    basePrice: body.basePrice,
    category: body.category || 'residential',
    available: body.available ?? true,
    stock: body.stock || 0,
  });
  return NextResponse.json({ success: true, service }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  const service = db.services.update(body.id, body);
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, service });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!db.services.delete(id)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
