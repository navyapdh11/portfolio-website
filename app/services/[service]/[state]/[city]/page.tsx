import { notFound } from "next/navigation";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import Booking from "@/components/Booking";
import { cleaningServices, australianCities } from "@/lib/constants/services";
import { ClientCaseStudies } from "@/components/ClientCaseStudies";
import { serviceDetails } from "@/lib/constants/serviceDetails";

export default async function ServiceGeoPage({ 
  params 
}: { 
  params: Promise<{ service: string, state: string, city: string }> 
}) {
  const { service: serviceSlug, state, city } = await params;
  const service = cleaningServices.find(s => s.slug === serviceSlug);
  const details = serviceDetails[serviceSlug];

  if (!service) notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">
          {service.name} in {city.toUpperCase()}, {state.toUpperCase()}
        </h1>
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <section className="space-y-6">
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {details?.description || `${service.name} services in ${city} with local expertise.`}
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <h3 className="text-lg font-bold mb-2 text-blue-900 dark:text-blue-100">Why AASTACLEAN?</h3>
                <p>We combine AI-driven booking precision with local experts. Our platform outranks local competitors in price transparency and bond-back reliability.</p>
            </div>
            <QuoteCalculator />
          </section>
          <section id="booking">
            <Booking serviceSlug={serviceSlug} state={state} city={city} />
          </section>
        </div>
        <ClientCaseStudies />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const params = [];
  for (const service of cleaningServices) {
    for (const city of australianCities) {
      params.push({
        service: service.slug,
        state: city.state,
        city: city.slug
      });
    }
  }
  return params;
}