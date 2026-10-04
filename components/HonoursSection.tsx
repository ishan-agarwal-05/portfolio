import { honours } from "@/lib/data";

// Kept, but folded away: most of these are from school.
export default function HonoursSection() {
  return (
    <section id="honours" className="mx-auto max-w-content px-5 pb-8">
      <details className="group border-t-2 border-ink">
        <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 pt-4 [&::-webkit-details-marker]:hidden">
          <span className="font-display text-3xl text-ink sm:text-4xl">Honours</span>
          <span className="microlabel shrink-0 text-copper">
            <span className="group-open:hidden">show {honours.length} +</span>
            <span className="hidden group-open:inline">hide −</span>
          </span>
        </summary>
        <p className="mt-3 max-w-xl text-sm text-faint">
          Mostly from school in India. The ranks are national.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {honours.map((h) => (
            <div key={h.title} className="flex h-full flex-col border border-line bg-surface p-6">
              <h3 className="font-display text-xl text-ink">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{h.detail}</p>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
