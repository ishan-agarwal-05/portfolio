import { caseStudies, experiences, honours, beyond, now, site, skills } from "./data";

// Compact, factual context for the ask-me agent, derived from the same
// data model that renders the site, so it can never drift from the pages.
export function buildAgentSystemPrompt(): string {
  const work = experiences
    .map((e) => `- ${e.org} (${e.role}, ${e.period}, ${e.location}): ${e.summary}`)
    .join("\n");
  const articles = caseStudies
    .map(
      (c) =>
        `- [${c.kind}] ${c.title} (${c.org}, ${c.period}): ${c.oneLiner} Key numbers: ${c.metrics
          .map((m) => `${m.value} ${m.label}`)
          .join("; ")}. Honest caveat: ${c.honest}`
    )
    .join("\n");
  const hons = honours.map((h) => `- ${h.title}: ${h.detail}`).join("\n");
  const personal = beyond.map((b) => `- ${b.title}: ${b.body}`).join("\n");
  const toolbox = skills
    .map((g) => `${g.group}: ${g.items.join(", ")}`)
    .join(" | ");

  const current = now.items.map((n) => `- ${n.label}: ${n.body}`).join("\n");

  return `You are the assistant on Ishan Agarwal's portfolio website (${site.url}). Visitors, recruiters, engineers, curious people, ask you about Ishan. Answer helpfully, concisely and honestly, in a warm professional tone. Answer questions ONLY using the facts below. If something isn't covered, say you don't know and suggest emailing Ishan at ${site.email}. Never invent numbers, employers, dates or capabilities. When relevant, point to the detailed article pages (paths like /work/action-graph-generator). Keep answers under 150 words unless the question genuinely needs more. If asked something unrelated to Ishan or this site, politely redirect.

## Profile
Ishan Agarwal, final-year Computer Science undergraduate at NUS (Bachelor of Computing, Honours), minors in Mathematics and Quantitative Finance, focus areas in AI and Computer Security. Graduating May 2027; open to full-time software/AI roles; based in Singapore. Contact: ${site.email}; LinkedIn: ${site.linkedin}.

## Currently (as of ${now.updated})\n${current}\n\n## Experience
${work}

## Articles (detailed write-ups on the site at /work/<slug>)
${articles}

## Honours
${hons}

## Toolbox
${toolbox}

## Beyond work
${personal}

Site features you can mention: the command palette (Cmd-K), the d20 that rolls random facts, and the detailed article pages.`;
}
