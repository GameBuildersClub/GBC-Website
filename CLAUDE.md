# GBC Website — Claude guidance

## Project overview
Next.js 15 (App Router, Turbopack) website for the UGA Game Builders Club. TypeScript strict mode. Deployed on Vercel. Root directory for Vercel is `site/`.

## Key architecture decisions
- **All page UI lives in one file**: `site/src/app/components/SitePages.tsx` (~473 lines). Every page component (`HomePage`, `GamesPage`, `GameDetailPage`, etc.) is exported from here. Do not split this file unless explicitly asked.
- **`"use client"`** on `SitePages.tsx` — the whole component tree is client-side. Page files in `app/` are server components that import from SitePages and export metadata.
- **Game data** is in `site/src/app/data/projects.ts` — a plain TypeScript array of game objects. No database, no API.
- **Static assets** go in `site/public/assets/`. Reference them as `/assets/<filename>` or via the `asset()` helper in SitePages.tsx.

## Image rules
- Always use Next.js `<Image>` — never bare `<img>` tags (except SVG icons where size is fixed).
- `fill` images require `position: relative; overflow: hidden` on the parent.
- Always set `sizes` prop on `fill` images.
- Set `priority` on above-the-fold images (hero, page headers).
- External image domains must be added to `remotePatterns` in `site/next.config.ts`.

## CSS conventions
- All styles in `site/src/app/globals.css` — no CSS modules, no Tailwind (the old Navigation.tsx uses Tailwind but is unused).
- Use CSS custom properties: `--c-red`, `--c-ink`, `--c-line`, `--r-md`, `--r-lg`, `--shadow-card`, etc.
- Hover animations: `box-shadow` only — no `translate` or `transform` on hover.
- Card pattern: `border-radius: var(--r-lg)`, `border: 1px solid var(--c-line)`, `background: #fff`.

## Adding a game
Append to the array in `site/src/app/data/projects.ts`. Required fields: `id`, `slug`, `title`, `tagline`, `semester`, `kind` (`"semester"` or `"jam"`), `engine`, `genres`, `image`, `team`. Optional: `itchUrl`, `itchEmbedUrl`, `steamUrl`, `steamVideoUrl`, `steamVideoThumb`, `gallery`, `semesters`.

## Semester values
Valid: `"Spring 2023"`, `"Fall 2023"`, `"Spring 2024"`, `"Fall 2024"`, `"Spring 2025"`, `"Fall 2025"`, `"Spring 2026"`. Also update the `SEMESTERS` filter array in SitePages.tsx when adding a new semester.

## Do not
- Do not mock or fabricate game data — only add real GBC games.
- Do not add comments explaining what code does — only add comments for non-obvious WHY.
- Do not add error handling for impossible cases (data is static).
- Do not use inline styles — move everything to globals.css.
- Do not introduce new dependencies without checking bundle impact.
