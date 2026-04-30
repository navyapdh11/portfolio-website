"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardTab from "./components/DashboardTab";
import BookingsTab from "./components/BookingsTab";
import CustomersTab from "./components/CustomersTab";
import ServicesTab from "./components/ServicesTab";
import GalleryTab from "./components/GalleryTab";
import AnalyticsTab from "./components/AnalyticsTab";
import SettingsTab from "./components/SettingsTab";

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
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) {
          window.location.href = "/dashboard/login?redirect=/dashboard/admin";
          return;
        }
        const data = await res.json();
        if (data.role !== "admin") {
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
          fetch("/api/analytics", { credentials: "include" }),
          fetch("/api/bookings", { credentials: "include" }),
          fetch("/api/services", { credentials: "include" }),
          fetch("/api/gallery", { credentials: "include" }),
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
      credentials: "include",
    });
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    setEditingService(null);
  };

  const deleteService = async (id: string) => {
    await fetch("/api/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      credentials: "include",
    });
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addGalleryItem = async () => {
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGalleryItem),
      credentials: "include",
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
      credentials: "include",
    });
    setGallery(prev => prev.filter(g => g.id !== id));
  };

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
                  await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
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
        {activeTab === "dashboard" && (
          <DashboardTab
            analytics={analytics}
            bookings={bookings}
            services={services}
            flashcardIndex={flashcardIndex}
            updateBookingStatus={updateBookingStatus}
          />
        )}
        {activeTab === "bookings" && (
          <BookingsTab bookings={bookings} updateBookingStatus={updateBookingStatus} />
        )}
        {activeTab === "customers" && <CustomersTab />}
        {activeTab === "services" && (
          <ServicesTab
            services={services}
            editingService={editingService}
            setEditingService={setEditingService}
            updateService={updateService}
            deleteService={deleteService}
          />
        )}
        {activeTab === "gallery" && (
          <GalleryTab
            gallery={gallery}
            showNewGalleryModal={showNewGalleryModal}
            setShowNewGalleryModal={setShowNewGalleryModal}
            newGalleryItem={newGalleryItem}
            setNewGalleryItem={setNewGalleryItem}
            addGalleryItem={addGalleryItem}
            deleteGalleryItem={deleteGalleryItem}
          />
        )}
        {activeTab === "analytics" && (
          <AnalyticsTab analytics={analytics} services={services} />
        )}
        {activeTab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}
