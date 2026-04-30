import { NextResponse } from 'next/server';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';
import { safeJson } from '@/lib/middleware/validation';

let config = {
  cta: {
    title: "Ready to Work With Us?",
    description: "Get a free quote for your cleaning project. Whether it's residential, commercial, or end-of-lease, we deliver exceptional results."
  },
  socialLinks: [
    { platform: "Facebook", url: "https://facebook.com/aastaclean", icon: "📘", followers: 2500, engagement: 4.2 },
    { platform: "Instagram", url: "https://instagram.com/aastaclean", icon: "📸", followers: 1800, engagement: 5.8 },
    { platform: "Google", url: "https://google.com/aastaclean", icon: "🔍", followers: 150, engagement: 8.5 },
  ]
};

export async function GET(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    return NextResponse.json(config);
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
    const updates = parsed.data!;
    config = { ...config, ...Object.fromEntries(Object.entries(updates).filter(([k]) => k in config)) };
    return NextResponse.json({ success: true, config });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
