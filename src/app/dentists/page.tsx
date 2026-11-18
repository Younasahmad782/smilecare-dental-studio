import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { imgSrc } from "@/lib/images";
import { dentists, specialties } from "@/data/dentists";
import { PageHero } from "@/components/ui/PageHero";
import { DentistDirectory } from "@/components/dentists/DentistDirectory";
import { DemoNote } from "@/components/ui/DemoNote";

export const metadata = buildMetadata({ title: "Our Dentists", description: `Meet the dentists at ${site.name} in ${site.city}. Search by name or filter by specialty.`, path: "/dentists" });

export default function DentistsPage() {
  const items = dentists.map((dentist) => ({ dentist, src: imgSrc(dentist.image) }));
  return (
    <>
      <PageHero title="Our Dentists" intro="Search the team or filter by specialty." crumbs={[{ name: "Dentists", href: "/dentists" }]} />
      <section className="section"><div className="wrap">
        <DentistDirectory items={items} specialties={specialties} />
        <DemoNote>All dentists, qualifications and experience shown here are fictional sample content.</DemoNote>
      </div></section>
    </>
  );
}
