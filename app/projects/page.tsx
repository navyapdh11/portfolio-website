"use client";

import { useState } from "react";

const fullProjects = [
  {
    id: "cbd-office",
    title: "CBD Office Tower - Commercial Complex",
    category: "Commercial Cleaning",
    location: "Perth CBD",
    description: "Complete weekly maintenance cleaning for a 20-story commercial tower including lobby, offices, and common areas.",
    services: ["Weekly Maintenance", "Deep Cleaning", "Window Cleaning", "Carpet Care"],
    before: "🏢", after: "✨",
    testimonial: "AASTACLEAN has maintained our building to the highest standards for over 3 years.",
    client: "Perth CBD Properties",
    stats: { size: "50,000 sqm", frequency: "Weekly", staff: 8 }
  },
  {
    id: "west-leederville-home",
    title: "West Leederville Family Home",
    category: "Residential Cleaning",
    location: "West Leederville",
    description: "Regular fortnightly cleaning service for a 4-bedroom family home including deep cleaning of kitchen and bathrooms.",
    services: ["Regular Cleaning", "Deep Clean", "Kitchen Sanitation", "Bathroom Treatment"],
    before: "🏠", after: "🌟",
    testimonial: "Our home has never looked better. The team is reliable and thorough.",
    client: "Residential Client",
    stats: { size: "280 sqm", frequency: "Fortnightly", staff: 2 }
  },
  {
    id: "subiaco-lease",
    title: "Subiaco Apartment - End of Lease",
    category: "End of Lease",
    location: "Subiaco",
    description: "Comprehensive end-of-lease clean for a 2-bedroom apartment ensuring full bond return. Includes carpet steam cleaning.",
    services: ["End of Lease", "Carpet Steam Clean", "Wall Spot Removal", "Window Clean"],
    before: "🔑", after: "✅",
    testimonial: "Got full bond back! The place looked brand new. Highly recommend.",
    client: "Tenant",
    stats: { size: "95 sqm", frequency: "One-time", staff: 2 }
  },
  {
    id: "nedlands-medical",
    title: "Nedlands Medical Centre",
    category: "Commercial Cleaning",
    location: "Nedlands",
    description: "Specialized medical facility cleaning with strict hygiene protocols. Daily cleaning with sanitization of all surfaces.",
    services: ["Medical Grade Sanitization", "Daily Maintenance", "Sterile Room Cleaning", "Waste Management"],
    before: "🏥", after: "💉",
    testimonial: "Impeccable standards. They understand the unique requirements of medical facilities.",
    client: "Nedlands Medical Group",
    stats: { size: "600 sqm", frequency: "Daily", staff: 3 }
  },
  {
    id: "claremont-retail",
    title: "Claremont Retail Space",
    category: "Commercial Cleaning",
    location: "Claremont",
    description: "Daily cleaning for a high-end retail fashion store. Opening and closing cleans with focus on window displays.",
    services: ["Daily Opening Clean", "Floor Care", "Display Cleaning", "Stock Area Maintenance"],
    before: "🛍️", after: "✨",
    testimonial: "Our store always looks impeccable for customers. Outstanding service.",
    client: "Fashion Retailer",
    stats: { size: "350 sqm", frequency: "Daily", staff: 2 }
  },
  {
    id: "mount-lawley-duplex",
    title: "Mount Lawley Duplex - Post Renovation",
    category: "Deep Cleaning",
    location: "Mount Lawley",
    description: "Post-renovation deep clean for a duplex property. Complete removal of construction dust and debris.",
    services: ["Post-Renovation Clean", "Construction Debris", "Dust Removal", "Final Polish"],
    before: "🔨", after: "🏡",
    testimonial: "They transformed our property after renovations. Couldn't be happier.",
    client: "Property Developer",
    stats: { size: "180 sqm", frequency: "One-time", staff: 4 }
  }
];

export default function ProjectsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [projects, setProjects] = useState(fullProjects);

  const updateProject = (id: string, field: string, value: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <>
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Projects</h1>
          <button onClick={() => setIsAdmin(!isAdmin)} className="mt-4 px-4 py-2 bg-blue-500 rounded-lg text-xs hover:bg-blue-400">
            {isAdmin ? "Exit Admin" : "Enable Admin Edit"}
          </button>
        </div>
      </section>

      {isAdmin && (
        <section className="py-8 bg-zinc-100 dark:bg-zinc-800">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-bold mb-4">Admin Control: Manage Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {projects.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200">
                  <label className="block text-[10px] font-bold uppercase text-zinc-500">Title</label>
                  <input value={p.title} onChange={e => updateProject(p.id, 'title', e.target.value)} className="w-full font-bold border-b mb-2" />
                  <label className="block text-[10px] font-bold uppercase text-zinc-500">Description</label>
                  <textarea value={p.description} onChange={e => updateProject(p.id, 'description', e.target.value)} className="w-full text-sm border-b mb-2" />
                  <label className="block text-[10px] font-bold uppercase text-zinc-500">Location</label>
                  <input value={p.location} onChange={e => updateProject(p.id, 'location', e.target.value)} className="w-full text-sm border-b" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article key={project.id} className="bg-white dark:bg-zinc-700 rounded-2xl shadow-lg overflow-hidden border border-zinc-100 dark:border-zinc-700">
                <div className="h-48 bg-zinc-100 dark:bg-zinc-600 flex items-center justify-center text-6xl">
                  {project.before}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-4">{project.description}</p>
                  <div className="text-xs text-zinc-500 mb-4 uppercase tracking-widest font-bold">📍 {project.location}</div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">{project.category}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
