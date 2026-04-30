import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { safeJson } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const parsed = await safeJson(request);
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });

    const quote = await prisma.quote.update({ where: { id }, data: parsed.data! as any });
    return NextResponse.json({ success: true, quote });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
