import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';
import { ServiceSchema } from '@/lib/validation/schemas';

export async function GET(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const services = db.services.getAll();
    return NextResponse.json({ data: services });
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
    const result = ServiceSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const data = result.data;
    const service = db.services.create({
      title: data.title,
      icon: data.icon || '🧹',
      image: data.image || '',
      description: data.description || '',
      features: data.features || [],
      basePrice: data.basePrice,
      category: data.category || 'residential',
      available: data.available ?? true,
      stock: data.stock || 0,
    });
    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (err) {
    console.error('Service creation error:', err);
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
    const service = db.services.update(body.id as string, body);
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, service });
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
    if (!db.services.delete(id as string)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
