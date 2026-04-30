import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateRequired, sanitize } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';

export async function GET(request: Request) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const items = db.gallery.getAll();
  return NextResponse.json({ data: items });
}

export async function POST(request: Request) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const validation = validateRequired(body, ['title', 'imageUrl']);
  if (!validation.success) return NextResponse.json({ error: validation.errors }, { status: 400 });

  const item = db.gallery.create({
    title: sanitize(body.title),
    description: sanitize(body.description || ''),
    imageUrl: sanitize(body.imageUrl),
    category: sanitize(body.category || 'general'),
    tags: Array.isArray(body.tags) ? body.tags.map((t: string) => sanitize(t)) : [],
    featured: body.featured ?? false,
  });
  return NextResponse.json({ success: true, item }, { status: 201 });
}

export async function PATCH(request: Request) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  const item = db.gallery.update(body.id, body);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, item });
}

export async function DELETE(request: Request) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await request.json();
  if (!db.gallery.delete(id)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
