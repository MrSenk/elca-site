# elca-site

Personal portfolio and mini blog. A single-page bento grid that doubles as a bounty hunter's dossier — CRT scanlines, amber terminal glow, and all.

## What it is

- **Portfolio** — experience timeline, tech stack diagnostics, certifications, and a projects section styled as mission dossiers
- **Mini blog** — a small writing space for articles, accessible from the main page
- **Bilingual** — full EN / ES content toggle, no page reload
- **Aesthetic** — Cowboy Bebop space western: phosphor amber, CRT overlays, VT323 terminal font, regional image glitch effects

## Stack

- React 19 + TypeScript (strict)
- Vite 7 — built for GitHub Pages at `/elca-site/`
- Tailwind CSS 3.4 with custom `bb-*` color tokens
- Framer Motion for tile animations
- `content.json` / `blog.json` for all copy — no CMS needed

## Running locally

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

Output goes to `dist/` with the correct `/elca-site/` base path baked in.
