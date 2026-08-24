import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ishan Agarwal — Software Engineer";
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
          justifyContent: "space-between",
          background: "#FAFAF6",
          padding: 64,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#52524E",
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          <span>ishan-agarwal.com</span>
          <span>NUS CS · 2027</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, color: "#111110", lineHeight: 1.02 }}>
            Software that
          </div>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1.02 }}>
            <span style={{ color: "#D8340B", fontStyle: "italic" }}>earns</span>
            <span style={{ color: "#111110" }}>&nbsp;its numbers.</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, color: "#111110" }}>Ishan Agarwal</div>
            <div style={{ fontSize: 22, color: "#52524E" }}>
              Robotics simulation · Backend · Applied AI
            </div>
          </div>
          <div style={{ width: 220, height: 12, background: "#D8340B" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
