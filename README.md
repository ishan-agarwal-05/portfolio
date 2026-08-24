# ishan-agarwal.com

Personal portfolio of Ishan Agarwal — Next.js 14, Tailwind CSS, Framer Motion, and a Claude-powered ask-me agent.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Everything works without configuration except the ask-me agent, which needs an API key (below).

## The ask-me agent

`/ask` streams answers from the Claude API through `app/api/ask/route.ts`, grounded in `lib/data.ts` via `lib/agentContext.ts`. To enable it:

1. Get an API key at [console.anthropic.com](https://console.anthropic.com) (API Keys → Create Key), and set a **monthly spend limit** under Settings → Limits (US$5 is plenty).
2. Locally: create `.env.local` containing `ANTHROPIC_API_KEY=sk-ant-...`
3. On Vercel: Project → Settings → Environment Variables → add `ANTHROPIC_API_KEY`, then redeploy.

Without the key the page shows a friendly "not configured" message — the rest of the site is unaffected. The route also rate-limits per IP (10/10min) and globally (400/day).

## Deploy

1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → sign in with GitHub → Add New → Project → pick the repo → Deploy (defaults are fine).
3. Add the `ANTHROPIC_API_KEY` env var (above).
4. Custom domain: Vercel project → Settings → Domains → add `ishan-agarwal.com` and `www.ishan-agarwal.com`, then set the DNS records Vercel shows you inside GoDaddy (cPanel → DNS). Vercel handles HTTPS automatically.

## Where things live

- `lib/data.ts` — **all content**: case studies/articles, experience, honours, beyond, d20 facts. Edit this, not the components.
- `lib/fit.ts` — the JD-matcher's skill taxonomy and honest-gaps list.
- `lib/agentContext.ts` — builds the agent's system prompt from `data.ts`.
- `public/Ishan_Agarwal_Resume.pdf` — the downloadable resume; replace the file to update.
- `public/portrait.jpg` — the hero photo.
- `app/work/[slug]` — article pages, generated from `lib/data.ts`.
- `app/opengraph-image.tsx` — the social-share card, rendered at build time.
