import type { Metadata } from "next";
import { Instrument_Serif, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
});
const sans = Archivo({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Ishan Agarwal — Software Engineer",
    template: "%s · Ishan Agarwal",
  },
  description:
    "Final-year NUS Computer Science student. Robotics simulation, backend platforms and applied AI — including six months of digital twin tooling at Hyundai's Singapore R&D centre. Graduating May 2027.",
  metadataBase: new URL("https://ishan-agarwal.com"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Ishan Agarwal — Software Engineer",
    description:
      "Software that has to earn its numbers. NUS CS 2027 · robotics simulation, backend, applied AI.",
    url: "https://ishan-agarwal.com",
    siteName: "Ishan Agarwal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishan Agarwal — Software Engineer",
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
