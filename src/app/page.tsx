import Link from "next/link";
import { Stethoscope, Cpu, Heart, Armchair, ClipboardList, CalendarCheck, ShieldCheck, MessageCircle, Sparkles, Quote, Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site, agency } from "@/lib/site";
import { imgSrc } from "@/lib/images";
import { services } from "@/data/services";
import { dentists } from "@/data/dentists";
import { homeFaqs, whyChoose, testimonials, galleryCategories } from "@/data/content";
import { Photo } from "@/components/ui/Photo";
import { btn } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { ServiceCard } from "@/components/services/ServiceCard";
import { DentistCard } from "@/components/dentists/DentistCard";

export const metadata = buildMetadata({
  title: `${site.name} | Modern Dental Care in ${site.city}`,
  description: `Comfortable, patient-focused dental care in ${site.city}. Explore general, cosmetic and specialist treatments, meet our dentists and request an appointment.`,
  absoluteTitle: true,
});

const icons = { stethoscope: Stethoscope, cpu: Cpu, heart: Heart, armchair: Armchair, clipboard: ClipboardList, calendar: CalendarCheck } as const;
const trust = [
  { icon: ShieldCheck, t: "Clear treatment explanations", d: "Options and next steps in plain language." },
  { icon: Heart, t: "Comfort-focused visits", d: "Unhurried appointments for every age." },
  { icon: MessageCircle, t: "WhatsApp-friendly booking", d: "Enquire in the way that suits you." },
  { icon: Sparkles, t: "Preventive-first approach", d: "Care planned around long-term oral health." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero: photo is the LCP element, so it is preloaded with `priority`. */}
      <section className="relative isolate overflow-hidden bg-navy-900">
        <Photo src={imgSrc("hero")} alt="Bright, modern dental treatment room (illustrative image)" label="hero" priority sizes="100vw" className="absolute inset-0 -z-10 opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/30" />
        <div className="wrap py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm text-white ring-1 ring-white/25">{site.name} · {site.city}, Pakistan</p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] !text-white sm:text-6xl">Your Perfect Smile Starts Here.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">Experience modern, comfortable and patient-focused dental care with personalized treatment solutions designed around your smile.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/appointment" className={btn("primary")}>Book Your Appointment</Link>
              <Link href="/services" className={btn("ghostLight")}>Explore Our Services</Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="What patients can expect" className="border-b border-ash-200 bg-ivory">
        <div className="wrap grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-3">
              <Icon className="mt-1 h-6 w-6 shrink-0 text-teal-600" aria-hidden />
              <div><p className="font-semibold text-navy-900">{t}</p><p className="text-sm text-ash-500">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="why">
        <div className="wrap">
          <SectionHeading id="why" title="Why Choose Us" intro="Six things we aim to get right at every visit. Claims on this demonstration are samples and fully editable." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w) => {
              const Icon = icons[w.icon];
              return (
                <div key={w.title} className="rounded-xl2 bg-mint-50 p-7 ring-1 ring-mint-200">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-teal-600 shadow-soft"><Icon className="h-6 w-6" aria-hidden /></span>
                  <h3 className="mt-5 text-xl font-semibold">{w.title}</h3>
                  <p className="mt-2 text-ash-500">{w.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-ash-100" aria-labelledby="svc">
        <div className="wrap">
          <SectionHeading id="svc" title="Featured Dental Services" intro="From routine check-ups to restorative and cosmetic care, all under one roof." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s) => <ServiceCard key={s.slug} service={s} src={imgSrc(s.image)} />)}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="docs">
        <div className="wrap">
          <SectionHeading id="docs" title="Meet Our Dentists" intro="Sample profiles of fictional dentists, shown to illustrate how your real team will appear." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {dentists.map((d) => <DentistCard key={d.slug} dentist={d} src={imgSrc(d.image)} />)}
          </div>
          <div className="mt-10 text-center"><Link href="/dentists" className={btn("outline")}>See all dentists</Link></div>
        </div>
      </section>

      <section className="section bg-mint-50" aria-labelledby="gal">
        <div className="wrap">
          <SectionHeading id="gal" title="Smile Gallery" intro="Illustrative images of the treatments we offer. These are not photographs of real patient results." />
          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {galleryCategories.map((c, i) => (
              <li key={c}>
                <Link href="/gallery" className="group block overflow-hidden rounded-xl2 bg-white shadow-soft">
                  <Photo src={imgSrc(`gallery-home-${i + 1}`)} alt={`${c} (illustrative image)`} label={`gallery-home-${i + 1}`} className="aspect-[4/5]" sizes="(min-width:1024px) 25vw, 50vw" />
                  <span className="block p-4 font-semibold text-navy-900 group-hover:text-teal-700">{c}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center"><Link href="/gallery" className={btn("outline")}>Open full gallery</Link></div>
        </div>
      </section>

      <section className="section" aria-labelledby="tst">
        <div className="wrap">
          <SectionHeading id="tst" title="What Patients Say" intro="Sample testimonials for demonstration only. Replace with real, consented patient feedback." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-xl2 border border-ash-200 bg-white p-7 shadow-soft">
                <Quote className="h-8 w-8 text-teal-500" aria-hidden />
                <blockquote className="mt-4 text-lg leading-relaxed text-navy-900">{t.text}</blockquote>
                <figcaption className="mt-5 text-sm text-ash-500">{t.name}, {t.city} <span className="ml-1 rounded-full bg-ivory px-2.5 py-0.5 text-xs font-semibold ring-1 ring-ash-200">Demo testimonial</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ivory" aria-labelledby="faq">
        <div className="wrap max-w-3xl">
          <SectionHeading id="faq" title="Frequently Asked Questions" center />
          <div className="mt-10"><Accordion items={homeFaqs} /></div>
        </div>
      </section>

      <CtaBand />

      {/* Agency promotion: separate from clinic contacts. */}
      <section className="section bg-white" aria-labelledby="agency">
        <div className="wrap">
          <div className="rounded-xl2 bg-gradient-to-br from-mint-100 to-white p-8 ring-1 ring-mint-200 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <h2 id="agency" className="text-3xl font-semibold">Need a Professional Website for Your Dental Clinic?</h2>
              <p className="mt-4 text-lg text-ash-700">{agency.name} creates modern, responsive, fast-loading and SEO-friendly websites for dental clinics and healthcare businesses throughout Pakistan.</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0 lg:flex-col">
              <a href={agency.whatsappUrl} target="_blank" rel="noopener noreferrer" className={btn("whatsapp")}><MessageCircle className="h-5 w-5" aria-hidden />Contact on WhatsApp</a>
              <a href={agency.emailUrl} className={btn("navy")}><Mail className="h-5 w-5" aria-hidden />Send Email</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
