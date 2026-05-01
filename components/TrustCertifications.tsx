export function TrustCertifications() {
	const certifications = [
		{
			icon: "🛡️",
			title: "Police Checked Staff",
			description: "Every cleaner has a current National Police Check",
			badge: "Verified",
		},
		{
			icon: "📋",
			title: "Fully Insured",
			description: "$20M public liability insurance for your peace of mind",
			badge: "Covered",
		},
		{
			icon: "🌿",
			title: "Eco-Friendly Products",
			description:
				"Non-toxic, biodegradable cleaning solutions safe for families & pets",
			badge: "Green Certified",
		},
		{
			icon: "✅",
			title: "Bond-Back Guarantee",
			description: "100% bond back or we'll reclean at no extra cost",
			badge: "Guaranteed",
		},
		{
			icon: "⭐",
			title: "5-Star Rated",
			description: "4.9/5 average from 2,500+ verified client reviews",
			badge: "Top Rated",
		},
		{
			icon: "🏆",
			title: "8+ Years Experience",
			description: "Serving Perth metro since 2015 with proven track record",
			badge: "Established",
		},
	];

	return (
		<section className="py-16 bg-gradient-to-r from-sky-500 to-cyan-500 dark:from-sky-700 dark:to-cyan-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-white mb-4">
						Why Australia Trusts AASTACLEAN
					</h2>
					<p className="text-sky-100 text-lg">
						Your peace of mind is our priority
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{certifications.map((cert) => (
						<div
							key={cert.title}
							className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
						>
							<div className="flex items-start justify-between mb-4">
								<span className="text-4xl">{cert.icon}</span>
								<span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold">
									{cert.badge}
								</span>
							</div>
							<h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
								{cert.title}
							</h3>
							<p className="text-sm text-slate-600 dark:text-slate-400">
								{cert.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
