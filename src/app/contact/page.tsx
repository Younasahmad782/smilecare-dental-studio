import { MapPin, Phone, Mail, Clock, MessageCircle, Globe } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { waLink } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { DemoNote } from "@/components/ui/DemoNote";
import { btn } from "@/components/ui/button";

export const metadata = buildMetadata({ title: "Contact Us", description: `Contact ${site.name} in ${site.city}: address, phone, WhatsApp, email, opening hours and contact form.`, path: "/contact" });

export default function ContactPage() {
  const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.display)}`;
  return (
    <>
      <PageHero title="Contact Us" intro="We would be glad to hear from you." crumbs={[{ name: "Contact", href: "/contact" }]} />
      <section className="section"><div className="wrap grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold">{site.name}</h2>
          <ul className="mt-6 space-y-5">
            <li className="flex gap-4"><MapPin className="mt-1 h-6 w-6 shrink-0 text-teal-600" aria-hidden /><span><strong className="block text-navy-900">Address</strong>{site.address.display}</span></li>
            <li className="flex gap-4"><Phone className="mt-1 h-6 w-6 shrink-0 text-teal-600" aria-hidden /><span><strong className="block text-navy-900">Phone</strong><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:underline">{site.phone}</a></span></li>
            <li className="flex gap-4"><Mail className="mt-1 h-6 w-6 shrink-0 text-teal-600" aria-hidden /><span><strong className="block text-navy-900">Email</strong><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></span></li>
            <li className="flex gap-4"><MessageCircle className="mt-1 h-6 w-6 shrink-0 text-teal-600" aria-hidden /><span><strong className="block text-navy-900">WhatsApp</strong><a href={waLink(site.whatsapp, `Hello ${site.name}, I have a question.`)} target="_blank" rel="noopener noreferrer" className="hover:underline">{site.whatsapp ? `+${site.whatsapp}` : "Message the clinic"}</a></span></li>
            <li className="flex gap-4"><Clock className="mt-1 h-6 w-6 shrink-0 text-teal-600" aria-hidden />
              <span><strong className="block text-navy-900">Opening hours</strong>
                <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4">{site.hours.map((h) => <div key={h.label} className="contents"><dt>{h.label}</dt><dd>{h.display}</dd></div>)}</dl></span></li>
            <li className="flex gap-4"><Globe className="mt-1 h-6 w-6 shrink-0 text-teal-600" aria-hidden /><span><strong className="block text-navy-900">Social media</strong>
              <span className="flex flex-wrap gap-x-4">{site.social.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">{s.label}</a>)}</span></span></li>
          </ul>
          <DemoNote>All clinic details on this page are sample placeholders. Edit them in src/lib/site.ts and .env.</DemoNote>
          <div className="mt-8 overflow-hidden rounded-xl2 border border-ash-200">
            {site.mapEmbedUrl ? (
              <iframe title={`Map showing ${site.name}`} src={site.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full" />
            ) : (
              <div className="grid h-72 place-items-center bg-mint-50 p-6 text-center">
                <div><MapPin className="mx-auto h-8 w-8 text-teal-600" aria-hidden /><p className="mt-3 font-semibold text-navy-900">Google Maps embed placeholder</p>
                  <p className="mt-1 text-sm text-ash-500">Set NEXT_PUBLIC_MAP_EMBED_URL to show the clinic map here.</p>
                  <a href={mapsSearch} target="_blank" rel="noopener noreferrer" className={btn("outline", "mt-4 !min-h-11 !py-2")}>Open in Google Maps</a></div>
              </div>
            )}
          </div>
        </div>
        <div><h2 className="mb-6 text-3xl font-semibold">Send a message</h2><ContactForm /></div>
      </div></section>
    </>
  );
}
