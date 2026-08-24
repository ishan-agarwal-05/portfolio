import Link from "next/link";
import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-2xl italic text-ink">
            Ishan Agarwal<span className="not-italic text-copper">.</span>
          </p>
          <p className="microlabel mt-1.5">{site.availability}</p>
        </div>
        <div className="flex flex-wrap gap-5 font-mono text-[12px] uppercase tracking-wider text-muted">
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-copper">
            Email
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-copper">
            LinkedIn
          </a>
          <a href={site.resume} target="_blank" rel="noreferrer" className="transition-colors hover:text-copper">
            Resume
          </a>
          <Link href="/contact" className="transition-colors hover:text-copper">
            Contact
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-content px-5 pb-8">
        <p className="font-mono text-[11px] text-faint">
          Hand-built with Next.js. Press <span className="kbd">⌘K</span>, or roll the d20.
        </p>
      </div>
    </footer>
  );
}
