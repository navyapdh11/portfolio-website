import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { status } = await request.json();

  // In a real app, you would query the DB here.
  return NextResponse.json({
    success: true,
    message: `Quote ${id} status updated to ${status}`,
  });
}