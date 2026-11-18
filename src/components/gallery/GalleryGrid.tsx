"use client";
import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

type Item = { id: string; category: string; title: string; image: string; src: string | null };

export function GalleryGrid({ items, categories }: { items: Item[]; categories: string[] }) {
  const [cat, setCat] = useState("All");
  const shown = items.filter((i) => cat === "All" || i.category === cat);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by treatment">
        {["All", ...categories].map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={cn("min-h-11 rounded-full border px-4 text-sm font-semibold", cat === c ? "border-navy-900 bg-navy-900 text-white" : "border-ash-200 bg-white text-navy-900 hover:bg-ash-100")}>{c}</button>
        ))}
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((i) => (
          <li key={i.id}>
            <figure className="overflow-hidden rounded-xl2 border border-ash-200 bg-white shadow-soft">
              <Photo src={i.src} alt={`${i.title}: illustrative ${i.category.toLowerCase()} image`} label={i.image} className="aspect-square" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
              <figcaption className="p-4"><p className="font-semibold text-navy-900">{i.title}</p><p className="text-sm text-ash-500">{i.category}</p></figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
