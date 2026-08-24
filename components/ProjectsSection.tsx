import Link from "next/link";
import { projects } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading
        index="03"
        title="Projects"
        sub="Research, product, and hardware. Repos are being cleaned up and will be linked as they go public."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.06} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-copper/60 hover:shadow-md">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-copper">
                  {p.tag}
                </span>
                <span className="font-mono text-[10px] text-faint">{p.period}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4 font-mono text-[11px]">
                {p.caseStudySlug ? (
                  <Link href={`/work/${p.caseStudySlug}`} className="text-copper link-und">
                    case study →
                  </Link>
                ) : (
                  <span className="text-faint">code · coming soon</span>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
