"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { d20Facts } from "@/lib/data";

export default function D20() {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [fact, setFact] = useState<string | null>(null);

  function roll() {
    if (rolling) return;
    setRolling(true);
    setFact(null);
    const n = Math.floor(Math.random() * 20) + 1;
    setTimeout(() => {
      setResult(n);
      setFact(d20Facts[n - 1]);
      setRolling(false);
    }, 900);
  }

  useEffect(() => {
    const handler = () => roll();
    window.addEventListener("roll-d20", handler);
    return () => window.removeEventListener("roll-d20", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center gap-5 border border-dashed border-line p-10 text-center">
      <p className="microlabel">roll for a random fact about me</p>
      <motion.button
        onClick={roll}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={
          rolling
            ? { rotate: [0, 360, 720, 1080], scale: [1, 1.15, 0.95, 1] }
            : { rotate: 0 }
        }
        transition={rolling ? { duration: 0.9, ease: "easeInOut" } : undefined}
        aria-label="Roll the d20"
        className="relative h-24 w-24"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon
            points="50,3 91,26 91,74 50,97 9,74 9,26"
            className="fill-copper/10 stroke-copper"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="50,20 76,65 24,65"
            className="fill-none stroke-copper/70"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <line x1="50" y1="3" x2="50" y2="20" className="stroke-copper/70" strokeWidth="1.5" />
          <line x1="91" y1="26" x2="76" y2="65" className="stroke-copper/40" strokeWidth="1" />
          <line x1="9" y1="26" x2="24" y2="65" className="stroke-copper/40" strokeWidth="1" />
          <line x1="91" y1="74" x2="76" y2="65" className="stroke-copper/40" strokeWidth="1" />
          <line x1="9" y1="74" x2="24" y2="65" className="stroke-copper/40" strokeWidth="1" />
          <line x1="50" y1="97" x2="50" y2="82" className="stroke-copper/40" strokeWidth="1" />
          <text
            x="50"
            y="57"
            textAnchor="middle"
            className="fill-copper font-mono"
            fontSize="24"
            fontWeight="700"
          >
            {rolling ? "…" : result ?? "20"}
          </text>
        </svg>
      </motion.button>
      <div className="min-h-[3.5rem] max-w-md">
        <AnimatePresence mode="wait">
          {fact && (
            <motion.p
              key={fact}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm leading-relaxed text-muted"
            >
              {result === 20 && (
                <span className="mr-1 font-mono text-xs font-bold text-copper">NAT 20 —</span>
              )}
              {result === 1 && (
                <span className="mr-1 font-mono text-xs font-bold text-copper">NAT 1 —</span>
              )}
              {fact}
            </motion.p>
          )}
          {!fact && !rolling && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-faint"
            >
              Twenty facts. One die. Click it.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
