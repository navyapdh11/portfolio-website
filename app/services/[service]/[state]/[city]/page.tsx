import { notFound } from "next/navigation";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import Booking from "@/components/Booking";

const cleaningServices: any = {
  "domestic-cleaning": { name: "Domestic Cleaning", slug: "domestic-cleaning", basePrice: { min: 50, max: 65 }, description: "Standard home cleaning" },
  "end-of-lease-cleaning": { name: "End of Lease Cleaning", slug: "end-of-lease-cleaning", basePrice: { min: 450, max: 2000 }, description: "Bond-back cleaning" },
};

export default async function ServiceGeoPage({ 
  params 
}: { 
  params: Promise<{ service: string, state: string, city: string }> 
}) {
  const { service: serviceSlug, state, city } = await params;
  const service = cleaningServices[serviceSlug as keyof typeof cleaningServices];

  if (!service) notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">
          {service.name} in {city.toUpperCase()}, {state.toUpperCase()}
        </h1>
        <div className="grid lg:grid-cols-2 gap-12">
          <section className="space-y-6">
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {service.description} Servicing {city} with local expertise.
            </p>
            <QuoteCalculator />
          </section>
          <section>
            <Booking />
          </section>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const services = Object.keys(cleaningServices);
  return services.map(service => ({ service, state: "wa", city: "perth" }));
}