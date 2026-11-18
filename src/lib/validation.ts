import { z } from "zod";
import { normalizePkMobile } from "./utils";
import { services } from "@/data/services";
import { dentists } from "@/data/dentists";

export const TIME_SLOTS = ["09:00 – 11:00", "11:00 – 13:00", "14:00 – 16:00", "16:00 – 18:00", "18:00 – 20:00"] as const;

const name = z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long")
  .regex(/^[\p{L}\p{M}\s.'-]+$/u, "Name contains characters we cannot accept");
const mobile = z.string().trim().min(1, "Mobile number is required")
  .refine((v) => normalizePkMobile(v) !== null, "Enter a valid Pakistani mobile number, e.g. 0300 1234567");
const optionalEmail = z.string().trim().max(120).refine((v) => v === "" || z.string().email().safeParse(v).success, "Enter a valid email address").optional();
const message = z.string().trim().max(500, "Please keep your message under 500 characters").optional();

function validDate(v: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const t = Date.parse(`${v}T00:00:00Z`);
  if (Number.isNaN(t)) return false;
  const day = 86_400_000;
  const today = Math.floor(Date.now() / day) * day;
  return t >= today - day && t <= today + 120 * day; // 1-day tolerance for timezones
}

/** Shared by the browser (React Hook Form) and the API route, so rules cannot drift apart. */
export const appointmentSchema = z.object({
  name, mobile, email: optionalEmail,
  service: z.string().min(1, "Please choose a dental service").refine((v) => services.some((s) => s.slug === v) || v === "not-sure", "Unknown service"),
  dentist: z.string().min(1, "Please choose an option").refine((v) => v === "any" || dentists.some((d) => d.slug === v), "Unknown dentist"),
  date: z.string().min(1, "Please choose a preferred date").refine(validDate, "Choose a date within the next 120 days"),
  time: z.string().min(1, "Please choose a preferred time").refine((v) => (TIME_SLOTS as readonly string[]).includes(v), "Choose one of the listed time slots"),
  message,
});
export type AppointmentValues = z.infer<typeof appointmentSchema>;

export const contactSchema = z.object({
  name, mobile: z.string().trim().refine((v) => v === "" || normalizePkMobile(v) !== null, "Enter a valid Pakistani mobile number").optional(),
  email: optionalEmail,
  message: z.string().trim().min(10, "Please write at least 10 characters").max(1000, "Please keep your message under 1000 characters"),
}).refine((d) => Boolean(d.mobile) || Boolean(d.email), { path: ["mobile"], message: "Provide a mobile number or an email so the clinic can reply" });
export type ContactValues = z.infer<typeof contactSchema>;

/** Server-side extensions: honeypot ("website") and render timestamp ("ts"). */
const trap = { website: z.string().max(200).optional(), ts: z.number() };
export const appointmentServerSchema = z.object({ ...appointmentSchema.shape, ...trap });
export const contactServerSchema = z.object({ ...contactSchema.innerType().shape, ...trap })
  .refine((d) => Boolean(d.mobile) || Boolean(d.email), { path: ["mobile"], message: "Provide a mobile number or an email" });
