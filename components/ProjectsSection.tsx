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
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// Same card for every project. With a write-up, the whole card opens it
// (the title link stretches over the card); the code link sits above that
// and opens GitHub on its own.
function ProjectCard({ p }: { p: CaseStudy }) {
  const hasPage = !p.brief;
  return (
    <div
      className={`relative flex h-full flex-col border border-line bg-surface p-6 ${
        hasPage ? "group transition-colors hover:border-copper/70 hover:bg-copper/5" : ""
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="microlabel text-copper">{p.org}</span>
        <span className="microlabel">{p.period}</span>
      </div>
      <h3 className="mt-3 font-display text-2xl text-ink transition-colors group-hover:text-copper">
        {hasPage ? (
          <Link href={articlePath(p)} className="after:absolute after:inset-0">
            {p.title}
            <ArrowUpRight
              size={16}
              className="ml-1 inline-block -translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </Link>
        ) : (
          p.title
        )}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.oneLiner}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-mono text-[11px] text-faint">{p.stack.slice(0, 3).join(" · ")}</span>
        {hasPage && <span className="font-mono text-[11px] text-copper">read →</span>}
        {p.repo ? (
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 font-mono text-[11px] text-copper link-und"
          >
            code ↗
          </a>
        ) : p.repoNote ? (
          <span className="font-mono text-[11px] text-faint">{p.repoNote}</span>
        ) : null}
      </div>
    </div>
  );
}
