import { skills } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading
        index="04 / toolbox"
        title="Toolbox"
        sub="Everything here has shipped something above, no keyword stuffing."
      />
      <div className="grid gap-10 sm:grid-cols-2">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.04}>
            <div>
              <h3 className="microlabel border-b border-line pb-2 text-copper">{g.group}</h3>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {g.items.map((s) => (
                  <span key={s} className="font-mono text-[13px] text-muted">
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
