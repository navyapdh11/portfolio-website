import { NextResponse } from "next/server";
import { MCTS, GoT, CoT } from "@/lib/ai/reasoning";

export async function POST(request: Request) {
  const { query, location } = await request.json();

  // Run reasoning chain
  const cot = CoT.reason(query);
  const got = GoT.process([cot]);
  const mcts = MCTS.search({}, query);

  return NextResponse.json({
    cot,
    got,
    mcts,
    timestamp: new Date().toISOString()
  });
}