"use client";

import { useState } from "react";

export default function AnalyticsContent() {
	const [activeTab, setActiveTab] = useState<
		"overview" | "real-time" | "competitor" | "cro"
	>("overview");

	const metrics = {
		pageViews: { current: 12450, change: 12.5 },
		uniqueVisitors: { current: 4230, change: 8.2 },
		avgSessionDuration: { current: "2:34", change: 5.1 },
		bounceRate: { current: 42, change: -3.2 },
		conversionRate: { current: 3.2, change: 18.5 },
		revenue: { current: 12450, change: 15.8 },
	};

	const trafficSources = [
		{ source: "Organic Search", value: 42, color: "bg-green-500" },
		{ source: "Direct", value: 28, color: "bg-blue-500" },
		{ source: "Social", value: 18, color: "bg-pink-500" },
		{ source: "Referral", value: 8, color: "bg-purple-500" },
		{ source: "Email", value: 4, color: "bg-amber-500" },
	];

	const topPages = [
		{ page: "/", views: 4200, bounce: 35 },
		{ page: "/services", views: 2800, bounce: 42 },
		{ page: "/contact", views: 1850, bounce: 28 },
		{ page: "/projects", views: 1200, bounce: 45 },
		{ page: "/book-now", views: 950, bounce: 22 },
	];

	const realtimeUsers = [
		{ page: "/", count: 12 },
		{ page: "/services", count: 8 },
		{ page: "/contact", count: 5 },
		{ page: "/book-now", count: 3 },
	];

	const croMetrics = {
		landingPageConversion: 4.2,
		ctaClickRate: 8.5,
		formCompletionRate: 62,
		avgTimeOnPage: "1:45",
		scrollDepth: 78,
	};

	const formatNumber = (num: number) => {
		if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
		return num.toString();
	};

	return (
		<>
			<section className="py-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold mb-2">
								📊 Analytics & Observability
							</h1>
							<p className="text-slate-300">
								Complete metrics dashboard with real-time tracking
							</p>
						</div>
						<div className="flex gap-3">
							<select className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm">
								<option className="text-zinc-900">Last 7 days</option>
								<option className="text-zinc-900">Last 30 days</option>
								<option className="text-zinc-900">Last 90 days</option>
							</select>
						</div>
					</div>
				</div>
			</section>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
					{[
						{
							label: "Page Views",
							value: formatNumber(metrics.pageViews.current),
							change: 12.5,
							icon: "👁️",
						},
						{
							label: "Visitors",
							value: formatNumber(metrics.uniqueVisitors.current),
							change: 8.2,
							icon: "👤",
						},
						{
							label: "Session Duration",
							value: "2:34",
							change: 5.1,
							icon: "⏱️",
						},
						{ label: "Bounce Rate", value: "42%", change: -3.2, icon: "↩️" },
						{ label: "Conversion", value: "3.2%", change: 18.5, icon: "🎯" },
						{ label: "Revenue", value: "$12.4K", change: 15.8, icon: "💰" },
					].map((metric) => (
						<div
							key={metric.label}
							className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md"
						>
							<div className="flex items-center gap-2 mb-2">
								<span>{metric.icon}</span>
								<p className="text-zinc-500 text-xs">{metric.label}</p>
							</div>
							<p className="text-xl font-bold text-zinc-900 dark:text-white">
								{metric.value}
							</p>
							<p
								className={`text-xs ${metric.change > 0 ? "text-green-600" : "text-red-600"}`}
							>
								{metric.change > 0 ? "↑" : "↓"}{" "}
								{Math.abs(
									typeof metric.change === "number" ? metric.change : 0,
								).toFixed(1)}
								%
							</p>
						</div>
					))}
				</div>

				<div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden mb-8">
					<div className="flex border-b border-zinc-200 dark:border-zinc-700">
						{[
							{ id: "overview", label: "📈 Overview" },
							{ id: "real-time", label: "⚡ Real-Time" },
							{ id: "competitor", label: "🏁 Competitor" },
							{ id: "cro", label: "🎯 CRO" },
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as typeof activeTab)}
								className={`flex-1 px-5 py-4 font-medium transition-colors ${
									activeTab === tab.id
										? "bg-slate-50 dark:bg-slate-700 text-slate-600 border-b-2 border-slate-600"
										: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700"
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>

					<div className="p-6">
						{activeTab === "overview" && (
							<div className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl">
										<h3 className="font-semibold mb-4">Traffic Sources</h3>
										<div className="space-y-3">
											{trafficSources.map((item) => (
												<div key={item.source}>
													<div className="flex justify-between text-sm mb-1">
														<span>{item.source}</span>
														<span>{item.value}%</span>
													</div>
													<div className="h-2 bg-zinc-200 dark:bg-zinc-600 rounded-full overflow-hidden">
														<div
															className={`h-full ${item.color}`}
															style={{ width: `${item.value}%` }}
														></div>
													</div>
												</div>
											))}
										</div>
									</div>
									<div className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl">
										<h3 className="font-semibold mb-4">Top Pages</h3>
										<div className="space-y-2">
											{topPages.map((page) => (
												<div
													key={page.page}
													className="flex justify-between items-center p-2 bg-white dark:bg-zinc-800 rounded-lg"
												>
													<span className="text-sm">{page.page}</span>
													<div className="text-right">
														<span className="text-sm font-medium">
															{page.views}
														</span>
														<span className="text-xs text-zinc-500 ml-2">
															({page.bounce}% bounce)
														</span>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
								<div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-xl">
									<h3 className="font-semibold mb-4">
										📈 Traffic Trend (Last 30 days)
									</h3>
									<div className="h-40 flex items-end gap-1">
										{[
											40, 55, 45, 60, 75, 65, 80, 70, 85, 90, 78, 95, 88, 100,
											92, 85, 95, 105, 98, 110, 102, 115, 108, 120, 112, 125,
											118, 130, 122, 135,
										].map((val, i) => (
											<div
												key={i}
												className="flex-1 bg-slate-400 rounded-t"
												style={{ height: `${val}%` }}
											></div>
										))}
									</div>
								</div>
							</div>
						)}

						{activeTab === "real-time" && (
							<div className="space-y-6">
								<div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
									<div className="flex items-center gap-2 mb-2">
										<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
										<h3 className="font-semibold">⚡ Real-Time Active Users</h3>
									</div>
									<p className="text-3xl font-bold text-green-600">28</p>
									<p className="text-sm text-zinc-500">
										users on site right now
									</p>
								</div>
								<div className="grid md:grid-cols-2 gap-4">
									<div className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl">
										<h3 className="font-semibold mb-3">Current Pages</h3>
										<div className="space-y-2">
											{realtimeUsers.map((user) => (
												<div
													key={user.page}
													className="flex justify-between items-center"
												>
													<span>{user.page}</span>
													<span className="font-bold text-blue-600">
														{user.count}
													</span>
												</div>
											))}
										</div>
									</div>
									<div className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl">
										<h3 className="font-semibold mb-3">Today Events</h3>
										<div className="space-y-2">
											{[
												{ event: "Page Views", count: 245 },
												{ event: "CTA Clicks", count: 18 },
												{ event: "Form Submits", count: 5 },
												{ event: "Phone Clicks", count: 12 },
											].map((e) => (
												<div
													key={e.event}
													className="flex justify-between items-center"
												>
													<span>{e.event}</span>
													<span className="font-medium">{e.count}</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						)}

						{activeTab === "competitor" && (
							<div className="space-y-6">
								<div className="grid md:grid-cols-3 gap-4">
									<div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
										<h3 className="text-sm text-zinc-500 mb-1">Your Rank</h3>
										<p className="text-3xl font-bold text-red-600">#4</p>
									</div>
									<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
										<h3 className="text-sm text-zinc-500 mb-1">Traffic Gap</h3>
										<p className="text-3xl font-bold text-blue-600">-2.1K</p>
									</div>
									<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
										<h3 className="text-sm text-zinc-500 mb-1">
											Keywords Ahead
										</h3>
										<p className="text-3xl font-bold text-green-600">8</p>
									</div>
								</div>
								<div className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl">
									<h3 className="font-semibold mb-4">
										🥊 Competitor Comparison
									</h3>
									<div className="overflow-x-auto">
										<table className="w-full">
											<thead>
												<tr className="text-left text-sm">
													<th className="pb-2">Metric</th>
													<th className="pb-2">You</th>
													<th className="pb-2">CleanPro</th>
													<th className="pb-2">Sparkle</th>
													<th className="pb-2">EcoClean</th>
												</tr>
											</thead>
											<tbody className="text-sm">
												<tr>
													<td>Organic traffic</td>
													<td>4.2K</td>
													<td>8.5K</td>
													<td>6.2K</td>
													<td>4.8K</td>
												</tr>
												<tr>
													<td>Page 1 keywords</td>
													<td>12</td>
													<td>28</td>
													<td>22</td>
													<td>15</td>
												</tr>
												<tr>
													<td>Backlinks</td>
													<td>156</td>
													<td>420</td>
													<td>310</td>
													<td>245</td>
												</tr>
												<tr>
													<td>Domain authority</td>
													<td>24</td>
													<td>42</td>
													<td>38</td>
													<td>31</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						)}

						{activeTab === "cro" && (
							<div className="space-y-6">
								<div className="grid md:grid-cols-3 gap-4">
									{[
										{
											label: "Landing Page CVR",
											value: `${croMetrics.landingPageConversion}%`,
											color: "text-green-600",
										},
										{
											label: "CTA Click Rate",
											value: `${croMetrics.ctaClickRate}%`,
											color: "text-blue-600",
										},
										{
											label: "Form Completion",
											value: `${croMetrics.formCompletionRate}%`,
											color: "text-purple-600",
										},
									].map((m) => (
										<div
											key={m.label}
											className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl text-center"
										>
											<p className="text-zinc-500 text-sm">{m.label}</p>
											<p className={`text-2xl font-bold ${m.color}`}>
												{m.value}
											</p>
										</div>
									))}
								</div>
								<div className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl">
									<h3 className="font-semibold mb-4">🎯 CRO Recommendations</h3>
									<div className="space-y-3">
										{[
											{
												priority: "high",
												rec: "Add urgency messaging to CTA buttons",
												impact: "+12%",
											},
											{
												priority: "high",
												rec: "Reduce form fields from 5 to 3",
												impact: "+25%",
											},
											{
												priority: "medium",
												rec: "Add trust badges near booking form",
												impact: "+8%",
											},
											{
												priority: "low",
												rec: "Fix mobile checkout flow",
												impact: "+5%",
											},
										].map((r, i) => (
											<div
												key={i}
												className="flex justify-between items-center p-3 bg-white dark:bg-zinc-800 rounded-lg"
											>
												<div className="flex items-center gap-3">
													<span
														className={`w-2 h-2 rounded-full ${
															r.priority === "high"
																? "bg-red-500"
																: r.priority === "medium"
																	? "bg-amber-500"
																	: "bg-green-500"
														}`}
													></span>
													<span>{r.rec}</span>
												</div>
												<span className="text-green-600 font-medium">
													{r.impact}
												</span>
											</div>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-xl text-center">
					<p className="text-sm text-zinc-500">
						🔧 Distributed Tracing • OpenTelemetry • Grafana Ready • Prometheus
						Metrics
					</p>
				</div>
			</main>
		</>
	);
}
