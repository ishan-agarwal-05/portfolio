import { beyond } from "@/lib/data";
import D20 from "./D20";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function BeyondSection() {
  return (
    <section id="beyond" className="mx-auto max-w-content px-5 py-24">
      <SectionHeading
        index="05"
        title="Beyond the terminal"
        sub="The parts of me that don’t compile."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {beyond.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
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
