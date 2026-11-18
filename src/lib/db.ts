import type { Outcome } from "./email";

/** Stores an enquiry in Supabase via REST (no SDK). Table schema: /supabase/schema.sql. */
export async function saveEnquiry(row: Record<string, string | null>): Promise<Outcome> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return "skipped";
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/enquiries`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(row),
    });
    return res.ok ? "ok" : "failed";
  } catch {
    return "failed";
  }
}
