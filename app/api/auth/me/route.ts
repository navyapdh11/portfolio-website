import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';

export async function GET(request: NextRequest) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({
    id: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  });
}
