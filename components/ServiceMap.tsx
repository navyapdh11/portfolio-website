"use client";

import { useState } from "react";

export default function ServiceMap() {
	const [activeTab, setActiveTab] = useState<"map" | "areas">("map");

	const serviceAreas = [
		{ suburb: "West Leederville", distance: "0 km" },
		{ suburb: "Subiaco", distance: "2 km" },
		{ suburb: "Leederville", distance: "1 km" },
		{ suburb: "North Perth", distance: "3 km" },
		{ suburb: "Mount Hawthorn", distance: "4 km" },
		{ suburb: "West Perth", distance: "3 km" },
		{ suburb: "City of Perth", distance: "4 km" },
		{ suburb: "Floreat", distance: "5 km" },
		{ suburb: "Wembley", distance: "5 km" },
		{ suburb: "Daglish", distance: "3 km" },
		{ suburb: "Shenton Park", distance: "4 km" },
		{ suburb: "Karrinyup", distance: "8 km" },
		{ suburb: "Innaloo", distance: "7 km" },
		{ suburb: "Stirling", distance: "8 km" },
		{ suburb: "Osborne Park", distance: "6 km" },
	];

	return (
		<section id="service-map" className="py-20 bg-white dark:bg-slate-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
						Our <span className="text-sky-600">Location</span>
					</h2>
					<p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
						Visit us at our office or explore the areas we service across Perth
					</p>
				</div>

				<div className="mb-8 flex justify-center gap-4">
					<button
						onClick={() => setActiveTab("map")}
						className={`px-6 py-3 rounded-lg font-medium transition-all ${
							activeTab === "map"
								? "bg-sky-500 text-white"
								: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-900/30"
						}`}
					>
						📍 Map
					</button>
					<button
						onClick={() => setActiveTab("areas")}
						className={`px-6 py-3 rounded-lg font-medium transition-all ${
							activeTab === "areas"
								? "bg-sky-500 text-white"
								: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-900/30"
						}`}
					>
						🏘️ Service Areas
					</button>
				</div>

				{activeTab === "map" ? (
					<div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-sky-100 dark:border-sky-900">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.5!2d115.83!3d-31.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU2JzI3LjAiUyAxMTXCsDU5JzE3LjAiRQ!5e0!3m2!1sen!2sau!4v1234567890"
							width="100%"
							height="450"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							title="AASTACLEAN Location - 51 Tate Street West Leederville"
						/>
					</div>
				) : (
					<div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8">
						<div className="mb-6">
							<h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
								51 Tate Street, West Leederville 6007, Perth WA
							</h3>
							<p className="text-slate-600 dark:text-slate-400">
								We service the Perth metropolitan area and surrounding suburbs
							</p>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
							{serviceAreas.map((area, index) => (
								<div
									key={index}
									className="bg-white dark:bg-slate-700 rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow"
								>
									<div className="text-slate-900 dark:text-white font-medium">
										{area.suburb}
									</div>
									<div className="text-sm text-sky-600">{area.distance}</div>
								</div>
							))}
						</div>
					</div>
				)}

				<div className="mt-8 text-center">
					<a
						href="https://www.google.com/maps/dir//51+Tate+Street,+West+Leederville+WA+6007"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						Get Directions
					</a>
				</div>
			</div>
		</section>
	);
}
