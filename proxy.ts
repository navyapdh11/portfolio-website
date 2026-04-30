// Edge proxy for route-level authentication
// Protects /dashboard/admin and /dashboard/customer with cookie-based auth

import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = [
  { prefix: '/dashboard/admin', role: 'admin' },
  { prefix: '/dashboard/customer', role: 'customer' },
] as const;

const COOKIE_NAME = 'ac_token';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'aasta-clean-admin-2026';

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and public dashboard index to pass through
  if (pathname === '/dashboard/login' || pathname === '/dashboard') {
    return NextResponse.next();
  }

  // Check if this is a protected route
  const matchedRoute = PROTECTED_ROUTES.find(route =>
    pathname === route.prefix || pathname.startsWith(route.prefix + '/')
  );

  if (!matchedRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL('/dashboard/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Validate token
  if (matchedRoute.role === 'admin' && token !== ADMIN_SECRET) {
    const loginUrl = new URL('/dashboard/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    loginUrl.searchParams.set('error', 'forbidden');
    return NextResponse.redirect(loginUrl);
  }

  if (matchedRoute.role === 'customer' && !token.startsWith('cust_')) {
    const loginUrl = new URL('/dashboard/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    loginUrl.searchParams.set('error', 'forbidden');
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
