import { Info } from "lucide-react";
import { site } from "@/lib/site";

/** Small notice shown only while NEXT_PUBLIC_DEMO_MODE !== "false". */
export function DemoNote({ children }: { children: React.ReactNode }) {
  if (!site.demo) return null;
  return (
    <p className="mt-4 flex items-start gap-2 rounded-xl bg-ivory px-4 py-3 text-sm text-ash-700 ring-1 ring-ash-200">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
