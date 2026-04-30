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
  const items = db.gallery.getAll();
  return NextResponse.json({ data: items });
}

export async function POST(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = await safeJson(request);
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const body = parsed.data!;
  const validation = validateRequired(body, ['title', 'imageUrl']);
  if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

  const item = db.gallery.create({
    title: sanitize(String(body.title)),
    description: sanitize(String(body.description || '')),
    imageUrl: sanitize(String(body.imageUrl)),
    category: sanitize(String(body.category || 'general')),
    tags: Array.isArray(body.tags) ? body.tags.map((t: unknown) => sanitize(String(t))) : [],
    featured: Boolean(body.featured),
  });
  return NextResponse.json({ success: true, item }, { status: 201 });
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
  const item = db.gallery.update(body.id as string, body);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, item });
}

export async function DELETE(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = await safeJson(request);
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { id } = parsed.data!;
  if (!db.gallery.delete(id as string)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
