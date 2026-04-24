"use client";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [metrics, setMetrics] = useState({ missed: 0 });

  useEffect(() => {
    fetch("/api/admin/bookings").then(res => res.json()).then(data => setBookings(data.bookings));
    fetch("/api/admin/analytics").then(res => res.json()).then(data => setMetrics(data));
  }, []);

  return (
    <main className="p-8 bg-slate-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">AASTACLEAN Command Center</h1>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
           <h2 className="text-lg font-bold">Total Bookings</h2>
           <p className="text-3xl font-bold">{bookings.length}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
           <h2 className="text-lg font-bold">Missed Bookings</h2>
           <p className="text-3xl font-bold text-red-500">{metrics.missed}</p>
        </div>
      </div>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-bold mb-6">Live Booking Management</h2>
        {/* Table/List view of bookings here */}
        <p>Booking management interface active.</p>
      </div>
    </main>
  );
}