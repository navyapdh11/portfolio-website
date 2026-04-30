import { NextResponse } from 'next/server';
import { safeJson } from '@/lib/middleware/validation';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';

// In-memory flashcard store
let flashcards: Array<Record<string, unknown>> = [
  { id: 'fc1', category: 'SEO', title: 'Local SEO for Cleaners', front: 'What are the 3 most important local SEO factors?', back: '1. Google Business Profile optimization\n2. Local keyword targeting (city + service)\n3. Customer reviews and ratings', priority: 'high' },
  { id: 'fc2', category: 'CRO', title: 'Conversion Rate Optimization', front: 'What is the #1 CRO lever for cleaning sites?', back: 'Above-the-fold booking form with instant quote calculator', priority: 'high' },
  { id: 'fc3', category: 'GEO', title: 'Generative Engine Optimization', front: 'How does GEO differ from traditional SEO?', back: 'GEO optimizes for AI-generated answers (ChatGPT, Gemini) rather than search engine results pages', priority: 'medium' },
  { id: 'fc4', category: 'AEO', title: 'Answer Engine Optimization', front: 'What format does AEO favor?', back: 'FAQ-style content with direct, concise answers to common questions', priority: 'medium' },
  { id: 'fc5', category: 'Content', title: 'Blog Content Strategy', front: 'What content types convert best for cleaning?', back: 'Before/after case studies, cleaning checklists, seasonal guides, and suburb-specific service pages', priority: 'high' },
  { id: 'fc6', category: 'Ads', title: 'Google Ads Quality Score', front: 'What 3 factors determine Quality Score?', back: 'Expected CTR, ad relevance, and landing page experience', priority: 'medium' },
  { id: 'fc7', category: 'Review', title: 'Review Generation', front: 'What is the optimal review request timing?', back: 'Within 24 hours of service completion while the experience is fresh', priority: 'high' },
];

export async function GET(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  try {
    // Flashcards are public — no auth required
    return NextResponse.json({ data: flashcards });
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
    const card = { ...parsed.data!, id: `fc${Date.now()}` };
    flashcards.push(card);
    return NextResponse.json({ success: true, card }, { status: 201 });
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
    const idx = flashcards.findIndex(c => c.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    flashcards[idx] = { ...flashcards[idx], ...updates };
    return NextResponse.json({ success: true, card: flashcards[idx] });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
