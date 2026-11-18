"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, CalendarCheck } from "lucide-react";
import { nav, site } from "@/lib/site";
import { btn } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ash-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="wrap flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 font-display text-xl font-semibold text-white" aria-hidden>S</span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-navy-900">{site.shortName}</span>
            <span className="block text-xs text-ash-500">Dental Studio</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined}
                  className={cn("rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors", isActive(n.href) ? "bg-mint-100 text-teal-700" : "text-ash-700 hover:bg-ash-100 hover:text-navy-900")}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/appointment" className={btn("primary", "hidden !min-h-11 !px-5 !py-2 sm:inline-flex")}>
            <CalendarCheck className="h-4 w-4" aria-hidden /> Book Appointment
          </Link>
          <button ref={toggleRef} type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"} className="grid h-12 w-12 place-items-center rounded-full text-navy-900 hover:bg-ash-100 lg:hidden">
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-ash-200 bg-white lg:hidden">
        <nav aria-label="Mobile" className="wrap py-4">
          <ul className="grid gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined}
                  className={cn("flex min-h-12 items-center rounded-xl px-4 text-base font-medium", isActive(n.href) ? "bg-mint-100 text-teal-700" : "text-navy-900 hover:bg-ash-100")}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/appointment" className={btn("primary", "mt-4 w-full")}>Book Appointment</Link>
        </nav>
      </div>
    </header>
  );
}
