import { NextResponse } from 'next/server';

let projects = [
  { id: "cbd-office", title: "CBD Office Tower - Commercial Complex", category: "Commercial Cleaning", location: "Perth CBD", description: "Complete weekly maintenance cleaning for a 20-story commercial tower.", before: "🏢" },
  { id: "west-leederville-home", title: "West Leederville Family Home", category: "Residential Cleaning", location: "West Leederville", description: "Regular fortnightly cleaning service.", before: "🏠" },
];

export async function GET() {
  return NextResponse.json({ data: projects });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const index = projects.findIndex(p => p.id === body.id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...body };
    return NextResponse.json({ success: true, project: projects[index] });
  }
  return NextResponse.json({ success: false }, { status: 404 });
}
