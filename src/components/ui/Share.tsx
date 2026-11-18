"use client";
import { useState } from "react";
import { Link2, Share2, Check } from "lucide-react";

/** Share links use plain URLs (no third-party scripts). */
export function Share({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 flex items-center gap-1.5 text-sm font-semibold text-navy-900"><Share2 className="h-4 w-4" aria-hidden />Share</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-ash-200 px-4 text-sm font-semibold hover:bg-ash-100">
          {l.label}<span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
      <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard unavailable */ } }}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-ash-200 px-4 text-sm font-semibold hover:bg-ash-100">
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}{copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
