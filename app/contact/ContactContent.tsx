"use client";

import { useState } from "react";

const businessHours = [
  { day: "Monday", hours: "8:00 AM - 6:00 PM", available: true },
  { day: "Tuesday", hours: "8:00 AM - 6:00 PM", available: true },
  { day: "Wednesday", hours: "8:00 AM - 6:00 PM", available: true },
  { day: "Thursday", hours: "8:00 AM - 6:00 PM", available: true },
  { day: "Friday", hours: "8:00 AM - 6:00 PM", available: true },
  { day: "Saturday", hours: "9:00 AM - 4:00 PM", available: true },
  { day: "Sunday", hours: "By appointment", available: false },
];

const quickContacts = [
  { type: "Phone (Business)", value: "08 9000 0000", href: "tel:0890000000", icon: "📞" },
  { type: "Mobile", value: "0405 866 459", href: "tel:0405866459", icon: "📱" },
  { type: "Email", value: "aastaclean@gmail.com", href: "mailto:aastaclean@gmail.com", icon: "✉️" },
  { type: "Address", value: "51 Tate Street, West Leederville 6007", href: "https://www.google.com/maps/dir//51+Tate+Street,+West+Leederville+WA+6007", icon: "📍" },
];

const faqItems = [
  {
    question: "How quickly can you respond to my inquiry?",
    answer: "We typically respond within 2 hours during business hours. For urgent cleaning needs, call our mobile directly.",
  },
  {
    question: "Do you offer free quotes?",
    answer: "Yes! We provide free, no-obligation quotes for all our cleaning services. Use the form above or call us directly.",
  },
  {
    question: "What areas do you service?",
    answer: "We service the entire Perth metropolitan area including West Leederville, Subiaco, Nedlands, Claremont, and surrounding suburbs.",
  },
  {
    question: "What forms of payment do you accept?",
    answer: "We accept cash, bank transfer, and major credit cards. Invoice payments can be made via bank transfer.",
  },
];

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <>
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Get in touch with AASTACLEAN for professional cleaning services across Perth WA. 
            We&apos;re here to help with any questions or to book a service.
          </p>
        </div>
      </section>

      <section className="py-16 bg-zinc-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                  Get In Touch
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                  Whether you need a quote, have questions about our services, or want to book a cleaning, 
                  we&apos;re here to help. Reach out through any of the methods below or fill out the form.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickContacts.map((contact) => (
                  <a
                    key={contact.type}
                    href={contact.href}
                    target={contact.type === "Address" ? "_blank" : undefined}
                    rel={contact.type === "Address" ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{contact.icon}</span>
                    </div>
                    <div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">{contact.type}</div>
                      <div className="text-zinc-900 dark:text-white font-medium text-sm">
                        {contact.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                  Business Hours
                </h3>
                <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow">
                  <div className="space-y-3">
                    {businessHours.map((day) => (
                      <div key={day.day} className="flex justify-between items-center">
                        <span className="text-zinc-700 dark:text-zinc-300">{day.day}</span>
                        <span className={`font-medium ${day.available ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>
                          {day.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/aastaclean"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-zinc-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors shadow"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/aastaclean"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-zinc-900 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors shadow"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.google.com/search?q=AASTACLEAN+Perth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-zinc-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors shadow"
                    aria-label="Google"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                Send Us a Message
              </h2>
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
                  ✓ Message sent successfully! We&apos;ll get back to you within 2 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Your name"
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
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="0405 866 459"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Service Required *
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
                    <option value="house">House Cleaning</option>
                    <option value="end-of-lease">End of Lease Cleaning</option>
                    <option value="commercial">Commercial Cleaning</option>
                    <option value="carpet">Carpet Cleaning</option>
                    <option value="window">Window Cleaning</option>
                    <option value="deep">Deep Cleaning</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your cleaning requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              Find Us
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Visit us at our office or get directions
            </p>
          </div>
          
          <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-100 dark:border-blue-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.5!2d115.83!3d-31.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU2JzI3LjAiUyAxMTXCsDU5JzE3LjAiRQ!5e0!3m2!1sen!2sau!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AASTACLEAN Location - 51 Tate Street West Leederville"
            />
          </div>
          
          <div className="mt-8 text-center">
            <a
              href="https://www.google.com/maps/dir//51+Tate+Street,+West+Leederville+WA+6007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-50 dark:bg-zinc-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 rounded-lg shadow">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                >
                  <span className="font-medium text-zinc-900 dark:text-white">{item.question}</span>
                  <span className="text-2xl text-blue-500">{activeFaq === index ? '−' : '+'}</span>
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4 text-zinc-600 dark:text-zinc-400">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact AASTACLEAN",
            "description": "Contact AASTACLEAN for professional cleaning services in Perth WA",
            "url": "https://aastaclean.com.au/contact",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "AASTACLEAN",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "51 Tate Street",
                "addressLocality": "West Leederville",
                "addressRegion": "WA",
                "postalCode": "6007",
                "addressCountry": "AU"
              },
              "telephone": "+61890000000",
              "email": "aastaclean@gmail.com",
              "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-16:00",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-31.9505",
                "longitude": "115.8605"
              }
            }
          })
        }}
      />
    </>
  );
}
