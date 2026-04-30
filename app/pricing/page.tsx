import Link from "next/link";
import { cleaningServices } from "@/lib/constants/services";
import { serviceDetails } from "@/lib/constants/serviceDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparent Pricing — 20+ Cleaning Services | AASTACLEAN",
  description: "Upfront, competitive pricing for all cleaning services across Australia. No hidden fees. Bond-back guarantee included. Get an instant quote online.",
  alternates: { canonical: "https://www.aastaclean.com.au/pricing" },
  openGraph: {
    title: "Transparent Cleaning Prices — Nationwide | AASTACLEAN",
    description: "Upfront pricing for 20+ specialist cleaning services. No hidden fees. Book online in 2 minutes.",
    type: "website",
    locale: "en_AU",
    siteName: "AASTACLEAN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transparent Cleaning Prices — Nationwide | AASTACLEAN",
    description: "Upfront pricing for 20+ specialist cleaning services. No hidden fees. Book online in 2 minutes.",
  },
};

// Build pricing from service definitions
const pricingConfig: {
  slug: string;
  base: number;
  model: string;
  unit: string;
  freq: string;
  popular: boolean;
}[] = [
  { slug: "domestic-cleaning", base: 120, model: "per visit", unit: "2-bed standard", freq: "Save 15% fortnightly", popular: false },
  { slug: "end-of-lease-cleaning", base: 350, model: "per property", unit: "2-bed apartment", freq: "72hr bond-back guarantee", popular: true },
  { slug: "commercial-cleaning", base: 45, model: "per hour", unit: "min 3hrs", freq: "Save 20% on contracts", popular: false },
  { slug: "office-cleaning", base: 55, model: "per hour", unit: "min 2hrs", freq: "After-hours included", popular: false },
  { slug: "industrial-cleaning", base: 65, model: "per hour", unit: "min 4hrs", freq: "WHS certified teams", popular: false },
  { slug: "builders-cleaning", base: 55, model: "per hour", unit: "min 3hrs", freq: "Debris removal included", popular: false },
  { slug: "retail-cleaning", base: 50, model: "per hour", unit: "min 2hrs", freq: "Customer-safe hours", popular: false },
  { slug: "strata-cleaning", base: 60, model: "per hour", unit: "min 2hrs", freq: "Body-corporate compliant", popular: false },
  { slug: "carpet-cleaning", base: 35, model: "per room", unit: "hot water extraction", freq: "Scotchgard from $25", popular: false },
  { slug: "window-cleaning", base: 8, model: "per window", unit: "inside + outside", freq: "High-rise available", popular: false },
  { slug: "deep-cleaning", base: 250, model: "per visit", unit: "2-bed standard", freq: "Top-to-bottom clean", popular: false },
  { slug: "move-in-out-cleaning", base: 300, model: "per property", unit: "2-bed apartment", freq: "Landlord-approved", popular: false },
  { slug: "oven-cleaning", base: 75, model: "per oven", unit: "standard single", freq: "Food-safe products", popular: false },
  { slug: "upholstery-cleaning", base: 45, model: "per piece", unit: "standard sofa", freq: "Fabric-safe methods", popular: false },
  { slug: "tile-grout-cleaning", base: 6, model: "per sqm", unit: "clean + seal", freq: "Colour restoration", popular: false },
  { slug: "pressure-washing", base: 4, model: "per sqm", unit: "driveway/path", freq: "Eco-safe detergents", popular: false },
  { slug: "disinfection-sanitization", base: 3, model: "per sqm", unit: "hospital-grade", freq: "CDC-compliant", popular: false },
  { slug: "laundry-services", base: 30, model: "per load", unit: "wash + fold + deliver", freq: "Pickup & delivery", popular: false },
  { slug: "school-educational-cleaning", base: 55, model: "per hour", unit: "min 3hrs", freq: "Child-safe products", popular: false },
  { slug: "medical-healthcare-cleaning", base: 70, model: "per hour", unit: "min 3hrs", freq: "TGA-compliant", popular: false },
];

// Merge service names with pricing config
const pricingData = pricingConfig.map((p) => {
  const svc = cleaningServices.find((s) => s.slug === p.slug);
  return { ...p, name: svc?.name || p.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) };
});

// Trust stats
const trustStats = [
  { value: "50,000+", label: "Cleans Completed" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "8,000+", label: "Suburbs Covered" },
  { value: "$20M", label: "Public Liability" },
];

