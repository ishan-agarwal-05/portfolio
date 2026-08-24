import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ProjectsSection() {
  const projects = caseStudies.filter((c) => c.kind === "project");
  return (
    <section id="projects" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading
        index="02 / projects"
        title="Projects"
        sub="Research, product, hardware — and this site. Every card opens a full write-up; repos are linked where they're public."
      />
      <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.05} className="h-full">
            <Link
              href={`/work/${p.slug}`}
              className="group flex h-full flex-col bg-surface p-6 transition-colors hover:bg-copper/5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="microlabel text-copper">{p.org}</span>
                <span className="microlabel">{p.period}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl text-ink transition-colors group-hover:text-copper">
                {p.title}
                <ArrowUpRight
                  size={16}
                  className="ml-1 inline-block -translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.oneLiner}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono text-[11px] text-faint">
                  {p.stack.slice(0, 3).join(" · ")}
                </span>
                {p.repo ? (
                  <span className="font-mono text-[11px] text-copper">code ↗</span>
                ) : p.repoNote ? (
                  <span className="font-mono text-[11px] text-faint">{p.repoNote}</span>
                ) : null}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
