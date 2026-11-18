import Link from "next/link";
import { btn } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap max-w-xl text-center">
        <p className="font-display text-7xl text-teal-600">404</p>
        <h1 className="mt-4 text-3xl font-semibold">This page could not be found</h1>
        <p className="mt-3 text-ash-500">The link may be outdated or mistyped. Try one of these instead.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={btn("primary")}>Back to home</Link>
          <Link href="/services" className={btn("outline")}>View services</Link>
        </div>
      </div>
    </section>
  );
}
