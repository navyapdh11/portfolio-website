import { NextResponse } from 'next/server';
import { safeJson } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';

// In-memory ad campaign store (no Prisma model yet — ads are UI-only for now)
let campaigns: Array<Record<string, unknown>> = [
  { id: 'ad1', platform: 'facebook', name: 'Spring Clean Special', status: 'active', budget: 500, spent: 312, impressions: 45000, clicks: 890, conversions: 23, ctr: 1.98, roas: 4.2 },
  { id: 'ad2', platform: 'instagram', name: 'Before/After Gallery', status: 'active', budget: 300, spent: 187, impressions: 28000, clicks: 560, conversions: 18, ctr: 2.0, roas: 3.8 },
  { id: 'ad3', platform: 'google', name: 'Perth Cleaning Search', status: 'active', budget: 800, spent: 524, impressions: 12000, clicks: 340, conversions: 45, ctr: 2.83, roas: 5.2 },
  { id: 'ad4', platform: 'facebook', name: 'End of Lease Promo', status: 'paused', budget: 400, spent: 145, impressions: 18000, clicks: 290, conversions: 12, ctr: 1.61, roas: 2.9 },
  { id: 'ad5', platform: 'google', name: 'Commercial Cleaning', status: 'active', budget: 600, spent: 398, impressions: 8500, clicks: 220, conversions: 31, ctr: 2.59, roas: 4.8 },
];

export async function GET(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    return NextResponse.json({ data: campaigns });
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
    const body = parsed.data!;
    const campaign = { ...body, id: `ad${Date.now()}`, status: 'active' };
    campaigns.push(campaign);
    return NextResponse.json({ success: true, campaign }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const parsed = await safeJson(request);
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const { id, ...updates } = parsed.data!;
    const idx = campaigns.findIndex(c => c.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    campaigns[idx] = { ...campaigns[idx], ...updates };
    return NextResponse.json({ success: true, campaign: campaigns[idx] });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
