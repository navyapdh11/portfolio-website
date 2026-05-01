import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	reactCompiler: true,
	turbopack: {
		root: process.cwd(),
	},
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "plus.unsplash.com" },
		],
	},
	compress: true,
	poweredByHeader: false,
	headers: async () => [
		{
			source: "/(.*)",
			headers: [
				{ key: "X-Frame-Options", value: "DENY" },
				{ key: "X-Content-Type-Options", value: "nosniff" },
				{ key: "X-DNS-Prefetch-Control", value: "on" },
				{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
				{
					key: "Permissions-Policy",
					value: "camera=(), microphone=(), geolocation=()",
				},
				{
					key: "Strict-Transport-Security",
					value: "max-age=31536000; includeSubDomains",
				},
				{
					key: "Content-Security-Policy",
					value: [
						"default-src 'self'",
						"script-src 'self' 'unsafe-inline'",
						"style-src 'self' 'unsafe-inline'",
						"img-src 'self' data: https://images.unsplash.com https://plus.unsplash.com",
						"font-src 'self' data:",
						"connect-src 'self'",
						"media-src 'self'",
						"object-src 'none'",
						"frame-ancestors 'none'",
						"base-uri 'self'",
						"form-action 'self'",
						"upgrade-insecure-requests",
					].join("; "),
				},
			],
		},
		{
			source: "/_next/static/(.*)",
			headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
		},
		{
			source: "/images/(.*)",
			headers: [
				{
					key: "Cache-Control",
					value: "public, max-age=86400, stale-while-revalidate=604800",
				},
			],
		},
	],
};

export default nextConfig;
