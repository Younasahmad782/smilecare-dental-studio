import type { Metadata } from "next";
import { site, agency } from "./site";

type Meta = { title: string; description: string; path?: string; type?: "website" | "article"; absoluteTitle?: boolean };

export function buildMetadata({ title, description, path = "/", type = "website", absoluteTitle }: Meta): Metadata {
  const url = new URL(path, site.url).toString();
  const full = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { title: full, description, url, siteName: site.name, locale: "en_PK", type },
    twitter: { card: "summary_large_image", title: full, description },
  };
}

export const abs = (path: string) => new URL(path, site.url).toString();

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.href) })),
  };
}

export const websiteSchema = () => ({
  "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, inLanguage: site.locale,
});

/**
 * Clinic identity schema (Dentist + LocalBusiness). Returns null in demo mode on purpose:
 * the clinic is fictional and must not be presented to search engines as a real business.
 * Set NEXT_PUBLIC_DEMO_MODE=false only after replacing all details with the real clinic's.
 */
export function clinicSchema() {
  if (site.demo) return null;
  return {
    "@context": "https://schema.org", "@type": ["Dentist", "LocalBusiness"], name: site.name, url: site.url,
    telephone: site.phone, email: site.email,
    address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.region, postalCode: site.address.postalCode, addressCountry: site.country },
    openingHoursSpecification: site.hours.filter((h) => h.opens).map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    areaServed: site.city,
  };
}

export const agencySchema = () => ({
  "@context": "https://schema.org", "@type": "Organization", name: agency.name, email: agency.email, url: agency.whatsappUrl,
});
