import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Meditation with a Monk in a Park";
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
          background: "#FAF4EA",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background circles */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(232,104,26,0.12)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(94,115,85,0.10)", display: "flex" }} />

        {/* Orange top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: "#E8681A", display: "flex" }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "0 80px", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8681A", display: "flex" }}>
            EVERY THURSDAY · 18:30 · LINKÖPING · FREE
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.05, color: "#2A2118", letterSpacing: "-0.01em", fontWeight: 400, display: "flex", textAlign: "center" }}>
            Meditation with a Monk in a Park
          </div>
          <div style={{ fontSize: 24, color: "#5B5044", display: "flex" }}>
            yogamonastery.org
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
