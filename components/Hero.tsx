"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { site } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto flex max-w-content flex-col justify-center px-5 pb-20 pt-40 sm:min-h-[92vh] sm:pt-32">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p
          variants={item}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-moss" />
          </span>
          {site.availability}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-7xl"
        >
          Ishan Agarwal builds software that has to{" "}
          <em className="text-copper">earn</em> its numbers.
        </motion.h1>

        <motion.p variants={item} className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          Final-year Computer Science student at NUS with minors in Mathematics and
          Quantitative Finance. Four internships across robotics simulation, backend
          microservices and applied AI — including six months building digital twin
          tooling at Hyundai’s Singapore R&D centre. Every claim on this site links to
          the work behind it.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            See the work
          </a>
          <a
            href="/fit"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-copper hover:text-copper"
          >
            Paste a job description →
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16 hidden items-center gap-2 font-mono text-[11px] text-faint sm:flex"
        >
          <ArrowDown size={12} className="animate-bounce" />
          scroll, or press <span className="kbd">⌘K</span> to jump anywhere
        </motion.div>
      </motion.div>
    </section>
  );
}
