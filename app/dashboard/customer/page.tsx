"use client";

import { useState } from "react";

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
            <h1 className="text-3xl font-bold">Customer Command Center</h1>
            <p className="text-slate-500">Manage your cleaning services and bookings.</p>
        </header>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            {["bookings", "services", "invoices", "support"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium capitalize ${
                  activeTab === tab 
                    ? "bg-blue-600 text-white" 
                    : "hover:bg-slate-200 dark:hover:bg-zinc-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
             {activeTab === "bookings" && (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200">
                    <h2 className="text-xl font-bold mb-4">My Bookings</h2>
                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg flex justify-between items-center">
                            <span>End of Lease Cleaning - Sydney, NSW</span>
                            <span className="text-green-600 font-bold">Confirmed</span>
                        </div>
                    </div>
                </div>
             )}
          </div>
        </div>
      </div>
    </main>
  );
}