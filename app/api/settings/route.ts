import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { validateAuth } from '@/lib/middleware/auth';

export async function GET(request: Request) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ data: db.settings.get() });
}

export async function PATCH(request: Request) {
  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const settings = db.settings.update(body);
  return NextResponse.json({ success: true, settings });
}
