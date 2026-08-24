import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { caseStudies } from "@/lib/data";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  return { title: cs?.title ?? "Case study" };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();

  const idx = caseStudies.findIndex((c) => c.slug === params.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <Reveal>
        <Link
          href="/#work"
          className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-copper"
        >
          <ArrowLeft size={12} /> all work
        </Link>
        <p className="font-mono text-[11px] uppercase tracking-widest text-copper">
          {cs.org} · {cs.period}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          {cs.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{cs.summary}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-4">
          {cs.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-mono text-xl font-semibold text-copper">{m.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wide text-faint">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {cs.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </Reveal>

      {cs.sections.map((s, i) => (
        <Reveal key={s.heading} delay={0.05}>
          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-ink">
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
        <aside className="mt-14 rounded-2xl border border-copper/40 bg-copper/5 p-6">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-copper">
            The honest bit
          </h2>
          <p className="mt-3 leading-relaxed text-muted">{cs.honest}</p>
        </aside>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-16 border-t border-line pt-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-faint">next</p>
          <Link
            href={`/work/${next.slug}`}
            className="mt-2 inline-block font-display text-xl font-semibold text-ink transition-colors hover:text-copper"
          >
            {next.title} →
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
