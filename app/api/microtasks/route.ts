import { NextResponse } from 'next/server';
import { safeJson } from '@/lib/middleware/validation';
import { csrfResponse } from '@/lib/middleware/csrf';

// In-memory microtask store
const tasks: Array<Record<string, unknown>> = [
  { id: 't1', type: 'image', prompt: 'Label all cleaning products in this image', reward: 0.50, rarity: 'common', category: 'image_labeling', status: 'available' },
  { id: 't2', type: 'audio', prompt: 'Transcribe this customer voicemail about cleaning needs', reward: 1.00, rarity: 'uncommon', category: 'transcription', status: 'available' },
  { id: 't3', type: 'annotation', prompt: 'Draw bounding boxes around dirt stains', reward: 0.75, rarity: 'common', category: 'annotation', status: 'available' },
  { id: 't4', type: 'text', prompt: 'Classify this review as positive, neutral, or negative', reward: 0.25, rarity: 'common', category: 'classification', status: 'available' },
  { id: 't5', type: 'image', prompt: 'Rate cleanliness of this room 1-10', reward: 0.50, rarity: 'common', category: 'rating', status: 'available' },
  { id: 't6', type: 'audio', prompt: 'Identify the service type requested in this call', reward: 1.50, rarity: 'rare', category: 'classification', status: 'available' },
  { id: 't7', type: 'annotation', prompt: 'Segment floor vs. furniture in this image', reward: 1.00, rarity: 'uncommon', category: 'segmentation', status: 'available' },
  { id: 't8', type: 'text', prompt: 'Extract address and service type from this email', reward: 0.75, rarity: 'uncommon', category: 'extraction', status: 'available' },
  { id: 't9', type: 'image', prompt: 'Is this surface suitable for steam cleaning?', reward: 0.50, rarity: 'common', category: 'classification', status: 'available' },
  { id: 't10', type: 'text', prompt: 'Summarize this cleaning checklist in 3 bullet points', reward: 1.00, rarity: 'uncommon', category: 'summarization', status: 'available' },
  { id: 't11', type: 'audio', prompt: 'Flag any safety concerns mentioned in this recording', reward: 2.00, rarity: 'rare', category: 'flagging', status: 'available' },
  { id: 't12', type: 'annotation', prompt: 'Mark all high-touch surfaces in this kitchen photo', reward: 0.75, rarity: 'common', category: 'annotation', status: 'available' },
];

const completedTasks: Array<Record<string, unknown>> = [];

export async function GET(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  try {
    return NextResponse.json({
      available: tasks,
      completed: completedTasks,
      stats: {
        totalAvailable: tasks.length,
        totalCompleted: completedTasks.length,
        totalEarned: completedTasks.reduce((s, t) => s + (Number(t.reward) || 0), 0),
      },
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const csrf = csrfResponse(request);
  if (csrf) return csrf;

  try {
    const parsed = await safeJson(request);
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const { taskId } = parsed.data!;
    const taskIdx = tasks.findIndex(t => t.id === taskId);
    if (taskIdx === -1) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

    const completed = tasks.splice(taskIdx, 1)[0];
    completed.status = 'completed';
    completed.completedAt = new Date().toISOString();
    completedTasks.push(completed);
    return NextResponse.json({ success: true, task: completed });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
