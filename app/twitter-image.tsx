import { ImageResponse } from "next/og";

export const alt = "Collision — The AI that represents you online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FDF6E9",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #00000012 2%, transparent 0%), radial-gradient(circle at 75px 75px, #00000012 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: "9999px",
              border: "3px solid #14151A",
              background: "#3B6CFF",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
            }}
          >
            🏎️
          </div>
          <div style={{ fontSize: 34, fontWeight: 900, color: "#14151A", letterSpacing: "-0.03em" }}>
            Collision
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 74,
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "#14151A",
            maxWidth: 980,
          }}
        >
          The AI that represents you online.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 30,
            fontWeight: 500,
            color: "#4B4B55",
            maxWidth: 900,
          }}
        >
          Writes, replies, engages, and keeps your online presence alive while you build.
        </div>
      </div>
    ),
    { ...size }
  );
}
