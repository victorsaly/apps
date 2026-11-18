// Why: one Markdown file per app. The page lists them from here, so a new app is one new file and its screenshot.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { appSchema } from './content/schema';

const apps = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/apps' }),
  schema: appSchema,
});

export const collections = { apps };
