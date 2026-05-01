import Link from "next/link";

export default function Coverage() {
	const states = [
		{ name: "NSW", suburbs: 3247, active: 2987, coverage: 92, color: "blue" },
		{ name: "VIC", suburbs: 2156, active: 1847, coverage: 86, color: "green" },
		{ name: "QLD", suburbs: 1892, active: 1456, coverage: 77, color: "orange" },
		{ name: "WA", suburbs: 1234, active: 847, coverage: 69, color: "purple" },
		{ name: "SA", suburbs: 847, active: 623, coverage: 74, color: "pink" },
		{ name: "TAS", suburbs: 234, active: 187, coverage: 80, color: "yellow" },
		{ name: "ACT", suburbs: 156, active: 142, coverage: 91, color: "indigo" },
		{ name: "NT", suburbs: 481, active: 234, coverage: 49, color: "red" },
	];

	const stateColorMap: Record<string, string> = {
		blue: "bg-gradient-to-r from-blue-500 to-blue-600",
		green: "bg-gradient-to-r from-green-500 to-green-600",
		orange: "bg-gradient-to-r from-orange-500 to-orange-600",
		purple: "bg-gradient-to-r from-purple-500 to-purple-600",
		pink: "bg-gradient-to-r from-pink-500 to-pink-600",
		yellow: "bg-gradient-to-r from-yellow-500 to-yellow-600",
		indigo: "bg-gradient-to-r from-indigo-500 to-indigo-600",
		red: "bg-gradient-to-r from-red-500 to-red-600",
	};

	return (
		<section id="coverage" className="py-20 bg-white dark:bg-zinc-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
						National <span className="text-blue-500">Coverage</span>
					</h2>
					<p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
						Serving 8,323+ suburbs across all Australian states and territories
					</p>
				</div>

				{/* Stats Summary */}
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
					{states.map((state) => (
						<div
							key={state.name}
							className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
						>
							<p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
								{state.name}
							</p>
							<div className="mt-2">
								<p className="text-2xl font-bold text-zinc-900 dark:text-white">
									{state.active.toLocaleString()}
								</p>
								<p className="text-xs text-zinc-500 dark:text-zinc-400">
									of {state.suburbs.toLocaleString()}
								</p>
							</div>
							<div className="mt-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5">
								<div
									className={`h-1.5 rounded-full transition-all duration-500 ${stateColorMap[state.color] || "bg-gradient-to-r from-blue-500 to-blue-600"}`}
									style={{ width: `${state.coverage}%` }}
								/>
							</div>
							<p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-1">
								{state.coverage}%
							</p>
						</div>
					))}
				</div>

				{/* Coverage Map Placeholder */}
				<div className="relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl h-96 flex items-center justify-center">
					<div className="text-center">
						<span className="text-8xl mb-4 block">🇦🇺</span>
						<h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
							Interactive Coverage Map
						</h3>
						<p className="text-zinc-600 dark:text-zinc-400">
							Click to explore service availability by region
						</p>
						<Link
							href="/dashboard"
							className="inline-block mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
						>
							View Full Dashboard
						</Link>
					</div>
				</div>

				{/* Coverage Details */}
				<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
						<h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
							🎯 Metropolitan Areas
						</h3>
						<ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
							<li className="flex items-center gap-2">
								<svg
									className="w-4 h-4 text-green-500"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
								Sydney, Melbourne, Brisbane fully covered
							</li>
							<li className="flex items-center gap-2">
								<svg
									className="w-4 h-4 text-green-500"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
								Perth, Adelaide 80%+ coverage
							</li>
							<li className="flex items-center gap-2">
								<svg
									className="w-4 h-4 text-green-500"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
								Canberra, Darwin, Hobart expanding
							</li>
						</ul>
					</div>

					<div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
						<h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
							📈 Growth Metrics
						</h3>
						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-zinc-600 dark:text-zinc-400">
									New suburbs this month
								</span>
								<span className="font-semibold text-green-600">+127</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-zinc-600 dark:text-zinc-400">
									Total coverage
								</span>
								<span className="font-semibold text-blue-600">81%</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-zinc-600 dark:text-zinc-400">
									Monthly revenue
								</span>
								<span className="font-semibold text-purple-600">$39.1M</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-zinc-600 dark:text-zinc-400">
									Growth trend
								</span>
								<span className="font-semibold text-green-600">📈 +4.2%</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
