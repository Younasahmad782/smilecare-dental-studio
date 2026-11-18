import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import type { Service } from "@/types";

export function ServiceCard({ service, src }: { service: Service; src: string | null }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl2 border border-ash-200 bg-white shadow-soft transition-shadow hover:shadow-lift">
      <Photo src={src} alt={`${service.title} at SmileCare Dental Studio (illustrative image)`} label={service.image} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold">{service.title}</h3>
        <p className="mt-2 flex-1 text-ash-500">{service.short}</p>
        <Link href={`/services/${service.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-semibold text-teal-700 hover:underline">
          Learn More<span className="sr-only"> about {service.title}</span> <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
