import Anthropic from "@anthropic-ai/sdk";
import { buildAgentSystemPrompt } from "@/lib/agentContext";

export const runtime = "nodejs";
export const maxDuration = 30;

// ── simple in-memory rate limiting (per serverless instance) ──
// Not bulletproof across instances, but combined with the small
// max_tokens cap and an Anthropic Console spend limit it keeps
// worst-case cost bounded.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const MAX_GLOBAL_PER_DAY = 400;
const hits = new Map<string, number[]>();
let dayKey = "";
let globalCount = 0;

function rateLimited(ip: string): string | null {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    globalCount = 0;
  }
  if (globalCount >= MAX_GLOBAL_PER_DAY) {
    return "The agent has hit its daily budget. Email me instead — I'm cheaper.";
  }
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) {
    return "Easy there — you've hit the rate limit. Try again in a few minutes, or just email me.";
  }
  arr.push(now);
  hits.set(ip, arr);
  globalCount++;
  return null;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The agent isn't configured yet — no API key on this deployment." },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimited(ip);
  if (limited) return Response.json({ error: limited }, { status: 429 });

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const history = (body.messages ?? [])
    .filter(
      (m): m is ChatMessage =>
        (m?.role === "user" || m?.role === "assistant") &&
        typeof m?.content === "string" &&
        m.content.length > 0
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return Response.json({ error: "Send a message first." }, { status: 400 });
  }

  const client = new Anthropic();

  const stream = client.messages.stream({
    model: "claude-opus-5",
    max_tokens: 600,
    output_config: { effort: "low" },
    system: [
      {
        type: "text",
        text: buildAgentSystemPrompt(),
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: history,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode("\n\n[The agent hit an error — try again, or email me.]")
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
