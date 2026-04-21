"use client";

import { useState } from "react";

interface Service {
  id: number;
  icon: string;
  image: string; // Dynamic image support
  title: string;
  description: string;
  features: string[];
  price: string;
}

export default function Services() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      icon: "🏠",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=300",
      title: "House Cleaning",
      description: "Regular maintenance cleaning for homes of all sizes. Includes dusting, vacuuming, mopping, and sanitizing.",
      features: ["Weekly/Bi-weekly", "Eco-friendly products", "Trusted cleaners"],
      price: "From $120",
    },
    {
      id: 2,
      icon: "🔑",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=300",
      title: "End of Lease Cleaning",
      description: "Bond-back guaranteed cleaning for rental properties. Meet all real estate agency requirements.",
      features: ["Bond guarantee", "48hr turnaround", "Full deep clean"],
      price: "From $250",
    },
    {
      id: 3,
      icon: "🏢",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=300",
      title: "Commercial Cleaning",
      description: "Professional office and commercial space cleaning. Flexible scheduling to minimize disruption.",
      features: ["After-hours available", "Customized plans", "Insured staff"],
      price: "From $180",
    },
    {
      id: 4,
      icon: "🧹",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=300",
      title: "Carpet Cleaning",
      description: "Deep steam cleaning and stain removal for carpets and rugs. Extends carpet life and improves air quality.",
      features: ["Steam cleaning", "Stain removal", "Quick drying"],
      price: "From $90",
    },
    {
      id: 5,
      icon: "🪟",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a472a14?q=80&w=300",
      title: "Window Cleaning",
      description: "Interior and exterior window cleaning for crystal-clear views. Safe equipment for high-rise buildings.",
      features: ["Inside & out", "High-rise capable", "Streak-free"],
      price: "From $80",
    },
    {
      id: 6,
      icon: "✨",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=300",
      title: "Deep Cleaning",
      description: "Intensive top-to-bottom cleaning for homes that need extra attention. Perfect for spring cleaning or special occasions.",
      features: ["Top-to-bottom", "Behind appliances", "Sanitization"],
      price: "From $300",
    },
  ]);

  const updateServiceImage = (id: number, newUrl: string) => {
    setServices(services.map(s => s.id === id ? { ...s, image: newUrl } : s));
  };

  return (
    <section id="services" className="py-20 bg-zinc-50 dark:bg-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Our <span className="text-blue-500">Services</span>
          </h2>
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className="mt-4 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg text-xs hover:bg-zinc-300 transition-colors"
          >
            {isAdmin ? "Exit Admin Mode" : "Enable Admin Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all group"
            >
              {isAdmin ? (
                <div className="mb-4">
                  <input 
                    type="text" 
                    value={service.image} 
                    onChange={(e) => updateServiceImage(service.id, e.target.value)}
                    className="w-full p-2 bg-zinc-100 rounded text-xs"
                    placeholder="Enter Image URL"
                  />
                </div>
              ) : (
                <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-xl mb-4" />
              )}
              
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <span className="text-green-500">✓</span> {feature}
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-between items-center pt-4 border-t border-zinc-200 dark:border-zinc-700">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{service.price}</span>
                <a href="#booking" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">Book Now</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
