"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const serviceLinks = [
	{ href: "/services/domestic-cleaning/nsw/sydney", label: "House Cleaning" },
	{ href: "/services/end-of-lease-cleaning/nsw/sydney", label: "End of Lease" },
	{ href: "/services/commercial-cleaning/nsw/sydney", label: "Commercial" },
	{ href: "/services/office-cleaning/nsw/sydney", label: "Office" },
	{ href: "/services/industrial-cleaning/nsw/sydney", label: "Industrial" },
	{ href: "/services/builders-cleaning/nsw/sydney", label: "Builders" },
	{ href: "/services/retail-cleaning/nsw/sydney", label: "Retail" },
	{ href: "/services/strata-cleaning/nsw/sydney", label: "Strata" },
	{ href: "/services/carpet-cleaning/nsw/sydney", label: "Carpet" },
	{ href: "/services/window-cleaning/nsw/sydney", label: "Window" },
	{ href: "/services/deep-cleaning/nsw/sydney", label: "Deep" },
	{ href: "/services/move-in-out-cleaning/nsw/sydney", label: "Move In/Out" },
	{ href: "/services/oven-cleaning/nsw/sydney", label: "Oven" },
	{ href: "/services/upholstery-cleaning/nsw/sydney", label: "Upholstery" },
	{ href: "/services/tile-grout-cleaning/nsw/sydney", label: "Tile & Grout" },
	{ href: "/services/pressure-washing/nsw/sydney", label: "Pressure Washing" },
	{
		href: "/services/disinfection-sanitization/nsw/sydney",
		label: "Disinfection",
	},
	{ href: "/services/laundry-services/nsw/sydney", label: "Laundry" },
	{ href: "/services/school-educational-cleaning/nsw/sydney", label: "School" },
	{
		href: "/services/medical-healthcare-cleaning/nsw/sydney",
		label: "Medical",
	},
];

const navLinks = [
	{ href: "#home", label: "Home" },
	{ href: "/projects", label: "Projects" },
	{ href: "/pricing", label: "Pricing" },
	{ href: "/blog", label: "Blog" },
	{ href: "/events", label: "Events" },
	{ href: "#contact", label: "Contact" },
];

const dropdownLinks = [
	{ href: "/contact", label: "Contact" },
	{ href: "/analytics", label: "Analytics" },
	{ href: "/ads", label: "Ads Manager" },
	{ href: "/earn", label: "Earnings" },
	{ href: "/flashcards", label: "Strategy Cards" },
	{ href: "/microtasks", label: "Microtasks" },
];

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [servicesOpen, setServicesOpen] = useState(false);
	const [moreOpen, setMoreOpen] = useState(false);
	const pathname = usePathname();
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const isActive = (href: string) => {
		if (href.startsWith("#")) return false;
		if (href === "/") return pathname === "/";
		return pathname.startsWith(href);
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md"
					: "bg-transparent"
			}`}
			aria-label="Main navigation"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link
						href="#home"
						className="text-xl font-bold text-slate-900 dark:text-white"
					>
						AA<span className="text-sky-600">STACLEAN</span>
					</Link>

					<div className="hidden lg:flex items-center flex-1 max-w-sm mx-8">
						<Link
							href="/contact"
							className="px-5 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium transition-colors border border-sky-500/20"
						>
							💬 Get a Free Quote
						</Link>
					</div>

					<div className="hidden md:flex items-center space-x-6">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`relative text-sm transition-colors py-1 ${
									isActive(link.href)
										? "text-sky-600 dark:text-sky-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-500 after:rounded-full"
										: "text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
								}`}
							>
								{link.label}
							</Link>
						))}

						{/* Services Dropdown */}
						<div className="relative">
							<button
								onClick={() => {
									setServicesOpen(!servicesOpen);
									setMoreOpen(false);
								}}
								className="flex items-center text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors text-sm font-medium"
								aria-expanded={servicesOpen}
								aria-haspopup="true"
							>
								Services
								<svg
									className={`w-4 h-4 ml-1 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
							{servicesOpen && (
								<div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 z-50 max-h-96 overflow-y-auto">
									{serviceLinks.map((link) => (
										<Link
											key={link.href}
											href={link.href}
											className="block px-4 py-2 text-sm text-slate-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-slate-300"
											onClick={() => setServicesOpen(false)}
										>
											{link.label}
										</Link>
									))}
								</div>
							)}
						</div>

						{/* More Dropdown */}
						<div className="relative">
							<button
								onClick={() => {
									setMoreOpen(!moreOpen);
									setServicesOpen(false);
								}}
								className="flex items-center text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors"
								aria-expanded={moreOpen}
								aria-haspopup="true"
							>
								More
								<svg
									className={`w-4 h-4 ml-1 transition-transform ${moreOpen ? "rotate-180" : ""}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
							{moreOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 z-50">
									{dropdownLinks.map((link) => (
										<Link
											key={link.href}
											href={link.href}
											className="block px-4 py-2 text-sm text-slate-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-slate-300"
											onClick={() => setMoreOpen(false)}
										>
											{link.label}
										</Link>
									))}
								</div>
							)}
						</div>

						{/* Search Trigger */}
						<button
							onClick={() =>
								window.dispatchEvent(
									new KeyboardEvent("keydown", { key: "k", metaKey: true }),
								)
							}
							className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 dark:text-zinc-500 border border-slate-200 dark:border-zinc-700 rounded-lg hover:border-sky-300 dark:hover:border-sky-600 hover:text-sky-600 transition-colors"
							aria-label="Open search"
						>
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
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
							<span className="hidden lg:inline">Search...</span>
							<kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-zinc-800 rounded border border-slate-200 dark:border-zinc-700">
								⌘K
							</kbd>
						</button>

						{/* Theme Toggle */}
						<button
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
							className="p-2 text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800"
							aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
						>
							{theme === "dark" ? (
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
										d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
									/>
								</svg>
							) : (
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
										d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
									/>
								</svg>
							)}
						</button>

						<Link
							href="/dashboard"
							className="text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors font-medium text-sm"
						>
							Dashboard
						</Link>
						<a
							href="#booking"
							className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-semibold text-sm"
						>
							Get Quote
						</a>
					</div>

					<button
						className="md:hidden p-2"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label="Toggle menu"
						aria-expanded={isMenuOpen}
					>
						<svg
							className="w-6 h-6 text-slate-900 dark:text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							{isMenuOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							)}
						</svg>
					</button>
				</div>

				{isMenuOpen && (
					<div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
						<div className="flex flex-col space-y-3">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors px-2"
									onClick={() => setIsMenuOpen(false)}
								>
									{link.label}
								</Link>
							))}
							<div className="border-t border-zinc-200 dark:border-zinc-700 pt-2 mt-2">
								<p className="px-2 text-xs text-zinc-500 mb-2">More</p>
								{dropdownLinks.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										className="text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors block px-2 py-1"
										onClick={() => setIsMenuOpen(false)}
									>
										{link.label}
									</Link>
								))}
							</div>
							<Link
								href="/dashboard"
								className="text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors font-medium text-sm"
								onClick={() => setIsMenuOpen(false)}
							>
								Dashboard
							</Link>
							<a
								href="#booking"
								className="mx-2 mt-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-center font-semibold"
								onClick={() => setIsMenuOpen(false)}
							>
								Get Quote
							</a>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
