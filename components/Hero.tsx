"use client";

import { useState } from "react";
import { SmartScrollMenu } from "./SmartScrollMenu";

export default function Hero() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <>
      <SmartScrollMenu />
      <section
        id="home"
        className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-sky-900"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
          {/* Trust Badges Bar */}
          <div className="mb-8 flex flex-wrap justify-center gap-4 animate-fade-in">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <span className="text-green-600">✓</span>
              <span className="text-sm font-medium text-green-700 dark:text-green-400">4.9★ Google Rating</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <span className="text-blue-600">🛡️</span>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Police Checked Staff</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
              <span className="text-emerald-600">🌿</span>
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Eco-Friendly Products</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <span className="text-amber-600">⚡</span>
              <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Same Day Service</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold mb-6">
                📍 Serving 10,247+ Suburbs Nationwide • Since 2015
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                Australia's Most{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">
                  Trusted
                </span>{" "}
                Cleaning Service
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
                AI-powered national cleaning platform. Residential, commercial & end-of-lease 
                cleaning with police-checked cleaners, bond-back guarantee, and eco-friendly products.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-sky-600">2,500+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Happy Clients</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-emerald-600">8+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-amber-600">100%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Satisfaction Rate</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#booking"
                  className="px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl hover:from-sky-600 hover:to-cyan-600 transition-all hover:shadow-xl hover:shadow-sky-500/30 text-center font-bold text-lg"
                >
                  Get Instant Quote
                </a>
                <a
                  href="tel:1300253268"
                  className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:border-sky-500 hover:text-sky-500 dark:hover:border-sky-400 dark:hover:text-sky-400 transition-all text-center font-bold text-lg flex items-center justify-center gap-2"
                >
                  📞 1300 CLEAN
                </a>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                ✓ Free cancellation  ✓ Bond-back guarantee  ✓ Fully insured
              </p>
            </div>

            {/* Right - Quick Quote Form */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border-2 border-sky-100 dark:border-sky-900">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Get Your Instant Quote
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Transparent pricing. No hidden fees.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Service Type
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all">
                    <option>🏠 House Cleaning</option>
                    <option>🏢 Office Cleaning</option>
                    <option>🔑 End of Lease / Bond</option>
                    <option>🧹 Carpet Cleaning</option>
                    <option>🪟 Window Cleaning</option>
                    <option>✨ Deep Clean / Spring Clean</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Bedrooms
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none">
                      <option>1</option>
                      <option>2</option>
                      <option selected>3</option>
                      <option>4</option>
                      <option>5+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Bathrooms
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none">
                      <option>1</option>
                      <option selected>2</option>
                      <option>3</option>
                      <option>4+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Suburb
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Joondalup, Fremantle"
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>

                {/* Price Display */}
                <div className="p-4 bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 rounded-lg border border-sky-200 dark:border-sky-800">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">Estimated Price:</span>
                    <span className="text-3xl font-bold text-sky-600">$180</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    *Final price confirmed after brief consultation
                  </p>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-lg hover:from-sky-600 hover:to-cyan-600 transition-all hover:shadow-lg font-bold text-lg">
                  Book Now & Lock In Price
                </button>

                <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                  ⚡ Takes 60 seconds • No payment required until service complete
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#services" aria-label="Scroll down">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
