import { NextResponse } from 'next/server';
import { safeJson } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';

// In-memory earnings/payout store (no Prisma model yet)
let earnings: Array<Record<string, unknown>> = [
  { id: 'e1', date: '2026-04-10', job: 'Deep Clean - West Leederville', amount: 85, status: 'completed' },
  { id: 'e2', date: '2026-04-09', job: 'Office Tower - Weekly', amount: 450, status: 'completed' },
  { id: 'e3', date: '2026-04-08', job: 'End of Lease - Subiaco', amount: 120, status: 'completed' },
  { id: 'e4', date: '2026-04-07', job: 'Medical Centre - Daily', amount: 95, status: 'completed' },
  { id: 'e5', date: '2026-04-06', job: 'Regular House Clean', amount: 75, status: 'completed' },
];

let payouts: Array<Record<string, unknown>> = [
  { id: 'p1', date: '2026-04-05', amount: 125.00, status: 'Completed' },
  { id: 'p2', date: '2026-03-28', amount: 98.50, status: 'Completed' },
  { id: 'p3', date: '2026-03-21', amount: 145.00, status: 'Completed' },
];

export async function GET(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const totalEarned = earnings.reduce((s, e) => s + (Number(e.amount) || 0), 0);
    const totalPaid = payouts.reduce((s, p) => s + (Number(p.amount) || 0), 0);
    return NextResponse.json({
      data: earnings,
      payouts,
      stats: {
        totalEarned,
        totalPaid,
        pending: totalEarned - totalPaid,
        totalJobs: earnings.length,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const parsed = await safeJson(request);
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const { type, ...body } = parsed.data!;
    if (type === 'earning') {
      const entry = { ...body, id: `e${Date.now()}`, status: 'completed' };
      earnings.push(entry);
      return NextResponse.json({ success: true, entry }, { status: 201 });
    }
    if (type === 'payout') {
      const payout = { ...body, id: `p${Date.now()}`, status: 'Pending' };
      payouts.unshift(payout);
      return NextResponse.json({ success: true, payout }, { status: 201 });
    }
    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
