import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  title,
  sub,
}: {
  index: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal>
      <div className="mb-10 flex items-baseline gap-4">
        <span className="font-mono text-xs text-copper">{index}</span>
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          {sub && <p className="mt-2 max-w-xl text-sm text-faint">{sub}</p>}
        </div>
      </div>
    </Reveal>
  );
}
