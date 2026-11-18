import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = buildMetadata({ title: "Terms and Conditions", description: `Terms of use for the ${site.name} website.`, path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms and Conditions" crumbs={[{ name: "Terms", href: "/terms" }]} />
      <section className="section"><div className="wrap max-w-3xl space-y-6 text-lg leading-relaxed [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold">
        <p className="rounded-xl bg-ivory p-4 text-base ring-1 ring-ash-200"><strong>Template notice:</strong> general template for a demonstration website, not legal advice. Have it reviewed by a qualified lawyer before use by a real clinic.</p>
        <h2>Demonstration content</h2>
        <p>{site.demo ? `${site.name} is a fictional clinic. Dentists, testimonials, addresses and contact details are samples and do not describe a real healthcare provider.` : "Replace this section with your clinic's registration and licensing details."}</p>
        <h2>General information only</h2>
        <p>Content on this website, including service pages and blog articles, is general education and not medical advice, diagnosis or treatment. Results vary between individuals and are not guaranteed.</p>
        <h2>Appointments</h2>
        <p>Submitting a form or WhatsApp message is an enquiry. An appointment exists only when the clinic confirms a date and time with you directly.</p>
        <h2>Fees</h2>
        <p>Treatment fees are not published on this website. They are confirmed by the clinic after examination.</p>
        <h2>Emergencies</h2>
        <p>This website is not for emergencies. If you have severe pain, facial swelling or difficulty breathing or swallowing, seek urgent medical care.</p>
        <h2>Changes</h2>
        <p>These terms may be updated from time to time.</p>
      </div></section>
    </>
  );
}
