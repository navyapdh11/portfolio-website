"use client";

import { useState } from "react";

const beforeAfterImages = [
	{
		id: 1,
		location: "Joondalup, WA",
		service: "End of Lease Cleaning",
		description: "3-bedroom unit bond clean - Returned full bond to tenant",
		before: "🏚️",
		after: "✨",
		rating: 5,
	},
	{
		id: 2,
		location: "Sydney CBD, NSW",
		service: "Commercial Office Clean",
		description: "500sqm office space - Weekly contract since 2024",
		before: "🏚️",
		after: "✨",
		rating: 5,
	},
	{
		id: "fre-001",
		location: "Fremantle, WA",
		service: "Deep House Clean",
		description: "4-bedroom family home - Spring clean after renovation",
		before: "🏚️",
		after: "✨",
		rating: 5,
	},
	{
		id: 3,
		location: "Melbourne, VIC",
		service: "Deep House Clean",
		description: "4-bedroom family home - Spring clean after renovation",
		before: "🏚️",
		after: "✨",
		rating: 5,
	},
	{
		id: 4,
		location: "Subiaco, WA",
		service: "Carpet Cleaning",
		description: "Steam cleaning 8 rooms - Removed pet stains & odours",
		before: "🏚️",
		after: "✨",
		rating: 5,
	},
	{
		id: 5,
		location: "Scarborough, WA",
		service: "Window Cleaning",
		description: "Beachfront property - Removed salt buildup & stains",
		before: "🏚️",
		after: "✨",
		rating: 5,
	},
	{
		id: 6,
		location: "Cottesloe, WA",
		service: "Vacate Cleaning",
		description: "Luxury home end of lease - 100% bond back success",
		before: "🏚️",
		after: "✨",
		rating: 5,
	},
];

export function BeforeAfterGallery() {
	const [activeIndex, setActiveIndex] = useState(0);
	const active = beforeAfterImages[activeIndex];

	return (
		<section id="gallery" className="py-20 bg-white dark:bg-slate-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
						Real Results, <span className="text-sky-600">Real Clients</span>
					</h2>
					<p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
						See the CleanAgent difference. Every job completed with attention to detail.
					</p>
				</div>

				{/* Featured Before/After */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
					<div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl h-96 flex items-center justify-center">
						<div className="text-center">
							<span className="text-8xl">{active.before}</span>
							<div className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white rounded-lg font-bold">
								BEFORE
							</div>
						</div>
					</div>
					<div className="relative bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-900/30 dark:to-cyan-900/30 rounded-2xl h-96 flex items-center justify-center">
						<div className="text-center">
							<span className="text-8xl">{active.after}</span>
							<div className="absolute top-4 left-4 px-4 py-2 bg-emerald-500 text-white rounded-lg font-bold">
								AFTER
							</div>
						</div>
					</div>
				</div>

				{/* Job Details */}
				<div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 mb-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
								{active.service}
							</h3>
							<p className="text-slate-600 dark:text-slate-400">{active.description}</p>
							<div className="flex items-center gap-2 mt-2">
								<span className="text-sky-600">📍 {active.location}</span>
								<span className="text-amber-500">{"⭐".repeat(active.rating)}</span>
							</div>
						</div>
						<a
							href="#booking"
							className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-semibold whitespace-nowrap"
						>
							Get Similar Results
						</a>
					</div>
				</div>

				{/* Thumbnails */}
				<div
					className="grid grid-cols-3 md:grid-cols-6 gap-4"
					role="tablist"
					aria-label="Gallery thumbnails"
				>
					{beforeAfterImages.map((item, index) => (
						<button
							key={String(item.id)}
							onClick={() => setActiveIndex(index)}
							onKeyDown={(e) => {
								if (e.key === "ArrowRight" && index < beforeAfterImages.length - 1)
									setActiveIndex(index + 1);
								if (e.key === "ArrowLeft" && index > 0) setActiveIndex(index - 1);
							}}
							role="tab"
							aria-selected={activeIndex === index}
							aria-label={`View gallery item: ${item.location} - ${item.service}`}
							className={`p-4 rounded-lg transition-all ${
								activeIndex === index
									? "bg-sky-500 text-white shadow-lg scale-105"
									: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
							}`}
						>
							<div className="text-2xl mb-2">{item.after}</div>
							<div className="text-xs font-medium truncate">{item.location}</div>
						</button>
					))}
				</div>
			</div>
		</section>
	);
}
