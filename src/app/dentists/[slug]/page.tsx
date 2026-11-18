import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, Briefcase, CalendarClock } from "lucide-react";
import { buildMetadata, abs } from "@/lib/seo";
import { site } from "@/lib/site";
import { imgSrc } from "@/lib/images";
import { dentists, dentistBySlug } from "@/data/dentists";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { btn } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/JsonLd";
import { DemoNote } from "@/components/ui/DemoNote";
import { CtaBand } from "@/components/ui/CtaBand";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return dentists.map((d) => ({ slug: d.slug })); }

export async function generateMetadata({ params }: Props) {
  const d = dentistBySlug((await params).slug);
  if (!d) return {};
  return buildMetadata({ title: `${d.name}, ${d.specialty}`, description: `${d.name} (fictional demo profile) is a ${d.specialty.toLowerCase()} dentist at ${site.name}, ${site.city}. ${d.short}`, path: `/dentists/${d.slug}` });
}

export default async function DentistPage({ params }: Props) {
  const d = dentistBySlug((await params).slug);
  if (!d) notFound();
  // Person schema is emitted only for a real clinic (demo profiles are fictional).
  const person = site.demo ? null : { "@context": "https://schema.org", "@type": "Person", name: d.name, jobTitle: d.specialty, worksFor: { "@type": "Dentist", name: site.name }, url: abs(`/dentists/${d.slug}`) };
  return (
    <>
      <JsonLd data={person} />
      <section className="section">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Dentists", href: "/dentists" }, { name: d.name, href: `/dentists/${d.slug}` }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr]">
            <Photo src={imgSrc(d.image)} alt={`Portrait of ${d.name}, fictional demo dentist`} label={d.image} priority className="aspect-[4/5] rounded-xl2 shadow-lift" sizes="(min-width:1024px) 420px, 100vw" />
            <div>
              <p className="w-fit rounded-full bg-ivory px-3 py-1 text-xs font-semibold ring-1 ring-ash-200">Fictional demo profile</p>
              <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{d.name}</h1>
              <p className="mt-2 text-xl font-semibold text-teal-700">{d.specialty}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                <li className="flex gap-3 rounded-xl bg-mint-50 p-4"><Award className="h-5 w-5 shrink-0 text-teal-600" aria-hidden /><span><strong className="block text-navy-900">Qualifications</strong>{d.qualifications}</span></li>
                <li className="flex gap-3 rounded-xl bg-mint-50 p-4"><Briefcase className="h-5 w-5 shrink-0 text-teal-600" aria-hidden /><span><strong className="block text-navy-900">Experience</strong>{d.experience}</span></li>
              </ul>
              <h2 className="mt-8 text-2xl font-semibold">Biography</h2>
              {d.bio.map((p) => <p key={p} className="mt-3 leading-relaxed">{p}</p>)}
              <h2 className="mt-8 text-2xl font-semibold">Areas of focus</h2>
              <ul className="mt-3 flex flex-wrap gap-2">{d.focus.map((f) => <li key={f} className="rounded-full bg-mint-100 px-4 py-1.5 text-sm font-semibold text-teal-700">{f}</li>)}</ul>
              <h2 className="mt-8 text-2xl font-semibold">Consultation information</h2>
              <p className="mt-3 flex gap-3"><CalendarClock className="mt-1 h-5 w-5 shrink-0 text-teal-600" aria-hidden />{d.consultation}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/appointment?dentist=${d.slug}`} className={btn("primary")}>Book Appointment with {d.name.split(" ")[1]}</Link>
                <Link href="/dentists" className={btn("outline")}>All dentists</Link>
              </div>
              <DemoNote>This profile is fictional and exists only to demonstrate the layout.</DemoNote>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
