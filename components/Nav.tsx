"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Command } from "lucide-react";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Beyond", href: "/#beyond" },
  { label: "Fit check", href: "/fit" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-content items-center justify-between px-5 py-3">
        <Link
          href="/#top"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          IA<span className="text-copper">.</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-muted sm:flex">
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
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-copper hover:text-copper"
          >
            <Command size={12} />
            <span className="hidden sm:inline">K</span>
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
