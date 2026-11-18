import Link from "next/link";
import { btn } from "./button";

export function CtaBand({ title = "Ready to Take the First Step Toward a Healthier Smile?", note }: { title?: string; note?: string }) {
  return (
    <section className="section bg-navy-900">
      <div className="wrap text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold !text-white sm:text-4xl">{title}</h2>
        {note && <p className="mx-auto mt-4 max-w-xl text-white/80">{note}</p>}
        <Link href="/appointment" className={btn("primary", "mt-8")}>Book Your Appointment</Link>
      </div>
    </section>
  );
}
