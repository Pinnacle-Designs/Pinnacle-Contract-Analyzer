import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt = `${SITE_NAME} — Understand any contract in 60 seconds`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #0b0f1a 0%, #0d1526 45%, #1a2540 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#4fa3ff",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.08,
              maxWidth: 900,
              letterSpacing: "-0.02em",
            }}
          >
            Understand any contract in 60 seconds
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "#a0aec0",
              maxWidth: 820,
            }}
          >
            Plain-English red flags, missing clauses, and negotiation tips — no lawyer required.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#a0aec0",
          }}
        >
          <span>NDAs · Freelance · SaaS · Leases</span>
          <span style={{ color: "#2ea87e" }}>1 free analysis</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
