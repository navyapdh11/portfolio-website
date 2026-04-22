import { NextResponse } from 'next/server';

let config = {
  socialLinks: [
    { platform: "Facebook", url: "https://facebook.com/aastaclean", icon: "📘", followers: "2.5K" },
    { platform: "Instagram", url: "https://instagram.com/aastaclean", icon: "📸", followers: "1.8K" },
    { platform: "Google", url: "https://google.com/aastaclean", icon: "🔍", followers: "150+ Reviews" },
  ],
  cta: {
    title: "Ready to Work With Us?",
    description: "Get a free quote for your cleaning project. Whether it's residential, commercial, or end-of-lease, we deliver exceptional results.",
    buttonText: "Get a Quote",
    buttonLink: "/#booking"
  }
};

export async function GET() {
  return NextResponse.json(config);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  config = { ...config, ...body };
  return NextResponse.json({ success: true, config });
}
