"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  featured: boolean;
}

type TabType = "dashboard" | "bookings" | "customers" | "services" | "gallery" | "settings" | "analytics";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showNewGalleryModal, setShowNewGalleryModal] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({ title: "", description: "", imageUrl: "", category: "general", featured: false });
  const [editingService, setEditingService] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok || (await res.json()).role !== "admin") {
          window.location.href = "/dashboard/login?redirect=/dashboard/admin";
        }
      } catch {
        window.location.href = "/dashboard/login?redirect=/dashboard/admin";
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [analyticsRes, bookingsRes, servicesRes, galleryRes] = await Promise.all([
          fetch("/api/analytics"),
          fetch("/api/bookings"),
          fetch("/api/services"),
          fetch("/api/gallery"),
        ]);
        const [analyticsData, bookingsData, servicesData, galleryData] = await Promise.all([
          analyticsRes.json(),
          bookingsRes.json(),
          servicesRes.json(),
          galleryRes.json(),
        ]);
        setAnalytics(analyticsData.analytics);
        setBookings(bookingsData.data || []);
        setServices(servicesData.data || []);
        setGallery(galleryData.data || []);
      } catch { /* empty */ } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab !== "dashboard") return;
    const interval = setInterval(() => {
      setFlashcardIndex(prev => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const updateBookingStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const updateService = async (id: string, data: Partial<Service>) => {
    await fetch("/api/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    setEditingService(null);
  };

  const deleteService = async (id: string) => {
    await fetch("/api/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addGalleryItem = async () => {
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGalleryItem),
    });
    const data = await res.json();
    if (data.success) {
      setGallery(prev => [...prev, data.item]);
      setShowNewGalleryModal(false);
      setNewGalleryItem({ title: "", description: "", imageUrl: "", category: "general", featured: false });
    }
  };

  const deleteGalleryItem = async (id: string) => {
    await fetch("/api/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "in-progress": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      completed: "bg-green-500/20 text-green-400 border-green-500/30",
      cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[status] || "bg-gray-500/20 text-gray-400";
  };

  const flashcards = analytics ? [
    { label: "Total Revenue", value: `$${analytics.totalRevenue.toLocaleString()}`, icon: "💰", gradient: "from-emerald-500 to-green-600", change: "+12%" },
    { label: "Pending Revenue", value: `$${analytics.pendingRevenue.toLocaleString()}`, icon: "⏳", gradient: "from-amber-500 to-orange-600", change: `${bookings.filter(b => b.status === "pending").length} bookings` },
    { label: "Avg Booking", value: `$${Math.round(analytics.avgBookingValue)}`, icon: "📊", gradient: "from-sky-500 to-blue-600", change: `${analytics.completionRate.toFixed(0)}% completion` },
    { label: "Total Bookings", value: analytics.totalBookings.toString(), icon: "📅", gradient: "from-purple-500 to-pink-600", change: "All time" },
    { label: "Active Customers", value: analytics.totalCustomers.toString(), icon: "👥", gradient: "from-indigo-500 to-violet-600", change: "Verified" },
    { label: "Total Stock", value: analytics.totalStock.toString(), icon: "📦", gradient: "from-rose-500 to-red-600", change: `${analytics.totalServices} services` },
  ] : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Admin Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-red-500/20">
                A
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Command Center</h1>
                <p className="text-sm text-slate-400">Full System Control</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard/customer" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors text-sm">
                Customer View
              </Link>
              <button
                onClick={async () => {
                  await fetch("/api/auth/logout", { method: "POST" });
                  window.location.href = "/";
                }}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors text-sm"
              >
                Logout
              </button>
              <Link href="/" className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-colors text-sm">
                ← Website
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/30 sticky top-[73px] z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            {(["dashboard", "bookings", "customers", "services", "gallery", "analytics", "settings"] as TabType[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {tab === "dashboard" && "🎛️ "}
                {tab === "bookings" && "📅 "}
                {tab === "customers" && "👥 "}
                {tab === "services" && "🧹 "}
                {tab === "gallery" && "🖼️ "}
                {tab === "analytics" && "📈 "}
                {tab === "settings" && "⚙️ "}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab - 3D Bento Grid with Flashcards */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* 3D Flashcard Carousel */}
            <div className="relative">
              <h2 className="text-2xl font-bold text-white mb-4">📊 Live Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {flashcards.map((card, i) => (
                  <div
                    key={card.label}
                    className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-700 transform ${
                      i === flashcardIndex
                        ? "scale-105 z-10 shadow-2xl"
                        : "scale-100 opacity-80"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))`,
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(148, 163, 184, 0.1)",
                      boxShadow: i === flashcardIndex
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
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 ${i === flashcardIndex ? "animate-pulse" : ""} rounded-2xl`} style={{ opacity: i === flashcardIndex ? 0.05 : 0 }} />
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
                  {(["pending", "confirmed", "in-progress", "completed"] as const).map(status => (
                    <div key={status} className={`p-4 rounded-xl border ${getStatusColor(status)}`}>
                      <p className="text-2xl font-bold">{bookings.filter(b => b.status === status).length}</p>
                      <p className="text-sm capitalize">{status}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock Alerts */}
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📦 Stock Alerts</h3>
                <div className="space-y-3">
                  {services.filter(s => s.stock < 20).map(s => (
                    <div key={s.id} className="flex justify-between items-center">
                      <span className="text-sm text-white">{s.title}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${s.stock < 10 ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"}`}>
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
                  {bookings.slice(0, 4).map(b => (
                    <div key={b.id} className="text-sm">
                      <p className="text-white truncate">{b.customerName}</p>
                      <p className="text-slate-400 text-xs">{b.service} — ${b.totalPrice}</p>
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
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Service</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {bookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-slate-700/20 transition-colors">
                        <td className="px-6 py-4 text-white">{booking.customerName}</td>
                        <td className="px-6 py-4 text-slate-300">{booking.service}</td>
                        <td className="px-6 py-4 text-slate-300">{booking.date}</td>
                        <td className="px-6 py-4 font-bold text-white">${booking.totalPrice}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={booking.status}
                            onChange={e => updateBookingStatus(booking.id, e.target.value)}
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
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">📅 Booking Management</h2>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Service</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Date/Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-700/20">
                      <td className="px-6 py-4 text-slate-400 font-mono text-sm">{b.id}</td>
                      <td className="px-6 py-4 text-white">{b.customerName}</td>
                      <td className="px-6 py-4 text-slate-300">{b.service}</td>
                      <td className="px-6 py-4 text-slate-300">{b.date}</td>
                      <td className="px-6 py-4 font-bold text-white">${b.totalPrice}</td>
                      <td className="px-6 py-4">
                        <select
                          value={b.status}
                          onChange={e => updateBookingStatus(b.id, e.target.value)}
                          className="bg-slate-700 text-white text-sm px-3 py-1 rounded border border-slate-600"
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
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">👥 Customer Management</h2>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-white mb-2">Customer CRM</h3>
              <p className="text-slate-400">Full customer profiles, booking history, and communication tools.</p>
              <Link href="/dashboard/customer" className="mt-4 inline-block px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors">
                View Customer Dashboard →
              </Link>
            </div>
          </div>
        )}

        {/* Services Tab - Pricing & Stock Control */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">🧹 Service & Pricing Control</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(service => (
                <div key={service.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all">
                  {editingService === service.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        defaultValue={service.title}
                        id={`title-${service.id}`}
                        className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm"
                      />
                      <input
                        type="number"
                        defaultValue={service.basePrice}
                        id={`price-${service.id}`}
                        className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm"
                      />
                      <input
                        type="number"
                        defaultValue={service.stock}
                        id={`stock-${service.id}`}
                        className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => updateService(service.id, {
                          title: (document.getElementById(`title-${service.id}`) as HTMLInputElement)?.value,
                          basePrice: Number((document.getElementById(`price-${service.id}`) as HTMLInputElement)?.value),
                          stock: Number((document.getElementById(`stock-${service.id}`) as HTMLInputElement)?.value),
                        })} className="px-3 py-1 bg-green-500 text-white rounded text-sm">Save</button>
                        <button onClick={() => setEditingService(null)} className="px-3 py-1 bg-slate-600 text-white rounded text-sm">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{service.title}</h3>
                          <p className="text-sm text-slate-400">{service.category}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${service.available ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {service.available ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-slate-700/50 rounded-lg p-3">
                          <p className="text-xs text-slate-400">Price</p>
                          <p className="text-xl font-bold text-white">${service.basePrice}</p>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-3">
                          <p className="text-xs text-slate-400">Stock</p>
                          <p className={`text-xl font-bold ${service.stock < 10 ? "text-red-400" : "text-white"}`}>{service.stock}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingService(service.id)} className="flex-1 px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors">
                          ✏️ Edit
                        </button>
                        <button onClick={() => deleteService(service.id)} className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors">
                          🗑️
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Tab - Content Management */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">🖼️ Gallery & Content Manager</h2>
              <button onClick={() => setShowNewGalleryModal(true)} className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors">
                + Add Item
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {gallery.map(item => (
                <div key={item.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-slate-600/50 transition-all">
                  <div className="aspect-video bg-slate-700/50 overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white">{item.title}</h3>
                      {item.featured && <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded text-xs">Featured</span>}
                    </div>
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded">{item.category}</span>
                      <button onClick={() => deleteGalleryItem(item.id)} className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Gallery Modal */}
            {showNewGalleryModal && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-6 max-w-md w-full">
                  <h3 className="text-xl font-bold text-white mb-4">Add Gallery Item</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Title"
                      value={newGalleryItem.title}
                      onChange={e => setNewGalleryItem(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none"
                    />
                    <textarea
                      placeholder="Description"
                      value={newGalleryItem.description}
                      onChange={e => setNewGalleryItem(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none resize-none"
                      rows={3}
                    />
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={newGalleryItem.imageUrl}
                      onChange={e => setNewGalleryItem(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={newGalleryItem.category}
                      onChange={e => setNewGalleryItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none"
                    />
                    <label className="flex items-center gap-2 text-white">
                      <input
                        type="checkbox"
                        checked={newGalleryItem.featured}
                        onChange={e => setNewGalleryItem(prev => ({ ...prev, featured: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      Featured
                    </label>
                    <div className="flex gap-3">
                      <button onClick={addGalleryItem} className="flex-1 px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors">
                        Add Item
                      </button>
                      <button onClick={() => setShowNewGalleryModal(false)} className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && analytics && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">📈 Analytics & Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
                <p className="text-sm text-emerald-400 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-white">${analytics.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-sky-500/20 to-blue-600/20 backdrop-blur-xl border border-sky-500/30 rounded-2xl p-6">
                <p className="text-sm text-sky-400 mb-1">Completion Rate</p>
                <p className="text-3xl font-bold text-white">{analytics.completionRate.toFixed(0)}%</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
                <p className="text-sm text-purple-400 mb-1">Avg Booking Value</p>
                <p className="text-3xl font-bold text-white">${Math.round(analytics.avgBookingValue)}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6">
                <p className="text-sm text-amber-400 mb-1">Pending Revenue</p>
                <p className="text-3xl font-bold text-white">${analytics.pendingRevenue.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Service Distribution</h3>
              <div className="space-y-3">
                {services.map(s => (
                  <div key={s.id} className="flex items-center gap-4">
                    <span className="text-sm text-white w-40">{s.title}</span>
                    <div className="flex-1 bg-slate-700/50 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-sky-500 to-blue-500 h-3 rounded-full transition-all"
                        style={{ width: `${Math.min((s.stock / 50) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-400 w-16 text-right">{s.stock}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">⚙️ System Settings</h2>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Frontend Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">CTA Title</label>
                  <input type="text" defaultValue="Ready to Work With Us?" className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-sky-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">CTA Button Text</label>
                  <input type="text" defaultValue="Get Free Quote" className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-sky-500 focus:outline-none" />
                </div>
              </div>
              <button className="mt-4 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
