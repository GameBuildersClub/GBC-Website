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

Manual deploy:

```bash
cd site
npx wrangler login   # once
npm run deploy
```

Automatic deploys use **Workers Builds**: in the Cloudflare dashboard, Workers &
Pages → the `gbc-website` Worker → Settings → Builds → connect this repo with

| Setting        | Value                              |
| -------------- | ---------------------------------- |
| Root directory | `site`                             |
| Build command  | `npx opennextjs-cloudflare build`  |
| Deploy command | `npx wrangler deploy`              |

Pushes to `main` then build and deploy; other branches get preview URLs.
