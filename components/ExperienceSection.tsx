import Link from "next/link";
import { experiences } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading
        index="02"
        title="Experience"
        sub="Four internships in three years — robotics simulation, backend platforms, applied AI, and enterprise software."
      />
      <div className="relative ml-2 border-l border-line pl-8 sm:ml-4 sm:pl-12">
        {experiences.map((e, i) => (
          <Reveal key={e.org} delay={i * 0.05} className="relative pb-14 last:pb-0">
            <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-copper bg-paper sm:-left-[3.35rem]" />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-display text-xl font-semibold text-ink">{e.org}</h3>
              <span className="font-mono text-[11px] text-faint">
                {e.period} · {e.location}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-copper">{e.role}</p>
            <ul className="mt-4 space-y-2.5">
              {e.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-copper/70" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {e.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted"
                >
                  {s}
                </span>
              ))}
              {e.caseStudySlug && (
                <Link
                  href={`/work/${e.caseStudySlug}`}
                  className="ml-1 font-mono text-[11px] text-copper link-und"
                >
                  read the case study →
                </Link>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
