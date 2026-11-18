import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { imgSrc } from "@/lib/images";
import { galleryItems, galleryCategories } from "@/data/content";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata = buildMetadata({ title: "Smile Gallery", description: `Illustrative images of dental treatments offered at ${site.name}.`, path: "/gallery" });

export default function GalleryPage() {
  const items = galleryItems.map((i) => ({ ...i, src: imgSrc(i.image) }));
  return (
    <>
      <PageHero title="Smile Gallery" intro="A visual look at the treatments we offer." crumbs={[{ name: "Gallery", href: "/gallery" }]} />
      <section className="section"><div className="wrap">
        <GalleryGrid items={items} categories={[...galleryCategories]} />
        <p className="mt-8 rounded-xl bg-ivory p-4 text-sm ring-1 ring-ash-200">These are illustrative images used to demonstrate the layout. They do not show actual patient results. Individual outcomes vary. Use real before-and-after photos only with written patient consent.</p>
      </div></section>
      <CtaBand />
    </>
  );
}
