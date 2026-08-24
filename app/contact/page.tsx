import type { Metadata } from "next";
import { Mail, Link2, FolderGit2, FileDown } from "lucide-react";
import { site } from "@/lib/data";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ishan Agarwal.",
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "The fastest way to reach me. I reply within a day.",
  },
  {
    icon: Link2,
    label: "LinkedIn",
    value: "ishan-agarwal-nus",
    href: site.linkedin,
    note: "For the formal version of everything on this site.",
  },
  {
    icon: FolderGit2,
    label: "GitHub",
    value: "coming soon",
    href: site.github,
    note: "Being cleaned up, repos for the projects here are on their way.",
  },
  {
    icon: FileDown,
    label: "Resume",
    value: "one page, PDF",
    href: site.resume,
    note: "The condensed version, ATS-friendly.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-copper">contact</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Let’s talk.
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          {site.availability}. Based in Singapore. If you’ve read a case study
          and have questions about the messy parts, those are my favourite
          conversations.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {channels.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.06}>
            <a
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="group block h-full border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-copper/60 hover:shadow-md"
            >
              <c.icon size={18} className="text-copper" />
              <div className="mt-3 font-display text-lg font-semibold text-ink group-hover:text-copper">
                {c.label}
              </div>
              <div className="font-mono text-xs text-faint">{c.value}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.note}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
