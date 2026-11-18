import { cn } from "@/lib/utils";

const base = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";
const variants = {
  primary: "bg-teal-600 text-white hover:bg-teal-700 shadow-soft",
  navy: "bg-navy-900 text-white hover:bg-navy-800",
  outline: "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
  light: "bg-white text-navy-900 hover:bg-mint-100",
  ghostLight: "border-2 border-white/70 text-white hover:bg-white hover:text-navy-900",
  whatsapp: "bg-[#0a7a3d] text-white hover:bg-[#086632]",
} as const;

/** Class helper so <Link>, <a> and <button> share one button style. */
export const btn = (variant: keyof typeof variants = "primary", extra?: string) => cn(base, variants[variant], extra);
