import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading
        index="01 / work"
        title="Four internships, three years"
        sub="Robotics simulation, backend platforms, applied AI, enterprise software. Each one has a full write-up — including what didn't ship."
      />
      <div>
        {experiences.map((e, i) => (
          <Reveal key={e.org} delay={i * 0.04}>
            <div className="group grid gap-4 border-b border-line py-8 sm:grid-cols-[7rem_1fr] sm:gap-8">
              <div className="microlabel pt-1.5">{e.period}</div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-2xl text-ink sm:text-3xl">{e.org}</h3>
                  <span className="microlabel">{e.location}</span>
                </div>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-wider text-copper">
                  {e.role}
                </p>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted">{e.summary}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {e.articles.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/work/${a.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:text-copper"
                    >
                      <ArrowUpRight size={13} className="text-copper" />
                      {a.label}
                    </Link>
                  ))}
                  <span className="hidden font-mono text-[11px] text-faint sm:inline">
                    {e.stack.join(" · ")}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
