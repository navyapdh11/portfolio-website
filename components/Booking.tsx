"use client";

import { useState } from "react";
import { serviceDetails } from "@/lib/constants/serviceDetails";
import { BookingAddons } from "./booking/BookingAddons";
import PaymentStep from "./booking/PaymentStep";

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
    date: "",
    time: "",
  });

  const toggleAddon = (value: string) => {
    setSelectedAddons(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  return (
    <section id="booking" className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold capitalize">{serviceSlug.replace(/-/g, ' ')}</h2>
            <span className="text-sm text-blue-600 font-bold">Step {step} / 4</span>
        </div>
        <p className="text-zinc-600 text-sm">{details.description}</p>
      </div>
      
      {step === 1 && (
        <div className="space-y-8">
          <div>
            <h4 className="font-semibold mb-3">Service Inclusions:</h4>
            <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-600">
              {details.included.map((item, i) => <li key={i}>✓ {item}</li>)}
            </ul>
          </div>
          
          <BookingAddons serviceSlug={serviceSlug} selectedAddons={selectedAddons} toggleAddon={toggleAddon} />

          <button onClick={() => setStep(2)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
            Continue to Schedule
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Schedule Your Service</h3>
          <input type="date" className="w-full p-3 border rounded-lg" onChange={(e) => setFormData({...formData, date: e.target.value})} />
          <input type="text" placeholder="Preferred Time" className="w-full p-3 border rounded-lg" onChange={(e) => setFormData({...formData, time: e.target.value})} />
          <button onClick={() => setStep(3)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
            Continue to Contact
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Contact Information</h3>
          <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <button onClick={() => setStep(4)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
            Continue to Payment
          </button>
        </div>
      )}

      {step === 4 && (
        <PaymentStep serviceSlug={serviceSlug} />
      )}
    </section>
  );
}