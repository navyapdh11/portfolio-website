"use client";

import { useState } from "react";
import { SmartScrollMenu } from "./SmartScrollMenu";
import { QuoteCalculator } from "./QuoteCalculator";

export default function Hero() {
  return (
    <>
      <SmartScrollMenu />
      <section
        id="home"
        className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-sky-900"
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold mb-6">📍 Perth Based • Since 2018</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                  Australia&apos;s #1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">AI-Driven Cleaning Service</span>: Same-Day Domestic, Commercial & Bond-Back Experts
                </h1>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">Professional cleaning services with police-checked cleaners, 100% satisfaction guarantee, and eco-friendly products.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#booking" className="px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all">Book Now</a>
                <a href="tel:0890000000" className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-lg hover:border-sky-500 transition-all">📞 08 9000 0000</a>
              </div>
            </div>

            {/* Reactive Quote Section */}
            <div className="lg:w-full">
              <QuoteCalculator />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
