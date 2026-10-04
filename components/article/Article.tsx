import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articlePath, articles, type CaseStudy } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Article({ cs }: { cs: CaseStudy }) {
  // One reading order through every write-up, internships then projects.
  const idx = articles.findIndex((c) => c.slug === cs.slug);
  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <Reveal>
        <Link
          href={cs.kind === "work" ? "/#work" : "/#projects"}
          className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-faint transition-colors hover:text-copper"
        >
          <ArrowLeft size={12} /> {cs.kind === "work" ? "all work" : "all projects"}
        </Link>
        <p className="microlabel text-copper">
          {cs.org} · {cs.period}
          {cs.role ? ` · ${cs.role}` : ""}
        </p>
        <h1 className="display-tight mt-4 font-display text-5xl text-ink sm:text-6xl">
          {cs.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{cs.summary}</p>
      </Reveal>

      <Reveal delay={0.06}>
        {cs.metrics.length > 0 && (
        <div
          className={`mt-10 grid grid-cols-2 gap-4 ${
            cs.metrics.length === 2
              ? "sm:grid-cols-2"
              : cs.metrics.length === 3
                ? "sm:grid-cols-3"
                : "sm:grid-cols-4"
          }`}
        >
          {cs.metrics.map((m) => (
            <div key={m.label} className="border border-line bg-surface p-4">
              <div className="font-mono text-lg font-semibold text-copper">{m.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wide text-faint">{m.label}</div>
            </div>
          ))}
        </div>
        )}
        <div className={`${cs.metrics.length > 0 ? "mt-4" : "mt-10"} flex flex-wrap items-center gap-x-4 gap-y-2`}>
          <span className="font-mono text-[11px] text-faint">{cs.stack.join(" · ")}</span>
          {cs.repo && (
            <a
              href={cs.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 border border-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink transition-colors hover:border-copper hover:text-copper"
            >
              <ArrowUpRight size={12} />
              {cs.repoNote ? `code · ${cs.repoNote}` : "code on GitHub"}
            </a>
          )}
          {!cs.repo && cs.repoNote && (
            <span className="font-mono text-[11px] text-faint">[ {cs.repoNote} ]</span>
          )}
        </div>
      </Reveal>

      {cs.slug === "eg1311-robot" && (
        <Reveal delay={0.05}>
          <figure className="mt-14 border border-line bg-surface p-4 sm:p-6">
            <Image
              src="/photos/eg1311-circuit.jpg"
              alt="Tinkercad circuit: Arduino Uno, HC-SR04 ultrasonic sensor, two L293D H-bridges driving three DC motors, and a servo catapult on a 9V supply"
              width={1600}
              height={848}
              className="w-full"
            />
            <figcaption className="microlabel mt-3">
              fig. the circuit as prototyped in Tinkercad. Arduino Uno, HC-SR04
              ultrasonic sensor, two L293D H-bridges for the three drive motors,
              and the servo catapult, all on a 9V supply.
            </figcaption>
          </figure>
        </Reveal>
      )}

      {cs.sections.map((s, i) => (
        <Reveal key={s.heading} delay={0.05}>
          <section className="mt-14">
            <h2 className="border-t border-line pt-6 font-display text-3xl text-ink">
              <span className="mr-3 font-mono text-sm text-copper">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.heading}
            </h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </section>
        </Reveal>
      ))}


      <Reveal delay={0.05}>
        <nav className="mt-16 grid gap-6 border-t-2 border-ink pt-6 sm:grid-cols-2">
          {prev ? (
            <div>
              <p className="microlabel">previous</p>
              <Link
                href={articlePath(prev)}
                className="mt-2 inline-block font-display text-2xl text-ink transition-colors hover:text-copper"
              >
                ← {prev.title}
              </Link>
            </div>
          ) : (
            <div />
          )}
          {next ? (
            <div className="sm:text-right">
              <p className="microlabel">next</p>
              <Link
                href={articlePath(next)}
                className="mt-2 inline-block font-display text-2xl text-ink transition-colors hover:text-copper"
              >
                {next.title} →
              </Link>
            </div>
          ) : (
            <div className="sm:text-right">
              <p className="microlabel">that&rsquo;s everything</p>
              <Link
                href="/"
                className="mt-2 inline-block font-display text-2xl text-ink transition-colors hover:text-copper"
              >
                Back to the home page →
              </Link>
            </div>
          )}
        </nav>
      </Reveal>
    </article>
  );
}
