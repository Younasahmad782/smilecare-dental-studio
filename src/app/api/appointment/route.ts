import { processEnquiry } from "@/lib/enquiry";
import { appointmentServerSchema } from "@/lib/validation";
import { services } from "@/data/services";
import { dentists } from "@/data/dentists";
import { formatPkMobile } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return processEnquiry(req, "appointment", appointmentServerSchema, (d) =>
    [
      "New appointment ENQUIRY (not a confirmed booking)",
      `Name: ${d.name}`, `Mobile: ${formatPkMobile(String(d.mobile))}`, `Email: ${d.email || "n/a"}`,
      `Service: ${services.find((s) => s.slug === d.service)?.title ?? "Not sure yet"}`,
      `Dentist: ${dentists.find((x) => x.slug === d.dentist)?.name ?? "No preference"}`,
      `Preferred: ${d.date}, ${d.time}`, `Message: ${d.message || "n/a"}`,
    ].join("\n"),
  );
}
