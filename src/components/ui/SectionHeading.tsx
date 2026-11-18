import { cn } from "@/lib/utils";

export function SectionHeading({ title, intro, center, id, light }: { title: string; intro?: string; center?: boolean; id?: string; light?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <h2 id={id} className={cn("text-3xl font-semibold leading-tight sm:text-4xl", light && "!text-white")}>{title}</h2>
      {intro && <p className={cn("mt-4 text-lg leading-relaxed", light ? "text-white/85" : "text-ash-500")}>{intro}</p>}
    </div>
  );
}
