import { beyond, ttrpgSystems } from "@/lib/data";
import D20 from "./D20";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function BeyondSection() {
  return (
    <section id="beyond" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading
        index="05 / beyond"
        title="Beyond the terminal"
        sub="The parts of me that don't compile."
      />
      <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {beyond.map((b, i) => (
          <Reveal key={b.title} delay={(i % 2) * 0.04} className="h-full">
            <div className="h-full bg-surface p-6">
              <h3 className="font-display text-2xl text-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
              {b.title === "Tabletop RPGs" && (
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                  {ttrpgSystems.map((s) => (
                    <span key={s.name} className="font-mono text-[11px] text-faint">
                      <span className="text-copper">{s.name}</span> — {s.note}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <D20 />
      </Reveal>
    </section>
  );
}
