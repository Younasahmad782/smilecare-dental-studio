import Link from "next/link";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { site, agency, nav } from "@/lib/site";
import { services } from "@/data/services";
import { waLink } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl text-white">{site.name}</p>
          <p className="mt-2 text-white/70">{site.tagline}</p>
          {site.demo && <p className="mt-4 text-sm text-white/60">Demonstration website for a fictional clinic. Dentists, testimonials and details are samples.</p>}
        </div>
        <div>
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-3 space-y-2">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-white hover:underline">{n.label}</Link></li>)}
            <li><Link href="/appointment" className="hover:text-white hover:underline">Book Appointment</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Services</p>
          <ul className="mt-3 space-y-2">
            {services.slice(0, 6).map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white hover:underline">{s.title}</Link></li>)}
            <li><Link href="/services" className="hover:text-white hover:underline">All services</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Clinic contact {site.demo && <span className="text-xs font-normal text-white/60">(sample)</span>}</p>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{site.address.display}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:underline">{site.phone}</a></li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></li>
            <li className="flex gap-2"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /><a href={waLink(site.whatsapp, `Hello ${site.name}, I would like to make an enquiry.`)} target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp the clinic</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. <Link href="/privacy-policy" className="underline-offset-4 hover:underline">Privacy</Link> · <Link href="/terms" className="underline-offset-4 hover:underline">Terms</Link></p>
          <p>
            {agency.credit} ·{" "}
            <a href={agency.whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">WhatsApp</a> ·{" "}
            <a href={agency.emailUrl} className="underline-offset-4 hover:underline">Email</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
