// Why: the page is static: nothing runs on a request, so the site is fast and costs nothing.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://apps.victorsaly.com',
  trailingSlash: 'never',
  build: { format: 'file' },
});
