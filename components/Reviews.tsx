"use client";

import { useCallback, useEffect, useState } from "react";

const reviews = [
	{
		id: 1,
		name: "Sarah Thompson",
		location: "Bondi, NSW",
		rating: 5,
		text: "Absolutely fantastic service! The team was professional, punctual, and did an incredible job. My apartment has never looked better. Highly recommend!",
		service: "End of Lease Cleaning",
		avatar: "👩",
	},
	{
		id: 2,
		name: "Michael Chen",
		location: "South Yarra, VIC",
		rating: 5,
		text: "We use AASTACLEAN for our office every week. Consistent quality, friendly staff, and reasonable prices. Best cleaning service we&apos;ve ever used.",
		service: "Commercial Cleaning",
		avatar: "👨",
	},
	{
		id: 3,
		name: "Emma Wilson",
		location: "New Farm, QLD",
		rating: 5,
		text: "The deep cleaning service was worth every penny. They got stains out I thought were permanent. Very thorough and attention to detail.",
		service: "Deep Cleaning",
		avatar: "👩‍🦰",
	},
	{
		id: 4,
		name: "David Martinez",
		location: "Subiaco, WA",
		rating: 5,
		text: "Easy to book, great communication, and excellent results. The online booking system made it so convenient. Will definitely use again.",
		service: "House Cleaning",
		avatar: "👨‍🦱",
	},
	{
		id: 5,
		name: "Lisa Anderson",
		location: "North Adelaide, SA",
		rating: 4,
		text: "Very good service overall. The cleaners were professional and did a thorough job. Only minor issue was they arrived 15 minutes late, but called ahead to let me know.",
		service: "Carpet Cleaning",
		avatar: "👱‍♀️",
	},
	{
		id: 6,
		name: "James O&apos;Brien",
		location: "Braddon, ACT",
		rating: 5,
		text: "Outstanding window cleaning service! They handled our 3-story home safely and efficiently. Windows are spotless. Very impressed with the attention to safety.",
		service: "Window Cleaning",
		avatar: "👨‍🦳",
	},
];

function StarRating({ rating }: { rating: number }) {
	return (
		<div
			className="flex items-center gap-0.5"
			aria-label={`${rating} out of 5 stars`}
		>
			{[1, 2, 3, 4, 5].map((star) => (
				<svg
					key={star}
					className={`w-5 h-5 ${star <= rating ? "text-yellow-400" : "text-zinc-300 dark:text-zinc-600"}`}
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			))}
		</div>
	);
}

export default function Reviews() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	// Detect mobile for responsive carousel
	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 768);
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	// Auto-advance every 5 seconds, pause on hover
	useEffect(() => {
		if (isPaused) return;
		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % reviews.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [isPaused]);

	const goTo = useCallback((index: number) => {
		setActiveIndex(index);
	}, []);

	const goPrev = useCallback(() => {
		setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
	}, []);

	const goNext = useCallback(() => {
		setActiveIndex((prev) => (prev + 1) % reviews.length);
	}, []);

	const visibleCount = isMobile ? 1 : 3;
	const visibleReviews = [];
	for (let i = 0; i < visibleCount; i++) {
		visibleReviews.push(reviews[(activeIndex + i) % reviews.length]);
	}

	return (
		<section id="reviews" className="py-20 bg-white dark:bg-zinc-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
						Customer <span className="text-blue-500">Reviews</span>
					</h2>
					<p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
						Don&apos;t just take our word for it - hear from our satisfied
						customers
					</p>

					{/* Rating Summary */}
					<div className="mt-8 inline-flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800 px-8 py-4 rounded-full">
						<div className="flex items-center gap-2">
							<span className="text-4xl font-bold text-zinc-900 dark:text-white">
								4.9
							</span>
							<StarRating rating={5} />
						</div>
						<div className="text-left">
							<p className="text-sm font-semibold text-zinc-900 dark:text-white">
								Based on 2,847 reviews
							</p>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Across all states
							</p>
						</div>
					</div>
				</div>

				{/* Carousel */}
				<div
					className="relative"
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
				>
					{/* Navigation Arrows */}
					<button
						onClick={goPrev}
						className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-zinc-800 shadow-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-sky-600 hover:border-sky-300 transition-colors hidden md:flex"
						aria-label="Previous reviews"
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
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>
					<button
						onClick={goNext}
						className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-zinc-800 shadow-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-sky-600 hover:border-sky-300 transition-colors hidden md:flex"
						aria-label="Next reviews"
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
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>

					{/* Reviews Grid (carousel items) */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{visibleReviews.map((review) => (
							<div
								key={review.id}
								className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 shadow-lg transition-all duration-500 hover:shadow-xl hover-lift"
							>
								{/* Header */}
								<div className="flex items-start justify-between mb-4">
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
											{review.avatar}
										</div>
										<div>
											<h4 className="font-semibold text-zinc-900 dark:text-white">
												{review.name}
											</h4>
											<p className="text-sm text-zinc-500 dark:text-zinc-400">
												{review.location}
											</p>
										</div>
									</div>
									<StarRating rating={review.rating} />
								</div>

								{/* Review Text */}
								<p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
									&ldquo;{review.text}&rdquo;
								</p>

								{/* Service Badge */}
								<div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
									{review.service}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Dot Indicators */}
				<div className="flex justify-center gap-2 mt-8">
					{reviews.map((_, i) => (
						<button
							key={i}
							onClick={() => goTo(i)}
							className={`transition-all duration-300 rounded-full ${
								i === activeIndex
									? "w-8 h-2.5 bg-sky-500"
									: "w-2.5 h-2.5 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400"
							}`}
							aria-label={`Go to review ${i + 1}`}
						/>
					))}
				</div>

				{/* Trust Badges */}
				<div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-60">
					<div className="text-center">
						<p className="text-3xl font-bold text-zinc-900 dark:text-white">
							2,847+
						</p>
						<p className="text-sm text-zinc-500 dark:text-zinc-400">
							Happy Customers
						</p>
					</div>
					<div className="h-12 w-px bg-zinc-300 dark:bg-zinc-700" />
					<div className="text-center">
						<p className="text-3xl font-bold text-zinc-900 dark:text-white">
							4.9/5
						</p>
						<p className="text-sm text-zinc-500 dark:text-zinc-400">
							Average Rating
						</p>
					</div>
					<div className="h-12 w-px bg-zinc-300 dark:bg-zinc-700" />
					<div className="text-center">
						<p className="text-3xl font-bold text-zinc-900 dark:text-white">
							98%
						</p>
						<p className="text-sm text-zinc-500 dark:text-zinc-400">
							Would Recommend
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
