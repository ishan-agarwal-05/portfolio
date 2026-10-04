import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articlePath, caseStudies, type CaseStudy } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ProjectsSection() {
  const projects = caseStudies.filter((c) => c.kind === "project");
  return (
    <section id="projects" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading
        index="02 / projects"
        title="Projects"
        sub="Coursework, a startup, and this site."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.05} className="h-full">
            {p.brief ? (
              <div className="flex h-full flex-col border border-line bg-surface p-6">
                <ProjectCardBody p={p} />
              </div>
            ) : (
              <Link
                href={articlePath(p)}
                className="group flex h-full flex-col border border-line bg-surface p-6 transition-colors hover:border-copper/70 hover:bg-copper/5"
              >
                <ProjectCardBody p={p} />
              </Link>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// Same card for every project. Ones with a write-up link to it; short
// entries link straight to their code instead.
function ProjectCardBody({ p }: { p: CaseStudy }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <span className="microlabel text-copper">{p.org}</span>
        <span className="microlabel">{p.period}</span>
      </div>
      <h3 className="mt-3 font-display text-2xl text-ink transition-colors group-hover:text-copper">
        {p.title}
        {!p.brief && (
          <ArrowUpRight
            size={16}
            className="ml-1 inline-block -translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
          />
        )}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.oneLiner}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono text-[11px] text-faint">{p.stack.slice(0, 3).join(" · ")}</span>
        {!p.brief && <span className="font-mono text-[11px] text-copper">read →</span>}
        {p.repo ? (
          p.brief ? (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] text-copper link-und"
            >
              code ↗
            </a>
          ) : (
            <span className="font-mono text-[11px] text-faint">code ↗</span>
          )
        ) : p.repoNote ? (
          <span className="font-mono text-[11px] text-faint">{p.repoNote}</span>
        ) : null}
      </div>
    </>
  );
}
