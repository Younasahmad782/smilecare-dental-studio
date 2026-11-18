import { NextResponse } from "next/server";
import type { z } from "zod";
import { rateLimit } from "./rate-limit";
import { sendEmail } from "./email";
import { saveEnquiry } from "./db";
import { normalizePkMobile } from "./utils";

type Payload = Record<string, string | number | undefined>;
const json = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status });

/**
 * Shared, server-side pipeline for appointment + contact enquiries:
 * origin check -> rate limit -> JSON parse -> Zod validation -> honeypot/timing -> Supabase + Resend.
 * Never reports success unless at least one real delivery channel succeeded.
 */
export async function processEnquiry(req: Request, kind: "appointment" | "contact", schema: z.ZodTypeAny, toText: (d: Payload) => string) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ ok: false, error: "Request blocked." }, 403);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`${kind}:${ip}`, 5, 10 * 60_000)) {
    return json({ ok: false, error: "Too many requests. Please wait a few minutes or use WhatsApp." }, 429);
  }

  let body: unknown;
  try { body = await req.json(); } catch { return json({ ok: false, error: "Invalid request." }, 400); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors }, 422);
  }
  const d = parsed.data as Payload;

  // Spam traps: bots fill the hidden field or submit instantly. Respond neutrally, deliver nothing.
  if (d.website || Date.now() - Number(d.ts) < 3000) return json({ ok: true, delivered: false });

  const mobile = typeof d.mobile === "string" && d.mobile ? normalizePkMobile(d.mobile) : null;
  const text = toText(d);
  const [db, mail] = await Promise.all([
    saveEnquiry({
      kind, name: String(d.name), mobile, email: (d.email as string) || null,
      service: (d.service as string) || null, dentist: (d.dentist as string) || null,
      preferred_date: (d.date as string) || null, preferred_time: (d.time as string) || null,
      message: (d.message as string) || null,
    }),
    sendEmail({ subject: `New ${kind} enquiry from ${d.name}`, text, replyTo: (d.email as string) || undefined }),
  ]);

  if (db === "skipped" && mail === "skipped") {
    return json({ ok: false, code: "not_configured", error: "Online enquiries are not enabled on this demo. Please continue via WhatsApp." }, 503);
  }
  if (db !== "ok" && mail !== "ok") {
    return json({ ok: false, error: "We could not send your enquiry. Please try WhatsApp or call the clinic." }, 502);
  }
  return json({ ok: true, delivered: true });
}
