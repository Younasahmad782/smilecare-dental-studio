import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shows the real photo when /public/images/<name>.* exists (src comes from imgSrc() on the server),
 * otherwise a clearly labelled placeholder. Give the parent an aspect ratio or height via className.
 */
export function Photo({ src, alt, label, priority, sizes, className }: {
  src: string | null; alt: string; label: string; priority?: boolean; sizes?: string; className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-mint-100", className)}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes ?? "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"} className="object-cover" />
      ) : (
        <div role="img" aria-label={alt} className="absolute inset-0 grid place-items-center bg-gradient-to-br from-mint-100 via-white to-mint-200 text-teal-700">
          <div className="px-4 text-center">
            <Camera className="mx-auto h-7 w-7" aria-hidden />
            <p className="mt-2 text-xs font-medium">Image placeholder: {label}</p>
          </div>
        </div>
      )}
    </div>
  );
}
