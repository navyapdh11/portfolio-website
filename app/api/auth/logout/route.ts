import { NextResponse } from 'next/server';
import { destroySession, TOKEN_COOKIE_NAME, cookieAttrs } from '@/lib/middleware/auth';

export async function POST(request: Request) {
  const cookies = (request as any).headers?.get?.('cookie') || '';
  const match = cookies.match(new RegExp(`(?:^|;)\\s*${TOKEN_COOKIE_NAME}=([^;]+)`));
  if (match) destroySession(match[1]);

  return NextResponse.json({ success: true }, {
    headers: {
      'Set-Cookie': `${TOKEN_COOKIE_NAME}=; ${cookieAttrs(0)}; Max-Age=0`,
    },
  });
}
