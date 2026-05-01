// Edge proxy for route-level authentication
// Protects /dashboard/admin and /dashboard/customer with HMAC-signed session tokens

import { type NextRequest, NextResponse } from "next/server";
import { validateAuth } from "@/lib/middleware/auth";

const PROTECTED_ROUTES = [
	{ prefix: "/dashboard/admin", expectedRole: "admin" },
	{ prefix: "/dashboard/customer", expectedRole: "customer" },
] as const;

export default function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Allow login page and public dashboard index to pass through
	if (pathname === "/dashboard/login" || pathname === "/dashboard") {
		return NextResponse.next();
	}

	// Check if this is a protected route
	const matchedRoute = PROTECTED_ROUTES.find(
		(route) =>
			pathname === route.prefix || pathname.startsWith(`${route.prefix}/`),
	);

	if (!matchedRoute) {
		return NextResponse.next();
	}

	// Validate session token (HMAC signature + expiry + server-side record)
	const user = validateAuth(request);

	if (!user) {
		const loginUrl = new URL("/dashboard/login", request.url);
		loginUrl.searchParams.set("redirect", pathname);
		loginUrl.searchParams.set("error", "expired");
		return NextResponse.redirect(loginUrl);
	}

	if (user.role !== matchedRoute.expectedRole) {
		const loginUrl = new URL("/dashboard/login", request.url);
		loginUrl.searchParams.set("redirect", pathname);
		loginUrl.searchParams.set("error", "forbidden");
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
