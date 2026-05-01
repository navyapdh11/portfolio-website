"use client";

import { useEffect, useState } from "react";

interface EarningEntry {
	id: number;
	date: string;
	job: string;
	amount: number;
	status: string;
}

export default function EarnContent() {
	const [activeTab, setActiveTab] = useState<
		"overview" | "history" | "payouts"
	>("overview");
	const [showPayoutModal, setShowPayoutModal] = useState(false);
	const [payoutAmount, setPayoutAmount] = useState<number | null>(null);

	const earnings: EarningEntry[] = [
		{
			id: 1,
			date: "2026-04-10",
			job: "Deep Clean - West Leederville",
			amount: 85,
			status: "completed",
		},
		{
			id: 2,
			date: "2026-04-09",
			job: "Office Tower - Weekly",
			amount: 450,
			status: "completed",
		},
		{
			id: 3,
			date: "2026-04-08",
			job: "End of Lease - Subiaco",
			amount: 120,
			status: "completed",
		},
		{
			id: 4,
			date: "2026-04-07",
			job: "Medical Centre - Daily",
			amount: 95,
			status: "completed",
		},
		{
			id: 5,
			date: "2026-04-06",
			job: "Regular House Clean",
			amount: 75,
			status: "completed",
		},
		{
			id: 6,
			date: "2026-04-05",
			job: "Retail Space - Daily",
			amount: 75,
			status: "completed",
		},
		{
			id: 7,
			date: "2026-04-04",
			job: "Post-Reno Clean",
			amount: 200,
			status: "completed",
		},
		{
			id: 8,
			date: "2026-04-03",
			job: "Carpet Cleaning",
			amount: 60,
			status: "completed",
		},
	];

	const stats = {
		thisMonth: 147.5,
		lastMonth: 125.0,
		streak: 28,
		averagePerJob: 78.5,
		totalJobs: 156,
		pendingPayout: 24.75,
	};

	useEffect(() => {
		setPayoutAmount(stats.pendingPayout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stats.pendingPayout]);

	const formatCurrency = (amount: number) => {
		return amount.toLocaleString("en-AU", {
			style: "currency",
			currency: "AUD",
		});
	};

	const exportCSV = () => {
		const headers = "Date,Job,Amount,Status\n";
		const rows = earnings
			.map((e) => `${e.date},"${e.job}",${e.amount},${e.status}`)
			.join("\n");
		const csv = headers + rows;
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "earnings.csv";
		a.click();
	};

	return (
		<>
			<section className="py-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold mb-2">
								💰 Earnings Dashboard
							</h1>
							<p className="text-emerald-100">
								Track your cleaning income and performance
							</p>
						</div>
						<div className="flex gap-3">
							<button
								onClick={exportCSV}
								className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl font-medium transition-all"
							>
								📊 Export CSV
							</button>
							<button
								onClick={() => {
									setPayoutAmount(stats.pendingPayout);
									setShowPayoutModal(true);
								}}
								className="px-5 py-2.5 bg-white text-emerald-700 hover:bg-gray-100 rounded-xl font-medium transition-all"
							>
								💸 Request Payout
							</button>
						</div>
					</div>
				</div>
			</section>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-md">
						<p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">
							This Month
						</p>
						<p className="text-3xl font-bold text-emerald-600">
							{formatCurrency(stats.thisMonth)}
						</p>
						<p className="text-xs text-green-500 mt-1">
							↑{" "}
							{(
								((stats.thisMonth - stats.lastMonth) / stats.lastMonth) *
								100
							).toFixed(0)}
							% from last month
						</p>
					</div>
					<div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-md">
						<p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">
							Pending Payout
						</p>
						<p className="text-3xl font-bold text-amber-600">
							{formatCurrency(stats.pendingPayout)}
						</p>
						<p className="text-xs text-zinc-500 mt-1">Available now</p>
					</div>
					<div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-md">
						<p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">
							Active Streak
						</p>
						<p className="text-3xl font-bold text-orange-600">
							{stats.streak} days
						</p>
						<p className="text-xs text-zinc-500 mt-1">🔥 Keep it going!</p>
					</div>
					<div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-md">
						<p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">
							Avg per Job
						</p>
						<p className="text-3xl font-bold text-indigo-600">
							{formatCurrency(stats.averagePerJob)}
						</p>
						<p className="text-xs text-zinc-500 mt-1">
							{stats.totalJobs} total jobs
						</p>
					</div>
				</div>

				<div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden">
					<div className="flex border-b border-zinc-200 dark:border-zinc-700">
						<button
							onClick={() => setActiveTab("overview")}
							className={`flex-1 px-6 py-4 font-medium transition-colors ${
								activeTab === "overview"
									? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-b-2 border-emerald-600"
									: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700"
							}`}
						>
							📈 Overview
						</button>
						<button
							onClick={() => setActiveTab("history")}
							className={`flex-1 px-6 py-4 font-medium transition-colors ${
								activeTab === "history"
									? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-b-2 border-emerald-600"
									: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700"
							}`}
						>
							📋 History
						</button>
						<button
							onClick={() => setActiveTab("payouts")}
							className={`flex-1 px-6 py-4 font-medium transition-colors ${
								activeTab === "payouts"
									? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-b-2 border-emerald-600"
									: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700"
							}`}
						>
							💸 Payouts
						</button>
					</div>

					<div className="p-6">
						{activeTab === "overview" && (
							<div className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
										<h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
											Monthly Earnings
										</h3>
										<div className="h-40 flex items-end gap-2">
											{[65, 78, 82, 70, 95, 88, 72, 90, 85, 92, 78, 98].map(
												(val, i) => (
													<div
														key={i}
														className="flex-1 bg-emerald-500 rounded-t"
														style={{ height: `${val}%` }}
													></div>
												),
											)}
										</div>
										<div className="flex justify-between text-xs text-zinc-500 mt-2">
											<span>Jan</span>
											<span>Dec</span>
										</div>
									</div>
									<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
										<h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
											Jobs by Type
										</h3>
										<div className="space-y-3">
											{[
												{
													type: "Deep Clean",
													pct: 35,
													color: "bg-emerald-500",
												},
												{ type: "Commercial", pct: 28, color: "bg-blue-500" },
												{
													type: "End of Lease",
													pct: 22,
													color: "bg-purple-500",
												},
												{ type: "Regular", pct: 15, color: "bg-amber-500" },
											].map((item) => (
												<div key={item.type}>
													<div className="flex justify-between text-sm mb-1">
														<span>{item.type}</span>
														<span>{item.pct}%</span>
													</div>
													<div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
														<div
															className={`h-full ${item.color}`}
															style={{ width: `${item.pct}%` }}
														></div>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						)}

						{activeTab === "history" && (
							<div className="space-y-3">
								{earnings.map((entry) => (
									<div
										key={entry.id}
										className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl"
									>
										<div>
											<p className="font-medium text-zinc-900 dark:text-white">
												{entry.job}
											</p>
											<p className="text-sm text-zinc-500">{entry.date}</p>
										</div>
										<div className="text-right">
											<p className="font-bold text-emerald-600">
												{formatCurrency(entry.amount)}
											</p>
											<span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
												{entry.status}
											</span>
										</div>
									</div>
								))}
							</div>
						)}

						{activeTab === "payouts" && (
							<div className="space-y-4">
								<div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl">
									<div className="flex justify-between items-center mb-4">
										<div>
											<h3 className="font-semibold text-zinc-900 dark:text-white">
												Bank Account
											</h3>
											<p className="text-sm text-zinc-500">****4521</p>
										</div>
										<button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
											Update
										</button>
									</div>
									<div className="grid grid-cols-2 gap-4 text-sm">
										<div>
											<p className="text-zinc-500">Next payout</p>
											<p className="font-medium">Friday, Apr 12</p>
										</div>
										<div>
											<p className="text-zinc-500">Minimum</p>
											<p className="font-medium">$20.00</p>
										</div>
									</div>
								</div>

								<div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl">
									<h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
										Payout History
									</h3>
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-zinc-600 dark:text-zinc-400">
												Apr 5, 2026
											</span>
											<span className="font-medium">$125.00</span>
											<span className="text-green-600">Completed</span>
										</div>
										<div className="flex justify-between">
											<span className="text-zinc-600 dark:text-zinc-400">
												Mar 28, 2026
											</span>
											<span className="font-medium">$98.50</span>
											<span className="text-green-600">Completed</span>
										</div>
										<div className="flex justify-between">
											<span className="text-zinc-600 dark:text-zinc-400">
												Mar 21, 2026
											</span>
											<span className="font-medium">$145.00</span>
											<span className="text-green-600">Completed</span>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</main>

			{showPayoutModal && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
					<div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xl font-bold text-zinc-900 dark:text-white">
								Request Payout
							</h3>
							<button
								onClick={() => setShowPayoutModal(false)}
								className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-2xl"
							>
								×
							</button>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
								Amount
							</label>
							<input
								type="number"
								value={payoutAmount ?? 0}
								onChange={(e) => setPayoutAmount(Number(e.target.value))}
								className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-xl bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
							/>
							<p className="text-sm text-zinc-500 mt-2">
								Available: {formatCurrency(stats.pendingPayout)}
							</p>
						</div>
						<div className="flex gap-3">
							<button
								onClick={() => setPayoutAmount(20)}
								className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm"
							>
								$20
							</button>
							<button
								onClick={() => setPayoutAmount(50)}
								className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm"
							>
								$50
							</button>
							<button
								onClick={() => setPayoutAmount(stats.pendingPayout)}
								className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm"
							>
								All
							</button>
						</div>
						<button
							onClick={() => {
								if (payoutAmount !== null) {
									alert(`Payout of ${formatCurrency(payoutAmount)} requested!`);
								}
								setShowPayoutModal(false);
							}}
							className="w-full mt-4 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium"
						>
							Request Payout
						</button>
					</div>
				</div>
			)}
		</>
	);
}
