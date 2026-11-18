export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Accepts 0300 1234567, 03001234567, +92 300 1234567, 0092-300-1234567. Returns +923001234567 or null. */
export function normalizePkMobile(input: string): string | null {
  const digits = input.replace(/[\s\-().]/g, "");
  const m = digits.match(/^(?:\+92|0092|92|0)?(3\d{9})$/);
  return m ? `+92${m[1]}` : null;
}

/** Formats a valid Pakistani mobile as 0300 1234567. Returns input unchanged if invalid. */
export function formatPkMobile(input: string): string {
  const n = normalizePkMobile(input);
  if (!n) return input;
  const local = n.slice(3);
  return `0${local.slice(0, 3)} ${local.slice(3)}`;
}

export const formatPKR = (amount: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(amount);

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

export const readingTime = (text: string) => Math.max(1, Math.round(text.split(/\s+/).length / 200));

export function waLink(number: string, text: string) {
  const q = `text=${encodeURIComponent(text)}`;
  return number ? `https://wa.me/${number}?${q}` : `https://wa.me/?${q}`;
}
