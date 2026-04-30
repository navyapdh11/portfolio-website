import { MetadataRoute } from "next";
import { allSuburbs } from "@/lib/data/suburbs";
import { cleaningServices, australianCities } from "@/lib/constants/services";

const BASE_URL = "https://www.aastaclean.com.au";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Service pages — use slugs from constants, not database IDs
  const servicePages: MetadataRoute.Sitemap = cleaningServices.map(s => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Service + city combo pages
  const serviceCityPages: MetadataRoute.Sitemap = cleaningServices.flatMap(service =>
    australianCities.map(city => ({
      url: `${BASE_URL}/services/${service.slug}/${city.state}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  // All 895 suburb pages — /[state]/[suburb]
  const suburbPages: MetadataRoute.Sitemap = allSuburbs.map(sub => ({
    url: `${BASE_URL}/${sub.state}/${sub.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...serviceCityPages, ...suburbPages];
}
