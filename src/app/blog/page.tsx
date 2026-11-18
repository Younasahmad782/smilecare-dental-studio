import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { imgSrc } from "@/lib/images";
import { posts, postCategories } from "@/data/posts";
import { PageHero } from "@/components/ui/PageHero";
import { BlogList } from "@/components/blog/BlogList";

export const metadata = buildMetadata({ title: "Dental Health Blog", description: `Practical, medically responsible oral health advice from ${site.name}: prevention, treatments and family dental care.`, path: "/blog" });

export default function BlogPage() {
  const items = [...posts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => ({ post, src: imgSrc(post.image) }));
  return (
    <>
      <PageHero title="Dental Health Blog" intro="General oral-health education. It does not replace advice from your dentist." crumbs={[{ name: "Blog", href: "/blog" }]} />
      <section className="section"><div className="wrap"><BlogList items={items} categories={postCategories} /></div></section>
    </>
  );
}
