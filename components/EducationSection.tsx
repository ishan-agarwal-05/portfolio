import { education, honours } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const entries = [education.university, education.school];

export default function EducationSection() {
  return (
    <section id="education" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading index="04 / education" title="Education" />
      <div>
        {entries.map((e, i) => (
          <Reveal key={e.name} delay={i * 0.04}>
            <div className="grid gap-4 border-b border-line py-8 sm:grid-cols-[7rem_1fr] sm:gap-8">
              <div className="microlabel pt-1.5">{e.period}</div>
              <div>
                <h3 className="font-display text-2xl text-ink sm:text-3xl">{e.name}</h3>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-wider text-copper">{e.degree}</p>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted">{e.body}</p>
                {e === education.school && (
                  <div className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                    {honours.map((h) => (
                      <div key={h.title}>
                        <p className="text-[15px] text-ink">{h.title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-faint">{h.detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
