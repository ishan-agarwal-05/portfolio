import Link from "next/link";
import { now } from "@/lib/data";
import Reveal from "./Reveal";

export default function NowSection() {
  return (
    <section id="now" className="mx-auto max-w-content px-5 py-16">
      <Reveal>
        <div className="border-t border-line pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl italic text-ink">Currently</h2>
            <span className="microlabel">updated {now.updated}</span>
          </div>
          <div className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {now.items.map((n) => (
              <div key={n.label} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-copper" />
                <p className="text-sm leading-relaxed text-muted">
                  <span className="text-ink">{n.label}.</span> {n.body}{" "}
                  {n.href && (
                    <Link href={n.href} className="font-mono text-[11px] text-copper link-und">
                      read more
                    </Link>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
