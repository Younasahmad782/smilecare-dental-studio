"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { BlogCard } from "./BlogCard";
import type { Post } from "@/types";
import { cn } from "@/lib/utils";

export function BlogList({ items, categories }: { items: { post: Post; src: string | null }[]; categories: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const shown = useMemo(() => {
    const n = q.trim().toLowerCase();
    return items.filter(({ post: p }) => (cat === "All" || p.category === cat) && (!n || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(n)));
  }, [items, q, cat]);
  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label htmlFor="blog-search" className="label">Search articles</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash-500" aria-hidden />
            <input id="blog-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. root canal, sensitivity" className="input pl-12" />
          </div>
        </div>
        <fieldset>
          <legend className="label">Category</legend>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
                className={cn("min-h-11 rounded-full border px-4 text-sm font-semibold", cat === c ? "border-navy-900 bg-navy-900 text-white" : "border-ash-200 bg-white text-navy-900 hover:bg-ash-100")}>{c}</button>
            ))}
          </div>
        </fieldset>
      </div>
      <p className="mt-6 text-sm text-ash-500" role="status" aria-live="polite">{shown.length} {shown.length === 1 ? "article" : "articles"} shown</p>
      {shown.length ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{shown.map(({ post, src }) => <BlogCard key={post.slug} post={post} src={src} />)}</div>
      ) : <p className="mt-8 rounded-xl2 bg-mint-50 p-8 text-center">No articles match. Try a different word or category.</p>}
    </div>
  );
}
