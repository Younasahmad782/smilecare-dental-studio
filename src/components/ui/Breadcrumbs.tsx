import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export function Breadcrumbs({ items, light }: { items: { name: string; href: string }[]; light?: boolean }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={light ? "text-white/85" : "text-ash-500"}>
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {all.map((it, i) => (
          <li key={it.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-4 w-4" aria-hidden />}
            {i === all.length - 1 ? <span aria-current="page" className="font-semibold">{it.name}</span> : <Link href={it.href} className="underline-offset-4 hover:underline">{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
