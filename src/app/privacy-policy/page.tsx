import { buildMetadata } from "@/lib/seo";
import { site, agency } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = buildMetadata({ title: "Privacy Policy", description: `How ${site.name} handles personal information submitted through this website.`, path: "/privacy-policy" });

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" crumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
      <section className="section"><div className="wrap max-w-3xl space-y-6 text-lg leading-relaxed [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold">
        <p className="rounded-xl bg-ivory p-4 text-base ring-1 ring-ash-200"><strong>Template notice:</strong> this is a general template for a demonstration website, not legal advice. A real clinic must have it reviewed by a qualified lawyer against applicable Pakistani law before launch.</p>
        <h2>Information we collect</h2>
        <p>If you use the appointment or contact form we collect the details you enter: name, mobile number, optional email, preferred service, dentist, date and time, and any message. Please do not include detailed medical history.</p>
        <h2>How we use it</h2>
        <p>We use it only to respond to your enquiry. Enquiries may be emailed to the clinic and/or stored in a database, depending on how the site is configured. If you choose WhatsApp, your message is sent through WhatsApp and is subject to its own privacy policy.</p>
        <h2>Analytics</h2>
        <p>{site.ga ? "This site uses Google Analytics 4 to understand how pages are used, including events such as enquiry submissions and WhatsApp clicks. We do not send your name, phone number or message to analytics." : "Analytics is not currently enabled. If enabled, Google Analytics 4 will be used to measure page use and key interactions, and this policy will be updated."}</p>
        <h2>Retention and your choices</h2>
        <p>Enquiries are kept only as long as needed to respond and for reasonable administration. Contact the clinic at {site.email} to ask for access to, correction of or deletion of your enquiry.</p>
        <h2>Security</h2>
        <p>Form submissions are validated on the server and transmitted over HTTPS when deployed. No method of transmission is perfectly secure.</p>
        <h2>Website developer</h2>
        <p>{agency.credit}. Developer contact: <a className="underline" href={agency.emailUrl}>{agency.email}</a>. The developer is separate from the clinic and does not receive patient enquiries.</p>
      </div></section>
    </>
  );
}
