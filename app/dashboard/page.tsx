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

interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  photo: string;
  active: boolean;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  followers: number;
  engagement: number;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"bookings" | "quotes" | "customers" | "team" | "social">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([
    { id: "1", name: "Sarah Mitchell", role: "Operations Manager", phone: "0412 345 678", email: "sarah@aastaclean.com.au", photo: "SM", active: true },
    { id: "2", name: "James Chen", role: "Lead Technician", phone: "0412 345 679", email: "james@aastaclean.com.au", photo: "JC", active: true },
    { id: "3", name: "Emily Rodriguez", role: "Customer Success", phone: "0412 345 680", email: "emily@aastaclean.com.au", photo: "ER", active: true },
  ]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: "Facebook", url: "https://facebook.com/aastaclean", icon: "📘", followers: 2500, engagement: 4.2 },
    { platform: "Instagram", url: "https://instagram.com/aastaclean", icon: "📸", followers: 1800, engagement: 5.8 },
    { platform: "Google", url: "https://google.com/aastaclean", icon: "🔍", followers: 150, engagement: 8.5 },
  ]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<string | null>(null);

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

  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus as Booking['status'] } : b));
      }
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };

  const updateQuoteStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setQuotes(quotes.map(q => q.id === id ? { ...q, status: newStatus as Quote['status'] } : q));
      }
    } catch (error) {
      console.error("Failed to update quote:", error);
    }
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
            <div className="flex gap-3">
              <a href="/projects" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
                View Projects
              </a>
              <a href="/" className="px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg font-medium transition-colors">
                ← Back to Website
              </a>
            </div>
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

        <div className="mb-8 flex flex-wrap gap-4">
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
          <button
            onClick={() => setActiveTab("team")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "team"
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            👷 Team ({team.length})
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "social"
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            📱 Social/CTA Config
          </button>
        </div>

        {activeTab === "social" && (
          <div className="bg-slate-800 rounded-xl p-8 shadow-lg">
             <h2 className="text-xl font-bold mb-6">Website Configuration</h2>
             <div className="space-y-6">
                <div>
                   <label className="block text-sm font-semibold mb-2">CTA Title</label>
                   <input className="w-full p-3 bg-slate-700 rounded-lg border border-slate-600" defaultValue="Ready to Work With Us?" />
                </div>
                <div>
                   <label className="block text-sm font-semibold mb-2">CTA Description</label>
                   <textarea className="w-full p-3 bg-slate-700 rounded-lg border border-slate-600" defaultValue="Get a free quote for your cleaning project. Whether it's residential, commercial, or end-of-lease, we deliver exceptional results." />
                </div>
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold">Apply Changes</button>
             </div>
          </div>
        )}

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
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
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
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                          className="bg-slate-700 text-white text-sm px-2 py-1 rounded border border-slate-600"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
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
                      <td className="px-6 py-4">
                        <select
                          value={quote.status}
                          onChange={(e) => updateQuoteStatus(quote.id, e.target.value)}
                          className="bg-slate-700 text-white text-sm px-2 py-1 rounded border border-slate-600"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="quoted">Quoted</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
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

        {activeTab === "team" && (
          <div className="bg-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Team Members</h3>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors">
                + Add Team Member
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {team.map((member) => (
                <div key={member.id} className="bg-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xl text-white font-semibold">{member.photo}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{member.name}</h4>
                      <p className="text-sm text-slate-400">{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <span>📱</span>
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <span>✉️</span>
                      <span>{member.email}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                      Edit
                    </button>
                    <button className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${member.active ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
                      {member.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Social Media Connections</h3>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors">
                  + Add Platform
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {socialLinks.map((social) => (
                  <div key={social.platform} className="bg-slate-700 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{social.icon}</span>
                      <div>
                        <h4 className="font-semibold text-white">{social.platform}</h4>
                        <p className="text-sm text-slate-400">{social.followers.toLocaleString()} followers</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Engagement Rate</span>
                        <span className="text-green-400 font-medium">{social.engagement}%</span>
                      </div>
                      <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${social.engagement * 10}%` }}></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        defaultValue={social.url}
                        className="flex-1 bg-slate-600 text-white text-sm px-3 py-2 rounded border border-slate-500"
                        placeholder="Enter URL..."
                      />
                      <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6">
import GalleryUpload from "@/components/dashboard/GalleryUpload";
...
                {/* Community Work Gallery */}
                <h3 className="text-lg font-semibold mb-6">Community Work Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 cursor-pointer transition-colors group">
                      <span className="text-4xl opacity-50 group-hover:opacity-100">📷</span>
                    </div>
                  ))}
                </div>
                <GalleryUpload />
              </div>

              {/* Quick Actions */}
              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button onClick={() => window.open('https://facebook.com/aastaclean', '_blank')} className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors text-center">
                    📘 Post to Facebook
                  </button>
                  <button onClick={() => window.open('https://instagram.com/aastaclean', '_blank')} className="p-4 bg-pink-600 hover:bg-pink-700 rounded-lg font-medium transition-colors text-center">
                    📸 Post to Instagram
                  </button>
                  <button onClick={() => alert("Newsletter feature under development")} className="p-4 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors text-center">
                    ✉️ Send Newsletter
                  </button>
                  <button onClick={() => alert("Review request system triggered")} className="p-4 bg-orange-600 hover:bg-orange-700 rounded-lg font-medium transition-colors text-center">
                    ⭐ Request Reviews
                  </button>
                </div>
              </div>
          </div>
        )}
      </main>
    </div>
  );
}
