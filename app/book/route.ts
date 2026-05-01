import { NextResponse } from "next/server";

export function GET() {
	return NextResponse.redirect(
		new URL(
			"/booking",
			process.env.NEXT_PUBLIC_BASE_URL || "https://www.aastaclean.com.au",
		),
	);
}
