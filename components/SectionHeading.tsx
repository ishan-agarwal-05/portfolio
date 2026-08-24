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
      <div className="mb-12 border-t-2 border-ink pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display display-tight text-4xl text-ink sm:text-6xl">
            {title}
          </h2>
          <span className="microlabel shrink-0 text-copper">{index}</span>
        </div>
        {sub && <p className="mt-3 max-w-xl text-sm text-faint">{sub}</p>}
      </div>
    </Reveal>
  );
}
