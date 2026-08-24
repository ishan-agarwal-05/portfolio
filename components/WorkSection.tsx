import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading
        index="01"
        title="Selected work"
        sub="Five things I built, with the numbers they produced and the parts that didn’t work. Each opens into a full case study."
      />
      <div className="flex flex-col gap-5">
        {caseStudies.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05}>
            <Link
              href={`/work/${c.slug}`}
              className="group block rounded-2xl border border-line bg-surface p-7 transition-all hover:-translate-y-1 hover:border-copper/60 hover:shadow-lg sm:p-9"
            >
              <span className="font-mono text-[11px] text-faint">
                {c.org} · {c.period}
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink transition-colors group-hover:text-copper sm:text-3xl">
                {c.title}
                <ArrowUpRight
                  size={18}
                  className="ml-1.5 inline-block -translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </h3>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted">{c.oneLiner}</p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-mono text-lg font-semibold text-copper">{m.value}</div>
                    <div className="text-[11px] uppercase tracking-wide text-faint">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
