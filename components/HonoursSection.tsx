import { honours } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function HonoursSection() {
  return (
    <section id="honours" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading
        index="03 / honours"
        title="Honours"
        sub="Mostly from a former life as a competitive-exam kid in India. The ranks are national."
      />
      <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {honours.map((h, i) => (
          <Reveal key={h.title} delay={(i % 2) * 0.04} className="h-full">
            <div className="flex h-full flex-col bg-surface p-6">
              <h3 className="font-display text-xl text-ink">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{h.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
