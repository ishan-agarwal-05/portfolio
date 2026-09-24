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

Hosted on Vercel (project `ishan-agarwal`), domain `ishan-agarwal.com` on GoDaddy DNS pointing at Vercel.

```bash
git push                      # save the change to GitHub
vercel deploy --prod --yes    # publish it
```

If the repo is connected to Vercel (Vercel settings, sign-in methods, GitHub), `git push` alone publishes.

## Updating the resume

The source lives outside this repo, in `/Users/ishan/personal/resumes/Ishan_Agarwal_Resume_<Month><Year>.tex`. Edit it, then:

```bash
./scripts/update-resume.sh
```

That compiles the full resume (with phone number, for applications) and a web copy without the phone number, copies the web copy to `public/Ishan_Agarwal_Resume.pdf`, commits, pushes and deploys. Needs `brew install tectonic` once. `--no-deploy` builds without publishing.

## Where things live

- `lib/data.ts` — **all content**: case studies/articles, experience, honours, beyond, d20 facts. Edit this, not the components.
- `lib/fit.ts` — the JD-matcher's skill taxonomy and honest-gaps list.
- `lib/agentContext.ts` — builds the agent's system prompt from `data.ts`.
- `public/Ishan_Agarwal_Resume.pdf` — the downloadable resume; replace the file to update.
- `public/portrait.jpg` — the hero photo.
- `app/work/[slug]` — article pages, generated from `lib/data.ts`.
- `app/opengraph-image.tsx` — the social-share card, rendered at build time.
