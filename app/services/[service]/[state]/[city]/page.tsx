import { notFound } from "next/navigation";
import { PriceCalculator } from "@/components/calculators/PriceCalculator";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { FAQSection } from "@/components/content/FAQSection";
import { ComplianceFooter } from "@/components/compliance/ComplianceFooter";
import { cleaningServices } from "@/db/schema/services";

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
              {service.description} Servicing {city} with local expertise and professional care.
            </p>
            <PriceCalculator service={service} state={state} city={city} />
          </section>
          <section>
            <BookingFlow serviceId={service.slug} state={state} city={city} />
          </section>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const services = Object.keys(cleaningServices);
  return services.map(service => ({ service }));
}
