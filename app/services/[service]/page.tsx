import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const title = service.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} Services | AASTACLEAN Professional Cleaning`,
    description: `Book high-quality ${title} services with AASTACLEAN. Insured, police-checked, and guaranteed satisfaction.`,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const title = service.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
          {title} <span className="text-sky-500">Service</span>
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>AASTACLEAN provides industry-leading {title.toLowerCase()} services tailored to your specific needs.</p>
          <h2>Our {title} Process</h2>
          <p>We follow a rigorous protocol to ensure every corner of your property meets our enterprise-grade quality standards.</p>
        </div>
        <div className="mt-12 p-8 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border-2 border-sky-100 dark:border-sky-800">
           <h3 className="text-xl font-bold mb-4">Book your {title} today</h3>
           <a href="#booking" className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 font-bold transition-all">Start Booking</a>
        </div>
      </div>
    </main>
  );
}