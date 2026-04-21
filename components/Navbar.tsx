"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/microtasks", label: "Earn" },
  { href: "/flashcards", label: "Strategy" },
  { href: "#contact", label: "Contact" },
];

const dropdownLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/ads", label: "Ads Manager" },
  { href: "/analytics", label: "Analytics" },
  { href: "/flashcards", label: "Flashcards" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="text-xl font-bold text-slate-900 dark:text-white">
            AA<span className="text-sky-500">STACLEAN</span>
          </a>

          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Ask AI Librarian..." 
                className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-full px-4 py-1.5 text-xs focus:ring-2 focus:ring-sky-500 text-zinc-900 dark:text-white pl-10"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">🔍</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400 transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400 transition-colors"
              >
                More
                <svg className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 z-50">
                  {dropdownLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-slate-300"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a
              href="/dashboard"
              className="text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400 transition-colors font-medium text-sm"
            >
              Dashboard
            </a>
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
          >
            <svg
              className="w-6 h-6 text-slate-900 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400 transition-colors px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2 mt-2">
                <p className="px-2 text-xs text-zinc-500 mb-2">More</p>
                {dropdownLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400 transition-colors block px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href="/dashboard"
                className="text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400 transition-colors font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </a>
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
