import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';

export async function GET() {
  return NextResponse.json({ data: db.settings.get() });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const settings = db.settings.update(body);
  return NextResponse.json({ success: true, settings });
}
