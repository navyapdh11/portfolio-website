import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';
import { GallerySchema } from '@/lib/validation/schemas';

export async function GET(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const items = db.gallery.getAll();
    return NextResponse.json({ data: items });
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
    const result = GallerySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const data = result.data;
    const item = db.gallery.create({
      title: data.title,
      description: data.description || '',
      imageUrl: data.imageUrl,
      category: data.category || 'general',
      tags: data.tags || [],
      featured: !!data.featured,
    });
    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (err) {
    console.error('Gallery creation error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const item = db.gallery.update(body.id as string, body);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id } = body;
    if (!db.gallery.delete(id as string)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
