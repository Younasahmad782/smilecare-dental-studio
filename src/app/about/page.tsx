import { Target, Eye, HeartHandshake, ShieldCheck, Users, Lightbulb } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { imgSrc } from "@/lib/images";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { CtaBand } from "@/components/ui/CtaBand";
import { DemoNote } from "@/components/ui/DemoNote";
import { whyChoose } from "@/data/content";

export const metadata = buildMetadata({ title: "About Us", description: `Learn about ${site.name}: our mission, values, facilities and patient-focused approach to dental care in ${site.city}.`, path: "/about" });

const values = [
  { icon: HeartHandshake, t: "Compassion", d: "We listen first and treat every patient with respect." },
  { icon: ShieldCheck, t: "Safety", d: "Hygiene and infection-control standards guide every procedure." },
  { icon: Lightbulb, t: "Honesty", d: "Clear options and realistic expectations, never pressure." },
  { icon: Users, t: "Teamwork", d: "General and specialist dentists collaborate on your care." },
];
const facilities = ["Private, calm treatment rooms", "Digital X-ray and imaging (sample)", "Sterilisation area following recognised protocols (sample)", "Comfortable waiting lounge", "Accessible entrance (confirm for your clinic)", "Child-friendly consultation space"];

export default function AboutPage() {
  return (
    <>
      <PageHero title={`About ${site.name}`} intro="A modern clinic built around comfort, clarity and long-term oral health." crumbs={[{ name: "About", href: "/about" }]} />
      <section className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Our clinic</h2>
            <p className="mt-5 text-lg leading-relaxed">{site.name} is a fictional dental clinic in {site.city}, created to demonstrate how a premium clinic website can present services, dentists and patient information. Replace this introduction with your clinic&rsquo;s real story.</p>
            <p className="mt-4 leading-relaxed">Our patient-focused philosophy is simple: explain clearly, treat gently, and plan care around what matters to you.</p>
            <DemoNote>This text is sample content for demonstration.</DemoNote>
          </div>
          <Photo src={imgSrc("about-clinic")} alt="Reception and waiting area of a modern dental clinic (illustrative image)" label="about-clinic" className="aspect-[4/3] rounded-xl2 shadow-lift" priority />
        </div>
      </section>
      <section className="section bg-mint-50">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {[{ icon: Target, t: "Our mission", d: "To provide safe, comfortable and honest dental care that helps every patient keep a healthy, confident smile." }, { icon: Eye, t: "Our vision", d: "To be the clinic families trust for preventive, restorative and cosmetic care for generations." }].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl2 bg-white p-8 shadow-soft"><Icon className="h-8 w-8 text-teal-600" aria-hidden /><h2 className="mt-4 text-2xl font-semibold">{t}</h2><p className="mt-3 text-ash-500">{d}</p></div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHeading title="Core values" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-xl2 border border-ash-200 p-6"><Icon className="h-7 w-7 text-teal-600" aria-hidden /><h3 className="mt-4 text-lg font-semibold">{t}</h3><p className="mt-2 text-ash-500">{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-ivory">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Facilities and equipment" intro="Sample list. Edit to match the real clinic." />
            <ul className="mt-6 space-y-3">{facilities.map((f) => <li key={f} className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden />{f}</li>)}</ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["about-room-1", "about-room-2", "about-equipment", "about-lounge"].map((n) => (
              <Photo key={n} src={imgSrc(n)} alt="Dental clinic interior (illustrative image)" label={n} className="aspect-square rounded-xl2" sizes="(min-width:1024px) 25vw, 50vw" />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHeading title="Why choose the clinic" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">{whyChoose.map((w) => <li key={w.title} className="rounded-xl2 bg-mint-50 p-5"><p className="font-semibold text-navy-900">{w.title}</p><p className="text-ash-500">{w.text}</p></li>)}</ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
