import { readFile } from "fs/promises";
import path from "path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const colors = {
  paper: "#FAFAF6",
  ink: "#111110",
  muted: "#52524E",
  line: "#DADAD2",
  accent: "#D8340B",
};

async function fonts() {
  const dir = path.join(process.cwd(), "assets/og");
  const load = (f: string) => readFile(path.join(dir, f));
  const [serif, serifItalic, mono, sans] = await Promise.all([
    load("Newsreader-Medium.ttf"),
    load("Newsreader-MediumItalic.ttf"),
    load("JetBrainsMono-Medium.ttf"),
    load("HankenGrotesk-Regular.ttf"),
  ]);
  return [
    { name: "Serif", data: serif, style: "normal" as const, weight: 500 as const },
    { name: "Serif", data: serifItalic, style: "italic" as const, weight: 500 as const },
    { name: "Mono", data: mono, style: "normal" as const, weight: 500 as const },
    { name: "Sans", data: sans, style: "normal" as const, weight: 400 as const },
  ];
}

const label = {
  fontFamily: "Mono",
  fontSize: 20,
  letterSpacing: 2,
  textTransform: "uppercase" as const,
  color: colors.muted,
};

function Frame({ top, children, footer }: { top: [string, string]; children: React.ReactNode; footer: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: colors.paper,
        padding: "56px 64px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", ...label }}>
        <span>{top[0]}</span>
        <span>{top[1]}</span>
      </div>
      {children}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: `2px solid ${colors.ink}`,
          paddingTop: 22,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Serif", fontSize: 34, color: colors.ink }}>Ishan Agarwal</div>
          <div style={{ fontFamily: "Sans", fontSize: 22, color: colors.muted }}>{footer}</div>
        </div>
        <div style={{ width: 180, height: 12, background: colors.accent }} />
      </div>
    </div>
  );
}

export async function siteCard() {
  return new ImageResponse(
    (
      <Frame top={["ishan-agarwal.com", "NUS CS · 2027"]} footer="Graduating May 2027 · Singapore">
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Serif", fontSize: 62, lineHeight: 1.12, color: colors.ink, maxWidth: 1060 }}>
          <div>Final-year computer science at NUS.</div>
          <div style={{ color: colors.muted }}>Four internships, most recently six months at Hyundai.</div>
        </div>
      </Frame>
    ),
    { ...ogSize, fonts: await fonts() }
  );
}

export async function articleCard(a: {
  kind: "work" | "project";
  title: string;
  org: string;
  period: string;
  metric?: { value: string; label: string };
}) {
  const titleSize = a.title.length > 40 ? 64 : a.title.length > 24 ? 76 : 92;
  return new ImageResponse(
    (
      <Frame
        top={[`ishan-agarwal.com/${a.kind === "work" ? "work" : "projects"}`, a.period]}
        footer={a.org}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Serif", fontSize: titleSize, lineHeight: 1.04, color: colors.ink, maxWidth: 1000 }}>
            {a.title}
          </div>
          {a.metric && (
            <div style={{ display: "flex", alignItems: "baseline", marginTop: 28 }}>
              <span style={{ fontFamily: "Mono", fontSize: 38, color: colors.accent }}>{a.metric.value}</span>
              <span style={{ fontFamily: "Sans", fontSize: 24, color: colors.muted, marginLeft: 18, maxWidth: 760 }}>
                {a.metric.label}
              </span>
            </div>
          )}
        </div>
      </Frame>
    ),
    { ...ogSize, fonts: await fonts() }
  );
}
