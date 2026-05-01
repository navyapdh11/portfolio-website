"use client";

import { getStatusColor } from "@/lib/ui/statusColors";

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

interface Booking {
	id: string;
	customerName: string;
	service: string;
	date: string;
	status: string;
	totalPrice: number;
}

interface Service {
	id: string;
	title: string;
	basePrice: number;
	stock: number;
	available: boolean;
	category: string;
}

interface DashboardTabProps {
	analytics: Analytics | null;
	bookings: Booking[];
	services: Service[];
	flashcardIndex: number;
	updateBookingStatus: (id: string, status: string) => Promise<void>;
}

export default function DashboardTab({
	analytics,
	bookings,
	services,
	flashcardIndex,
	updateBookingStatus,
}: DashboardTabProps) {
	const flashcards = analytics
		? [
				{
					label: "Total Revenue",
					value: `$${analytics.totalRevenue.toLocaleString()}`,
					icon: "💰",
					gradient: "from-emerald-500 to-green-600",
					change: "+12%",
				},
				{
					label: "Pending Revenue",
					value: `$${analytics.pendingRevenue.toLocaleString()}`,
					icon: "⏳",
					gradient: "from-amber-500 to-orange-600",
					change: `${bookings.filter((b) => b.status === "pending").length} bookings`,
				},
				{
					label: "Avg Booking",
					value: `$${Math.round(analytics.avgBookingValue)}`,
					icon: "📊",
					gradient: "from-sky-500 to-blue-600",
					change: `${analytics.completionRate.toFixed(0)}% completion`,
				},
				{
					label: "Total Bookings",
					value: analytics.totalBookings.toString(),
					icon: "📅",
					gradient: "from-purple-500 to-pink-600",
					change: "All time",
				},
				{
					label: "Active Customers",
					value: analytics.totalCustomers.toString(),
					icon: "👥",
					gradient: "from-indigo-500 to-violet-600",
					change: "Verified",
				},
				{
					label: "Total Stock",
					value: analytics.totalStock.toString(),
					icon: "📦",
					gradient: "from-rose-500 to-red-600",
					change: `${analytics.totalServices} services`,
				},
			]
		: [];

	return (
		<div className="space-y-8">
			{/* 3D Flashcard Carousel */}
			<div className="relative">
				<h2 className="text-2xl font-bold text-white mb-4">📊 Live Metrics</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
					{flashcards.map((card, i) => (
						<div
							key={card.label}
							className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-700 transform ${
								i === flashcardIndex ? "scale-105 z-10 shadow-2xl" : "scale-100 opacity-80"
							}`}
							style={{
								background: `linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))`,
								backdropFilter: "blur(20px)",
								border: "1px solid rgba(148, 163, 184, 0.1)",
								boxShadow:
									i === flashcardIndex
										? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(56, 189, 248, 0.1)"
										: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
							}}
						>
							{/* Lightning effect */}
							{i === flashcardIndex && (
								<div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent pointer-events-none" />
							)}
							<div className="relative">
								<div className="text-3xl mb-3">{card.icon}</div>
								<p className="text-2xl font-bold text-white mb-1">{card.value}</p>
								<p className="text-sm text-slate-400">{card.label}</p>
								<p className="text-xs text-emerald-400 mt-2">{card.change}</p>
							</div>
							<div
								className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 ${i === flashcardIndex ? "animate-pulse" : ""} rounded-2xl`}
								style={{ opacity: i === flashcardIndex ? 0.05 : 0 }}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Bento Grid - Quick Stats */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{/* Bookings Status */}
				<div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
					<h3 className="text-lg font-bold text-white mb-4">📅 Booking Pipeline</h3>
					<div className="grid grid-cols-2 gap-3">
						{(["pending", "confirmed", "in-progress", "completed"] as const).map((status) => (
							<div key={status} className={`p-4 rounded-xl border ${getStatusColor(status)}`}>
								<p className="text-2xl font-bold">
									{bookings.filter((b) => b.status === status).length}
								</p>
								<p className="text-sm capitalize">{status}</p>
							</div>
						))}
					</div>
				</div>

				{/* Stock Alerts */}
				<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
					<h3 className="text-lg font-bold text-white mb-4">📦 Stock Alerts</h3>
					<div className="space-y-3">
						{services
							.filter((s) => s.stock < 20)
							.map((s) => (
								<div key={s.id} className="flex justify-between items-center">
									<span className="text-sm text-white">{s.title}</span>
									<span
										className={`px-2 py-1 rounded-full text-xs ${s.stock < 10 ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"}`}
									>
										{s.stock} left
									</span>
								</div>
							))}
					</div>
				</div>

				{/* Recent Activity */}
				<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
					<h3 className="text-lg font-bold text-white mb-4">⚡ Recent</h3>
					<div className="space-y-2">
						{bookings.slice(0, 4).map((b) => (
							<div key={b.id} className="text-sm">
								<p className="text-white truncate">{b.customerName}</p>
								<p className="text-slate-400 text-xs">
									{b.service} — ${b.totalPrice}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Full Bookings Table */}
			<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
				<div className="p-6 border-b border-slate-700/50">
					<h3 className="text-xl font-bold text-white">📋 All Bookings</h3>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-slate-700/50">
							<tr>
								<th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
									Customer
								</th>
								<th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
									Service
								</th>
								<th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
									Date
								</th>
								<th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
									Amount
								</th>
								<th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
									Status
								</th>
								<th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-700/30">
							{bookings.map((booking) => (
								<tr key={booking.id} className="hover:bg-slate-700/20 transition-colors">
									<td className="px-6 py-4 text-white">{booking.customerName}</td>
									<td className="px-6 py-4 text-slate-300">{booking.service}</td>
									<td className="px-6 py-4 text-slate-300">{booking.date}</td>
									<td className="px-6 py-4 font-bold text-white">${booking.totalPrice}</td>
									<td className="px-6 py-4">
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}
										>
											{booking.status}
										</span>
									</td>
									<td className="px-6 py-4">
										<select
											value={booking.status}
											onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
											className="bg-slate-700 text-white text-sm px-2 py-1 rounded border border-slate-600"
										>
											<option value="pending">Pending</option>
											<option value="confirmed">Confirmed</option>
											<option value="in-progress">In Progress</option>
											<option value="completed">Completed</option>
											<option value="cancelled">Cancelled</option>
										</select>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
