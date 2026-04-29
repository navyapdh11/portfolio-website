import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const booking = db.bookings.update(id, body);
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, booking });
}
