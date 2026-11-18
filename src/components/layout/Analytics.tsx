import Script from "next/script";
import { site } from "@/lib/site";

/** Loads GA4 only when NEXT_PUBLIC_GA_ID is set. Disclosed in the Privacy Policy. */
export function Analytics() {
  if (!site.ga) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.ga}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${site.ga}',{anonymize_ip:true});`}</Script>
    </>
  );
}
