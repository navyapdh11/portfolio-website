import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await request.json();

  // In a real app, you would query the DB here.
  return NextResponse.json({
    success: true,
    message: `Quote ${id} status updated to ${status}`,
  });
}