# GBC Website — Copilot instructions

## Stack
Next.js 15, App Router, TypeScript strict, deployed on Vercel. Root directory: `site/`.

## Project structure
- `site/src/app/components/SitePages.tsx` — all page UI in one file (~473 lines). Every page is exported from here.
- `site/src/app/data/projects.ts` — static game data array, no database.
- `site/src/app/globals.css` — all styles, no CSS modules or Tailwind.
- `site/public/assets/` — images and icons, referenced as `/assets/<filename>`.
- Page files in `site/src/app/` are thin server components that import from SitePages and export Next.js `metadata`.

## Code style
- TypeScript strict — no `any`, no non-null assertions unless necessary.
- No inline styles — use globals.css classes.
- No comments unless the WHY is non-obvious.
- Hooks only in client components (SitePages.tsx is `"use client"`).
- Always use Next.js `<Image>` instead of `<img>`. Set `sizes` on `fill` images. Add `priority` on above-the-fold images.
- Buttons must have `type="button"` when not submitting a form.
- Escape apostrophes in JSX with `&apos;`.

## CSS conventions
- CSS custom properties: `--c-red`, `--c-ink`, `--c-ink-2`, `--c-ink-3`, `--c-line`, `--c-surface`, `--r-sm`, `--r-md`, `--r-lg`, `--shadow-card`, `--shadow-soft`.
- Card hover: `box-shadow` transition only — no translate/transform.
- Card pattern: `border-radius: var(--r-lg)`, `border: 1px solid var(--c-line)`.

## Adding games
Add entries to `site/src/app/data/projects.ts`. Valid engine values: `"godot"`, `"unity"`, `"unreal"`, `"custom"`. Valid kind values: `"semester"`, `"jam"`. Semester format: `"Fall 2025"`, `"Spring 2026"`, etc.

## What not to do
- Do not split SitePages.tsx unless asked.
- Do not add features not requested.
- Do not use bare `<img>` tags.
- Do not add Tailwind classes to SitePages.tsx or globals.css.
- Do not hardcode colours — use CSS custom properties.
