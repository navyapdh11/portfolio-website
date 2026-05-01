"use client";
import { useState } from "react";

export default function SeoDashboard() {
	const [strategy, setStrategy] = useState("Aggressive Suburb Expansion");

	return (
		<main className="p-8 bg-slate-900 text-white min-h-screen">
			<h1 className="text-3xl font-bold mb-8">SEO/AEO/GEO Strategy Hub</h1>

			<div className="grid md:grid-cols-2 gap-8">
				<div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
					<h2 className="text-xl font-bold mb-4">Strategic Presets</h2>
					<select
						value={strategy}
						onChange={(e) => setStrategy(e.target.value)}
						className="w-full p-3 bg-slate-700 rounded-lg mb-4"
					>
						<option>Aggressive Suburb Expansion</option>
						<option>Brand Authority Focus</option>
						<option>Competitor Thrashing Mode</option>
					</select>
					<button className="w-full py-3 bg-sky-600 rounded-lg font-bold hover:bg-sky-500">
						Apply Strategy
					</button>
				</div>

				<div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
					<h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
					<div className="space-y-4">
						<div className="flex justify-between">
							<span>GEO-SEO Precision</span> <span>98.5/100</span>
						</div>
						<div className="flex justify-between">
							<span>Voice AEO Score</span> <span>96.2/100</span>
						</div>
						<div className="flex justify-between">
							<span>Link Health</span> <span>100%</span>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
