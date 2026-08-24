"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, AlertTriangle, Sparkles } from "lucide-react";
import { fitSkills, knownGaps } from "@/lib/fit";

const levelLabel = {
  professional: "professional",
  project: "project",
  coursework: "coursework",
} as const;

export default function FitChecker() {
  const [jd, setJd] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    if (!submitted || jd.trim().length < 30) return null;
    const text = jd.toLowerCase();
    const matched = fitSkills.filter((s) =>
      s.aliases.some((a) => text.includes(a))
    );
    const gaps = knownGaps.filter((g) => g.term.test(jd));
    const score = Math.min(
      97,
      Math.round(
        (matched.length / Math.max(matched.length + gaps.length, 1)) * 100
      )
    );
    return { matched, gaps, score };
  }, [jd, submitted]);

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <p className="font-mono text-[11px] uppercase tracking-widest text-copper">
        fit check
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Paste a job description.
      </h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">
        This runs entirely in your browser — nothing is sent anywhere. It maps
        the JD against what I’ve actually done, links each match to the
        evidence, and tells you honestly where I’d be learning on the job.
      </p>

      <textarea
        value={jd}
        onChange={(e) => {
          setJd(e.target.value);
          setSubmitted(false);
        }}
        rows={9}
        placeholder="Paste the full job description here…"
        className="mt-8 w-full rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-faint focus:border-copper"
      />
      <button
        onClick={() => setSubmitted(true)}
        disabled={jd.trim().length < 30}
        className="mt-4 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Check the fit
      </button>
      {submitted && jd.trim().length < 30 && (
        <p className="mt-3 text-sm text-faint">That looks too short to be a JD.</p>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-6">
            <Sparkles className="text-copper" size={22} />
            <div>
              <div className="font-display text-2xl font-semibold text-ink">
                {result.matched.length} relevant match
                {result.matched.length === 1 ? "" : "es"}
                {result.gaps.length > 0 &&
                  `, ${result.gaps.length} honest gap${result.gaps.length === 1 ? "" : "s"}`}
              </div>
              <p className="text-sm text-faint">
                Keyword mapping, not magic — the case studies are the real signal.
              </p>
            </div>
          </div>

          {result.matched.length > 0 && (
            <>
              <h2 className="mt-10 font-mono text-[11px] uppercase tracking-widest text-moss">
                where I line up
              </h2>
              <ul className="mt-4 space-y-3">
                {result.matched.map((m) => (
                  <li
                    key={m.name}
                    className="rounded-xl border border-line bg-surface p-4"
                  >
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-moss" />
                      <span className="font-medium text-ink">{m.name}</span>
                      <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-faint">
                        {levelLabel[m.level]}
                      </span>
                    </div>
                    <p className="mt-1.5 pl-6 text-sm leading-relaxed text-muted">
                      {m.evidence}{" "}
                      {m.href && (
                        <Link href={m.href} className="font-mono text-[11px] text-copper link-und">
                          see it →
                        </Link>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}

          {result.gaps.length > 0 && (
            <>
              <h2 className="mt-10 font-mono text-[11px] uppercase tracking-widest text-copper">
                where I’d be learning
              </h2>
              <ul className="mt-4 space-y-3">
                {result.gaps.map((g) => (
                  <li key={g.label} className="rounded-xl border border-dashed border-line p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={14} className="text-copper" />
                      <span className="font-medium text-ink">{g.label}</span>
                    </div>
                    <p className="mt-1.5 pl-6 text-sm leading-relaxed text-muted">{g.note}</p>
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="mt-10 text-sm text-muted">
            Think it’s a fit?{" "}
            <Link href="/contact" className="text-copper link-und">
              Get in touch
            </Link>{" "}
            — or read the{" "}
            <Link href="/#work" className="text-copper link-und">
              case studies
            </Link>{" "}
            first.
          </p>
        </motion.div>
      )}
    </div>
  );
}
