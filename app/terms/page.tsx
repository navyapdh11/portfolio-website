import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>Last updated: April 22, 2026</p>
          <h2>1. Agreement to Terms</h2>
          <p>By accessing or using our cleaning services, you agree to be bound by these Terms.</p>
          <h2>2. Service Cancellation</h2>
          <p>You may cancel your booking up to 24 hours before the scheduled service time without penalty. Cancellations within 24 hours may incur a fee.</p>
          <h2>3. Satisfaction Guarantee</h2>
          <p>If you are not satisfied with our service, please contact us within 24 hours and we will return to reclean the problematic areas at no additional cost.</p>
        </div>
        <div className="mt-12">
          <Link href="/" className="text-sky-500 hover:text-sky-600 font-semibold">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}