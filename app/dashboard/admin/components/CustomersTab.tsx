"use client";

import Link from "next/link";

export default function CustomersTab() {
	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-white">👥 Customer Management</h2>
			<div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-12 text-center">
				<div className="text-6xl mb-4">👥</div>
				<h3 className="text-xl font-bold text-white mb-2">Customer CRM</h3>
				<p className="text-slate-400">
					Full customer profiles, booking history, and communication tools.
				</p>
				<Link
					href="/dashboard/customer"
					className="mt-4 inline-block px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors"
				>
					View Customer Dashboard →
				</Link>
			</div>
		</div>
	);
}
