"use client";

import Link from "next/link";

export default function MicrotasksTab() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">⚡ AI Microtasks</h2>
        <p className="text-slate-400 mb-6">
          Earn $0.10-$2.00 per task training cleaning AI models. Uber-style microtasks for cleaners.
        </p>
        <Link
          href="/microtasks"
          className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium transition-colors"
        >
          Open Microtasks →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">Available Tasks</h3>
          <p className="text-4xl font-bold text-cyan-400">12</p>
          <p className="text-sm text-slate-400 mt-1">Ready to claim</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">Completed Today</h3>
          <p className="text-4xl font-bold text-green-400">5</p>
          <p className="text-sm text-slate-400 mt-1">$4.50 earned</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">Heatmap Zones</h3>
          <p className="text-4xl font-bold text-orange-400">3</p>
          <p className="text-sm text-slate-400 mt-1">High-demand areas</p>
        </div>
      </div>
    </div>
  );
}
