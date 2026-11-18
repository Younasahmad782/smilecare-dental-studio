import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { imgSrc } from "@/lib/images";
import { services, serviceCategories } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata = buildMetadata({ title: "Dental Services", description: `General, cosmetic, restorative and specialist dental treatments at ${site.name}, ${site.city}.`, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Dental Services" intro="Patient-friendly information on every treatment we offer. A dentist confirms what is right for you after examination." crumbs={[{ name: "Services", href: "/services" }]} />
      {serviceCategories.map((cat, i) => (
        <section key={cat} className={i % 2 ? "section bg-ash-100" : "section"} aria-labelledby={`cat-${cat}`}>
          <div className="wrap">
            <SectionHeading id={`cat-${cat}`} title={`${cat} dentistry`} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.filter((s) => s.category === cat).map((s) => <ServiceCard key={s.slug} service={s} src={imgSrc(s.image)} />)}
            </div>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
