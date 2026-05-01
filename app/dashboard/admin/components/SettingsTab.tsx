"use client";

export default function SettingsTab() {
	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-white">⚙️ System Settings</h2>
			<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
				<h3 className="text-lg font-bold text-white mb-4">Frontend Configuration</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label htmlFor="cta-title" className="block text-sm text-slate-400 mb-1">
							CTA Title
						</label>
						<input
							id="cta-title"
							type="text"
							defaultValue="Ready to Work With Us?"
							className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-sky-500 focus:outline-none"
						/>
					</div>
					<div>
						<label htmlFor="cta-button-text" className="block text-sm text-slate-400 mb-1">
							CTA Button Text
						</label>
						<input
							id="cta-button-text"
							type="text"
							defaultValue="Get Free Quote"
							className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-sky-500 focus:outline-none"
						/>
					</div>
				</div>
				<button
					type="button"
					className="mt-4 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors"
				>
					Save Settings
				</button>
			</div>
		</div>
	);
}
