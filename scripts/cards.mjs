// Why: a shared link (LinkedIn, X, Slack) shows a picture only when the page names one. This draws the page's
// 1200×630 share card from HTML in the site's own style, with the apps' real screenshots, into public/og/, the
// same way skills.victorsaly.com draws its cards. Run `npm run cards` after changing it; the PNG is committed so the
// build needs no browser.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const shot = (name) => `data:image/jpeg;base64,${readFileSync(`${root}public/shots/${name}.jpg`).toString('base64')}`;
const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(`${root}node_modules/@fontsource-variable/${pkg}/files/${file}`).toString('base64')}`;

const hub = `<style>
  @font-face { font-family: 'Next'; src: url(${font('atkinson-hyperlegible-next', 'atkinson-hyperlegible-next-latin-wght-normal.woff2')}) format('woff2'); font-weight: 200 800; }
  @font-face { font-family: 'Mono'; src: url(${font('atkinson-hyperlegible-mono', 'atkinson-hyperlegible-mono-latin-wght-normal.woff2')}) format('woff2'); font-weight: 200 800; }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: #fff; color: #000; font-family: 'Next', sans-serif; overflow: hidden;
    border-top: 14px solid #000; display: grid; grid-template-columns: 520px 1fr; }
  .text { padding: 56px 0 48px 72px; display: flex; flex-direction: column; }
  .who { display: flex; align-items: center; gap: 14px; font-size: 30px; font-weight: 700; }
  .who i { width: 22px; height: 22px; background: #000; }
  .who span { font-size: 20px; letter-spacing: 0.14em; text-transform: uppercase; }
  h1 { margin-top: 40px; font-size: 64px; max-width: 9ch; line-height: 1.02; font-weight: 800; letter-spacing: -0.03em; }
  p { margin-top: 24px; font-size: 26px; line-height: 1.4; color: #333; }
  .url { margin-top: auto; font-family: 'Mono', monospace; font-size: 24px; color: #525252; }
  .shots { padding: 48px 0 0 24px; display: grid; grid-template-columns: 330px 330px; gap: 16px; align-content: start; }
  .shots img { width: 330px; height: auto; border: 1px solid #cfcfcf; display: block; }
</style>
<div class="text">
  <div class="who"><i></i>Victor Saly <span>Apps</span></div>
  <h1>Apps you can open.</h1>
  <p>Games, tools and a blog, each made for a real need first.</p>
  <span class="url">apps.victorsaly.com</span>
</div>
<div class="shots">
  <img src="${shot('delulubeats')}" alt=""><img src="${shot('shutthecube')}" alt="">
  <img src="${shot('correlateai')}" alt=""><img src="${shot('olivermath')}" alt="">
  <img src="${shot('feedmeai')}" alt=""><img src="${shot('liliart')}" alt="">
</div>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(hub, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: `${root}public/og/hub.png` });
await browser.close();
console.info('drew public/og/hub.png');
