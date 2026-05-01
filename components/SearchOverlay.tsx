"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cleaningServices } from "@/lib/constants/services";
import { allSuburbs, states } from "@/lib/data/suburbs";

interface SearchResult {
	type: "suburb" | "service" | "page";
	label: string;
	subtitle: string;
	href: string;
}

const pageResults: SearchResult[] = [
	{ type: "page", label: "Home", subtitle: "Main page", href: "/" },
	{
		type: "page",
		label: "Pricing",
		subtitle: "Transparent pricing plans",
		href: "/pricing",
	},
	{
		type: "page",
		label: "Projects",
		subtitle: "Featured projects",
		href: "/projects",
	},
	{
		type: "page",
		label: "Blog",
		subtitle: "Cleaning tips & insights",
		href: "/blog",
	},
	{
		type: "page",
		label: "Events",
		subtitle: "Upcoming events",
		href: "/events",
	},
	{
		type: "page",
		label: "Contact",
		subtitle: "Get in touch",
		href: "/contact",
	},
	{
		type: "page",
		label: "Dashboard",
		subtitle: "Your dashboard",
		href: "/dashboard",
	},
	{
		type: "page",
		label: "Analytics",
		subtitle: "Business analytics",
		href: "/analytics",
	},
	{
		type: "page",
		label: "Booking",
		subtitle: "Book a cleaning service",
		href: "/booking",
	},
];

function fuzzyMatch(query: string, text: string): boolean {
	const q = query.toLowerCase();
	const t = text.toLowerCase();
	let qi = 0;
	for (let ti = 0; ti < t.length && qi < q.length; ti++) {
		if (t[ti] === q[qi]) qi++;
	}
	return qi === q.length;
}

function search(query: string): SearchResult[] {
	if (!query.trim()) return [];
	const q = query.toLowerCase().trim();
	const results: SearchResult[] = [];

	// Search suburbs
	for (const suburb of allSuburbs) {
		if (fuzzyMatch(q, suburb.name)) {
			const stateAbbr =
				states.find((s) => s.slug === suburb.state)?.abbr ||
				suburb.state.toUpperCase();
			results.push({
				type: "suburb",
				label: suburb.name,
				subtitle: `${stateAbbr} ${suburb.postcode}`,
				href: `/${suburb.state}/${suburb.slug}`,
			});
			if (results.filter((r) => r.type === "suburb").length >= 8) break;
		}
	}

	// Search services
	for (const service of cleaningServices) {
		if (fuzzyMatch(q, service.name)) {
			results.push({
				type: "service",
				label: service.name,
				subtitle: "Service",
				href: `/services/${service.slug}/nsw/sydney`,
			});
		}
	}

	// Search pages
	for (const page of pageResults) {
		if (fuzzyMatch(q, page.label) || fuzzyMatch(q, page.subtitle)) {
			results.push(page);
		}
	}

	return results.slice(0, 20);
}

export default function SearchOverlay() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const resultsRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const results = search(query);

	// Keyboard shortcut listener
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setOpen((prev) => !prev);
			}
			if (e.key === "Escape" && open) {
				setOpen(false);
				setQuery("");
				setSelectedIndex(0);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [open]);

	// Focus input when opened
	useEffect(() => {
		if (open) {
			setTimeout(() => inputRef.current?.focus(), 50);
		}
	}, [open]);

	// Reset selection when query changes
	useEffect(() => {
		setSelectedIndex(0);
	}, []);

	// Keyboard navigation
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				setSelectedIndex((prev) => Math.max(prev - 1, 0));
			} else if (e.key === "Enter" && results[selectedIndex]) {
				e.preventDefault();
				router.push(results[selectedIndex].href);
				setOpen(false);
				setQuery("");
				setSelectedIndex(0);
			}
		},
		[results, selectedIndex, router],
	);

	// Scroll selected into view
	useEffect(() => {
		if (resultsRef.current) {
			const selected = resultsRef.current.querySelector(
				`[data-index="${selectedIndex}"]`,
			);
			selected?.scrollIntoView({ block: "nearest" });
		}
	}, [selectedIndex]);

	// Close on backdrop click
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			setOpen(false);
			setQuery("");
			setSelectedIndex(0);
		}
	};

	const selectResult = (href: string) => {
		router.push(href);
		setOpen(false);
		setQuery("");
		setSelectedIndex(0);
	};

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] bg-black/50 backdrop-blur-sm"
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-label="Search"
		>
			<div className="w-full max-w-lg mx-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden animate-slide-up-fade">
				{/* Search Input */}
				<div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-200 dark:border-zinc-700">
					<svg
						className="w-5 h-5 text-zinc-500 flex-shrink-0"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Search suburbs, services, pages..."
						className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-500 text-sm outline-none"
						aria-label="Search query"
					/>
					<kbd className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
						ESC
					</kbd>
				</div>

				{/* Results */}
				{query.trim() && (
					<div ref={resultsRef} className="max-h-80 overflow-y-auto py-2">
						{results.length === 0 ? (
							<div className="px-4 py-8 text-center text-sm text-zinc-500">
								No results found for &ldquo;{query}&rdquo;
							</div>
						) : (
							results.map((result, i) => (
								<button
									key={`${result.type}-${result.href}`}
									data-index={i}
									onClick={() => selectResult(result.href)}
									onMouseEnter={() => setSelectedIndex(i)}
									className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
										i === selectedIndex
											? "bg-sky-50 dark:bg-sky-900/20"
											: "hover:bg-zinc-50 dark:hover:bg-zinc-800"
									}`}
								>
									{/* Icon by type */}
									<div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm flex-shrink-0">
										{result.type === "suburb" && "📍"}
										{result.type === "service" && "🧹"}
										{result.type === "page" && "📄"}
									</div>
									<div className="flex-1 min-w-0">
										<div className="text-sm font-medium text-zinc-900 dark:text-white truncate">
											{result.label}
										</div>
										<div className="text-xs text-zinc-500 dark:text-zinc-400">
											{result.subtitle}
										</div>
									</div>
									<span className="text-[10px] uppercase font-semibold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
										{result.type}
									</span>
								</button>
							))
						)}
					</div>
				)}

				{/* Footer hint */}
				<div className="px-4 py-2.5 border-t border-zinc-200 dark:border-zinc-700 flex items-center gap-4 text-[11px] text-zinc-500">
					<span className="flex items-center gap-1">
						<kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] border border-zinc-200 dark:border-zinc-700">
							↑↓
						</kbd>
						Navigate
					</span>
					<span className="flex items-center gap-1">
						<kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] border border-zinc-200 dark:border-zinc-700">
							↵
						</kbd>
						Select
					</span>
				</div>
			</div>
		</div>
	);
}
