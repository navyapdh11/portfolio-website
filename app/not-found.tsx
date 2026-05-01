import Link from "next/link";

export const dynamic = "force-static";

export default function NotFound() {
	return (
		<section
			className="min-h-screen flex items-center justify-center relative overflow-hidden"
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

			<div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
				<div className="glass-strong rounded-3xl p-10 border border-white/20 shadow-2xl">
					<div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 mb-4">
						404
					</div>
					<h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
						Page Not Found
					</h1>
					<p className="text-lg text-slate-300/90 mb-8 max-w-md mx-auto">
						The page you&apos;re looking for doesn&apos;t exist or has been
						moved. Let&apos;s get you back on track.
					</p>
					<Link
						href="/"
						className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300 hover:-translate-y-1"
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
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
						Back to Home
					</Link>
				</div>
			</div>
		</section>
	);
}
