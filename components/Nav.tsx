"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Command } from "lucide-react";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Beyond", href: "/#beyond" },
  { label: "Ask", href: "/ask" },
  { label: "Fit", href: "/fit" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-content items-center justify-between px-5 py-3">
        <Link href="/#top" className="font-display text-xl italic text-ink">
          Ishan Agarwal<span className="not-italic text-copper">.</span>
        </Link>
        <div className="hidden items-center gap-5 font-mono text-[12px] uppercase tracking-wider text-muted sm:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-copper">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Open command palette"
            onClick={() => window.dispatchEvent(new CustomEvent("open-palette"))}
            className="flex items-center gap-1.5 border border-line px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-copper hover:text-copper"
          >
            <Command size={11} />
            K
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
