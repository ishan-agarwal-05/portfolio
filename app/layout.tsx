import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz"],
});
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Ishan Agarwal — Software Engineer",
    template: "%s · Ishan Agarwal",
  },
  description:
    "Final-year NUS Computer Science student. Backend, platform and applied AI — including six months of digital twin simulation tooling at Hyundai's Singapore R&D centre. Graduating May 2027.",
  metadataBase: new URL("https://ishanagarwal.dev"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Ishan Agarwal — Software Engineer",
    description:
      "Software that has to earn its numbers. NUS CS 2027 · robotics simulation, backend, applied AI.",
    type: "website",
  },
};

const themeScript = `
try {
  const saved = localStorage.getItem('theme');
  const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (dark) document.documentElement.classList.add('dark');
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} grain font-sans`}
      >
        <Nav />
        <CommandPalette />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
