# Victor Saly · Apps

The site at [apps.victorsaly.com](https://apps.victorsaly.com): one page listing Victor Saly's apps, each with what
it does, where to open it and a real screenshot. Each app lives in its own repository; this one is only the site.
It is built like [skills.victorsaly.com](https://skills.victorsaly.com), with the same frame, type and colours.

## Run it

```bash
npm install
npm run dev       # http://localhost:4321
npm test          # each app's file against the schema, and its screenshot on disk
npm run build     # astro check, then the static site in dist/
npm run deploy    # build, then wrangler deploy (claims apps.victorsaly.com)
```

## Add an app

1. Add `src/content/apps/<slug>.md` with its front matter (title, order, summary, url, host, repo, shot, shotAlt,
   tech). These are the same fields as the app's entry in victorsaly.com's `src/content/work/`; copy them from
   there so the two sites say the same thing. The summary's first sentence is the row's bold line.
2. Put its screenshot in `public/shots/`, 800px wide at 1280×800, the same picture victorsaly.com uses.
3. Add its slug to the list in `src/content/content.test.ts`, and redraw the share card with `npm run cards` if
   it should be on it.

## Where things are

```
src/content/schema.ts      what an app's file must say, and how its summary splits for the row
src/content/apps/          one file per app
src/styles/global.css      the shared tokens: paper, ink, one marigold, three rule weights
src/layouts/Frame.astro    the frame: Victor Saly · Apps, the source, the footer
src/pages/                 the page (index), 404, sitemap
public/shots/              each app's real screenshot
public/og/hub.png          the share card, drawn by scripts/cards.mjs
```

MIT licence, © Victor Saly.
