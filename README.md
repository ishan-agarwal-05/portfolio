# ishan-portfolio

Personal portfolio of Ishan Agarwal — built with Next.js 14, Tailwind CSS and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy (when ready)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click **Add New → Project**, pick the repo.
3. Accept the defaults (Vercel auto-detects Next.js) and hit Deploy. Done — every future `git push` redeploys automatically.

To use a custom domain later, add it under the Vercel project's **Settings → Domains**.

## Where things live

- `lib/data.ts` — all content: case studies, experience, projects, skills, d20 facts. Edit this, not the components.
- `lib/fit.ts` — the JD-matcher's skill taxonomy and honest-gaps list.
- `public/Ishan_Agarwal_Resume.pdf` — the downloadable resume. Replace the file to update it.
- `app/work/[slug]` — case study pages, generated from `lib/data.ts`.
