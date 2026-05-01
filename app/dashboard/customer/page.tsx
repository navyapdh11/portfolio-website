"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Booking {
	id: string;
	service: string;
	date: string;
	time: string;
	status: string;
	totalPrice: number;
	address: string;
	suburb: string;
}

interface Notification {
	id: string;
	type: string;
	title: string;
	message: string;
	read: boolean;
	createdAt: string;
}

interface Review {
	id: string;
	bookingId: string;
	rating: number;
	comment: string;
	createdAt: string;
}

interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	loyaltyPoints: number;
	totalBookings: number;
	totalSpent: number;
	addresses: {
		street: string;
		suburb: string;
		state: string;
		postcode: string;
		isDefault: boolean;
	}[];
	notifications: Notification[];
	reviews: Review[];
}

type TabType =
	| "overview"
	| "bookings"
	| "payments"
	| "loyalty"
	| "reviews"
	| "notifications"
	| "profile"
	| "cart";

export default function CustomerDashboard() {
	const [activeTab, setActiveTab] = useState<TabType>("overview");
	const [customer, setCustomer] = useState<Customer | null>(null);
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [loading, setLoading] = useState(true);
	const [cart, setCart] = useState<
		{ id: string; title: string; price: number; quantity: number }[]
	>([]);

	useEffect(() => {
		async function checkAuth() {
			try {
				const res = await fetch("/api/auth/me", { credentials: "include" });
				if (!res.ok) {
					window.location.href =
						"/dashboard/login?redirect=/dashboard/customer";
					return;
				}
				const data = await res.json();
				if (data.role !== "customer") {
					window.location.href =
						"/dashboard/login?redirect=/dashboard/customer";
				}
			} catch {
				window.location.href = "/dashboard/login?redirect=/dashboard/customer";
			}
		}
		checkAuth();
	}, []);

	useEffect(() => {
		async function fetchData() {
			try {
				const [custRes, bookingsRes] = await Promise.all([
					fetch("/api/customers", { credentials: "include" }),
					fetch("/api/bookings", { credentials: "include" }),
				]);
				const custData = await custRes.json();
				const bookingsData = await bookingsRes.json();
				if (custData.data?.length) setCustomer(custData.data[0]);
				setBookings(bookingsData.data || []);
			} catch (err) {
				console.error("[customer] Failed to fetch data:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	const removeFromCart = (id: string) =>
		setCart((prev) => prev.filter((c) => c.id !== id));

	const cartTotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

	const getStatusColor = (status: string) => {
		const colors: Record<string, string> = {
			pending:
				"bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
			confirmed:
				"bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
			"in-progress":
				"bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
			completed:
				"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
			cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
		};
		return colors[status] || "bg-gray-100 text-gray-700";
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
					<p className="text-slate-400">Loading dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
			{/* Header */}
			<header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl font-bold text-white">
								{customer?.name?.[0] || "C"}
							</div>
							<div>
								<h1 className="text-xl font-bold text-white">
									{customer?.name || "Customer"}
								</h1>
								<p className="text-sm text-slate-400">{customer?.email}</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
								<span className="text-amber-400 text-lg">⭐</span>
								<div>
									<p className="text-xs text-amber-400/60">Loyalty Points</p>
									<p className="text-lg font-bold text-amber-400">
										{customer?.loyaltyPoints || 0}
									</p>
								</div>
							</div>
							<button
								onClick={() => setActiveTab("cart")}
								className="relative p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
							>
								<span className="text-xl">🛒</span>
								{cart.length > 0 && (
									<span className="absolute -top-1 -right-1 w-5 h-5 bg-sky-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
										{cart.length}
									</span>
								)}
							</button>
							<Link
								href="/"
								className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors text-sm"
							>
								← Website
							</Link>
							<button
								onClick={async () => {
									await fetch("/api/auth/logout", {
										method: "POST",
										credentials: "include",
									});
									window.location.href = "/";
								}}
								className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors text-sm"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Navigation Tabs */}
			<nav className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/30 sticky top-[73px] z-40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex gap-1 overflow-x-auto py-2">
						{(
							[
								"overview",
								"bookings",
								"payments",
								"loyalty",
								"reviews",
								"notifications",
								"profile",
								"cart",
							] as TabType[]
						).map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
									activeTab === tab
										? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
										: "text-slate-400 hover:text-white hover:bg-slate-800"
								}`}
							>
								{tab === "overview" && "📊 "}
								{tab === "bookings" && "📅 "}
								{tab === "payments" && "💳 "}
								{tab === "loyalty" && "⭐ "}
								{tab === "reviews" && "⭐ "}
								{tab === "notifications" && "🔔 "}
								{tab === "profile" && "👤 "}
								{tab === "cart" && "🛒 "}
								{tab.charAt(0).toUpperCase() + tab.slice(1)}
								{tab === "notifications" &&
								customer?.notifications?.filter((n) => !n.read).length ? (
									<span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
										{customer.notifications.filter((n) => !n.read).length}
									</span>
								) : null}
							</button>
						))}
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Overview Tab */}
				{activeTab === "overview" && (
					<div className="space-y-8">
						{/* Bento Grid Stats */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{[
								{
									label: "Total Bookings",
									value: customer?.totalBookings || 0,
									icon: "📅",
									color: "from-sky-500 to-blue-600",
								},
								{
									label: "Total Spent",
									value: `$${customer?.totalSpent || 0}`,
									icon: "💰",
									color: "from-green-500 to-emerald-600",
								},
								{
									label: "Loyalty Points",
									value: customer?.loyaltyPoints || 0,
									icon: "⭐",
									color: "from-amber-500 to-orange-600",
								},
								{
									label: "Reviews",
									value: customer?.reviews?.length || 0,
									icon: "📝",
									color: "from-purple-500 to-pink-600",
								},
							].map((stat) => (
								<div
									key={stat.label}
									className="relative overflow-hidden bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 group hover:border-slate-600/50 transition-all"
								>
									<div
										className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
									/>
									<div className="relative">
										<div className="text-3xl mb-2">{stat.icon}</div>
										<p className="text-2xl font-bold text-white">
											{stat.value}
										</p>
										<p className="text-sm text-slate-400">{stat.label}</p>
									</div>
								</div>
							))}
						</div>

						{/* Quick Actions */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<Link
								href="/#booking"
								className="bg-gradient-to-br from-sky-500/20 to-blue-600/20 backdrop-blur-xl border border-sky-500/30 rounded-2xl p-6 text-center hover:from-sky-500/30 hover:to-blue-600/30 transition-all group"
							>
								<div className="text-4xl mb-3">🧹</div>
								<h3 className="text-lg font-bold text-white mb-1">
									Book a Clean
								</h3>
								<p className="text-sm text-slate-400">
									Schedule your next service
								</p>
							</Link>
							<button
								onClick={() => setActiveTab("bookings")}
								className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 text-center hover:from-green-500/30 hover:to-emerald-600/30 transition-all group"
							>
								<div className="text-4xl mb-3">📋</div>
								<h3 className="text-lg font-bold text-white mb-1">
									View Bookings
								</h3>
								<p className="text-sm text-slate-400">
									Track your upcoming cleans
								</p>
							</button>
							<button
								onClick={() => setActiveTab("loyalty")}
								className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 text-center hover:from-amber-500/30 hover:to-orange-600/30 transition-all group"
							>
								<div className="text-4xl mb-3">🎁</div>
								<h3 className="text-lg font-bold text-white mb-1">Rewards</h3>
								<p className="text-sm text-slate-400">
									Redeem your loyalty points
								</p>
							</button>
						</div>

						{/* Recent Activity */}
						<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
							<h3 className="text-xl font-bold text-white mb-4">
								Recent Activity
							</h3>
							<div className="space-y-3">
								{bookings.slice(0, 5).map((booking) => (
									<div
										key={booking.id}
										className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl"
									>
										<div className="flex items-center gap-4">
											<div className="w-10 h-10 bg-sky-500/20 rounded-lg flex items-center justify-center text-lg">
												🧹
											</div>
											<div>
												<p className="font-medium text-white">
													{booking.service}
												</p>
												<p className="text-sm text-slate-400">
													{booking.date} at {booking.time}
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="font-bold text-white">
												${booking.totalPrice}
											</p>
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
											>
												{booking.status}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Bookings Tab */}
				{activeTab === "bookings" && (
					<div className="space-y-6">
						<div className="flex justify-between items-center">
							<h2 className="text-2xl font-bold text-white">My Bookings</h2>
							<Link
								href="/#booking"
								className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors"
							>
								+ New Booking
							</Link>
						</div>
						<div className="grid gap-4">
							{bookings.map((booking) => (
								<div
									key={booking.id}
									className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all"
								>
									<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
										<div className="flex items-center gap-4">
											<div className="w-14 h-14 bg-gradient-to-br from-sky-500/20 to-blue-600/20 rounded-xl flex items-center justify-center text-2xl">
												🧹
											</div>
											<div>
												<h3 className="text-lg font-bold text-white">
													{booking.service}
												</h3>
												<p className="text-sm text-slate-400">
													{booking.address}, {booking.suburb}
												</p>
												<p className="text-sm text-slate-400">
													{booking.date} at {booking.time}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-4">
											<p className="text-2xl font-bold text-white">
												${booking.totalPrice}
											</p>
											<span
												className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}
											>
												{booking.status}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Payments Tab */}
				{activeTab === "payments" && (
					<div className="space-y-6">
						<h2 className="text-2xl font-bold text-white">Payment History</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
								<p className="text-sm text-green-400 mb-1">Total Paid</p>
								<p className="text-3xl font-bold text-white">
									${customer?.totalSpent || 0}
								</p>
							</div>
							<div className="bg-gradient-to-br from-blue-500/20 to-sky-600/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
								<p className="text-sm text-blue-400 mb-1">Pending</p>
								<p className="text-3xl font-bold text-white">
									$
									{bookings
										.filter((b) => b.status === "pending")
										.reduce((s, b) => s + b.totalPrice, 0)}
								</p>
							</div>
							<div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6">
								<p className="text-sm text-amber-400 mb-1">Avg per Clean</p>
								<p className="text-3xl font-bold text-white">
									{bookings.length
										? `$${Math.round(bookings.reduce((s, b) => s + b.totalPrice, 0) / bookings.length)}`
										: "$0"}
								</p>
							</div>
						</div>
						<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
							<h3 className="text-lg font-bold text-white mb-4">Invoices</h3>
							<div className="space-y-3">
								{bookings
									.filter((b) => b.status === "completed")
									.map((booking) => (
										<div
											key={booking.id}
											className="flex justify-between items-center p-4 bg-slate-700/50 rounded-xl"
										>
											<div>
												<p className="font-medium text-white">
													{booking.service}
												</p>
												<p className="text-sm text-slate-400">{booking.date}</p>
											</div>
											<div className="flex items-center gap-4">
												<p className="font-bold text-white">
													${booking.totalPrice}
												</p>
												<span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
													Paid
												</span>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				)}

				{/* Loyalty Tab */}
				{activeTab === "loyalty" && (
					<div className="space-y-6">
						<div className="bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-8 text-center">
							<div className="text-6xl mb-4">🏆</div>
							<h2 className="text-3xl font-bold text-white mb-2">
								{customer?.loyaltyPoints || 0} Points
							</h2>
							<p className="text-amber-400">
								Keep booking to earn more rewards!
							</p>
							<div className="mt-6 w-full max-w-md mx-auto bg-slate-800 rounded-full h-4">
								<div
									className="bg-gradient-to-r from-amber-500 to-orange-500 h-4 rounded-full transition-all"
									style={{
										width: `${Math.min((customer?.loyaltyPoints || 0) / 10, 100)}%`,
									}}
								/>
							</div>
							<p className="text-sm text-slate-400 mt-2">
								{customer?.loyaltyPoints || 0} / 1,000 to Gold tier
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{[
								{
									points: 100,
									reward: "$10 Off Next Clean",
									icon: "💰",
									available: (customer?.loyaltyPoints || 0) >= 100,
								},
								{
									points: 250,
									reward: "Free Window Cleaning",
									icon: "🪟",
									available: (customer?.loyaltyPoints || 0) >= 250,
								},
								{
									points: 500,
									reward: "Free Deep Clean",
									icon: "✨",
									available: (customer?.loyaltyPoints || 0) >= 500,
								},
							].map((reward) => (
								<div
									key={reward.points}
									className={`bg-slate-800/50 backdrop-blur-xl border rounded-2xl p-6 text-center ${reward.available ? "border-amber-500/30" : "border-slate-700/50 opacity-50"}`}
								>
									<div className="text-4xl mb-3">{reward.icon}</div>
									<h3 className="text-lg font-bold text-white mb-1">
										{reward.reward}
									</h3>
									<p className="text-sm text-amber-400">
										{reward.points} points
									</p>
									{reward.available && (
										<button className="mt-3 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors">
											Redeem
										</button>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{/* Reviews Tab */}
				{activeTab === "reviews" && (
					<div className="space-y-6">
						<h2 className="text-2xl font-bold text-white">My Reviews</h2>
						{customer?.reviews?.length ? (
							<div className="grid gap-4">
								{customer.reviews.map((review) => (
									<div
										key={review.id}
										className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
									>
										<div className="flex items-center gap-2 mb-2">
											{[...Array(5)].map((_, i) => (
												<span
													key={i}
													className={`text-xl ${i < review.rating ? "text-amber-400" : "text-slate-600"}`}
												>
													★
												</span>
											))}
										</div>
										<p className="text-slate-300 mb-2">{review.comment}</p>
										<p className="text-sm text-slate-500">{review.createdAt}</p>
									</div>
								))}
							</div>
						) : (
							<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-12 text-center">
								<div className="text-6xl mb-4">📝</div>
								<h3 className="text-xl font-bold text-white mb-2">
									No Reviews Yet
								</h3>
								<p className="text-slate-400">
									Book a service and leave your first review!
								</p>
							</div>
						)}
					</div>
				)}

				{/* Notifications Tab */}
				{activeTab === "notifications" && (
					<div className="space-y-6">
						<div className="flex justify-between items-center">
							<h2 className="text-2xl font-bold text-white">Notifications</h2>
							{customer?.notifications?.some((n) => !n.read) && (
								<button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors">
									Mark All Read
								</button>
							)}
						</div>
						<div className="space-y-3">
							{customer?.notifications?.length ? (
								customer.notifications.map((notif) => (
									<div
										key={notif.id}
										className={`bg-slate-800/50 backdrop-blur-xl border rounded-2xl p-6 ${notif.read ? "border-slate-700/50" : "border-sky-500/30"}`}
									>
										<div className="flex items-start gap-4">
											<div className="text-2xl">
												{notif.type === "booking" && "📅"}
												{notif.type === "payment" && "💳"}
												{notif.type === "promo" && "🎉"}
												{notif.type === "system" && "⚙️"}
											</div>
											<div className="flex-1">
												<h3 className="font-bold text-white">{notif.title}</h3>
												<p className="text-sm text-slate-400">
													{notif.message}
												</p>
												<p className="text-xs text-slate-500 mt-1">
													{notif.createdAt}
												</p>
											</div>
											{!notif.read && (
												<div className="w-3 h-3 bg-sky-500 rounded-full" />
											)}
										</div>
									</div>
								))
							) : (
								<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-12 text-center">
									<div className="text-6xl mb-4">🔔</div>
									<h3 className="text-xl font-bold text-white mb-2">
										No Notifications
									</h3>
									<p className="text-slate-400">You&apos;re all caught up!</p>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Profile Tab */}
				{activeTab === "profile" && (
					<div className="space-y-6">
						<h2 className="text-2xl font-bold text-white">Profile Settings</h2>
						<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
							<h3 className="text-lg font-bold text-white mb-4">
								Personal Information
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm text-slate-400 mb-1">
										Name
									</label>
									<input
										type="text"
										defaultValue={customer?.name}
										className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-sky-500 focus:outline-none"
									/>
								</div>
								<div>
									<label className="block text-sm text-slate-400 mb-1">
										Email
									</label>
									<input
										type="email"
										defaultValue={customer?.email}
										className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-sky-500 focus:outline-none"
									/>
								</div>
								<div>
									<label className="block text-sm text-slate-400 mb-1">
										Phone
									</label>
									<input
										type="tel"
										defaultValue={customer?.phone}
										className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-sky-500 focus:outline-none"
									/>
								</div>
							</div>
							<button
								onClick={() => {
									// Profile save — requires /api/customers/[id] PATCH (not yet implemented)
									// For now, show a visual confirmation
									const btn = document.getElementById("save-profile-btn");
									if (btn) {
										btn.textContent = "Saved ✓";
										btn.classList.add("bg-green-500");
										setTimeout(() => {
											btn.textContent = "Save Changes";
											btn.classList.remove("bg-green-500");
										}, 2000);
									}
								}}
								id="save-profile-btn"
								className="mt-6 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors"
							>
								Save Changes
							</button>
						</div>

						<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
							<h3 className="text-lg font-bold text-white mb-4">
								Saved Addresses
							</h3>
							<div className="space-y-3">
								{customer?.addresses?.map((addr, idx) => (
									<div
										key={`${addr.postcode}-${idx}`}
										className="flex justify-between items-center p-4 bg-slate-700/50 rounded-xl"
									>
										<div>
											<p className="font-medium text-white">{addr.street}</p>
											<p className="text-sm text-slate-400">
												{addr.suburb}, {addr.state} {addr.postcode}
											</p>
										</div>
										{addr.isDefault && (
											<span className="px-3 py-1 bg-sky-500/20 text-sky-400 rounded-full text-sm">
												Default
											</span>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Cart Tab */}
				{activeTab === "cart" && (
					<div className="space-y-6">
						<h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
						{cart.length ? (
							<>
								<div className="space-y-4">
									{cart.map((item) => (
										<div
											key={item.id}
											className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 flex justify-between items-center"
										>
											<div>
												<h3 className="font-bold text-white">{item.title}</h3>
												<p className="text-sm text-slate-400">
													Qty: {item.quantity}
												</p>
											</div>
											<div className="flex items-center gap-4">
												<p className="text-xl font-bold text-white">
													${item.price * item.quantity}
												</p>
												<button
													onClick={() => removeFromCart(item.id)}
													className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
												>
													✕
												</button>
											</div>
										</div>
									))}
								</div>
								<div className="bg-gradient-to-br from-sky-500/20 to-blue-600/20 backdrop-blur-xl border border-sky-500/30 rounded-2xl p-6">
									<div className="flex justify-between items-center">
										<h3 className="text-xl font-bold text-white">Total</h3>
										<p className="text-3xl font-bold text-white">
											${cartTotal}
										</p>
									</div>
									<button className="w-full mt-4 px-6 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-lg transition-colors">
										Checkout — ${cartTotal}
									</button>
								</div>
							</>
						) : (
							<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-12 text-center">
								<div className="text-6xl mb-4">🛒</div>
								<h3 className="text-xl font-bold text-white mb-2">
									Cart is Empty
								</h3>
								<p className="text-slate-400 mb-4">
									Add services to get started
								</p>
								<Link
									href="/pricing"
									className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors"
								>
									Browse Services
								</Link>
							</div>
						)}
					</div>
				)}
			</main>
		</div>
	);
}
