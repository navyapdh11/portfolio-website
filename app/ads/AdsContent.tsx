"use client";

import { useState } from "react";

interface AdCampaign {
	id: number;
	platform: string;
	name: string;
	status: string;
	budget: number;
	spent: number;
	impressions: number;
	clicks: number;
	conversions: number;
	ctr: number;
	roas: number;
}

interface Competitor {
	id: number;
	name: string;
	adspend: number;
	keywords: string[];
	traffic: number;
	ranking: number;
}

interface SeoMetric {
	keyword: string;
	ranking: number;
	volume: number;
	difficulty: number;
	trend: string;
}

export default function AdsContent() {
	const [activeTab, setActiveTab] = useState<"campaigns" | "competitor" | "seo" | "analytics">(
		"campaigns",
	);

	const campaigns: AdCampaign[] = [
		{
			id: 1,
			platform: "facebook",
			name: "Spring Clean Special",
			status: "active",
			budget: 500,
			spent: 312,
			impressions: 45000,
			clicks: 890,
			conversions: 23,
			ctr: 1.98,
			roas: 4.2,
		},
		{
			id: 2,
			platform: "instagram",
			name: "Before/After Gallery",
			status: "active",
			budget: 300,
			spent: 187,
			impressions: 28000,
			clicks: 560,
			conversions: 18,
			ctr: 2.0,
			roas: 3.8,
		},
		{
			id: 3,
			platform: "google",
			name: "Perth Cleaning Search",
			status: "active",
			budget: 800,
			spent: 524,
			impressions: 12000,
			clicks: 340,
			conversions: 45,
			ctr: 2.83,
			roas: 5.2,
		},
		{
			id: 4,
			platform: "facebook",
			name: "End of Lease Promo",
			status: "paused",
			budget: 400,
			spent: 145,
			impressions: 18000,
			clicks: 290,
			conversions: 12,
			ctr: 1.61,
			roas: 2.9,
		},
		{
			id: 5,
			platform: "google",
			name: "Commercial Cleaning",
			status: "active",
			budget: 600,
			spent: 398,
			impressions: 8500,
			clicks: 220,
			conversions: 31,
			ctr: 2.59,
			roas: 4.8,
		},
	];

	const competitors: Competitor[] = [
		{
			id: 1,
			name: "CleanPro Perth",
			adspend: 4200,
			keywords: ["perth cleaning", "house cleaning perth", "commercial cleaning"],
			traffic: 8500,
			ranking: 1,
		},
		{
			id: 2,
			name: "Sparkle Services",
			adspend: 3100,
			keywords: ["cleaning services perth", "office cleaning"],
			traffic: 6200,
			ranking: 2,
		},
		{
			id: 3,
			name: "EcoClean WA",
			adspend: 2800,
			keywords: ["eco cleaning perth", "green cleaning"],
			traffic: 4800,
			ranking: 3,
		},
		{
			id: 4,
			name: "Perth Shine",
			adspend: 1900,
			keywords: ["carpet cleaning perth", "end of lease cleaning"],
			traffic: 3200,
			ranking: 4,
		},
	];

	const seoMetrics: SeoMetric[] = [
		{
			keyword: "cleaning services perth",
			ranking: 12,
			volume: 2400,
			difficulty: 67,
			trend: "up",
		},
		{
			keyword: "house cleaning perth",
			ranking: 8,
			volume: 1800,
			difficulty: 58,
			trend: "up",
		},
		{
			keyword: "end of lease cleaning perth",
			ranking: 5,
			volume: 920,
			difficulty: 45,
			trend: "stable",
		},
		{
			keyword: "commercial cleaning perth",
			ranking: 15,
			volume: 1100,
			difficulty: 72,
			trend: "down",
		},
		{
			keyword: "deep cleaning perth",
			ranking: 3,
			volume: 650,
			difficulty: 38,
			trend: "up",
		},
	];

	const getPlatformIcon = (platform: string) => {
		const icons: Record<string, string> = {
			facebook: "📘",
			instagram: "📸",
			google: "🔍",
			linkedin: "💼",
		};
		return icons[platform] || "📱";
	};

	const getStatusColor = (status: string) => {
		return status === "active" ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-700";
	};

	const getTrendColor = (trend: string) => {
		return trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-zinc-500";
	};

	const totalSpend = campaigns.reduce((sum, c) => sum + c.spent, 0);
	const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
	const avgRoas = campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length;
	const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);

	return (
		<>
			<section className="py-8 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold mb-2">📣 Ads Manager</h1>
							<p className="text-pink-100">
								Manage campaigns, track competitors, and optimize for CRO/SEO
							</p>
						</div>
						<button type="button" className="px-5 py-2.5 bg-white text-purple-700 hover:bg-gray-100 rounded-xl font-medium transition-all">
							➕ New Campaign
						</button>
					</div>
				</div>
			</section>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<div className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow-md">
						<p className="text-zinc-500 text-sm">Total Spend</p>
						<p className="text-2xl font-bold text-purple-600">${totalSpend}</p>
					</div>
					<div className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow-md">
						<p className="text-zinc-500 text-sm">Conversions</p>
						<p className="text-2xl font-bold text-green-600">{totalConversions}</p>
					</div>
					<div className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow-md">
						<p className="text-zinc-500 text-sm">Avg ROAS</p>
						<p className="text-2xl font-bold text-blue-600">{avgRoas.toFixed(1)}x</p>
					</div>
					<div className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow-md">
						<p className="text-zinc-500 text-sm">Impressions</p>
						<p className="text-2xl font-bold text-indigo-600">
							{(totalImpressions / 1000).toFixed(1)}K
						</p>
					</div>
				</div>

				<div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden">
					<div className="flex border-b border-zinc-200 dark:border-zinc-700 overflow-x-auto">
						{[
							{ id: "campaigns", label: "📊 Campaigns" },
							{ id: "competitor", label: "🥊 Competitor" },
							{ id: "seo", label: "🔍 SEO Tracking" },
							{ id: "analytics", label: "📈 Analytics" },
						].map((tab) => (
							<button
								key={tab.id}
								type="button"
								onClick={() => setActiveTab(tab.id as typeof activeTab)}
								className={`flex-1 px-5 py-4 font-medium whitespace-nowrap transition-colors ${
									activeTab === tab.id
										? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 border-b-2 border-purple-600"
										: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700"
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>

					<div className="p-6">
						{activeTab === "campaigns" && (
							<div className="space-y-4">
								{campaigns.map((campaign) => (
									<div key={campaign.id} className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl">
										<div className="flex flex-wrap justify-between items-start gap-4 mb-3">
											<div className="flex items-center gap-3">
												<span className="text-2xl">{getPlatformIcon(campaign.platform)}</span>
												<div>
													<h3 className="font-semibold text-zinc-900 dark:text-white">
														{campaign.name}
													</h3>
													<p className="text-sm text-zinc-500">{campaign.platform}</p>
												</div>
											</div>
											<span
												className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}
											>
												{campaign.status}
											</span>
										</div>
										<div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
											<div>
												<p className="text-zinc-500">Budget</p>
												<p className="font-medium">${campaign.budget}</p>
											</div>
											<div>
												<p className="text-zinc-500">Spent</p>
												<p className="font-medium">${campaign.spent}</p>
											</div>
											<div>
												<p className="text-zinc-500">CTR</p>
												<p className="font-medium">{campaign.ctr}%</p>
											</div>
											<div>
												<p className="text-zinc-500">Clicks</p>
												<p className="font-medium">{campaign.clicks}</p>
											</div>
											<div>
												<p className="text-zinc-500">ROAS</p>
												<p className="font-bold text-green-600">{campaign.roas}x</p>
											</div>
										</div>
										<div className="mt-3 flex gap-2">
											<button type="button" className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors">
												Edit
											</button>
											<button type="button" className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-300 text-sm rounded-lg transition-colors">
												{campaign.status === "active" ? "Pause" : "Activate"}
											</button>
										</div>
									</div>
								))}
							</div>
						)}

						{activeTab === "competitor" && (
							<div className="space-y-4">
								<div className="grid md:grid-cols-2 gap-6">
									<div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
										<h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
											🦴 Competitor Analysis
										</h3>
										<div className="space-y-3">
											{competitors.map((comp) => (
												<div
													key={comp.id}
													className="flex justify-between items-center p-3 bg-white dark:bg-zinc-800 rounded-lg"
												>
													<div>
														<p className="font-medium">
															#{comp.ranking} {comp.name}
														</p>
														<p className="text-xs text-zinc-500">{comp.keywords.join(", ")}</p>
													</div>
													<div className="text-right">
														<p className="font-bold text-red-600">${comp.adspend}/mo</p>
														<p className="text-xs text-zinc-500">
															{comp.traffic.toLocaleString()} visits
														</p>
													</div>
												</div>
											))}
										</div>
									</div>
									<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
										<h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
											🎯 Keyword Opportunities
										</h3>
										<div className="space-y-2">
											{seoMetrics.map((metric) => (
												<div
													key={metric.keyword}
													className="flex justify-between items-center p-2 bg-white dark:bg-zinc-800 rounded-lg text-sm"
												>
													<span className="text-zinc-700 dark:text-zinc-300">{metric.keyword}</span>
													<span className={`font-medium ${getTrendColor(metric.trend)}`}>
														{metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "→"} #
														{metric.ranking}
													</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						)}

						{activeTab === "seo" && (
							<div className="space-y-4">
								<div className="grid md:grid-cols-3 gap-4 mb-6">
									<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
										<p className="text-2xl font-bold text-green-600">8</p>
										<p className="text-sm text-zinc-500">Top 10 Rankings</p>
									</div>
									<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
										<p className="text-2xl font-bold text-blue-600">12</p>
										<p className="text-sm text-zinc-500">Tracking Keywords</p>
									</div>
									<div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
										<p className="text-2xl font-bold text-purple-600">+3</p>
										<p className="text-sm text-zinc-500">This Month</p>
									</div>
								</div>
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead className="bg-zinc-100 dark:bg-zinc-700">
											<tr>
												<th className="px-4 py-3 text-left text-sm font-medium">Keyword</th>
												<th className="px-4 py-3 text-left text-sm font-medium">Ranking</th>
												<th className="px-4 py-3 text-left text-sm font-medium">Volume</th>
												<th className="px-4 py-3 text-left text-sm font-medium">Difficulty</th>
												<th className="px-4 py-3 text-left text-sm font-medium">Trend</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
											{seoMetrics.map((metric) => (
												<tr key={metric.keyword}>
													<td className="px-4 py-3 font-medium">{metric.keyword}</td>
													<td className="px-4 py-3">#{metric.ranking}</td>
													<td className="px-4 py-3">{metric.volume.toLocaleString()}</td>
													<td className="px-4 py-3">{metric.difficulty}%</td>
													<td className={`px-4 py-3 font-medium ${getTrendColor(metric.trend)}`}>
														{metric.trend === "up"
															? "↑ Improving"
															: metric.trend === "down"
																? "↓ Declining"
																: "→ Stable"}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}

						{activeTab === "analytics" && (
							<div className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl">
										<h3 className="font-semibold mb-4">📊 Conversion funnel</h3>
										<div className="space-y-3">
											{[
												{
													label: "Impressions",
													value: totalImpressions,
													pct: 100,
												},
												{ label: "Clicks", value: 2210, pct: 4.9 },
												{ label: "Leads", value: 129, pct: 5.8 },
												{
													label: "Conversions",
													value: totalConversions,
													pct: 100,
												},
											].map((step) => (
												<div key={step.label}>
													<div className="flex justify-between text-sm mb-1">
														<span>{step.label}</span>
														<span>{step.value.toLocaleString()}</span>
													</div>
													<div className="h-3 bg-zinc-200 dark:bg-zinc-600 rounded-full overflow-hidden">
														<div
															className="h-full bg-purple-500"
															style={{ width: `${step.pct}%` }}
														></div>
													</div>
												</div>
											))}
										</div>
									</div>
									<div className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl">
										<h3 className="font-semibold mb-4">💰 Revenue Attribution</h3>
										<div className="space-y-3">
											{[
												{
													source: "Google Ads",
													value: 65,
													color: "bg-green-500",
												},
												{ source: "Facebook", value: 20, color: "bg-blue-500" },
												{
													source: "Instagram",
													value: 10,
													color: "bg-pink-500",
												},
												{ source: "Organic", value: 5, color: "bg-amber-500" },
											].map((item) => (
												<div key={item.source}>
													<div className="flex justify-between text-sm mb-1">
														<span>{item.source}</span>
														<span>{item.value}%</span>
													</div>
													<div className="h-3 bg-zinc-200 dark:bg-zinc-600 rounded-full overflow-hidden">
														<div
															className={`h-full ${item.color}`}
															style={{ width: `${item.value}%` }}
														></div>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
}
