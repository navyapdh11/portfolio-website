import { NextResponse } from 'next/server';
import { validateAuth } from '@/lib/middleware/auth';
import { csrfResponse } from '@/lib/middleware/csrf';
import { safeJson } from '@/lib/middleware/validation';

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  before: string;
}

let projects: Project[] = [
  { id: "cbd-office", title: "CBD Office Tower - Commercial Complex", category: "Commercial Cleaning", location: "Perth CBD", description: "Complete weekly maintenance cleaning for a 20-story commercial tower.", before: "🏢" },
  { id: "west-leederville-home", title: "West Leederville Family Home", category: "Residential Cleaning", location: "West Leederville", description: "Regular fortnightly cleaning service.", before: "🏠" },
];

export async function GET(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  return NextResponse.json({ data: projects });
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
    const project: Project = { id: String(Date.now()), title: String(body.title || ''), category: String(body.category || ''), location: String(body.location || ''), description: String(body.description || ''), before: String(body.before || '') };
    projects.push(project);
    return NextResponse.json({ success: true, project }, { status: 201 });
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
    const body = parsed.data!;
    const index = projects.findIndex(p => p.id === body.id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...Object.fromEntries(Object.entries(body).filter(([k]) => k !== 'id')) };
      return NextResponse.json({ success: true, project: projects[index] });
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  const user = validateAuth(request);
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const parsed = await safeJson(request);
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const { id } = parsed.data!;
    projects = projects.filter(p => p.id !== id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
