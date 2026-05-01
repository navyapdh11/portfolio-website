"use client";

import { useState } from "react";

export function QuoteCalculator() {
	const [serviceType, setServiceType] = useState("house");
	const [bedrooms, setBedrooms] = useState(3);
	const [bathrooms, setBathrooms] = useState(2);
	const [frequency, setFrequency] = useState("once");

	const aiSuggestion = (() => {
		let msg = "Nanochat AI Suggests: ";
		if (serviceType === "office") {
			msg +=
				frequency === "once"
					? "For commercial spaces, a weekly schedule reduces dust buildup by 40% and includes a 20% discount!"
					: "Great choice! A regular office clean boosts employee productivity.";
		} else if (serviceType === "endoflease") {
			msg +=
				"End of lease cleaning guarantees bond return. Consider adding professional carpet cleaning if required by your lease.";
		} else if (serviceType === "deep") {
			msg +=
				"Deep cleaning is perfect for spring. We recommend scheduling this comprehensive service twice a year.";
		} else if (serviceType === "window") {
			msg +=
				"Spotless windows improve natural lighting by up to 30%. Highly recommended before house inspections.";
		} else if (serviceType === "carpet") {
			msg +=
				"Professional hot water extraction removes allergens trapped deep in carpets.";
		} else {
			if (bedrooms > 3) {
				msg +=
					"For larger homes, a bi-weekly service helps maintain a pristine environment efficiently with a 15% discount.";
			} else {
				msg +=
					"A standard house clean covers all essential areas. Setting it to a weekly frequency will save you 20% off each visit.";
			}
		}
		return msg;
	})();

	const pricing = {
		house: { base: 120, perBed: 25, perBath: 35 },
		office: { base: 180, perBed: 0, perBath: 40 },
		endoflease: { base: 200, perBed: 35, perBath: 45 },
		carpet: { base: 90, perBed: 20, perBath: 0 },
		window: { base: 80, perBed: 15, perBath: 20 },
		deep: { base: 250, perBed: 40, perBath: 50 },
	};

	const discounts = {
		weekly: 0.2,
		biweekly: 0.15,
		monthly: 0.1,
		once: 0,
	};

	const calc = pricing[serviceType as keyof typeof pricing];
	const subtotal =
		calc.base + bedrooms * calc.perBed + bathrooms * calc.perBath;
	const discount = discounts[frequency as keyof typeof discounts];
	const total = Math.round(subtotal * (1 - discount));

	return (
		<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border-2 border-sky-100 dark:border-sky-900">
			<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
				<span className="text-2xl">💰</span> Instant Quote Calculator
			</h3>

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
						Service Type
					</label>
					<div className="grid grid-cols-3 gap-2">
						{[
							{ key: "house", label: "House", icon: "🏠" },
							{ key: "office", label: "Office", icon: "🏢" },
							{ key: "endoflease", label: "End of Lease", icon: "🔑" },
							{ key: "carpet", label: "Carpet", icon: "🧹" },
							{ key: "window", label: "Window", icon: "🪟" },
							{ key: "deep", label: "Deep Clean", icon: "✨" },
						].map((s) => (
							<button
								key={s.key}
								onClick={() => setServiceType(s.key)}
								className={`p-3 rounded-lg text-sm font-medium transition-all ${
									serviceType === s.key
										? "bg-sky-500 text-white shadow-md"
										: "bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
								}`}
							>
								<div className="text-xl mb-1">{s.icon}</div>
								<div className="text-xs">{s.label}</div>
							</button>
						))}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					{serviceType !== "office" && (
						<>
							<div>
								<label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
									Bedrooms: {bedrooms}
								</label>
								<input
									type="range"
									min="1"
									max="6"
									value={bedrooms}
									onChange={(e) => setBedrooms(parseInt(e.target.value, 10))}
									className="w-full"
								/>
							</div>
							<div>
								<label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
									Bathrooms: {bathrooms}
								</label>
								<input
									type="range"
									min="1"
									max="5"
									value={bathrooms}
									onChange={(e) => setBathrooms(parseInt(e.target.value, 10))}
									className="w-full"
								/>
							</div>
						</>
					)}
				</div>

				<div>
					<label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
						Frequency
					</label>
					<div className="grid grid-cols-4 gap-2">
						{[
							{ key: "once", label: "One-Time", disc: "0%" },
							{ key: "monthly", label: "Monthly", disc: "10% OFF" },
							{ key: "biweekly", label: "Bi-Weekly", disc: "15% OFF" },
							{ key: "weekly", label: "Weekly", disc: "20% OFF" },
						].map((f) => (
							<button
								key={f.key}
								onClick={() => setFrequency(f.key)}
								className={`p-2 rounded-lg text-xs font-medium transition-all ${
									frequency === f.key
										? "bg-emerald-500 text-white shadow-md"
										: "bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
								}`}
							>
								<div>{f.label}</div>
								<div className="text-[10px] mt-1">{f.disc}</div>
							</button>
						))}
					</div>
				</div>

				<div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded-lg border border-indigo-200 dark:border-indigo-800 text-sm font-medium flex items-start gap-3 shadow-sm transition-all">
					<span className="text-xl animate-pulse">🤖</span>
					<p className="leading-relaxed">{aiSuggestion}</p>
				</div>

				<div className="mt-4 p-4 bg-slate-900 text-white rounded-lg text-xs space-y-2">
					<div className="font-bold uppercase text-sky-400">
						Competitive Efficiency Matrix
					</div>
					<div className="flex justify-between">
						<span>Boutique Avg</span> <span>+$145</span>
					</div>
					<div className="flex justify-between font-bold">
						<span>CleanPro Enterprise</span> <span>-$60 Efficiency</span>
					</div>
				</div>

				<div className="p-4 bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 rounded-lg border-2 border-sky-200 dark:border-sky-800">
					<div className="flex justify-between items-center mb-2">
						<span className="text-slate-600 dark:text-slate-400 text-sm">
							Base Price
						</span>
						<span className="text-slate-700 dark:text-slate-300 font-semibold">
							${calc.base}
						</span>
					</div>
					<div className="flex justify-between items-center mb-2">
						<span className="text-slate-600 dark:text-slate-400 text-sm">
							Additional Rooms
						</span>
						<span className="text-slate-700 dark:text-slate-300 font-semibold">
							${subtotal - calc.base}
						</span>
					</div>
					{discount > 0 && (
						<div className="flex justify-between items-center mb-2 text-emerald-600">
							<span className="text-sm font-semibold">
								✓ Discount ({discount * 100}%)
							</span>
							<span className="font-semibold">
								-${Math.round(subtotal * discount)}
							</span>
						</div>
					)}
					<div className="border-t border-sky-200 dark:border-sky-800 pt-3 mt-3">
						<div className="flex justify-between items-center">
							<span className="text-slate-900 dark:text-white font-bold text-lg">
								Estimated Total:
							</span>
							<span className="text-4xl font-bold text-sky-600">${total}</span>
						</div>
					</div>
				</div>

				<a
					href="#booking"
					onClick={() => {
						const bookingSection = document.getElementById("booking");
						if (bookingSection) {
							bookingSection.scrollIntoView({ behavior: "smooth" });
						}
					}}
					className="block w-full py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-lg hover:from-sky-600 hover:to-cyan-600 transition-all font-bold text-center shadow-md"
				>
					Book This Service →
				</a>
			</div>
		</div>
	);
}
