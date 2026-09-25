"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CornerDownLeft, Square } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "What did Ishan build at Hyundai?",
  "Why did LectureAI shut down?",
  "What's his strongest evidence of ML work?",
  "Does he have backend experience?",
  "What does he do outside of code?",
];

// Turn /work/<slug> paths in the agent's answer into real links.
function withLinks(text: string) {
  return text.split(/(\/work\/[a-z0-9-]+)/g).map((part, i) =>
    /^\/work\/[a-z0-9-]+$/.test(part) ? (
      <Link key={i} href={part} className="link-und text-copper">
        {part}
      </Link>
    ) : (
      part
    )
  );
}

export default function AskAgent() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setError(null);
    setInput("");
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setMessages(history);
        setError(data?.error ?? "Something went wrong. Try again?");
        return;
      }
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const snapshot = acc;
        setMessages([...history, { role: "assistant", content: snapshot }]);
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setMessages(history);
        setError("The agent couldn't be reached. Try again in a moment.");
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 pb-10 pt-32">
      <p className="microlabel text-copper">the agent</p>
      <h1 className="display-tight mt-3 font-display text-5xl text-ink sm:text-6xl">
        Ask me anything<span className="text-copper">*</span>
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-faint">
        *about Ishan. Grounded in the same data model that renders this site, it
        will say &ldquo;I don&rsquo;t know&rdquo; rather than make things up, and it knows where
        the detailed articles live. Rate-limited, because tokens cost money.
      </p>

      <div className="mt-8 flex-1">
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="border border-line px-3 py-2 text-left font-mono text-[12px] text-muted transition-colors hover:border-copper hover:text-copper"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="space-y-5">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={m.role === "user" ? "flex justify-end" : ""}
            >
              {m.role === "user" ? (
                <div className="max-w-[85%] bg-ink px-4 py-2.5 text-sm text-paper">
                  {m.content}
                </div>
              ) : (
                <div className="max-w-[85%] whitespace-pre-wrap border-l-2 border-copper pl-4 text-sm leading-relaxed text-muted">
                  {withLinks(m.content)}
                  {busy && i === messages.length - 1 && (
                    <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-copper align-middle" />
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        {error && (
          <p className="mt-4 border border-dashed border-copper/50 p-3 font-mono text-[12px] text-copper">
            {error}{" "}
            <Link href="/contact" className="link-und">
              contact page →
            </Link>
          </p>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="sticky bottom-6 mt-8 flex items-center gap-2 border border-ink bg-surface p-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about experience, projects, TTRPGs…"
          maxLength={500}
          className="w-full bg-transparent px-2 py-2 text-sm text-ink outline-none placeholder:text-faint"
        />
        {busy ? (
          <button
            type="button"
            onClick={() => abortRef.current?.abort()}
            aria-label="Stop"
            className="bg-ink p-2.5 text-paper"
          >
            <Square size={14} />
          </button>
        ) : (
          <button
            type="submit"
            aria-label="Send"
            disabled={!input.trim()}
            className="bg-ink p-2.5 text-paper transition-opacity disabled:opacity-30"
          >
            <CornerDownLeft size={14} />
          </button>
        )}
      </form>
    </div>
  );
}
