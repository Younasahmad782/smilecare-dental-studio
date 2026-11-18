import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, AlertTriangle, ListOrdered } from "lucide-react";
import { buildMetadata, abs } from "@/lib/seo";
import { site } from "@/lib/site";
import { imgSrc } from "@/lib/images";
import { services, serviceBySlug } from "@/data/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { btn } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }

export async function generateMetadata({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: `${s.title} in ${site.city}`, description: `${s.short} Learn what to expect, benefits, considerations and FAQs.`, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const related = s.related.map(serviceBySlug).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  const serviceSchema = site.demo ? null : { "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.overview, url: abs(`/services/${s.slug}`), provider: { "@type": "Dentist", name: site.name }, areaServed: site.city };

  return (
    <>
      <JsonLd data={[faqSchema, serviceSchema]} />
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 py-12 text-white sm:py-16">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Breadcrumbs light items={[{ name: "Services", href: "/services" }, { name: s.title, href: `/services/${s.slug}` }]} />
            <p className="mt-6 text-sm font-semibold text-teal-400">{s.category} dentistry</p>
            <h1 className="mt-2 text-4xl font-semibold !text-white sm:text-5xl">{s.title}</h1>
            <p className="mt-4 text-lg text-white/85">{s.short}</p>
            <Link href={`/appointment?service=${s.slug}`} className={btn("primary", "mt-8")}>Book an Appointment</Link>
          </div>
          <Photo src={imgSrc(s.image)} alt={`${s.title} (illustrative image)`} label={s.image} priority className="aspect-[4/3] rounded-xl2 shadow-lift" sizes="(min-width:1024px) 50vw, 100vw" />
        </div>
      </section>

      <section className="section"><div className="wrap grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-semibold">Overview</h2>
          <p className="mt-4 text-lg leading-relaxed">{s.overview}</p>
          <h2 className="mt-10 flex items-center gap-2 text-2xl font-semibold"><ListOrdered className="h-6 w-6 text-teal-600" aria-hidden />What to expect</h2>
          <ol className="mt-4 space-y-3">{s.steps.map((st, i) => <li key={st} className="flex gap-4 rounded-xl bg-mint-50 p-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal-600 text-sm font-semibold text-white" aria-hidden>{i + 1}</span><span>{st}</span></li>)}</ol>
          <p className="mt-6 text-sm text-ash-500">General information only. Your dentist will advise on your individual case. Outcomes cannot be guaranteed.</p>
        </div>
        <aside className="space-y-6">
          <div className="rounded-xl2 border border-ash-200 p-6"><h2 className="flex items-center gap-2 text-xl font-semibold"><CheckCircle2 className="h-5 w-5 text-teal-600" aria-hidden />Benefits</h2><ul className="mt-3 list-disc space-y-2 pl-5">{s.benefits.map((b) => <li key={b}>{b}</li>)}</ul></div>
          <div className="rounded-xl2 border border-ash-200 bg-ivory p-6"><h2 className="flex items-center gap-2 text-xl font-semibold"><AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden />Considerations</h2><ul className="mt-3 list-disc space-y-2 pl-5">{s.considerations.map((b) => <li key={b}>{b}</li>)}</ul></div>
        </aside>
      </div></section>

      <section className="section bg-ivory"><div className="wrap max-w-3xl">
        <SectionHeading title={`${s.title}: frequently asked questions`} />
        <div className="mt-8"><Accordion items={s.faqs} /></div>
      </div></section>

      <section className="section"><div className="wrap">
        <SectionHeading title="Related services" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <ServiceCard key={r.slug} service={r} src={imgSrc(r.image)} />)}</div>
      </div></section>
      <CtaBand title={`Interested in ${s.title}?`} note="Send an enquiry and the clinic will contact you to arrange an examination." />
    </>
  );
}
