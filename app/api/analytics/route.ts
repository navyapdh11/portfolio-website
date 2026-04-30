import { NextResponse } from 'next/server';
import { getAnalytics, db } from '@/lib/data/store';
import { prisma } from '@/lib/prisma';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit';

export async function GET(request: Request) {
  const { response: csrf } = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Rate limit
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rateLimit = checkRateLimit(`api:${clientIp}:GET:analytics`);
  const rateLimitHeaders = getRateLimitHeaders(rateLimit);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429, headers: rateLimitHeaders });
  }

  try {
    const analytics = getAnalytics();
    const bookings = await prisma.booking.findMany();
    const bookingsByStatus = bookings.reduce((acc, b) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const services = db.services.getAll();
    const servicesByCategory = services.reduce((acc, s) => {
      acc[s.category] = (acc[s.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recentActivity = [...bookings]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    const customers = await prisma.customer.findMany();
    const topCustomers = [...customers]
      .sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0))
      .slice(0, 5);

    return NextResponse.json({
      analytics,
      bookingsByStatus,
      servicesByCategory,
      recentActivity,
      stockAlerts: services.filter(s => s.stock < 10),
      topCustomers,
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
