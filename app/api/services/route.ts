import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateRequired, sanitize, safeJson } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';

export async function GET(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const services = db.services.getAll();
  return NextResponse.json({ data: services });
}

export async function POST(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = await safeJson(request);
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const body = parsed.data!;
  const validation = validateRequired(body, ['title', 'basePrice']);
  if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

  const service = db.services.create({
    title: sanitize(String(body.title)),
    icon: String(body.icon || '🧹'),
    image: sanitize(String(body.image || '')),
    description: sanitize(String(body.description || '')),
    features: Array.isArray(body.features) ? body.features.map((f: unknown) => sanitize(String(f))) : [],
    basePrice: Number(body.basePrice) || 0,
    category: sanitize(String(body.category || 'residential')),
    available: Boolean(body.available ?? true),
    stock: Number(body.stock) || 0,
  });
  return NextResponse.json({ success: true, service }, { status: 201 });
}

export async function PATCH(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = await safeJson(request);
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const body = parsed.data!;
  if (!body.id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  const service = db.services.update(body.id as string, body);
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, service });
}

export async function DELETE(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = await safeJson(request);
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { id } = parsed.data!;
  if (!db.services.delete(id as string)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
