/**
 * SINGLE SOURCE OF TRUTH for clinic + agency details.
 * To rebrand for a real client: edit this file (and .env), then replace images in /public/images.
 * Clinic contact details and agency contact details are deliberately kept separate.
 */
export const CITIES = [
  "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad",
  "Multan", "Peshawar", "Gujranwala", "Sialkot",
] as const;
export type City = (typeof CITIES)[number];

const envCity = process.env.NEXT_PUBLIC_CITY as City | undefined;
const city: City = envCity && CITIES.includes(envCity) ? envCity : "Lahore";

export const site = {
  /** Demo mode: shows fictional-clinic notices, blocks indexing, disables clinic schema.org. */
  demo: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  name: "SmileCare Dental Studio",
  shortName: "SmileCare",
  tagline: "Your Smile, Our Passion.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en-PK",
  city,
  region: "Punjab",
  country: "PK",
  address: {
    street: "123 Sample Boulevard, Gulberg III",
    city: "Lahore",
    postalCode: "54660",
    display: "123 Sample Boulevard, Gulberg III, Lahore, Pakistan (sample address)",
  },
  phone: process.env.NEXT_PUBLIC_CLINIC_PHONE ?? "+92 300 0000000",
  email: process.env.NEXT_PUBLIC_CLINIC_EMAIL ?? "hello@smilecare.example",
  /** Digits only, e.g. 923001234567. Empty = not configured (WhatsApp opens a contact chooser). */
  whatsapp: (process.env.NEXT_PUBLIC_CLINIC_WHATSAPP ?? "").replace(/\D/g, ""),
  mapEmbedUrl: process.env.NEXT_PUBLIC_MAP_EMBED_URL ?? "",
  hours: [
    { label: "Monday – Saturday", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00", display: "9:00 am – 8:00 pm" },
    { label: "Sunday", days: ["Sunday"], opens: "", closes: "", display: "Closed" },
  ],
  social: [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
  ga: process.env.NEXT_PUBLIC_GA_ID ?? "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
} as const;

export const agency = {
  name: "Younus Web Solutions",
  whatsapp: "+923457305226",
  whatsappUrl: "https://wa.me/923457305226",
  email: "khokharunus782@gmail.com",
  emailUrl: "mailto:khokharunus782@gmail.com",
  credit: "Website Designed & Developed by Younus Web Solutions",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dentists", label: "Dentists" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
