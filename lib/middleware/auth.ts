// Enterprise-grade authentication middleware
// Simple token-based auth for 2026 portfolio (upgrade to NextAuth/OAuth in production)

import { NextRequest, NextResponse } from 'next/server';

const ADMIN_TOKEN = process.env.ADMIN_SECRET || 'aasta-clean-admin-2026';
const CUSTOMER_TOKEN_PREFIX = 'cust_';

export interface AuthUser {
  id: string;
  role: 'admin' | 'customer';
  name: string;
  email: string;
}

export function validateAuth(request: NextRequest): AuthUser | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);

  if (token === ADMIN_TOKEN) {
    return { id: 'admin-1', role: 'admin', name: 'Administrator', email: 'admin@aastaclean.com.au' };
  }

  if (token.startsWith(CUSTOMER_TOKEN_PREFIX)) {
    const customerId = token.slice(CUSTOMER_TOKEN_PREFIX.length);
    return { id: customerId, role: 'customer', name: 'Customer', email: 'customer@aastaclean.com.au' };
  }

  return null;
}

export function withAuth(handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>, requiredRole?: 'admin' | 'customer') {
  return async (request: NextRequest) => {
    const user = validateAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (requiredRole && user.role !== requiredRole) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return handler(request, user);
  };
}

export function generateCustomerToken(customerId: string): string {
  return `${CUSTOMER_TOKEN_PREFIX}${customerId}`;
}

export const SESSION_KEY = 'aastaclean_session';
export const TOKEN_COOKIE_NAME = 'ac_token';
