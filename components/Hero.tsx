"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { agentEnabled, site } from "@/lib/data";

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
              className="font-display display-tight text-[12vw] text-ink sm:text-[5.4rem] lg:text-[6.8rem]"
            >
              Software that
              <br />
              <em className="text-copper">earns</em> its numbers.
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-muted"
            >
              I&rsquo;m Ishan, final-year Computer Science student at NUS, minoring in
              Mathematics and Quantitative Finance. Four internships across robotics
              simulation, backend platforms and applied AI, including six months
              building digital twin tooling at Hyundai&rsquo;s Singapore R&D centre.
              Every claim on this site links to the work behind it.
            </motion.p>
            <motion.figure variants={item} className="mt-8 lg:hidden">
              <Image
                src="/portrait.jpg"
                alt="Ishan Agarwal"
                width={420}
                height={560}
                priority
                className="h-[260px] w-full object-cover object-[center_25%] sm:h-[320px]"
              />
              <figcaption className="microlabel mt-2 flex items-center justify-between">
                <span>Shibuya Sky, Tokyo</span>
                <span className="text-copper">based in SG</span>
              </figcaption>
            </motion.figure>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="bg-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-paper transition-transform hover:-translate-y-0.5"
              >
                See the work
              </a>
              <a
                href={agentEnabled ? "/ask" : "/contact"}
                className="border border-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:border-copper hover:text-copper"
              >
                {agentEnabled ? "Ask the agent" : "Get in touch"}
              </a>
              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-1 py-3 font-mono text-[12px] uppercase tracking-wider text-muted transition-colors hover:text-copper"
              >
                <Download size={13} />
                Resume (PDF)
              </a>
            </motion.div>
          </div>
          <motion.div variants={item} className="hidden lg:block">
            <figure className="relative">
              <Image
                src="/portrait.jpg"
                alt="Ishan Agarwal"
                width={420}
                height={560}
                priority
                className="h-[400px] w-[300px] object-cover"
              />
              <figcaption className="microlabel mt-2 flex items-center justify-between">
                <span>Shibuya Sky, Tokyo</span>
                <span className="text-copper">based in SG</span>
              </figcaption>
            </figure>
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
