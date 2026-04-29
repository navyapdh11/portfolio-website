import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateAuth } from '@/lib/middleware/auth';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const quote = db.quotes.update(id, body);
  if (!quote) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, quote });
}
