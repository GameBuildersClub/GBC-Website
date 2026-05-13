# GBC Website

The official website for the Game Builders Club at the University of Georgia.

Built with [Next.js](https://nextjs.org), deployed on [Vercel](https://vercel.com).

## Project Structure

```
site/   Next.js app (root directory for Vercel)
```

## Development

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Adding Games

Game data lives in `site/src/app/data/projects.ts`. Append a new entry to the array and put cover art/screenshots in `site/public/assets/`, referenced as `/assets/<filename>`.

## Deployment

The site auto-deploys to Vercel on every push to `main`. The Vercel root directory is set to `site/`.
