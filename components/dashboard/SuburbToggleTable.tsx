"use client";

import { useMemo } from "react";

interface Suburb {
	id: string;
	name: string;
	postcode: string;
	state: string;
	active: boolean;
	services: string[];
	lastBooking?: string;
	monthlyRevenue?: number;
}

interface SuburbToggleTableProps {
	state: string;
	services: string[];
	searchQuery: string;
	onToggle: (id: string, enabled: boolean) => void;
	pendingChanges: Map<string, boolean>;
}

// Sample data - in production, this would come from an API/database
const sampleSuburbs: Suburb[] = [
	{
		id: "1",
		name: "Bondi Junction",
		postcode: "2022",
		state: "NSW",
		active: true,
		services: ["house-cleaning", "end-of-lease"],
		lastBooking: "2h ago",
		monthlyRevenue: 45000,
	},
	{
		id: "2",
		name: "Parramatta",
		postcode: "2150",
		state: "NSW",
		active: true,
		services: ["house-cleaning", "commercial"],
		lastBooking: "5h ago",
		monthlyRevenue: 38000,
	},
	{
		id: "3",
		name: "Manly",
		postcode: "2095",
		state: "NSW",
		active: false,
		services: [],
		lastBooking: "3d ago",
		monthlyRevenue: 0,
	},
	{
		id: "4",
		name: "Melbourne CBD",
		postcode: "3000",
		state: "VIC",
		active: true,
		services: ["house-cleaning", "end-of-lease", "commercial"],
		lastBooking: "1h ago",
		monthlyRevenue: 62000,
	},
	{
		id: "5",
		name: "South Yarra",
		postcode: "3141",
		state: "VIC",
		active: true,
		services: ["house-cleaning"],
		lastBooking: "4h ago",
		monthlyRevenue: 28000,
	},
	{
		id: "6",
		name: "Fortitude Valley",
		postcode: "4006",
		state: "QLD",
		active: true,
		services: ["house-cleaning", "commercial"],
		lastBooking: "3h ago",
		monthlyRevenue: 32000,
	},
	{
		id: "7",
		name: "Fremantle",
		postcode: "6160",
		state: "WA",
		active: false,
		services: [],
		lastBooking: "1w ago",
		monthlyRevenue: 0,
	},
	{
		id: "8",
		name: "North Adelaide",
		postcode: "5006",
		state: "SA",
		active: true,
		services: ["house-cleaning", "end-of-lease"],
		lastBooking: "6h ago",
		monthlyRevenue: 21000,
	},
	{
		id: "9",
		name: "Hobart CBD",
		postcode: "7000",
		state: "TAS",
		active: true,
		services: ["house-cleaning"],
		lastBooking: "8h ago",
		monthlyRevenue: 15000,
	},
	{
		id: "10",
		name: "Braddon",
		postcode: "2612",
		state: "ACT",
		active: true,
		services: ["house-cleaning", "commercial"],
		lastBooking: "2h ago",
		monthlyRevenue: 24000,
	},
];

