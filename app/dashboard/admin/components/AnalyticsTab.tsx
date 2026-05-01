"use client";

interface Analytics {
	totalRevenue: number;
	pendingRevenue: number;
	avgBookingValue: number;
	completionRate: number;
	totalBookings: number;
	totalCustomers: number;
	totalServices: number;
	totalStock: number;
}

interface Service {
	id: string;
	title: string;
	basePrice: number;
	stock: number;
	available: boolean;
	category: string;
}

interface AnalyticsTabProps {
	analytics: Analytics | null;
	services: Service[];
}

export default function AnalyticsTab({
	analytics,
	services,
}: AnalyticsTabProps) {
	if (!analytics) return null;

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-white">📈 Analytics & Insights</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
					<p className="text-sm text-emerald-400 mb-1">Total Revenue</p>
					<p className="text-3xl font-bold text-white">
						${analytics.totalRevenue.toLocaleString()}
					</p>
				</div>
				<div className="bg-gradient-to-br from-sky-500/20 to-blue-600/20 backdrop-blur-xl border border-sky-500/30 rounded-2xl p-6">
					<p className="text-sm text-sky-400 mb-1">Completion Rate</p>
					<p className="text-3xl font-bold text-white">
						{analytics.completionRate.toFixed(0)}%
					</p>
				</div>
				<div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
					<p className="text-sm text-purple-400 mb-1">Avg Booking Value</p>
					<p className="text-3xl font-bold text-white">
						${Math.round(analytics.avgBookingValue)}
					</p>
				</div>
				<div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6">
					<p className="text-sm text-amber-400 mb-1">Pending Revenue</p>
					<p className="text-3xl font-bold text-white">
						${analytics.pendingRevenue.toLocaleString()}
					</p>
				</div>
			</div>
			<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
				<h3 className="text-lg font-bold text-white mb-4">
					Service Distribution
				</h3>
				<div className="space-y-3">
					{services.map((s) => (
						<div key={s.id} className="flex items-center gap-4">
							<span className="text-sm text-white w-40">{s.title}</span>
							<div className="flex-1 bg-slate-700/50 rounded-full h-3">
								<div
									className="bg-gradient-to-r from-sky-500 to-blue-500 h-3 rounded-full transition-all"
									style={{ width: `${Math.min((s.stock / 50) * 100, 100)}%` }}
								/>
							</div>
							<span className="text-sm text-slate-400 w-16 text-right">
								{s.stock}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
