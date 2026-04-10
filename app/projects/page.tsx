import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects | AASTACLEAN - Our Cleaning Projects Portfolio Perth WA",
  description: "Explore AASTACLEAN's portfolio of cleaning projects across Perth WA. View our residential, commercial, and end-of-lease cleaning work. Quality guaranteed with before/after galleries.",
  keywords: "cleaning projects Perth, portfolio cleaning services, end of lease cleaning projects, commercial cleaning portfolio, residential cleaning gallery, before after cleaning photos Perth",
  authors: [{ name: "AASTACLEAN" }],
  openGraph: {
    title: "Projects | AASTACLEAN - Our Cleaning Projects Portfolio",
    description: "Explore our portfolio of cleaning projects across Perth WA. Quality guaranteed.",
    type: "website",
    locale: "en_AU",
    siteName: "AASTACLEAN",
    url: "https://aastaclean.com.au/projects",
  },
  alternates: {
    canonical: "https://aastaclean.com.au/projects",
  },
  other: {
    "geo.region": "WA",
    "geo.placename": "Perth",
    "geo.position": "-31.9505;115.8605",
  },
};

const projects = [
  {
    id: " CBD office tower",
    title: "CBD Office Tower - Commercial Complex",
    category: "Commercial Cleaning",
    location: "Perth CBD",
    description: "Complete weekly maintenance cleaning for a 20-story commercial tower including lobby, offices, and common areas.",
    services: ["Weekly Maintenance", "Deep Cleaning", "Window Cleaning", "Carpet Care"],
    images: { before: "🏢", after: "✨" },
    stats: { size: "50,000 sqm", frequency: "Weekly", staff: 8 },
    testimonial: "AASTACLEAN has maintained our building to the highest standards for over 3 years.",
    client: "Perth CBD Properties",
  },
  {
    id: "west-leederville-home",
    title: "West Leederville Family Home",
    category: "Residential Cleaning",
    location: "West Leederville",
    description: "Regular fortnightly cleaning service for a 4-bedroom family home including deep cleaning of kitchen and bathrooms.",
    services: ["Regular Cleaning", "Deep Clean", "Kitchen Sanitation", "Bathroom Treatment"],
    images: { before: "🏠", after: "🌟" },
    stats: { size: "280 sqm", frequency: "Fortnightly", staff: 2 },
    testimonial: "Our home has never looked better. The team is reliable and thorough.",
    client: "Residential Client",
  },
  {
    id: "subiaco-lease",
    title: "Subiaco Apartment - End of Lease",
    category: "End of Lease",
    location: "Subiaco",
    description: "Comprehensive end-of-lease clean for a 2-bedroom apartment ensuring full bond return. Includes carpet steam cleaning.",
    services: ["End of Lease", "Carpet Steam Clean", "Wall Spot Removal", "Window Clean"],
    images: { before: "🔑", after: "✅" },
    stats: { size: "95 sqm", frequency: "One-time", staff: 2 },
    testimonial: "Got full bond back! The place looked brand new. Highly recommend.",
    client: "Tenant",
  },
  {
    id: "nedlands-medical",
    title: "Nedlands Medical Centre",
    category: "Commercial Cleaning",
    location: "Nedlands",
    description: "Specialized medical facility cleaning with strict hygiene protocols. Daily cleaning with sanitization of all surfaces.",
    services: ["Medical Grade Sanitization", "Daily Maintenance", "Sterile Room Cleaning", "Waste Management"],
    images: { before: "🏥", after: "💉" },
    stats: { size: "600 sqm", frequency: "Daily", staff: 3 },
    testimonial: "Impeccable standards. They understand the unique requirements of medical facilities.",
    client: "Nedlands Medical Group",
  },
  {
    id: "claremont-retail",
    title: "Claremont Retail Space",
    category: "Commercial Cleaning",
    location: "Claremont",
    description: "Daily cleaning for a high-end retail fashion store. Opening and closing cleans with focus on window displays.",
    services: ["Daily Opening Clean", "Floor Care", "Display Cleaning", "Stock Area Maintenance"],
    images: { before: "🛍️", after: "✨" },
    stats: { size: "350 sqm", frequency: "Daily", staff: 2 },
    testimonial: "Our store always looks impeccable for customers. Outstanding service.",
    client: "Fashion Retailer",
  },
  {
    id: "mount-lawley-duplex",
    title: "Mount Lawley Duplex - Post Renovation",
    category: "Deep Cleaning",
    location: "Mount Lawley",
    description: "Post-renovation deep clean for a duplex property. Complete removal of construction dust and debris.",
    services: ["Post-Renovation Clean", "Construction Debris", "Dust Removal", "Final Polish"],
    images: { before: "🔨", after: "🏡" },
    stats: { size: "180 sqm", frequency: "One-time", staff: 4 },
    testimonial: "They transformed our property after renovations. Couldn't be happier.",
    client: "Property Developer",
  },
];

