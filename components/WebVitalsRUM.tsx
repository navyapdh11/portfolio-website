// AASTACLEAN — Core Web Vitals Real User Monitoring
// Reports LCP, INP, CLS, FCP, TTFB to analytics endpoint
"use client";

import type { NextWebVitalsMetric } from "next/app";
import { useReportWebVitals } from "next/web-vitals";

export function WebVitalsRUM() {
	useReportWebVitals((metric: NextWebVitalsMetric) => {
		// Send to analytics endpoint in production
		if (process.env.NODE_ENV === "production") {
			const body = {
				event: "web-vitals",
				metric: metric.name,
				value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
				id: metric.id,
				page: window.location.pathname,
			};

			// Use navigator.sendBeacon for reliable delivery even on page unload
			const blob = new Blob([JSON.stringify(body)], { type: "application/json" });
			navigator.sendBeacon("/api/analytics", blob);
		} else {
			// Log to console in development
			console.log(
				`[Web Vitals] ${metric.name}:`,
				metric.name === "CLS" ? (metric.value * 1000).toFixed(2) : Math.round(metric.value),
			);
		}
	});

	return null;
}
