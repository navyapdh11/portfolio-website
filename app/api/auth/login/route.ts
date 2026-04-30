import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { generateCustomerToken } from '@/lib/middleware/auth';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'aasta-clean-admin-2026';
const TOKEN_COOKIE_NAME = 'ac_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const COOKIE_FLAGS = 'Path=/; HttpOnly; Secure; SameSite=Strict';

export async function POST(request: Request) {
  const { email, password, role } = await request.json();
  const responseInit: { status?: number; headers: { 'Set-Cookie': string } } = {
    headers: { 'Set-Cookie': '' },
  };

  // Admin login
  if (role === 'admin' && password === ADMIN_SECRET) {
    responseInit.headers['Set-Cookie'] = `${TOKEN_COOKIE_NAME}=${ADMIN_SECRET}; ${COOKIE_FLAGS}; Max-Age=${COOKIE_MAX_AGE}`;
    return NextResponse.json(
      {
        success: true,
        user: { id: 'admin-1', role: 'admin', name: 'Administrator', email },
      },
      responseInit,
    );
  }

  // Customer login (email-based for demo)
  if (role === 'customer') {
    const customer = db.customers.getAll().find(c => c.email === email);
    if (customer) {
      const token = generateCustomerToken(customer.id);
      responseInit.headers['Set-Cookie'] = `${TOKEN_COOKIE_NAME}=${token}; ${COOKIE_FLAGS}; Max-Age=${COOKIE_MAX_AGE}`;
      return NextResponse.json(
        {
          success: true,
          user: { id: customer.id, role: 'customer', name: customer.name, email: customer.email },
        },
        responseInit,
      );
    }
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
