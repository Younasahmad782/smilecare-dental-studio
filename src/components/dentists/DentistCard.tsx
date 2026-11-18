import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { btn } from "@/components/ui/button";
import type { Dentist } from "@/types";

export function DentistCard({ dentist, src }: { dentist: Dentist; src: string | null }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl2 border border-ash-200 bg-white shadow-soft">
      <Photo src={src} alt={`Portrait of ${dentist.name}, fictional demo dentist`} label={dentist.image} className="aspect-[4/5]" />
      <div className="flex flex-1 flex-col p-6">
        <p className="w-fit rounded-full bg-ivory px-3 py-1 text-xs font-semibold text-ash-700 ring-1 ring-ash-200">Fictional demo profile</p>
        <h3 className="mt-3 text-xl font-semibold">{dentist.name}</h3>
        <p className="font-semibold text-teal-700">{dentist.specialty}</p>
        <dl className="mt-3 space-y-1 text-sm">
          <div><dt className="inline font-semibold text-navy-900">Qualifications: </dt><dd className="inline">{dentist.qualifications}</dd></div>
          <div><dt className="inline font-semibold text-navy-900">Experience: </dt><dd className="inline">{dentist.experience}</dd></div>
        </dl>
        <p className="mt-3 flex-1 text-ash-500">{dentist.short}</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Link href={`/dentists/${dentist.slug}`} className={btn("outline", "!px-4 text-sm")}>View Profile<span className="sr-only"> of {dentist.name}</span></Link>
          <Link href={`/appointment?dentist=${dentist.slug}`} className={btn("primary", "!px-4 text-sm")}>Book Appointment</Link>
        </div>
      </div>
    </article>
  );
}
