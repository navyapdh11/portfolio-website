"use client";

import Link from "next/link";

export default function AdsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">📣 Ads Manager</h2>
        <p className="text-slate-400 mb-6">
          Full ad campaign management is available on the public Ads Manager page.
          This tab provides a quick overview for admin monitoring.
        </p>
        <Link
          href="/ads"
          className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors"
        >
          Open Ads Manager →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">Active Campaigns</h3>
          <p className="text-4xl font-bold text-purple-400">4</p>
          <p className="text-sm text-slate-400 mt-1">Across Facebook, Instagram, Google</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">Total Ad Spend</h3>
          <p className="text-4xl font-bold text-pink-400">$1,461</p>
          <p className="text-sm text-slate-400 mt-1">This month</p>
        </div>
      </div>
    </div>
  );
}
