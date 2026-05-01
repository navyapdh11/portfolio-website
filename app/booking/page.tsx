import type { Metadata } from "next";
import Booking from "@/components/Booking";

export const generateMetadata = async (): Promise<Metadata> => ({
	title: "Book Your Clean — AASTACLEAN Professional Cleaning Services",
	description:
		"Book your professional cleaning service online. Choose your service, schedule a date, and confirm your booking in minutes. Available across all Australian states.",
	alternates: {
		canonical: "https://www.aastaclean.com.au/booking",
	},
});

export default function BookingPage() {
	return (
		<>
			{/* Hero Section */}
			<section
				className="relative overflow-hidden py-20 pb-8"
				style={{
					background:
						"linear-gradient(135deg, #0c1a3a 0%, #0a1628 25%, #0f2040 50%, #0a1628 75%, #0c1a3a 100%)",
				}}
			>
				{/* Gradient orbs */}
				<div
					className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] animate-pulse"
					style={{
						background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
					}}
				/>
				<div
					className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
					style={{
						background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
					}}
				/>

				{/* Grid pattern */}
				<div
					className="absolute inset-0 opacity-[0.04]"
					style={{
						backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
						backgroundSize: "60px 60px",
					}}
				/>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
					<div className="flex justify-center mb-6">
						<div className="glass-strong inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20">
							<span className="relative flex h-2.5 w-2.5">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
							</span>
							<span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
								Book Online — <span className="text-sky-600">Instant Confirmation</span>
							</span>
						</div>
					</div>

					<h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.08] mb-6">
						Book Your
						<span
							className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-400 animate-gradient"
							style={{ backgroundSize: "200% 200%" }}
						>
							{" "}
							Clean
						</span>
					</h1>

					<p className="text-lg md:text-xl text-slate-300/90 max-w-2xl mx-auto">
						Choose your service, pick a date, and confirm your booking in minutes. Bond-back
						guaranteed with police-checked professionals.
					</p>
				</div>
			</section>

			{/* Booking Form */}
			<section className="py-12 pb-20">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
					<Booking />
				</div>
			</section>
		</>
	);
}
