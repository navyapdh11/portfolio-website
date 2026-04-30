"use client";

import { getStatusColor } from "@/lib/ui/statusColors";

interface Booking {
  id: string;
  customerName: string;
  service: string;
  date: string;
  status: string;
  totalPrice: number;
}

interface BookingsTabProps {
  bookings: Booking[];
  updateBookingStatus: (id: string, status: string) => Promise<void>;
}

export default function BookingsTab({ bookings, updateBookingStatus }: BookingsTabProps) {
  return (
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
  );
}
