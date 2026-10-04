"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
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
            <motion.h1
              variants={item}
              className="font-display display-tight text-[15vw] text-ink sm:text-[5.4rem] lg:text-[6.8rem]"
            >
              Ishan Agarwal
            </motion.h1>
            <motion.div
              variants={item}
              className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-muted"
            >
              <p>
                I&rsquo;m a final-year computer science student at NUS, minoring in mathematics
                and quantitative finance, with specialisations in AI and cybersecurity.
              </p>
              <p>
                I&rsquo;ve done four internships. The most recent was six months on the
                simulation team at Hyundai&rsquo;s innovation centre in Singapore, working on a
                digital twin of their EV factory. Before that I built backend services at
                TechFour, and had shorter internships at PwC and Quadrafort.
              </p>
              <p>
                I graduate in May 2027 and I&rsquo;m looking for a full-time software or AI role
                in Singapore.
              </p>
            </motion.div>
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
      </motion.div>
    </section>
  );
}
