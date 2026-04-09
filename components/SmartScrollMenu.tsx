'use client';

import { useState, useEffect } from 'react';
import { MapPin, Zap, Phone, Star, Sparkles } from 'lucide-react';

const menuItems = [
  { href: '#services', label: 'Services', icon: Zap },
  { href: '#coverage', label: 'Coverage', icon: MapPin },
  { href: '#pricing', label: 'Pricing', icon: null },
  { href: '#reviews', label: 'Reviews', icon: Star },
  { href: '#booking', label: 'Book Now', icon: Phone, primary: true },
];

export function SmartScrollMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show on scroll down past hero, hide on scroll up
      if (currentScrollY > 500 && currentScrollY > lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setScrolled(currentScrollY > 100);
      lastScrollY = currentScrollY;

      // Track active section for highlighting
      const sections = menuItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.substring(1);
    document.getElementById(id)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      } ${scrolled && isVisible ? 'bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-zinc-700/50' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-zinc-900 dark:text-white">CleanAgent</span>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-1">Australia&apos;s #1 Cleaning</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`h-10 px-4 rounded-xl transition-all duration-300 font-medium flex items-center gap-2 ${
                  item.primary
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-xl'
                    : activeSection === item.href.substring(1)
                    ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Phone className="h-4 w-4" />
              <span className="font-semibold">1300 CLEAN</span>
            </div>
            <button 
              onClick={() => scrollToSection('#booking')}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-11 px-6 rounded-xl font-semibold flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
