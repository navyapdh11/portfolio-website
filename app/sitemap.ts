import { MetadataRoute } from "next";
import { db } from "@/lib/data/store";

const BASE_URL = "https://www.aastaclean.com.au";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = db.services.getAll();
  const suburbs = [
    { state: "nsw", name: "sydney" },
    { state: "vic", name: "melbourne" },
    { state: "qld", name: "brisbane" },
    { state: "wa", name: "perth" },
    { state: "sa", name: "adelaide" },
    { state: "tas", name: "hobart" },
    { state: "act", name: "canberra" },
    { state: "nt", name: "darwin" },
  ];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/locations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = services.flatMap(s => [
    {
      url: `${BASE_URL}/services/${s.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...suburbs.map(sub => ({
      url: `${BASE_URL}/services/${s.id}/${sub.state}/${sub.name}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]);

  // Suburb pages
  const suburbPages: MetadataRoute.Sitemap = suburbs.flatMap(sub => ({
    url: `${BASE_URL}/${sub.state}/${sub.name}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...suburbPages];
}
