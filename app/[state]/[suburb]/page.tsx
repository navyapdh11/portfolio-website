import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { suburbsByState, type Suburb } from "@/lib/data/suburbs";
import { cleaningServices } from "@/lib/constants/services";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  const params: { state: string; suburb: string }[] = [];
  for (const [state, suburbs] of Object.entries(suburbsByState)) {
    for (const suburb of suburbs) {
      params.push({ state, suburb: suburb.slug });
    }
  }
  return params;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveSuburb(state: string, suburb: string): Suburb | undefined {
  const list = suburbsByState[state];
  if (!list) return undefined;
  return list.find((s) => s.slug === suburb);
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aastaclean.com.au";

function canonicalUrl(state: string, suburb: string) {
  return `${SITE_URL}/${state}/${suburb}`;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; suburb: string }>;
}): Promise<Metadata> {
  const { state, suburb } = await params;
  const data = resolveSuburb(state, suburb);
  if (!data) return {};

  const name = data.name;
  const stateAbbr = data.state.toUpperCase();
  const title = `Expert Cleaning Services in ${name}, ${stateAbbr} | AASTACLEAN`;
  const desc = `Professional, insured & eco-friendly cleaning in ${name} ${data.postcode}. End of lease, domestic, commercial & more. Free quotes available. Police-checked cleaners.`;
  const canonical = canonicalUrl(state, suburb);

  return {
    title,
    description: desc,
    keywords: `cleaning services ${name}, ${name} cleaners, end of lease cleaning ${name}, commercial cleaning ${name}, domestic cleaning ${data.postcode}, ${stateAbbr} cleaning`,
    alternates: { canonical },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      type: "website",
      locale: "en_AU",
      siteName: "AASTACLEAN",
    },
    twitter: { card: "summary_large_image", title, description: desc },
    other: {
      "geo.region": `AU-${stateAbbr}`,
      "geo.placename": `${name}, ${stateAbbr}`,
      "geo.position": `${data.postcode}`,
      "ICBM": `${data.postcode}`,
    },
  };
}

// ---------------------------------------------------------------------------
// FAQ data generator
// ---------------------------------------------------------------------------

function generateFAQs(suburb: Suburb) {
  const name = suburb.name;
  const abbr = suburb.state.toUpperCase();
  const postcode = suburb.postcode;
  return [
    {
      q: `What cleaning services do you offer in ${name}?`,
      a: `AASTACLEAN offers a full range of professional cleaning services in ${name} ${postcode}, including domestic cleaning, end of lease cleaning, commercial and office cleaning, carpet and window cleaning, builders cleaning, deep cleaning, and specialised services such as tile & grout cleaning, pressure washing, and disinfection. All services use eco-friendly products and are backed by insured, police-checked cleaners.`,
    },
    {
      q: `How much does end of lease cleaning cost in ${name}?`,
      a: `End of lease cleaning pricing in ${name} depends on property size and condition. We provide a free, no-obligation quote tailored to your rental. Our cleaners follow the original condition report and real estate checklists specific to ${abbr}, so you can get your full bond back with confidence.`,
    },
    {
      q: `Are your cleaners insured and police-checked?`,
      a: `Yes. Every AASTACLEAN team member holds current police checks and is fully insured with public liability coverage. We also comply with Australian Workplace Health & Safety (WHS) standards, so your property is in safe, qualified hands.`,
    },
    {
      q: `Do you bring your own equipment and cleaning products?`,
      a: `Absolutely. Our cleaners arrive fully equipped with professional-grade, eco-friendly products and equipment. If you prefer us to use your own supplies, just let us know when booking and we will accommodate.`,
    },
    {
      q: `How quickly can I book a cleaner in ${name}?`,
      a: `We offer same-day and next-day cleaning in ${name} subject to availability. For end of lease or builders cleans we recommend booking at least 48 hours in advance. Use our online booking form to lock in a time that suits you.`,
    },
  ];
}

// ---------------------------------------------------------------------------
// Nearby suburbs helper
// ---------------------------------------------------------------------------

