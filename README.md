# ishan-agarwal.com

Personal portfolio of Ishan Agarwal. Next.js 14, Tailwind CSS and Framer Motion, plus an optional Claude-powered ask-me agent.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Everything works without configuration except the ask-me agent, which needs an API key (below).

## The ask-me agent

`/ask` streams answers from the Claude API through `app/api/ask/route.ts`, grounded in `lib/data.ts` via `lib/agentContext.ts`. It's switched off by default: the page 404s and every link to it is hidden. To turn it on:

1. Get an API key at [console.anthropic.com](https://console.anthropic.com) (API Keys, Create Key) and set a monthly spend limit under Settings, Limits. US$5 is plenty.
2. On Vercel: project `ishan-agarwal`, Settings, Environment Variables. Add `ANTHROPIC_API_KEY` (the key) and `NEXT_PUBLIC_AGENT_ENABLED` with the value `true`.
3. Redeploy: `vercel deploy --prod --yes`.

For local testing, put the same two lines in `.env.local`. The route rate-limits per IP (10 per 10 minutes) and globally (400 a day).

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

- `lib/data.ts`: all the content (articles, experience, honours, the Currently section, d20 facts). Edit this, not the components.
- `lib/agentContext.ts`: builds the agent's system prompt from `data.ts`.
- `public/Ishan_Agarwal_Resume.pdf`: the resume the site serves. Update it with `scripts/update-resume.sh`, not by hand.
- `public/portrait.jpg`: the hero photo.
- `app/work/[slug]`: article pages, generated from `lib/data.ts`.
- `app/opengraph-image.tsx`: the preview card shown when the link is shared.
