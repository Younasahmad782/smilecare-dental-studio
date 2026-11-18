import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { DemoNote } from "@/components/ui/DemoNote";

export const metadata = buildMetadata({ title: "Book an Appointment", description: `Request a dental appointment at ${site.name}, ${site.city}, by enquiry form or WhatsApp.`, path: "/appointment" });

export default function AppointmentPage() {
  return (
    <>
      <PageHero title="Book an Appointment" intro="Send an enquiry or continue on WhatsApp. The clinic will contact you to confirm a time." crumbs={[{ name: "Book Appointment", href: "/appointment" }]} />
      <section className="section"><div className="wrap max-w-3xl">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-xl2 bg-ash-100" aria-label="Loading form" />}>
          <AppointmentForm />
        </Suspense>
        <DemoNote>Demo: the enquiry form needs email (Resend) or database (Supabase) keys to deliver anything. Without them it will say so instead of pretending to send. See the README.</DemoNote>
        <p className="mt-4 text-sm text-ash-500">In an emergency (severe pain, swelling of the face or neck, difficulty breathing or swallowing, heavy bleeding), seek urgent medical care rather than using this form.</p>
      </div></section>
    </>
  );
}
