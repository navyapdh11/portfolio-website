import { MetadataRoute } from "next";
import { db } from "@/lib/data/store";
import { allSuburbs } from "@/lib/data/suburbs";
import { cleaningServices } from "@/lib/constants/services";

const BASE_URL = "https://www.aastaclean.com.au";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = db.services.getAll();

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
  ]);

  // All 895 suburb pages — /[state]/[suburb]
  const suburbPages: MetadataRoute.Sitemap = allSuburbs.map(sub => ({
    url: `${BASE_URL}/${sub.state}/${sub.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...suburbPages];
}
