"use client";

import Link from "next/link";

export default function EarnTab() {
	return (
		<div className="space-y-6">
			<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
				<h2 className="text-2xl font-bold text-white mb-4">
					💰 Earnings Dashboard
				</h2>
				<p className="text-slate-400 mb-6">
					Track cleaner payouts, income streaks, and job history.
				</p>
				<Link
					href="/earn"
					className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
				>
					Open Earnings Dashboard →
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
					<h3 className="text-lg font-bold text-white mb-3">Pending Payouts</h3>
					<p className="text-4xl font-bold text-amber-400">$24.75</p>
					<p className="text-sm text-slate-400 mt-1">Available now</p>
				</div>
				<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
					<h3 className="text-lg font-bold text-white mb-3">Active Streak</h3>
					<p className="text-4xl font-bold text-orange-400">28 days</p>
					<p className="text-sm text-slate-400 mt-1">🔥 Keep it going!</p>
				</div>
				<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
					<h3 className="text-lg font-bold text-white mb-3">Total Jobs</h3>
					<p className="text-4xl font-bold text-emerald-400">156</p>
					<p className="text-sm text-slate-400 mt-1">$78.50 avg/job</p>
				</div>
			</div>
		</div>
	);
}
