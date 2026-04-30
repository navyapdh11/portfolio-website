import { NextResponse } from 'next/server';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';
import { safeJson } from '@/lib/middleware/validation';

export async function POST(request: Request) {
  const { response: csrf } = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const parsed = await safeJson(request);
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const { query } = parsed.data as Record<string, string>;
    return NextResponse.json({
      results: [
        { title: 'Cleaning Best Practices', relevance: 0.95 },
        { title: 'Eco-Friendly Products', relevance: 0.87 },
        { title: 'Bond-Back Guarantee Guide', relevance: 0.82 },
      ],
      query: query || '',
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
