"use client";

import Link from "next/link";

export default function FlashcardsTab() {
	return (
		<div className="space-y-6">
			<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
				<h2 className="text-2xl font-bold text-white mb-4">
					🧠 Strategy Flashcards
				</h2>
				<p className="text-slate-400 mb-6">
					SEO, CRO, GEO, AEO optimization recommendations and best practices for
					cleaning businesses.
				</p>
				<Link
					href="/flashcards"
					className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-colors"
				>
					Open Flashcards →
				</Link>
			</div>

			<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
				<h3 className="text-lg font-bold text-white mb-4">
					Latest Strategy Cards
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{[
						{ title: "Local SEO for Cleaners", tag: "SEO" },
						{ title: "Conversion Rate Optimization", tag: "CRO" },
						{ title: "Generative Engine Optimization", tag: "GEO" },
						{ title: "Answer Engine Optimization", tag: "AEO" },
					].map((card, i) => (
						<div
							key={i}
							className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl"
						>
							<span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full">
								{card.tag}
							</span>
							<p className="mt-2 text-white font-medium">{card.title}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
