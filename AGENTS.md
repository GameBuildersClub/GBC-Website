# GBC Website — Codex / OpenAI agent guidance

## Project
UGA Game Builders Club website. Next.js 16, App Router, TypeScript strict. Deployed to Cloudflare Workers via `@opennextjs/cloudflare`, with root directory `site/`.

## Key files
| File | Purpose |
|------|---------|
| `site/src/app/components/SitePages.tsx` | All page components (~473 lines, `"use client"`) |
| `site/src/app/data/projects.ts` | Static game data — source of truth for all games |
| `site/src/app/globals.css` | All styles |
| `site/public/assets/` | Images and icons |
| `site/next.config.ts` | Image remote patterns for external domains |
| `site/wrangler.jsonc` | Cloudflare Worker name, compat flags, bindings |
| `site/open-next.config.ts` | OpenNext adapter config (caching overrides) |

## Before making changes
1. Read `SitePages.tsx` fully before editing — many components share state and data.
2. Check `globals.css` for existing classes before adding new ones.
3. Run `npm run build` from `site/` to verify — all 44 pages must generate successfully.

## Game data schema
```ts
{
  id: number,           // sequential, unique
  slug: string,         // kebab-case, used in /games/[slug] URL
  title: string,
  tagline: string,
  semester: string,     // e.g. "Fall 2025" or "Fall 2025 – Spring 2026" for multi-semester
  semesters?: string[], // array if spans multiple semesters
  kind: "semester" | "jam",
  engine: "godot" | "unity" | "unreal" | "custom",
  genres: string[],
  image: string | null, // path like "/assets/filename.png" or null
  gallery?: string[],
  team: number,         // member count
  itchUrl?: string,
  itchEmbedUrl?: string,
  steamUrl?: string,
  steamVideoUrl?: string, // HLS .m3u8 URL from Steam API
  steamVideoThumb?: string,
}
```

## Constraints
- Never use `<img>` — always Next.js `<Image>` with `sizes` and `priority` where appropriate.
- Never use inline styles — all styles go in globals.css.
- Never add comments that describe what the code does.
- Never fabricate game data.
- Preserve the single-file pattern for SitePages.tsx.
- External image domains require `remotePatterns` entries in `next.config.ts`.
- Apostrophes in JSX must be `&apos;`, not `'`.
- All buttons need `type="button"` unless submitting a form.
