export default function Pricing() {
	const plans = [
		{
			name: "Basic",
			price: "120",
			description: "Perfect for small apartments and regular maintenance",
			features: [
				"2 hours cleaning",
				"1-2 bedrooms",
				"Kitchen & bathroom",
				"Vacuum & mop",
				"Surface dusting",
			],
			popular: false,
		},
		{
			name: "Standard",
			price: "180",
			description: "Most popular choice for family homes",
			features: [
				"3-4 hours cleaning",
				"3-4 bedrooms",
				"All rooms included",
				"Deep vacuum & mop",
				"Full dusting",
				"Window sills",
				"Appliance exterior",
			],
			popular: true,
		},
		{
			name: "Premium",
			price: "280",
			description: "Complete deep cleaning for larger homes",
			features: [
				"5-6 hours cleaning",
				"5+ bedrooms",
				"All rooms + garage",
				"Deep cleaning everywhere",
				"Inside appliances",
				"Window cleaning",
				"Carpet spot treatment",
				"Organizing & tidying",
				"Eco products included",
			],
			popular: false,
		},
	];

	return (
		<section id="pricing" className="py-20 bg-zinc-50 dark:bg-zinc-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
						Transparent <span className="text-blue-500">Pricing</span>
					</h2>
					<p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
						No hidden fees. Choose the plan that fits your needs.
					</p>
				</div>

				{/* Pricing Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`relative bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg ${
								plan.popular
									? "ring-4 ring-blue-500 scale-105 z-10"
									: "border border-zinc-200 dark:border-zinc-700"
							} hover:shadow-2xl transition-all flex flex-col`}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
										Most Popular
									</span>
								</div>
							)}

							<div className="text-center mb-6">
								<h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
									{plan.name}
								</h3>
								<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
									{plan.description}
								</p>
								<div className="flex items-baseline justify-center gap-1">
									<span className="text-2xl text-zinc-600 dark:text-zinc-400">
										$
									</span>
									<span className="text-5xl font-bold text-zinc-900 dark:text-white">
										{plan.price}
									</span>
									<span className="text-zinc-600 dark:text-zinc-400 ml-1">
										/session
									</span>
								</div>
							</div>

							<ul className="space-y-3 mb-8 flex-1">
								{plan.features.map((feature) => (
									<li key={feature} className="flex items-start gap-3">
										<svg
											className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										<span className="text-zinc-700 dark:text-zinc-300 text-sm">
											{feature}
										</span>
									</li>
								))}
							</ul>

							<a
								href="#booking"
								className={`w-full py-3 rounded-lg font-semibold text-center block transition-all ${
									plan.popular
										? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
										: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-blue-50 dark:hover:bg-zinc-700 hover:text-blue-600"
								}`}
							>
								Get Started
							</a>
						</div>
					))}
				</div>

				{/* Additional Info */}
				<div className="mt-12 text-center">
					<p className="text-zinc-600 dark:text-zinc-400 mb-4">
						Need a custom solution? We offer tailored packages for commercial
						and recurring clients.
					</p>
					<a
						href="#contact"
						className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
					>
						Contact us for custom pricing
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</a>
				</div>
			</div>
		</section>
	);
}
