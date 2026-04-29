import { NextResponse } from 'next/server';
import { getAnalytics, db } from '@/lib/data/store';

export async function GET() {
  const analytics = getAnalytics();
  const bookingsByStatus = db.bookings.getAll().reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const servicesByCategory = db.services.getAll().reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentActivity = [...db.bookings.getAll()]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return NextResponse.json({
    analytics,
    bookingsByStatus,
    servicesByCategory,
    recentActivity,
    stockAlerts: db.services.getAll().filter(s => s.stock < 10),
    topCustomers: [...db.customers.getAll()].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5),
  });
}
