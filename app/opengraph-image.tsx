import { ImageResponse } from "next/og";

export const alt = "Collision — Replace Your Entire Growth Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #123c78 0%, #1f5eff 50%, #57cce9 100%)",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(255,255,255,0.4)",
            }}
          >
            <span style={{ color: "white", fontSize: 28, fontWeight: 700, fontFamily: "Georgia, serif" }}>C</span>
          </div>
          <span style={{ color: "white", fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>collision.</span>
        </div>

        <h1
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: 500,
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            fontFamily: "Georgia, serif",
            maxWidth: 900,
          }}
        >
          Replace your entire{" "}
          <span style={{ color: "#ffe16a" }}>growth stack.</span>
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 24,
            textAlign: "center",
            marginTop: 24,
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          One AI growth intelligence that researches, writes, distributes, and learns across every surface.
        </p>
      </div>
    ),
    { ...size }
  );
}
