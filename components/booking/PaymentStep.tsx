"use client";

import { useState } from "react";

export default function PaymentStep({ formData, addons }: { formData: any, addons: string[] }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, addons }),
    });
    
    if (res.ok) {
        alert("Booking confirmed successfully!");
    } else {
        alert("Payment failed, please try again.");
    }
    setIsProcessing(false);
  };

  return (
    <section id="payment" className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Secure Payment</h2>
        <p className="text-zinc-600 text-sm">Complete your booking with our encrypted checkout.</p>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200">
          <label className="block text-sm font-semibold mb-2">Cardholder Name</label>
          <input type="text" className="w-full p-3 border rounded-lg" placeholder="Jane Doe" />
        </div>

        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200">
          <label className="block text-sm font-semibold mb-2">Card Number</label>
          <input type="text" className="w-full p-3 border rounded-lg" placeholder="0000 0000 0000 0000" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="MM/YY" className="p-3 border rounded-lg" />
          <input type="text" placeholder="CVC" className="p-3 border rounded-lg" />
        </div>

        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 text-sm">
          <strong>ACL Compliant Service:</strong> Your booking is protected under Australian Consumer Law. 100% Bond Back Guarantee included.
        </div>

        <button onClick={handlePayment} disabled={isProcessing} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </section>
  );
}