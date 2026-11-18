import { ChevronDown } from "lucide-react";
import type { Faq } from "@/types";

/** Native <details>: keyboard and screen-reader accessible with zero JavaScript. */
export function Accordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-ash-200 rounded-xl2 border border-ash-200 bg-white">
      {items.map((it) => (
        <details key={it.q} className="group px-5 py-1 sm:px-7">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-3 text-left text-base font-semibold text-navy-900 sm:text-lg">
            {it.q}
            <ChevronDown className="chev h-5 w-5 shrink-0 text-teal-600 transition-transform" aria-hidden />
          </summary>
          <p className="pb-5 pr-8 leading-relaxed">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
