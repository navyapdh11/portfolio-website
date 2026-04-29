import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
  // Mock data for initial generation
  return [
    { state: "wa", suburb: "subiaco" },
    { state: "wa", suburb: "west-leederville" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; suburb: string }> }): Promise<Metadata> {
  const { suburb } = await params;
  const formattedSuburb = suburb.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `Expert Cleaning Services in ${formattedSuburb} | AASTACLEAN`,
    description: `Need professional cleaning in ${formattedSuburb}? AASTACLEAN offers eco-friendly, insured, and police-checked cleaners for homes and offices.`,
  };
}

export default async function SuburbPage({ params }: { params: Promise<{ state: string; suburb: string }> }) {
  const { state, suburb } = await params;
  const formattedSuburb = suburb.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
          Professional Cleaning in <span className="text-sky-500">{formattedSuburb}</span>, {state.toUpperCase()}
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            AASTACLEAN is proud to serve the {formattedSuburb} community with top-tier residential and commercial cleaning services.
          </p>
          <h2>Why choose AASTACLEAN in {formattedSuburb}?</h2>
          <ul>
            <li><strong>Local Experts:</strong> We know the {formattedSuburb} area inside and out.</li>
            <li><strong>Eco-Friendly:</strong> We use safe products for your family and pets.</li>
            <li><strong>Insured & Checked:</strong> Total peace of mind for every job.</li>
          </ul>
        </div>
        <div className="mt-12 p-8 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border-2 border-sky-100 dark:border-sky-800">
           <h3 className="text-xl font-bold mb-4">Ready to get your free quote?</h3>
           <p className="mb-6">Join hundreds of satisfied customers in {formattedSuburb}.</p>
           <a href="#booking" className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 font-bold transition-all">Book Now</a>
        </div>
      </div>
    </main>
  );
}