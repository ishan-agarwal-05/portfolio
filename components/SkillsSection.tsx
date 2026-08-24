import { skills } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading
        index="04"
        title="Toolbox"
        sub="Everything here has shipped something above — no keyword stuffing."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.05}>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-copper">
                {g.group}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line px-3 py-1 text-sm text-muted transition-colors hover:border-copper hover:text-copper"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
