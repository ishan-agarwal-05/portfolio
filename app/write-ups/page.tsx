import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articlePath, articles } from "@/lib/data";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Write-ups",
  description: "Longer write-ups of Ishan Agarwal's internships and projects.",
};

const groups = [
  { label: "From internships", items: articles.filter((c) => c.kind === "work") },
  { label: "Projects", items: articles.filter((c) => c.kind === "project") },
];

export default function WriteUpsPage() {
  return (
    <div className="mx-auto max-w-content px-5 pb-24 pt-32">
      <Reveal>
        <p className="microlabel text-copper">write-ups</p>
        <h1 className="display-tight mt-3 font-display text-5xl text-ink sm:text-6xl">
          Write-ups
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          The longer versions: what each piece of work was, how I built it, and what was hard.
        </p>
      </Reveal>

      {groups.map((g) => (
        <section key={g.label} className="mt-16">
          <h2 className="microlabel border-b border-line pb-2 text-copper">{g.label}</h2>
          {g.items.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.04}>
              <Link
                href={articlePath(c)}
                className="group grid gap-2 border-b border-line py-7 sm:grid-cols-[1fr_16rem] sm:gap-10"
              >
                <div>
                  <h3 className="font-display text-2xl text-ink transition-colors group-hover:text-copper sm:text-3xl">
                    {c.title}
                    <ArrowUpRight
                      size={18}
                      className="ml-1 inline-block -translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{c.oneLiner}</p>
                </div>
                <div className="sm:pt-2 sm:text-right">
                  <p className="microlabel">{c.org}</p>
                  <p className="microlabel mt-1">{c.period}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </section>
      ))}
    </div>
  );
}
