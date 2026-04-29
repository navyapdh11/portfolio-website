import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { query } = await request.json();
  return NextResponse.json({
    results: [
      { title: 'Cleaning Best Practices', relevance: 0.95 },
      { title: 'Eco-Friendly Products', relevance: 0.87 },
      { title: 'Bond-Back Guarantee Guide', relevance: 0.82 },
    ],
    query,
  });
}
