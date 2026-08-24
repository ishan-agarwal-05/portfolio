"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { site } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex max-w-content flex-col justify-center px-5 pb-16 pt-32 sm:min-h-[94vh] sm:pt-28"
    >
      <motion.div variants={container} initial="hidden" animate="show">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p variants={item} className="microlabel mb-8 flex items-center gap-2">
              <span className="inline-block h-2 w-2 bg-copper" />
              {site.availability}
            </motion.p>
            <motion.h1
              variants={item}
              className="font-display display-tight text-[13vw] text-ink sm:text-[7.2rem]"
            >
              Software that
              <br />
              <em className="text-copper">earns</em> its numbers.
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-muted"
            >
              I&rsquo;m Ishan — final-year Computer Science student at NUS, minoring in
              Mathematics and Quantitative Finance. Four internships across robotics
              simulation, backend platforms and applied AI, including six months
              building digital twin tooling at Hyundai&rsquo;s Singapore R&D centre.
              Every claim on this site links to the work behind it.
            </motion.p>
            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="bg-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-paper transition-transform hover:-translate-y-0.5"
              >
                See the work
              </a>
              <a
                href="/ask"
                className="border border-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:border-copper hover:text-copper"
              >
                Ask the agent
              </a>
            </motion.div>
          </div>
          <motion.div variants={item} className="hidden lg:block">
            <div className="relative border border-line bg-surface p-2">
              <Image
                src="/portrait.jpg"
                alt="Ishan Agarwal"
                width={300}
                height={400}
                priority
                className="h-[340px] w-[255px] object-cover object-top grayscale transition-all duration-500 hover:grayscale-0"
              />
              <div className="flex items-center justify-between px-1 pt-2">
                <span className="microlabel">fig. 01 — the author</span>
                <span className="microlabel text-copper">SG</span>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={item}
          className="mt-14 hidden items-center gap-2 font-mono text-[11px] text-faint sm:flex"
        >
          <ArrowDown size={12} className="animate-bounce" />
          scroll, or press <span className="kbd">⌘K</span> to jump anywhere
        </motion.div>
      </motion.div>
    </section>
  );
}
