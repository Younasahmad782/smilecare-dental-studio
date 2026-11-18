export type Outcome = "ok" | "failed" | "skipped";

/** Sends via Resend's REST API (no SDK). Returns "skipped" when env vars are missing. */
export async function sendEmail(opts: { subject: string; text: string; replyTo?: string }): Promise<Outcome> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;
  if (!key || !from || !to) return "skipped";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject: opts.subject, text: opts.text, reply_to: opts.replyTo }),
    });
    return res.ok ? "ok" : "failed";
  } catch {
    return "failed";
  }
}
