"use client";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { waLink } from "@/lib/utils";
import { track } from "@/lib/analytics";

/** Floating clinic WhatsApp button. Uses the CLINIC number only, never the agency number. */
export function WhatsAppFloat() {
  const href = waLink(site.whatsapp, `Hello ${site.name}, I would like to enquire about an appointment.`);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "floating_button" })}
      aria-label="Chat with the clinic on WhatsApp (opens in a new tab)"
      className="fixed bottom-4 right-4 z-50 flex h-14 items-center gap-2 rounded-full bg-[#0a7a3d] px-4 text-white shadow-lift transition-colors hover:bg-[#086632] sm:bottom-6 sm:right-6 sm:px-5">
      <MessageCircle className="h-6 w-6" aria-hidden />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
