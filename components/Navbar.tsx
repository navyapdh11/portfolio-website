"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const serviceLinks = [
  { href: "/services/domestic-cleaning/nsw/sydney", label: "House Cleaning" },
  { href: "/services/end-of-lease-cleaning/nsw/sydney", label: "End of Lease" },
  { href: "/services/commercial-cleaning/nsw/sydney", label: "Commercial" },
  { href: "/services/office-cleaning/nsw/sydney", label: "Office" },
  { href: "/services/industrial-cleaning/nsw/sydney", label: "Industrial" },
  { href: "/services/builders-cleaning/nsw/sydney", label: "Builders" },
  { href: "/services/retail-cleaning/nsw/sydney", label: "Retail" },
  { href: "/services/strata-cleaning/nsw/sydney", label: "Strata" },
  { href: "/services/carpet-cleaning/nsw/sydney", label: "Carpet" },
  { href: "/services/window-cleaning/nsw/sydney", label: "Window" },
  { href: "/services/deep-cleaning/nsw/sydney", label: "Deep" },
  { href: "/services/move-in-out-cleaning/nsw/sydney", label: "Move In/Out" },
  { href: "/services/oven-cleaning/nsw/sydney", label: "Oven" },
  { href: "/services/upholstery-cleaning/nsw/sydney", label: "Upholstery" },
  { href: "/services/tile-grout-cleaning/nsw/sydney", label: "Tile & Grout" },
  { href: "/services/pressure-washing/nsw/sydney", label: "Pressure Washing" },
  { href: "/services/disinfection-sanitization/nsw/sydney", label: "Disinfection" },
  { href: "/services/laundry-services/nsw/sydney", label: "Laundry" },
  { href: "/services/school-educational-cleaning/nsw/sydney", label: "School" },
  { href: "/services/medical-healthcare-cleaning/nsw/sydney", label: "Medical" },
];

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/events", label: "Events" },
  { href: "#contact", label: "Contact" },
];

const dropdownLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/analytics", label: "Analytics" },
  { href: "/ads", label: "Ads Manager" },
  { href: "/earn", label: "Earnings" },
  { href: "/flashcards", label: "Strategy Cards" },
  { href: "/microtasks", label: "Microtasks" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="#home" className="text-xl font-bold text-slate-900 dark:text-white">
            AA<span className="text-sky-600">STACLEAN</span>
          </Link>

          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-8">
            <Link href="/contact" className="px-5 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium transition-colors border border-sky-500/20">
              💬 Get a Free Quote
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setServicesOpen(!servicesOpen); setMoreOpen(false); }}
                className="flex items-center text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors text-sm font-medium"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <svg className={`w-4 h-4 ml-1 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 z-50 max-h-96 overflow-y-auto">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-slate-300"
                      onClick={() => setServicesOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setMoreOpen(!moreOpen); setServicesOpen(false); }}
                className="flex items-center text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors"
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                More
                <svg className={`w-4 h-4 ml-1 transition-transform ${moreOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {moreOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 z-50">
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-slate-300"
                      onClick={() => setMoreOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/dashboard"
              className="text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors font-medium text-sm"
            >
              Dashboard
            </Link>
            <a
              href="#booking"
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-semibold text-sm"
            >
              Get Quote
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6 text-slate-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2 mt-2">
                <p className="px-2 text-xs text-zinc-500 mb-2">More</p>
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors block px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/dashboard"
                className="text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <a
                href="#booking"
                className="mx-2 mt-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-center font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Quote
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
