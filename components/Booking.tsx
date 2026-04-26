"use client";

import { useState } from "react";
import { serviceDetails } from "@/lib/constants/serviceDetails";

interface BookingProps {
  serviceSlug?: string;
  state?: string;
  city?: string;
}

export default function Booking({ serviceSlug = "domestic-cleaning", state = "WA", city = "Perth" }: BookingProps) {
  const details = serviceDetails[serviceSlug as keyof typeof serviceDetails] || serviceDetails["domestic-cleaning"];
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    suburb: city,
    state: state,
    date: "",
    time: "",
  });

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
        <div className="space-y-6">
            <h4 className="font-semibold text-lg">Inclusions:</h4>
            <ul className="text-sm text-zinc-600">
                {details.included.map((inc, i) => <li key={i}>✓ {inc}</li>)}
            </ul>
            <button onClick={() => setStep(2)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
                Continue to Schedule
            </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
            <h3 className="font-bold text-lg">Schedule Your Service</h3>
            <input type="date" className="w-full p-3 border rounded-lg" onChange={(e) => setFormData({...formData, date: e.target.value})} />
            <button onClick={() => setStep(3)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold">
                Continue to Contact
            </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
            <h3 className="font-bold text-lg">Contact Information</h3>
            <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <button onClick={() => setStep(4)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold">
                Continue to Payment
            </button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
            <h3 className="font-bold text-lg">Payment Details</h3>
            <div className="p-4 bg-zinc-100 rounded-lg text-center">Stripe Integration Ready</div>
            <button className="w-full py-4 bg-green-600 text-white rounded-xl font-bold">Pay Now</button>
        </div>
      )}
    </section>
  );
}