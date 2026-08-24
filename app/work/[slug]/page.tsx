import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/data";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import CodegenDiagram from "@/components/CodegenDiagram";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  return { title: cs?.title ?? "Article", description: cs?.oneLiner };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();

  const siblings = caseStudies.filter((c) => c.kind === cs.kind);
  const idx = siblings.findIndex((c) => c.slug === params.slug);
  const next = siblings[(idx + 1) % siblings.length];

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <ScrollProgress />
      <Reveal>
        <Link
          href={cs.kind === "work" ? "/#work" : "/#projects"}
          className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-faint transition-colors hover:text-copper"
        >
          <ArrowLeft size={12} /> {cs.kind === "work" ? "all work" : "all projects"}
        </Link>
        <p className="microlabel text-copper">
          {cs.org} · {cs.period}
          {cs.role ? ` · ${cs.role}` : ""}
        </p>
        <h1 className="display-tight mt-4 font-display text-5xl text-ink sm:text-6xl">
          {cs.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{cs.summary}</p>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
          {cs.metrics.map((m) => (
            <div key={m.label} className="bg-surface p-4">
              <div className="font-mono text-lg font-semibold text-copper">{m.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wide text-faint">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-[11px] text-faint">{cs.stack.join(" · ")}</span>
          {cs.repo && (
            <a
              href={cs.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 border border-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink transition-colors hover:border-copper hover:text-copper"
            >
              <ArrowUpRight size={12} />
              {cs.repoNote ? `code · ${cs.repoNote}` : "code on GitHub"}
            </a>
          )}
          {!cs.repo && cs.repoNote && (
            <span className="font-mono text-[11px] text-faint">[ {cs.repoNote} ]</span>
          )}
        </div>
      </Reveal>

      {cs.slug === "action-graph-generator" && (
        <Reveal delay={0.05}>
          <CodegenDiagram />
        </Reveal>
      )}

      {cs.sections.map((s, i) => (
        <Reveal key={s.heading} delay={0.05}>
          <section className="mt-14">
            <h2 className="border-t border-line pt-6 font-display text-3xl text-ink">
              <span className="mr-3 font-mono text-sm text-copper">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.heading}
            </h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </section>
        </Reveal>
      ))}

      <Reveal delay={0.05}>
        <aside className="mt-14 border-l-2 border-copper bg-copper/5 p-6">
          <h2 className="microlabel text-copper">the honest bit</h2>
          <p className="mt-3 leading-relaxed text-muted">{cs.honest}</p>
        </aside>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-16 border-t-2 border-ink pt-6">
          <p className="microlabel">next {cs.kind === "work" ? "article" : "project"}</p>
          <Link
            href={`/work/${next.slug}`}
            className="mt-2 inline-block font-display text-2xl text-ink transition-colors hover:text-copper"
          >
            {next.title} →
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
