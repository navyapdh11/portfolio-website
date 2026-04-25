import Link from "next/link";

export default function PricingPage() {
  const services = [
    { name: "Domestic Cleaning", slug: "domestic-cleaning", base: 50, model: "per hour" },
    { name: "End of Lease Cleaning", slug: "end-of-lease-cleaning", base: 450, model: "per property" },
    { name: "Commercial Cleaning", slug: "commercial-cleaning", base: 45, model: "per hour" },
    { name: "Office Cleaning", slug: "office-cleaning", base: 55, model: "per hour" },
    { name: "Industrial Cleaning", slug: "industrial-cleaning", base: 65, model: "per hour" },
    { name: "Builders Cleaning", slug: "builders-cleaning", base: 55, model: "per hour" },
    { name: "Retail Cleaning", slug: "retail-cleaning", base: 50, model: "per hour" },
    { name: "Strata Cleaning", slug: "strata-cleaning", base: 60, model: "per hour" },
    { name: "Carpet Cleaning", slug: "carpet-cleaning", base: 30, model: "per room" },
    { name: "Window Cleaning", slug: "window-cleaning", base: 40, model: "per pane" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Professional Pricing Architecture</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">${service.base}<span className="text-sm font-normal text-slate-500"> {service.model}</span></p>
              <Link href={`/services/${service.slug || service.name.toLowerCase().replace(/ /g, '-')}`} className="block w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-center font-medium">
                View Service & Book
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-600 font-bold hover:underline">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}