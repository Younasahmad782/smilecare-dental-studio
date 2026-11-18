import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#0b2545,#1d4373)", color: "white" }}>
        <div style={{ fontSize: 28, color: "#3cc0c9", display: "flex" }}>Dental clinic · {site.city}, Pakistan</div>
        <div style={{ fontSize: 84, marginTop: 20, fontWeight: 700 }}>{site.name}</div>
        <div style={{ fontSize: 36, marginTop: 20, opacity: 0.85 }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