const socialLinks = [
  { platform: "Facebook", url: "https://facebook.com/aastaclean", icon: "📘", followers: "2.5K" },
  { platform: "Instagram", url: "https://instagram.com/aastaclean", icon: "📸", followers: "1.8K" },
  { platform: "Google", url: "https://google.com/aastaclean", icon: "🔍", followers: "150+ Reviews" },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Explore our portfolio of cleaning projects across Perth WA. From commercial complexes to residential homes, 
            we deliver excellence in every clean.
          </p>
        </div>
      </section>

      <section className="py-12 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {["All Projects", "Commercial", "Residential", "End of Lease", "Deep Cleaning"].map((filter) => (
              <button
                key={filter}
                className="px-5 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full shadow-sm hover:shadow-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all font-medium text-sm"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article key={project.id} className="bg-white dark:bg-zinc-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-600 dark:to-zinc-500 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">{project.images.before}</div>
                    <span className="text-zinc-500 dark:text-zinc-300 font-medium">Before</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-6xl">{project.images.after}</span>
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                    <span>📍</span>
                    <span>{project.location}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services.slice(0, 3).map((service) => (
                      <span key={service} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-600 text-zinc-600 dark:text-zinc-300 text-xs rounded">
                        {service}
                      </span>
                    ))}
                    {project.services.length > 3 && (
                      <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-600 text-zinc-600 dark:text-zinc-300 text-xs rounded">
                        +{project.services.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-zinc-100 dark:border-zinc-600">
                    <div className="text-center">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">Size</div>
                      <div className="font-semibold text-zinc-900 dark:text-white text-sm">{project.stats.size}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">Frequency</div>
                      <div className="font-semibold text-zinc-900 dark:text-white text-sm">{project.stats.frequency}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">Staff</div>
                      <div className="font-semibold text-zinc-900 dark:text-white text-sm">{project.stats.staff}</div>
                    </div>
                  </div>
                  
                  <blockquote className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 italic">"{project.testimonial}"</p>
                    <cite className="text-xs text-zinc-500 dark:text-zinc-400 block mt-2">— {project.client}</cite>
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Connect With Us</h2>
          <div className="flex justify-center gap-6 flex-wrap">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <span className="text-2xl">{social.icon}</span>
                <div className="text-left">
                  <div className="font-medium">{social.platform}</div>
                  <div className="text-sm text-zinc-400">{social.followers}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a free quote for your cleaning project. Whether it&apos;s residential, commercial, or end-of-lease, 
            we deliver exceptional results.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/#booking"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Cleaning Projects Portfolio",
            "description": "Portfolio of cleaning projects by AASTACLEAN in Perth WA",
            "numberOfItems": projects.length,
            "itemListElement": projects.map((project, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Service",
                "name": project.title,
                "description": project.description,
                "provider": {
                  "@type": "Organization",
                  "name": "AASTACLEAN",
                },
                "areaServed": {
                  "@type": "Place",
                  "name": project.location,
                },
                "serviceType": project.category,
              },
            })),
          }),
        }}
      />
    </>
  );
}
