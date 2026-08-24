"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, CornerDownLeft, Moon, FileDown, Dices } from "lucide-react";
import { paletteIndex, site } from "@/lib/data";

type Item = {
  label: string;
  group: string;
  href?: string;
  action?: () => void;
  icon?: React.ReactNode;
};

function fuzzy(query: string, text: string): boolean {
  const q = query.toLowerCase().replace(/\s/g, "");
  const t = text.toLowerCase();
  let i = 0;
  for (const ch of t) {
    if (ch === q[i]) i++;
    if (i === q.length) return true;
  }
  return q.length === 0;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const items: Item[] = useMemo(
    () => [
      ...paletteIndex.map((p) => ({ ...p })),
      {
        label: "Toggle dark / light mode",
        group: "Actions",
        icon: <Moon size={13} />,
        action: () => {
          const next = !document.documentElement.classList.contains("dark");
          document.documentElement.classList.toggle("dark", next);
          localStorage.setItem("theme", next ? "dark" : "light");
        },
      },
      {
        label: "Download resume (PDF)",
        group: "Actions",
        icon: <FileDown size={13} />,
        action: () => window.open(site.resume, "_blank"),
      },
      {
        label: "Roll a d20",
        group: "Actions",
        icon: <Dices size={13} />,
        action: () => {
          document.getElementById("beyond")?.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => window.dispatchEvent(new CustomEvent("roll-d20")), 600);
        },
      },
    ],
    []
  );

  const filtered = useMemo(
    () => items.filter((i) => fuzzy(query, i.label + " " + i.group)),
    [items, query]
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const run = useCallback(
    (item: Item) => {
      close();
      if (item.action) item.action();
      else if (item.href) router.push(item.href);
    },
    [close, router]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      run(filtered[active]);
    }
  }

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/20 px-4 pt-[18vh] backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-line px-4">
              <Search size={15} className="text-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search sections, case studies, actions…"
                className="w-full bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-faint"
              />
              <span className="kbd">esc</span>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-faint">
                  Nothing found. Try “work”, “dice”, or “resume”.
                </li>
              )}
              {filtered.map((item, i) => {
                const showGroup = item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <li key={item.group + item.label}>
                    {showGroup && (
                      <div className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-faint">
                        {item.group}
                      </div>
                    )}
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => run(item)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        i === active ? "bg-copper/10 text-copper" : "text-muted"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.icon}
                        {item.label}
                      </span>
                      {i === active && <CornerDownLeft size={12} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
