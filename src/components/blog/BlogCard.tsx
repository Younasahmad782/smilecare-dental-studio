import Link from "next/link";
import { Clock } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { formatDate, readingTime } from "@/lib/utils";
import type { Post } from "@/types";

export const postMinutes = (p: Post) => readingTime(p.sections.flatMap((s) => s.p).join(" "));

export function BlogCard({ post, src }: { post: Post; src: string | null }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl2 border border-ash-200 bg-white shadow-soft transition-shadow hover:shadow-lift">
      <Photo src={src} alt={`Illustration for the article: ${post.title}`} label={post.image} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-teal-700">{post.category}</p>
        <h3 className="mt-1 text-xl font-semibold"><Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link></h3>
        <p className="mt-2 flex-1 text-ash-500">{post.excerpt}</p>
        <p className="mt-4 flex items-center gap-3 text-sm text-ash-500"><time dateTime={post.date}>{formatDate(post.date)}</time><span className="flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden />{postMinutes(post)} min read</span></p>
      </div>
    </article>
  );
}
