/**
 * Urdu-ready architecture (NOT yet translated).
 * To add Urdu: move to app/[locale]/..., load a dictionary per locale, set <html lang dir>,
 * and add an Urdu font (e.g. Noto Nastaliq Urdu via next/font). Tailwind logical utilities
 * (ms-*, me-*, ps-*, pe-*, text-start) should be preferred in new components.
 */
export const locales = {
  en: { dir: "ltr", label: "English", htmlLang: "en-PK" },
  ur: { dir: "rtl", label: "اردو", htmlLang: "ur-PK" },
} as const;
export type Locale = keyof typeof locales;
export const defaultLocale: Locale = "en";
