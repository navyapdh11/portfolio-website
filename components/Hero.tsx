"use client";

import { useState, useEffect } from "react";
import { QuoteCalculator } from "./QuoteCalculator";

// Animated stat counter
function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="text-2xl md:text-3xl font-black text-white">{value}</div>
      <div className="text-xs md:text-sm text-sky-100/80 mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
        id="home"
        className="min-h-screen relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0c1a3a 0%, #0a1628 25%, #0f2040 50%, #0a1628 75%, #0c1a3a 100%)",
        }}
      >
        {/* Animated gradient orbs */}
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] animate-pulse"
          style={{
            background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
            left: `calc(${mousePos.x * 0.05}% - 100px)`,
            top: `calc(${mousePos.y * 0.05}% - 100px)`,
            transition: "left 0.8s cubic-bezier(0.22, 1, 0.36, 1), top 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            right: `calc(${(100 - mousePos.x) * 0.04}% - 80px)`,
            bottom: `calc(${(100 - mousePos.y) * 0.04}% - 80px)`,
            transition: "right 1s cubic-bezier(0.22, 1, 0.36, 1), bottom 1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          {/* National badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="glass-strong inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Australia&apos;s Premier Cleaning Network — <span className="text-sky-500">Nationwide Coverage</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Hero Copy */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.08] mb-6 animate-slide-in-left">
                Enterprise-Grade
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-400 animate-gradient" style={{ backgroundSize: "200% 200%" }}>
                  Cleaning Services
                </span>
                <br />
                <span className="text-white/90">Across Australia</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300/90 mb-10 max-w-xl mx-auto lg:mx-0 animate-fade-in stagger-2" style={{ animationDelay: "0.2s", opacity: 0 }}>
                20+ specialist services · 8,000+ suburbs · Police-checked &amp; fully insured professionals. Bond-back guaranteed with same-day availability in every state.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in stagger-3" style={{ animationDelay: "0.35s", opacity: 0 }}>
                <a
                  href="#booking"
                  className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    Get Your Free Quote
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
                <a
                  href="tel:1300253268"
                  className="group px-8 py-4 glass-strong rounded-2xl font-bold text-lg text-slate-700 dark:text-slate-200 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 border border-white/30"
                >
                  <span className="flex items-center justify-center gap-2">
                    📞 1300 CLEAN
                    <span className="text-xs text-slate-500 font-normal hidden sm:inline">Toll-Free</span>
                  </span>
                </a>
              </div>

              {/* Trust Badges Row */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in stagger-4" style={{ animationDelay: "0.5s", opacity: 0 }}>
                {["Bond-Back Guarantee", "Police Checked", "Fully Insured", "Eco-Friendly", "5★ Rated"].map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-subtle text-sm text-slate-300">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quote Calculator in Glass Card */}
            <div className="lg:w-full animate-scale-in stagger-4" style={{ animationDelay: "0.3s", opacity: 0 }}>
              <div className="glass-strong rounded-3xl p-1.5 border border-white/25 shadow-2xl shadow-sky-500/10">
                <div className="bg-gradient-to-br from-slate-50/80 to-white/80 dark:from-slate-800/80 dark:to-slate-900/80 rounded-[1.3rem] p-6">
                  <QuoteCalculator />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <div className="glass-strong rounded-2xl p-5 text-center border border-white/20 hover-lift">
              <AnimatedStat value="8,000+" label="Suburbs Covered" delay={700} />
            </div>
            <div className="glass-strong rounded-2xl p-5 text-center border border-white/20 hover-lift">
              <AnimatedStat value="20+" label="Specialist Services" delay={800} />
            </div>
            <div className="glass-strong rounded-2xl p-5 text-center border border-white/20 hover-lift">
              <AnimatedStat value="50K+" label="Cleans Completed" delay={900} />
            </div>
            <div className="glass-strong rounded-2xl p-5 text-center border border-white/20 hover-lift">
              <AnimatedStat value="4.9★" label="Average Rating" delay={1000} />
            </div>
          </div>

          {/* All States Ticker */}
          <div className="mt-12 glass-subtle rounded-2xl px-6 py-4 border border-white/15 animate-fade-in" style={{ animationDelay: "0.8s", opacity: 0 }}>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3 text-center">Servicing All States &amp; Territories</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map((state, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-sm font-medium border border-white/10 hover:bg-white/20 hover:text-white transition-all cursor-default">
                  {state}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>
  );
}