function getNearbySuburbs(current: Suburb, limit = 8): Suburb[] {
  const sameState = suburbsByState[current.state] || [];
  const idx = sameState.findIndex((s) => s.slug === current.slug);
  if (idx === -1) return [];
  const nearby: Suburb[] = [];
  const spread = Math.ceil(limit / 2);
  for (let i = 1; i <= spread && nearby.length < limit; i++) {
    if (idx - i >= 0) nearby.push(sameState[idx - i]);
    if (idx + i < sameState.length && nearby.length < limit)
      nearby.push(sameState[idx + i]);
  }
  return nearby;
}

// ---------------------------------------------------------------------------
// Schema.org JSON-LD
// ---------------------------------------------------------------------------

function renderJsonLd(suburb: Suburb) {
  const name = suburb.name;
  const abbr = suburb.state.toUpperCase();
  const canonical = canonicalUrl(suburb.state, suburb.slug);
  const faqs = generateFAQs(suburb);
  const localBusinessId = `#localbusiness-${suburb.slug}`;
  const serviceList = cleaningServices.slice(0, 8).map((s) => ({
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    provider: { "@id": localBusinessId },
    areaServed: {
      "@type": "City",
      name: `${name}, ${abbr} ${suburb.postcode}`,
    },
  }));

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": localBusinessId,
        "@type": "LocalBusiness",
        name: "AASTACLEAN",
        description: `Professional cleaning services in ${name}, ${abbr}.`,
        url: canonical,
        telephone: "+61-400-000-000",
        areaServed: {
          "@type": "Place",
          name: `${name}, ${abbr} ${suburb.postcode}`,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: name,
          addressRegion: abbr,
          postalCode: suburb.postcode,
          addressCountry: "AU",
        },
        priceRange: "$$",
        openingHours: "Mo-Su 07:00-19:00",
      },
      ...serviceList,
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: abbr,
            item: `${SITE_URL}/${suburb.state}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SuburbPage({
  params,
}: {
  params: Promise<{ state: string; suburb: string }>;
}) {
  const { state, suburb } = await params;
  const data = resolveSuburb(state, suburb);
  if (!data) notFound();

  const name = data.name;
  const abbr = data.state.toUpperCase();
  const postcode = data.postcode;
  const faqs = generateFAQs(data);
  const nearby = getNearbySuburbs(data);
  const keyServices = cleaningServices.slice(0, 8);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-sky-400/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-48 h-[600px] w-[600px] rounded-full bg-indigo-400/15 blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-cyan-300/10 blur-3xl animate-pulse [animation-delay:4s]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Schema */}
        {renderJsonLd(data)}

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* ===== HERO ===== */}
        <section className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-sky-200/60 bg-sky-50/80 text-sky-700 dark:border-sky-700/50 dark:bg-sky-900/40 dark:text-sky-300 text-sm font-medium backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            Serving {name}, {abbr} {postcode}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Professional Cleaning Services{" "}
            <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              in {name}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            AASTACLEAN delivers insured, eco-friendly, police-checked cleaning
            for homes and businesses across {name} and the greater {abbr} region.
            Book online in 60 seconds.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="group px-8 py-3.5 rounded-xl bg-sky-500 text-white font-semibold shadow-lg shadow-sky-500/25 hover:bg-sky-600 hover:shadow-sky-500/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get a Free Quote
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
            <a
              href="tel:+61400000000"
              className="px-8 py-3.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300"
            >
              Call Us Now
            </a>
          </div>
        </section>

        {/* ===== WHY CHOOSE US ===== */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Why Choose AASTACLEAN in{" "}
            <span className="text-sky-500">{name}</span>?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "🛡️",
                title: "Insured & Police-Checked",
                desc: `Every cleaner holds current police checks and public liability insurance for your complete peace of mind in ${name}.`,
              },
              {
                icon: "🌿",
                title: "Eco-Friendly Products",
                desc: "We use non-toxic, biodegradable products that are safe for families, pets, and the environment.",
              },
              {
                icon: "⭐",
                title: "100% Satisfaction Guarantee",
                desc: "If you are not happy, we return and re-clean at no extra cost. That is our promise.",
              },
              {
                icon: "⚡",
                title: "Same-Day Availability",
                desc: `Need a cleaner urgently in ${name}? We offer same-day and next-day service subject to availability.`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">
            Cleaning Services Available in {name}
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-12">
            From one-off deep cleans to ongoing commercial contracts, we cover
            every cleaning need across {name} and surrounding suburbs.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keyServices.map((svc) => (
              <a
                key={svc.slug}
                href={`/services/${svc.slug}?suburb=${data.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm hover:border-sky-300 dark:hover:border-sky-600 hover:bg-sky-50/50 dark:hover:bg-sky-900/20 transition-all duration-300 group"
              >
                <span className="flex-1 font-medium text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {svc.name}
                </span>
                <span className="text-slate-400 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
          <p className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
            Plus {cleaningServices.length - keyServices.length} more services.{" "}
            <Link
              href="/services"
              className="text-sky-600 dark:text-sky-400 underline underline-offset-2 hover:text-sky-700"
            >
              View all services
            </Link>
          </p>
        </section>

        {/* ===== LOCAL AREA INFO ===== */}
        <section className="mb-20">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              AASTACLEAN Knows {name}, {abbr}
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
              <p>
                Located in postcode {postcode}, {name} is part of the vibrant{" "}
                {abbr} community. Our local cleaning teams know the area
                intimately &mdash; from typical property types and common
                real-estate expectations to parking access and building
                regulations.
              </p>
              <p>
                Whether you are in a standalone home, townhouse, apartment, or
                commercial premises, we tailor our cleaning approach to the
                specific needs of {name} residents and businesses. We are
                familiar with the local rental market, strata requirements, and
                the standards that {abbr} property managers expect at bond
                inspections.
              </p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Postcode", value: postcode },
                { label: "State", value: abbr },
                { label: "Service Radius", value: `5–15 km from ${name}` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/40"
                >
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    {item.label}
                  </div>
                  <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-12">
            Everything you need to know about our cleaning services in {name}.
          </p>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm open:border-sky-300 dark:open:border-sky-600 transition-colors"
              >
                <summary className="cursor-pointer list-none p-5 pr-12 relative font-semibold text-slate-800 dark:text-slate-100 select-none">
                  {faq.q}
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-open:rotate-45 transition-transform duration-300 text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ===== COMPLIANCE ===== */}
        <section className="mb-20">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Compliance &amp; Standards
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Australian Consumer Law",
                  desc: "All services meet ACL guarantees. You are entitled to a re-clean or refund if services do not meet acceptable standards.",
                },
                {
                  title: "Work Health & Safety",
                  desc: "Our team follows WHS regulations for every job. Safe Work Method Statements (SWMS) available on request for commercial sites.",
                },
                {
                  title: "Privacy Act 1988",
                  desc: "Your personal information is handled in accordance with the Privacy Act and Australian Privacy Principles. We never share your data.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/40"
                >
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BOOKING CTA ===== */}
        <section className="mb-20">
          <div className="relative overflow-hidden rounded-2xl border border-sky-200/60 dark:border-sky-700/50 bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 p-8 sm:p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready for a Spotless {name} Property?
              </h2>
              <p className="text-sky-100 max-w-lg mx-auto mb-8">
                Join hundreds of satisfied customers across {name} and {abbr}.
                Get your free, no-obligation quote in under a minute.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-sky-600 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Book Your Clean Now
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== NEARBY SUBURBS ===== */}
        {nearby.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-4">
              Also Serving Suburbs Near {name}
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8">
              Our cleaning teams cover all of {abbr} &mdash; click a suburb to
              learn more.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {nearby.map((s) => (
                <a
                  key={s.slug}
                  href={`/${s.state}/${s.slug}`}
                  className="px-4 py-2 rounded-lg border border-slate-200/80 dark:border-slate-700/60 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-sky-300 dark:hover:border-sky-600 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-sky-900/20 transition-all duration-300"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
