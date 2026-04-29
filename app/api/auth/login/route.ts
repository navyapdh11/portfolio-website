import { NextResponse } from 'next/server';
import { db } from '@/lib/data/store';
import { generateCustomerToken } from '@/lib/middleware/auth';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'aasta-clean-admin-2026';

export async function POST(request: Request) {
  const { email, password, role } = await request.json();

  // Admin login
  if (role === 'admin' && password === ADMIN_SECRET) {
    return NextResponse.json({
      success: true,
      token: ADMIN_SECRET,
      user: { id: 'admin-1', role: 'admin', name: 'Administrator', email },
    });
  }

  // Customer login (email-based for demo)
  if (role === 'customer') {
    const customer = db.customers.getAll().find(c => c.email === email);
    if (customer) {
      return NextResponse.json({
        success: true,
        token: generateCustomerToken(customer.id),
        user: { id: customer.id, role: 'customer', name: customer.name, email: customer.email },
      });
    }
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
