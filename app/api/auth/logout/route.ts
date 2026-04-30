import { NextResponse } from 'next/server';

const TOKEN_COOKIE_NAME = 'ac_token';

export async function POST() {
  return NextResponse.json({ success: true }, {
    headers: {
      'Set-Cookie': `${TOKEN_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
    },
  });
}
