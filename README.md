# GBC Website
 
The official website for the Game Builders Club at the University of Georgia.

Built with [Next.js](https://nextjs.org), deployed on [Cloudflare Workers](https://developers.cloudflare.com/workers/) via [OpenNext](https://opennext.js.org/cloudflare).

## Project Structure

```
site/   Next.js app (root directory for the Cloudflare build)
```

## Development

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

To run the real Workers runtime (`workerd`) instead of the Next dev server:

```bash
npm run preview
```

## Adding Games

Game data lives in `site/src/app/data/projects.ts`. Append a new entry to the array and put cover art/screenshots in `site/public/assets/`, referenced as `/assets/<filename>`.

## Deployment

Config lives in `site/wrangler.jsonc` (Worker name, bindings) and `site/open-next.config.ts` (adapter/caching).

Live at **https://gamebuildersclub.com** (custom domain attached to the Worker).

Manual deploy — works from the repo root or from `site/`:

```bash
npx wrangler login   # once, from site/
npm run deploy
```

### Workers Builds (automatic deploys)

Cloudflare dashboard → Workers & Pages → the `gbc-website` Worker → Settings → Build.
Because the npm project lives in `site/`, the build settings must point at it:

| Setting         | Value                 |
| --------------- | --------------------- |
| Root directory  | `site`                |
| Install command | `npm ci`              |
| Build command   | `npm run cf:build`    |
| Deploy command  | `npx wrangler deploy` |

If you would rather leave **Root directory** at the repo root, use these instead —
`ci:build` installs `site/`'s dependencies first, which a root-level install does not do:

| Setting        | Value             |
| -------------- | ----------------- |
| Build command  | `npm run ci:build`  |
| Deploy command | `npm run ci:deploy` |

Two things that will silently break a deploy:

- **`npm run build` is not enough.** It only runs `next build`; it never produces a
  Worker. Always use `cf:build` / `ci:build`.
- **`cf:build` also runs `populateCache local`**, which copies the prerendered pages
  into `.open-next/assets`. Without it the site still works, but every request boots
  the Next.js server instead of being answered from static assets.

Pushes to `main` then build and deploy; other branches get preview URLs.
