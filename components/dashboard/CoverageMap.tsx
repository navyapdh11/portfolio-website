"use client";

interface CoverageMapProps {
	state: string;
	services: string[];
	onSuburbClick: (suburb: { name: string; state: string }) => void;
}

export function CoverageMap({ state, services, onSuburbClick }: CoverageMapProps) {
	return (
		<div className="bg-white dark:bg-zinc-900 rounded-xl p-8 shadow-xl border">
			<div className="text-center mb-6">
				<h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
					🗺️ Australia Coverage Map
				</h3>
				<p className="text-zinc-600 dark:text-zinc-400">
					{state === "ALL" ? "National Overview" : `${state} Region`} • {services.length} service
					{services.length !== 1 ? "s" : ""} selected
				</p>
			</div>

			{/* Map Placeholder - In production, you'd use a real map library like Leaflet */}
			<div className="relative bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-lg h-96 flex items-center justify-center overflow-hidden">
				{/* Decorative grid */}
				<div className="absolute inset-0 opacity-10">
					<div className="grid grid-cols-12 grid-rows-8 h-full">
						{Array.from({ length: 96 }).map((_, i) => (
							<div key={i} className="border border-zinc-300 dark:border-zinc-700" />
						))}
					</div>
				</div>

				{/* Australia outline (simplified) */}
				<div className="relative z-10 text-center">
					<div className="text-9xl mb-4">🇦🇺</div>
					<div className="space-y-3">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
							<div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
							<span className="text-sm font-semibold text-zinc-900 dark:text-white">
								8,323 Active Suburbs
							</span>
						</div>
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg ml-4">
							<div className="w-3 h-3 bg-blue-500 rounded-full" />
							<span className="text-sm font-semibold text-zinc-900 dark:text-white">
								1,924 Pending Activation
							</span>
						</div>
					</div>

					{/* Interactive hotspots */}
					<div className="absolute top-1/4 left-1/3 group">
						<button
							onClick={() => onSuburbClick({ name: "Sydney", state: "NSW" })}
							className="w-4 h-4 bg-green-500 rounded-full shadow-lg hover:scale-150 transition-transform cursor-pointer"
							title="Sydney, NSW"
						>
							<span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
								Sydney - 2,987 active
							</span>
						</button>
					</div>

					<div className="absolute top-1/3 left-1/4 group">
						<button
							onClick={() => onSuburbClick({ name: "Melbourne", state: "VIC" })}
							className="w-4 h-4 bg-green-500 rounded-full shadow-lg hover:scale-150 transition-transform cursor-pointer"
							title="Melbourne, VIC"
						>
							<span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
								Melbourne - 1,847 active
							</span>
						</button>
					</div>

					<div className="absolute top-1/4 right-1/3 group">
						<button
							onClick={() => onSuburbClick({ name: "Brisbane", state: "QLD" })}
							className="w-4 h-4 bg-green-500 rounded-full shadow-lg hover:scale-150 transition-transform cursor-pointer"
							title="Brisbane, QLD"
						>
							<span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
								Brisbane - 1,456 active
							</span>
						</button>
					</div>
				</div>
			</div>

			{/* Legend */}
			<div className="mt-6 flex flex-wrap justify-center gap-6">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-green-500 rounded-full" />
					<span className="text-sm text-zinc-700 dark:text-zinc-300">Active Service Area</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-blue-500 rounded-full" />
					<span className="text-sm text-zinc-700 dark:text-zinc-300">Partial Coverage</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-zinc-300 dark:bg-zinc-600 rounded-full" />
					<span className="text-sm text-zinc-700 dark:text-zinc-300">Not Yet Available</span>
				</div>
			</div>

			{/* Note */}
			<div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
				<p className="text-sm text-blue-700 dark:text-blue-400">
					<strong>Interactive Map:</strong> Click on hotspots to filter suburbs by location. In
					production, this integrates with Leaflet or Google Maps for full interactivity.
				</p>
			</div>
		</div>
	);
}
