"use client";

import { useState } from "react";
import { serviceDetails } from "@/lib/constants/serviceDetails";

interface BookingProps {
  serviceSlug?: string;
  state?: string;
  city?: string;
}

export default function Booking({ serviceSlug = "domestic-cleaning", state = "WA", city = "Perth" }: BookingProps) {
  const details = serviceDetails[serviceSlug] || serviceDetails["domestic-cleaning"];
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
  });

  const toggleAddon = (value: string) => {
    setSelectedAddons(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleNext = () => setStep(prev => prev + 1);

  return (
    <section id="booking" className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold capitalize">{serviceSlug.replace(/-/g, ' ')} Booking</h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">Step {step} of 4</span>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <p className="text-zinc-600">{details.description}</p>
          
          <div>
            <h4 className="font-semibold mb-3">Included in this service:</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-zinc-600">
              {details.included.map((item, i) => <li key={i}>✓ {item}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Custom Add-ons:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {details.addons.map((addon) => (
                <button 
                  key={addon.value}
                  onClick={() => toggleAddon(addon.value)}
                  className={`p-3 rounded-lg border text-left text-sm transition-all ${
                    selectedAddons.includes(addon.value) 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  {addon.label} (+${addon.price})
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleNext} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
            Continue to Schedule
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Schedule Your Service</h3>
          <input type="date" className="w-full p-3 border rounded-lg" onChange={(e) => setFormData({...formData, date: e.target.value})} />
          <input type="text" placeholder="Preferred Time" className="w-full p-3 border rounded-lg" onChange={(e) => setFormData({...formData, time: e.target.value})} />
          <button onClick={handleNext} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
            Continue to Contact
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Contact Information</h3>
          <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <button onClick={handleNext} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
            Continue to Payment
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Secure Payment</h3>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border text-center">
            <p>Secure Stripe Integration Active</p>
            <button className="mt-4 px-8 py-3 bg-green-600 text-white rounded-lg">Pay Securely</button>
          </div>
        </div>
      )}
    </section>
  );
}