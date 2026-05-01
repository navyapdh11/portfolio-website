import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
	const posts = [
		{
			id: 1,
			title: "The Ultimate Guide to End of Lease Cleaning in Perth",
			excerpt:
				"Get your bond back guaranteed with our comprehensive end of lease cleaning checklist and professional tips.",
			date: "April 15, 2026",
			category: "Cleaning Tips",
			image:
				"https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
		},
		{
			id: 2,
			title: "Eco-Friendly Cleaning Products: What We Use",
			excerpt:
				"Discover the safe, non-toxic and environmentally friendly products our teams use to keep your home pristine.",
			date: "April 10, 2026",
			category: "Sustainability",
			image:
				"https://images.unsplash.com/photo-1584820927498-cafe8c1c9111?q=80&w=1000&auto=format&fit=crop",
		},
		{
			id: 3,
			title: "How Often Should You Deep Clean Your Office?",
			excerpt:
				"Maintain a healthy workspace and boost employee productivity with the right commercial cleaning schedule.",
			date: "April 5, 2026",
			category: "Commercial",
			image:
				"https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
		},
	];

	return (
		<main className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
						Social <span className="text-sky-500">Blog</span>
					</h1>
					<p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
						Stay up to date with the latest cleaning hacks, industry news, and updates from the
						AASTACLEAN team.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{posts.map((post) => (
						<div
							key={post.id}
							className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
						>
							<div className="relative h-60 w-full">
								<Image
									src={post.image}
									alt={post.title}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
								/>
							</div>
							<div className="p-6">
								<div className="flex justify-between items-center mb-3">
									<span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs font-semibold rounded-full">
										{post.category}
									</span>
									<span className="text-slate-500 dark:text-slate-400 text-xs">{post.date}</span>
								</div>
								<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
									{post.title}
								</h3>
								<p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{post.excerpt}</p>
								<button type="button" className="text-sky-500 font-semibold text-sm hover:text-sky-600 transition-colors">
									Read More →
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="mt-16 text-center">
					<Link
						href="/"
						className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors font-semibold"
					>
						← Back to Home
					</Link>
				</div>
			</div>
		</main>
	);
}
