import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Analytics } from "@/components/layout/Analytics";
import { JsonLd } from "@/components/ui/JsonLd";
import { clinicSchema, websiteSchema } from "@/lib/seo";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const viewport: Viewport = { themeColor: "#0b2545", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Dentist in ${site.city}`, template: `%s | ${site.name}` },
  description: `Modern, patient-focused dental care in ${site.city}, Pakistan. Explore services, meet our dentists and request an appointment.`,
  keywords: ["dentist", `dentist in ${site.city}`, "dental clinic Pakistan", "teeth whitening", "dental implants", "braces"],
  robots: site.demo ? { index: false, follow: false } : { index: true, follow: true },
  verification: site.gscVerification ? { google: site.gscVerification } : undefined,
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:text-navy-900 focus:shadow-lift">Skip to main content</a>
        {site.demo && (
          <div className="bg-navy-950 px-4 py-2 text-center text-xs text-white/85 sm:text-sm">
            Demonstration website: {site.name} is a fictional clinic. All clinic details, dentists and testimonials are samples.
          </div>
        )}
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Analytics />
        <JsonLd data={[websiteSchema(), clinicSchema()]} />
      </body>
    </html>
  );
}
