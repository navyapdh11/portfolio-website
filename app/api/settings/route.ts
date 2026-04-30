import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { safeJson } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';

export async function GET(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    return NextResponse.json({ data: db.settings.get() });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const parsed = await safeJson(request);
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const settings = db.settings.update(parsed.data!);
    return NextResponse.json({ success: true, settings });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
