type Params = Record<string, string | number | boolean | undefined>;
declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}
/** Sends a GA4 event only when GA is loaded. Never send personal data (names, phone numbers, messages). */
export function track(event: string, params: Params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") window.gtag("event", event, params);
}
