"use client";

import { serviceDetails } from "@/lib/constants/serviceDetails";

export function BookingAddons({
	serviceSlug,
	selectedAddons,
	toggleAddon,
}: {
	serviceSlug: string;
	selectedAddons: string[];
	toggleAddon: (v: string) => void;
}) {
	const details =
		serviceDetails[serviceSlug as keyof typeof serviceDetails] ||
		serviceDetails["domestic-cleaning"];

	return (
		<div className="space-y-6">
			<h4 className="font-bold text-lg text-primary">Comprehensive Add-ons</h4>
			<div className="grid grid-cols-1 gap-4">
				{details.addons.map((addon) => (
					<div
						key={addon.value}
						className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border"
					>
						<div>
							<p className="font-medium text-sm">{addon.label}</p>
							<p className="text-xs text-zinc-500">${addon.price}</p>
						</div>
						<button
							onClick={() => toggleAddon(addon.value)}
							className={`px-4 py-2 rounded-lg font-bold text-xs ${selectedAddons.includes(addon.value) ? "bg-blue-600 text-white" : "bg-zinc-200"}`}
						>
							{selectedAddons.includes(addon.value) ? "Selected" : "Add"}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
