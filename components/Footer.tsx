import Link from "next/link";
import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-lg text-ink">
            {site.name}
            <span className="text-copper">.</span>
          </p>
          <p className="mt-1 text-sm text-faint">{site.availability}</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-muted">
          <a href={`mailto:${site.email}`} className="link-und">
            Email
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-und">
            LinkedIn
          </a>
          <a href={site.resume} target="_blank" rel="noreferrer" className="link-und">
            Resume
          </a>
          <Link href="/contact" className="link-und">
            Contact
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-content px-5 pb-8">
        <p className="font-mono text-[11px] text-faint">
          Hand-built with Next.js. Press <span className="kbd">⌘K</span> — or roll the d20.
        </p>
      </div>
    </footer>
  );
}
