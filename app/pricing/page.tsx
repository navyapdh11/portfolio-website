import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Professional Pricing Standards</h1>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <h2 className="text-2xl font-bold mb-4">Residential Cleaning</h2>
                <ul className="space-y-2">
                    <li>Domestic: From $50/hr</li>
                    <li>End of Lease: From $450</li>
                    <li>Carpet: From $30/room</li>
                </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <h2 className="text-2xl font-bold mb-4">Commercial Cleaning</h2>
                <ul className="space-y-2">
                    <li>Office: From $55/hr</li>
                    <li>Industrial: From $65/hr</li>
                    <li>Strata: From $60/hr</li>
                </ul>
            </div>
        </div>
        <div className="mt-12 text-center">
            <Link href="/" className="text-blue-600 font-bold hover:underline">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}