export function SuburbToggleTable({
	state,
	searchQuery,
	onToggle,
	pendingChanges,
}: SuburbToggleTableProps) {
	const filteredSuburbs = useMemo(() => {
		return sampleSuburbs.filter((suburb) => {
			const matchesState = state === "ALL" || suburb.state === state;
			const matchesSearch =
				searchQuery === "" ||
				suburb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				suburb.postcode.includes(searchQuery) ||
				suburb.state.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesState && matchesSearch;
		});
	}, [state, searchQuery]);

	const handleToggle = (suburb: Suburb, enabled: boolean) => {
		onToggle(suburb.id, enabled);
	};

	const isPending = (id: string) => pendingChanges.has(id);
	const getPendingValue = (id: string) => pendingChanges.get(id);

	const getServiceLabel = (service: string) => {
		return service.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
	};

	return (
		<div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border overflow-hidden">
			{/* Table Header */}
			<div className="p-6 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-800 dark:to-zinc-900">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-xl font-bold text-zinc-900 dark:text-white">
							{state === "ALL" ? "All Australian Suburbs" : `Suburbs in ${state}`}
						</h3>
						<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
							Showing {filteredSuburbs.length} suburbs •{" "}
							<span className="text-green-600 font-medium">
								{filteredSuburbs.filter((s) => getPendingValue(s.id) ?? s.active).length} active
							</span>
						</p>
					</div>
					<div className="flex gap-2">
						<button
							onClick={() => {
								filteredSuburbs.forEach((s) => onToggle(s.id, true));
							}}
							className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium"
						>
							✓ Enable All
						</button>
						<button
							onClick={() => {
								filteredSuburbs.forEach((s) => onToggle(s.id, false));
							}}
							className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium"
						>
							✗ Disable All
						</button>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
						<tr>
							<th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
								Suburb
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
								Postcode
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
								Services
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
								Last Booking
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
								Monthly Revenue
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
								Status
							</th>
							<th className="px-6 py-4 text-right text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
								<span className="flex items-center justify-end gap-2">
									Enable Service
									<span className="px-2 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded text-[10px]">
										One-Click
									</span>
								</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
						{filteredSuburbs.map((suburb) => {
							const isActive = getPendingValue(suburb.id) ?? suburb.active;
							const hasPending = isPending(suburb.id);

							return (
								<tr
									key={suburb.id}
									className={`hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors ${
										hasPending ? "bg-yellow-50 dark:bg-yellow-900/10" : ""
									}`}
								>
									<td className="px-6 py-4">
										<div>
											<p className="font-semibold text-zinc-900 dark:text-white">{suburb.name}</p>
											<p className="text-sm text-zinc-500 dark:text-zinc-400">{suburb.state}</p>
											{hasPending && (
												<span className="inline-block mt-1 px-2 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded text-xs">
													{getPendingValue(suburb.id) ? "Will Enable" : "Will Disable"}
												</span>
											)}
										</div>
									</td>
									<td className="px-6 py-4">
										<span className="font-mono text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
											{suburb.postcode}
										</span>
									</td>
									<td className="px-6 py-4">
										<div className="flex gap-1 flex-wrap">
											{isActive ? (
												suburb.services.map((service) => (
													<span
														key={service}
														className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs font-medium"
													>
														{getServiceLabel(service)}
													</span>
												))
											) : (
												<span className="text-sm text-zinc-400 italic">No services</span>
											)}
										</div>
									</td>
									<td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
										{suburb.lastBooking ? (
											<span className="text-green-600 font-medium">{suburb.lastBooking}</span>
										) : (
											<span className="text-zinc-400">Never</span>
										)}
									</td>
									<td className="px-6 py-4">
										<span
											className={`font-semibold ${
												suburb.monthlyRevenue && suburb.monthlyRevenue > 0
													? "text-green-600"
													: "text-zinc-400"
											}`}
										>
											{suburb.monthlyRevenue ? `$${suburb.monthlyRevenue.toLocaleString()}` : "$0"}
										</span>
									</td>
									<td className="px-6 py-4">
										<span
											className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
												isActive
													? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
													: "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
											}`}
										>
											{isActive ? "✅ Active" : "❌ Inactive"}
										</span>
									</td>
									<td className="px-6 py-4 text-right">
										<label className="relative inline-flex items-center cursor-pointer">
											<input
												type="checkbox"
												checked={isActive}
												onChange={(e) => handleToggle(suburb, e.target.checked)}
												className="sr-only peer"
											/>
											<div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
										</label>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{/* Footer */}
			<div className="p-6 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
				<p className="text-sm text-zinc-600 dark:text-zinc-400">
					Showing <strong>{filteredSuburbs.length}</strong> of{" "}
					<strong>{sampleSuburbs.length}</strong> suburbs
				</p>
				<div className="flex gap-3">
					<button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors text-sm font-medium">
						Export to CSV
					</button>
					<button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors text-sm font-medium">
						Import from CSV
					</button>
				</div>
			</div>
		</div>
	);
}
