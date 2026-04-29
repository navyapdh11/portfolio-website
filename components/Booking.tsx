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
<<<<<<< HEAD
    <section id="booking" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Book Your <span className="text-blue-500">Cleaning</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
            Get an instant quote and book your cleaning service in minutes
          </p>
        </div>

        {/* Booking Form */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl">
          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
              ✓ Booking request sent successfully! We&apos;ll contact you within 2 hours.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="04XX XXX XXX"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Service Type *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select a service</option>
                  <option value="house-cleaning">House Cleaning</option>
                  <option value="end-of-lease">End of Lease Cleaning</option>
                  <option value="commercial">Commercial Cleaning</option>
                  <option value="carpet-cleaning">Carpet Cleaning</option>
                  <option value="window-cleaning">Window Cleaning</option>
                  <option value="deep-cleaning">Deep Cleaning</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  State *
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select state</option>
                  <option value="NSW">NSW</option>
                  <option value="VIC">VIC</option>
                  <option value="QLD">QLD</option>
                  <option value="WA">WA</option>
                  <option value="SA">SA</option>
                  <option value="TAS">TAS</option>
                  <option value="ACT">ACT</option>
                  <option value="NT">NT</option>
                </select>
              </div>

              <div>
                <label htmlFor="suburb" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Suburb *
                </label>
                <input
                  type="text"
                  id="suburb"
                  name="suburb"
                  value={formData.suburb}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Bondi"
                />
              </div>
            </div>

            {/* Date & Frequency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Frequency
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="one-time">One-Time Service</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Additional Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us about your cleaning needs, special requirements, or areas of focus..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all hover:shadow-lg hover:shadow-blue-500/30 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Get Instant Quote & Book Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free cancellation
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Bond-back guarantee
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Insured & police-checked
              </div>
            </div>
          </form>
=======
    <section id="booking" className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold capitalize">{serviceSlug.replace(/-/g, ' ')}</h2>
            <span className="text-sm text-blue-600 font-bold">Step {step} / 4</span>
>>>>>>> origin/main
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