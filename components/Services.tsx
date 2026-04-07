export default function Services() {
  const services = [
    {
      icon: "🏠",
      title: "House Cleaning",
      description: "Regular maintenance cleaning for homes of all sizes. Includes dusting, vacuuming, mopping, and sanitizing.",
      features: ["Weekly/Bi-weekly", "Eco-friendly products", "Trusted cleaners"],
      price: "From $120",
    },
    {
      icon: "🔑",
      title: "End of Lease Cleaning",
      description: "Bond-back guaranteed cleaning for rental properties. Meet all real estate agency requirements.",
      features: ["Bond guarantee", "48hr turnaround", "Full deep clean"],
      price: "From $250",
    },
    {
      icon: "🏢",
      title: "Commercial Cleaning",
      description: "Professional office and commercial space cleaning. Flexible scheduling to minimize disruption.",
      features: ["After-hours available", "Customized plans", "Insured staff"],
      price: "From $180",
    },
    {
      icon: "🧹",
      title: "Carpet Cleaning",
      description: "Deep steam cleaning and stain removal for carpets and rugs. Extends carpet life and improves air quality.",
      features: ["Steam cleaning", "Stain removal", "Quick drying"],
      price: "From $90",
    },
    {
      icon: "🪟",
      title: "Window Cleaning",
      description: "Interior and exterior window cleaning for crystal-clear views. Safe equipment for high-rise buildings.",
      features: ["Inside & out", "High-rise capable", "Streak-free"],
      price: "From $80",
    },
    {
      icon: "✨",
      title: "Deep Cleaning",
      description: "Intensive top-to-bottom cleaning for homes that need extra attention. Perfect for spring cleaning or special occasions.",
      features: ["Top-to-bottom", "Behind appliances", "Sanitization"],
      price: "From $300",
    },
  ];

  return (
    <section id="services" className="py-20 bg-zinc-50 dark:bg-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Our <span className="text-blue-500">Services</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
            Professional cleaning services tailored to your needs across Australia
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">{service.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="flex justify-between items-center pt-4 border-t border-zinc-200 dark:border-zinc-700">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{service.price}</span>
                <a
                  href="#booking"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
