import { NextResponse } from 'next/server';

const services = [
  { id: 1, title: "House Cleaning", icon: "🏠", description: "Regular maintenance cleaning.", price: "$120" },
  { id: 2, title: "Commercial Cleaning", icon: "🏢", description: "Professional office cleaning.", price: "$180" },
];

export async function GET() {
  return NextResponse.json({ data: services });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const index = services.findIndex(s => s.id === body.id);
  if (index !== -1) {
    services[index] = { ...services[index], ...body };
    return NextResponse.json({ success: true, service: services[index] });
  }
  return NextResponse.json({ success: false }, { status: 404 });
}
