import { processEnquiry } from "@/lib/enquiry";
import { contactServerSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return processEnquiry(req, "contact", contactServerSchema, (d) =>
    ["New contact message", `Name: ${d.name}`, `Mobile: ${d.mobile || "n/a"}`, `Email: ${d.email || "n/a"}`, `Message: ${d.message}`].join("\n"),
  );
}
