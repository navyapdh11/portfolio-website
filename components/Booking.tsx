"use client";

import { useState } from "react";

interface BookingProps {
  serviceSlug?: string;
}

export default function Booking({ serviceSlug }: BookingProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    suburb: "",
    state: "",
    service: serviceSlug || "",
    date: "",
    frequency: "one-time",
    message: "",
    // Service-specific addons
    ovenCleaning: false,
    carpetSteam: false,
    windowCleaning: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus("success");
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Book Your <span className="text-blue-500 capitalize">{serviceSlug?.replace(/-/g, ' ')}</span>
          </h2>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl">
          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
              ✓ Booking request sent! We will contact you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Common fields ... */}
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="w-full px-4 py-3 border rounded-lg" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
            </div>

            {/* Service-Specific Fields */}
            {serviceSlug === 'end-of-lease-cleaning' && (
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200">
                <label className="flex items-center gap-3">
                  <input type="checkbox" name="carpetSteam" checked={formData.carpetSteam} onChange={handleChange} />
                  Include Carpet Steam Cleaning (Recommended for bond back)
                </label>
              </div>
            )}
            
            {serviceSlug === 'domestic-cleaning' && (
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="ovenCleaning" checked={formData.ovenCleaning} onChange={handleChange} /> Oven
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="windowCleaning" checked={formData.windowCleaning} onChange={handleChange} /> Windows
                </label>
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg">
              {isSubmitting ? "Booking..." : "Submit Booking"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
