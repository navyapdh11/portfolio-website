"use client";

import { useState, useEffect } from "react";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

interface Quote {
  id: string;
  service: string;
  bedrooms: number;
  bathrooms: number;
  frequency: string;
  estimatedPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  suburb: string;
  status: "new" | "contacted" | "quoted" | "accepted" | "rejected";
  createdAt: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  totalBookings: number;
  totalSpent: number;
  lastBooking: string;
  status: "active" | "inactive" | "prospect";
  createdAt: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"bookings" | "quotes" | "customers">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookingsRes, quotesRes, customersRes] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/quotes"),
          fetch("/api/customers"),
        ]);
        const bookingsData = await bookingsRes.json();
        const quotesData = await quotesRes.json();
        const customersData = await customersRes.json();
        setBookings(bookingsData.data);
        setQuotes(quotesData.data);
        setCustomers(customersData.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      new: "bg-purple-100 text-purple-800",
      contacted: "bg-blue-100 text-blue-800",
      quoted: "bg-cyan-100 text-cyan-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      prospect: "bg-amber-100 text-amber-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">AASTACLEAN Admin</h1>
              <p className="text-slate-400 text-sm">Business Management Dashboard</p>
            </div>
            <a
              href="/"
              className="px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg font-medium transition-colors"
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">Total Bookings</div>
            <div className="text-3xl font-bold text-white">{bookings.length}</div>
            <div className="text-green-400 text-sm mt-2">↑ 12% from last month</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">Pending Quotes</div>
            <div className="text-3xl font-bold text-white">{quotes.filter(q => q.status === 'new').length}</div>
            <div className="text-amber-400 text-sm mt-2">Requires attention</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">Active Customers</div>
            <div className="text-3xl font-bold text-white">{customers.filter(c => c.status === 'active').length}</div>
            <div className="text-sky-400 text-sm mt-2">From {customers.length} total</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">Total Revenue</div>
            <div className="text-3xl font-bold text-green-400">
              ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm mt-2">Lifetime value</div>
          </div>
        </div>

        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "bookings"
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            📅 Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("quotes")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "quotes"
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            💰 Quotes ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "customers"
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            👥 Customers ({customers.length})
          </button>
        </div>

        {activeTab === "bookings" && (
          <div className="bg-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Address</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-700/50">
                      <td className="px-6 py-4">
                        <div className="font-medium">{booking.name}</div>
                        <div className="text-sm text-slate-400">{booking.email}</div>
                        <div className="text-sm text-slate-400">{booking.phone}</div>
                      </td>
                      <td className="px-6 py-4">{booking.service}</td>
                      <td className="px-6 py-4">
                        <div>{booking.date}</div>
                        <div className="text-sm text-slate-400">{booking.time}</div>
                      </td>
                      <td className="px-6 py-4">{booking.address}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "quotes" && (
          <div className="bg-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Property</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {quotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-slate-700/50">
                      <td className="px-6 py-4">
                        <div className="font-medium">{quote.customerName}</div>
                        <div className="text-sm text-slate-400">{quote.customerEmail}</div>
                        <div className="text-sm text-slate-400">{quote.customerPhone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{quote.service}</div>
                        <div className="text-sm text-slate-400">{quote.frequency}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{quote.bedrooms} bed / {quote.bathrooms} bath</div>
                        <div className="text-sm text-slate-400">{quote.suburb}</div>
                      </td>
                      <td className="px-6 py-4 text-green-400 font-semibold">${quote.estimatedPrice}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                          {quote.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div className="bg-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Bookings</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Total Spent</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-700/50">
                      <td className="px-6 py-4 font-medium">{customer.name}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-sm text-slate-400">{customer.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{customer.address}</div>
                        <div className="text-sm text-slate-400">{customer.suburb}</div>
                      </td>
                      <td className="px-6 py-4">{customer.totalBookings}</td>
                      <td className="px-6 py-4 text-green-400 font-semibold">${customer.totalSpent}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                          {customer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}