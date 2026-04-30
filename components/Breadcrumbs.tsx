"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { states } from "@/lib/data/suburbs";
import { cleaningServices } from "@/lib/constants/services";

const stateNames: Record<string, string> = {
  nsw: "New South Wales", vic: "Victoria", qld: "Queensland", wa: "Western Australia",
  sa: "South Australia", tas: "Tasmania", act: "ACT", nt: "Northern Territory",
};

function capitalize(str: string) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const breadcrumbs: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
  ];

  // Handle /services/[service]/[state]/[city]
  if (segments[0] === "services" && segments.length >= 4) {
    const serviceSlug = segments[1];
    const stateSlug = segments[2];
    const citySlug = segments[3];

    const service = cleaningServices.find((s) => s.slug === serviceSlug);
    const stateName = stateNames[stateSlug] || capitalize(stateSlug);

    breadcrumbs.push({ label: "Services", href: "/pricing" });
    breadcrumbs.push({ label: service?.name || capitalize(serviceSlug), href: `/services/${serviceSlug}` });
    breadcrumbs.push({ label: `${capitalize(citySlug)}, ${stateName}`, href: pathname });

    return (
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 mb-6" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-zinc-300 dark:text-zinc-600">/</span>}
            {i === breadcrumbs.length - 1 ? (
              <span className="text-zinc-900 dark:text-white font-medium" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    );
  }

  // Handle /[state]/[suburb]
  if (segments.length === 2) {
    const stateSlug = segments[0];
    const suburbSlug = segments[1];

    // Try to resolve suburb name
    const stateData = states.find((s) => s.slug === stateSlug);
    const stateAbbr = stateData?.abbr || capitalize(stateSlug);

    // Import suburb data dynamically
    const { allSuburbs } = require("@/lib/data/suburbs");
    const suburb = allSuburbs.find((s: { slug: string; name: string }) => s.slug === suburbSlug);
    const suburbName = suburb?.name || capitalize(suburbSlug);

    breadcrumbs.push({ label: stateAbbr, href: `/${stateSlug}` });
    breadcrumbs.push({ label: suburbName, href: pathname });

    return (
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 mb-6" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-zinc-300 dark:text-zinc-600">/</span>}
            {i === breadcrumbs.length - 1 ? (
              <span className="text-zinc-900 dark:text-white font-medium" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    );
  }

  // Handle generic paths
  for (let i = 0; i < segments.length; i++) {
    const href = "/" + segments.slice(0, i + 1).join("/");
    breadcrumbs.push({ label: capitalize(segments[i]), href });
  }

  return (
    <nav className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-zinc-300 dark:text-zinc-600">/</span>}
          {i === breadcrumbs.length - 1 ? (
            <span className="text-zinc-900 dark:text-white font-medium" aria-current="page">
              {crumb.label}
            </span>
          ) : (
            <Link href={crumb.href} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
