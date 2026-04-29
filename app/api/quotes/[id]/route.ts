import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const quote = db.quotes.update(id, body);
  if (!quote) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, quote });
}
