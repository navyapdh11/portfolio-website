import { NextResponse } from 'next/server';

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

export async function GET() {
  return NextResponse.json(config);
}

export async function PATCH(request: Request) {
  const updates = await request.json();
  config = { ...config, ...updates };
  return NextResponse.json({ success: true, config });
}
