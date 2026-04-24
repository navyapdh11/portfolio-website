"use client";

import { useState } from "react";
import { serviceDetails } from "@/lib/constants/serviceDetails";

interface BookingProps {
  serviceSlug?: string;
}

export default function Booking({ serviceSlug = "domestic-cleaning" }: BookingProps) {
  const details = serviceDetails[serviceSlug] || serviceDetails["domestic-cleaning"];
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  const toggleAddon = (value: string) => {
    setSelectedAddons(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  return (
    <section id="booking" className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold mb-4 capitalize">{serviceSlug.replace(/-/g, ' ')} Booking</h2>
      <p className="text-zinc-600 mb-6">{details.description}</p>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Service Inclusions:</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-zinc-600">
          {details.included.map((item, i) => <li key={i}>✓ {item}</li>)}
        </ul>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold mb-3">Custom Add-ons:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {details.addons.map((addon) => (
            <button 
              key={addon.value}
              onClick={() => toggleAddon(addon.value)}
              className={`p-3 rounded-lg border text-left text-sm ${selectedAddons.includes(addon.value) ? 'border-blue-500 bg-blue-50' : 'border-zinc-200'}`}
            >
              {addon.label} (+$ {addon.price})
            </button>
          ))}
        </div>
      </div>
      {/* ... booking form fields ... */}
    </section>
  );
}
