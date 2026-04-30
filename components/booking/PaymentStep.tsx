"use client";

import { useState } from "react";

interface PaymentStepProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
  };
  addons: string[];
  onConfirm: () => void;
}

export default function PaymentStep({ formData, addons, onConfirm }: PaymentStepProps) {
  const [paymentMethod, setPaymentMethod] = useState<"pay-on-service" | "invoice">("pay-on-service");

  return (
    <section id="payment" className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800" aria-label="Payment options">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Payment Options</h2>
        <p className="text-zinc-600 text-sm">Choose how you&apos;d like to pay. No upfront payment required.</p>
      </div>

      <div className="space-y-4">
        {/* Payment Method Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setPaymentMethod("pay-on-service")}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              paymentMethod === "pay-on-service"
                ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
            }`}
            aria-pressed={paymentMethod === "pay-on-service"}
          >
            <div className="text-2xl mb-2">💳</div>
            <h3 className="font-semibold">Pay on Service</h3>
            <p className="text-sm text-zinc-500">Pay after the job is done. Cash, card, or transfer.</p>
          </button>
          <button
            onClick={() => setPaymentMethod("invoice")}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              paymentMethod === "invoice"
                ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
            }`}
            aria-pressed={paymentMethod === "invoice"}
          >
            <div className="text-2xl mb-2">📄</div>
            <h3 className="font-semibold">Invoice</h3>
            <p className="text-sm text-zinc-500">Receive an invoice via email. Pay within 7 days.</p>
          </button>
        </div>

        {/* Security Notice */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-sm" role="alert">
          <strong>🔒 Secure Booking:</strong> Your information is encrypted. No upfront payment required. Pay only after the service is completed to your satisfaction.
        </div>

        {/* ACL Compliant Notice */}
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 text-sm" role="status">
          <strong>ACL Compliant Service:</strong> Your booking is protected under Australian Consumer Law. 100% Bond Back Guarantee included.
        </div>

        <button
          onClick={onConfirm}
          className="w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Confirm booking without upfront payment"
        >
          Confirm Booking — Pay {paymentMethod === "pay-on-service" ? "After Service" : "Via Invoice"}
        </button>
      </div>
    </section>
  );
}
