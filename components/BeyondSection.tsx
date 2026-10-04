import { beyond, reading, ttrpgSystems } from "@/lib/data";
import D20 from "./D20";
import Photos from "./Photos";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function BeyondSection() {
  return (
    <section id="beyond" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading index="04 / beyond" title="Beyond work" />
      <div className="space-y-14">
        {beyond.map((b) => (
          <Reveal key={b.title}>
            <div className="grid gap-6 lg:grid-cols-[18rem_1fr] lg:gap-12">
              <h3 className="font-display text-3xl text-ink">{b.title}</h3>
              <div className="min-w-0">
                <p className="max-w-2xl leading-relaxed text-muted">{b.body}</p>
                {(b.title === "Tabletop RPGs" || b.title === "Reading") && (
                  <p className="mt-3 font-mono text-[12px] text-faint">
                    {(b.title === "Tabletop RPGs" ? ttrpgSystems : reading).map((s) => s.name).join(" · ")}
                  </p>
                )}
                {b.photos && <Photos photos={b.photos} className="mt-6" />}
              </div>
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