// CRO: urgency / social proof items
const croItems = [
  { icon: "🔥", text: "Book within 24 hours and receive a free interior window clean" },
  { icon: "🛡️", text: "72-hour bond-back guarantee on all end of lease cleans" },
  { icon: "💳", text: "No upfront payment — pay after your clean is completed" },
  { icon: "📅", text: "Save 15% on recurring bookings — cancel anytime" },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-24 pb-16 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)" }} />
      <div className="absolute bottom-20 -right-40 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-8 animate-fade-in">
          <Link href="/" className="hover:text-sky-500 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 dark:text-slate-300">Pricing</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 glass-strong rounded-full border border-white/20 text-sm font-semibold text-slate-700 dark:text-slate-200 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Transparent Pricing — No Hidden Fees
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6">
            Professional Cleaning
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-500" style={{ backgroundSize: "200% 200%", animation: "gradient-shift 6s ease infinite" }}>
              Prices That Make Sense
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-4">
            Upfront pricing across 20+ specialist services. Every price includes our bond-back guarantee, police-checked cleaners, and eco-friendly products.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Prices shown are starting rates. <span className="text-sky-500 font-medium">Final quote based on your property size &amp; scope.</span>
          </p>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {trustStats.map((stat, i) => (
            <div
              key={i}
              className="glass-strong rounded-2xl p-6 text-center border border-white/20 hover-lift animate-fade-in"
              style={{ animationDelay: `${0.05 * i}s`, opacity: 0 }}
            >
              <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CRO Banner */}
        <div className="glass p-6 rounded-3xl border border-white/20 mb-16 animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 text-center">Why Customers Choose AASTACLEAN</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {croItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <span className="text-sm text-slate-700 dark:text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Label */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">All Services &amp; Prices</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">20 services available</span>
        </div>

        {/* Services Grid — Bento-style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pricingData.map((svc, i) => {
            const details = serviceDetails[svc.slug as keyof typeof serviceDetails];
            const included = details?.included?.slice(0, 4) || [];
            return (
              <div
                key={svc.slug}
                className={`bento-card glass rounded-2xl border border-white/20 overflow-hidden flex flex-col hover-lift animate-fade-in ${svc.popular ? "ring-2 ring-sky-500 shadow-lg shadow-sky-500/20" : ""}`}
                style={{ animationDelay: `${0.04 * i}s`, opacity: 0 }}
              >
                {/* Popular Badge */}
                {svc.popular && (
                  <div className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-xs font-bold py-1.5 text-center tracking-wide uppercase">
                    Most Popular
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{svc.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    {details?.description?.slice(0, 100)}...
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-sky-500">${svc.base}</span>
                      <span className="text-sm text-slate-500">{svc.model}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Based on {svc.unit}</p>
                  </div>

                  {/* Included */}
                  <div className="mb-4 flex-1">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">What&apos;s Included</p>
                    <ul className="space-y-1.5">
                      {included.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {details?.included && details.included.length > 4 && (
                      <p className="text-xs text-slate-400 mt-2">+{details.included.length - 4} more inclusions</p>
                    )}
                  </div>

                  {/* Frequency Discount */}
                  <div className="px-3 py-2 rounded-lg bg-sky-50 dark:bg-sky-900/20 text-xs text-sky-700 dark:text-sky-300 font-medium mb-4">
                    {svc.freq}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/services/${svc.slug}/wa/perth#booking`}
                    className="group w-full py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-sky-500/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    Book {svc.name}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Quote CTA */}
        <div className="glass-strong rounded-3xl p-12 text-center border border-white/25 lightning-glow mb-16 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
            Need a Custom Quote?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8">
            Every property is unique. Tell us about your space and we&apos;ll provide a tailored quote within 24 hours — no obligation, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 transition-all hover:-translate-y-1"
            >
              Get Free Quote
            </Link>
            <a
              href="tel:1300000000"
              className="px-8 py-4 glass-strong rounded-2xl font-bold text-lg text-slate-700 dark:text-slate-200 hover:bg-white/90 transition-all hover:-translate-y-1 border border-white/30"
            >
              📞 1300 000 000
            </a>
          </div>
        </div>

        {/* Price Match Guarantee */}
        <div className="glass p-8 rounded-3xl border border-white/20 mb-16 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              ✓
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Best Price Guarantee</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Found a lower price for the same service? We&apos;ll beat it by 5%. Terms apply — contact us with the competing quote and we&apos;ll respond within 2 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/" className="text-slate-500 hover:text-sky-500 font-medium transition-colors inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
