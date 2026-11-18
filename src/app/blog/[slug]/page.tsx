import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { buildMetadata, abs } from "@/lib/seo";
import { site } from "@/lib/site";
import { imgSrc } from "@/lib/images";
import { posts, postBySlug } from "@/data/posts";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { Share } from "@/components/ui/Share";
import { JsonLd } from "@/components/ui/JsonLd";
import { BlogCard, postMinutes } from "@/components/blog/BlogCard";
import { btn } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: Props) {
  const p = postBySlug((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, type: "article" });
}

export default async function PostPage({ params }: Props) {
  const p = postBySlug((await params).slug);
  if (!p) notFound();
  const related = [...posts.filter((x) => x.slug !== p.slug && x.category === p.category), ...posts.filter((x) => x.slug !== p.slug && x.category !== p.category)].slice(0, 3);
  const url = abs(`/blog/${p.slug}`);
  const article = {
    "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.excerpt, datePublished: p.date, dateModified: p.date,
    mainEntityOfPage: url, author: { "@type": "Organization", name: site.name }, publisher: { "@type": "Organization", name: site.name },
    ...(imgSrc(p.image) ? { image: abs(imgSrc(p.image) as string) } : {}),
  };
  return (
    <>
      <JsonLd data={article} />
      <article className="section">
        <div className="wrap max-w-3xl">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: p.title, href: `/blog/${p.slug}` }]} />
          <p className="mt-8 font-semibold text-teal-700">{p.category}</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">{p.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-4 text-ash-500"><time dateTime={p.date}>{formatDate(p.date)}</time><span className="flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden />{postMinutes(p)} min read</span></p>
          <Photo src={imgSrc(p.image)} alt={`Illustration for the article: ${p.title}`} label={p.image} priority className="mt-8 aspect-[16/9] rounded-xl2" sizes="(min-width:768px) 768px, 100vw" />
          <p className="mt-8 text-xl leading-relaxed text-navy-900">{p.excerpt}</p>
          {p.sections.map((s) => (
            <section key={s.h} className="mt-8">
              <h2 className="text-2xl font-semibold">{s.h}</h2>
              {s.p.map((t) => <p key={t} className="mt-3 text-lg leading-relaxed">{t}</p>)}
            </section>
          ))}
          <aside className="mt-10 rounded-xl2 bg-ivory p-5 text-sm ring-1 ring-ash-200">This article is general education and not a substitute for professional dental advice. If you have pain, swelling or other concerns, see a qualified dentist.</aside>
          <div className="mt-8 border-t border-ash-200 pt-6"><Share url={url} title={p.title} /></div>
          <Link href="/appointment" className={btn("primary", "mt-8")}>Book a check-up</Link>
        </div>
      </article>
      <section className="section bg-ash-100"><div className="wrap">
        <SectionHeading title="Related articles" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <BlogCard key={r.slug} post={r} src={imgSrc(r.image)} />)}</div>
      </div></section>
    </>
  );
}
