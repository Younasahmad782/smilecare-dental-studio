"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { DentistCard } from "./DentistCard";
import type { Dentist } from "@/types";
import { cn } from "@/lib/utils";

type Item = { dentist: Dentist; src: string | null };

export function DentistDirectory({ items, specialties }: { items: Item[]; specialties: string[] }) {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState("All");
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter(({ dentist: d }) =>
      (spec === "All" || d.specialty === spec) &&
      (!needle || [d.name, d.specialty, ...d.focus].join(" ").toLowerCase().includes(needle)));
  }, [items, q, spec]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label htmlFor="dentist-search" className="label">Search dentists</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash-500" aria-hidden />
            <input id="dentist-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, specialty or treatment" className="input pl-12" />
          </div>
        </div>
        <fieldset>
          <legend className="label">Filter by specialty</legend>
          <div className="flex flex-wrap gap-2">
            {["All", ...specialties].map((s) => (
              <button key={s} type="button" onClick={() => setSpec(s)} aria-pressed={spec === s}
                className={cn("min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors", spec === s ? "border-navy-900 bg-navy-900 text-white" : "border-ash-200 bg-white text-navy-900 hover:bg-ash-100")}>
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <p className="mt-6 text-sm text-ash-500" role="status" aria-live="polite">{shown.length} {shown.length === 1 ? "dentist" : "dentists"} shown</p>
      {shown.length ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{shown.map((it) => <DentistCard key={it.dentist.slug} dentist={it.dentist} src={it.src} />)}</div>
      ) : (
        <p className="mt-8 rounded-xl2 bg-mint-50 p-8 text-center">No dentists match your search. Clear the search or choose &ldquo;All&rdquo;.</p>
      )}
    </div>
  );
}
