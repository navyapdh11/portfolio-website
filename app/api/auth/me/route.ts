import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '@/lib/middleware/auth';

const TOKEN_COOKIE_NAME = 'ac_token';

export async function GET(request: NextRequest) {
  // Check cookie first (client-side fetch with credentials)
  const cookieToken = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
  if (cookieToken) {
    const cookieRequest = new Request(request.url, {
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        authorization: `Bearer ${cookieToken}`,
      },
    });
    const user = validateAuth(cookieRequest);
    if (user) {
      return NextResponse.json({
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
      });
    }
  }

  // Fall back to Bearer token
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
