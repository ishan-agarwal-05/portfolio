"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/lib/data";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Honours", href: "/#honours" },
  { label: "Beyond", href: "/#beyond" },
  { label: "Ask", href: "/ask" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // lock scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-content items-center justify-between px-5 py-3">
        <Link
          href="/#top"
          onClick={() => setOpen(false)}
          className="font-display text-xl italic text-ink"
        >
          Ishan Agarwal<span className="not-italic text-copper">.</span>
        </Link>

        <div className="hidden items-center gap-5 font-mono text-[12px] uppercase tracking-wider text-muted sm:flex">
          {links.slice(0, 5).map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-copper">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden border border-line px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-copper hover:text-copper sm:block"
          >
            Resume
          </a>
          <button
            aria-label="Open command palette"
            onClick={() => window.dispatchEvent(new CustomEvent("open-palette"))}
            className="hidden items-center gap-1.5 border border-line px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-copper hover:text-copper sm:flex"
          >
            <Command size={11} />K
          </button>
          <ThemeToggle />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="border border-line p-2 text-muted transition-colors hover:border-copper hover:text-copper sm:hidden"
          >
            {open ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-t border-line bg-paper sm:hidden"
          >
            <ul className="mx-auto max-w-content px-5 py-3">
              {links.map((l) => (
                <li key={l.href} className="border-b border-line/70 last:border-0">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3.5 font-mono text-[13px] uppercase tracking-wider text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="block border border-ink px-4 py-3 text-center font-mono text-[13px] uppercase tracking-wider text-ink"
                >
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
