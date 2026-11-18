import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { appSchema, splitSummary } from './schema';

// fileURLToPath, not .pathname: a pathname is percent-encoded, so a checkout under a folder with a space in its
// name would make every file look missing.
const here = (path: string): string => fileURLToPath(new URL(path, import.meta.url));
const publicFile = (path: string): string => here(`../../public${path}`);

const frontMatter = (text: string): unknown => parse(/^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? '');

const apps = readdirSync(here('./apps'))
  .filter((name) => name.endsWith('.md'))
  .map((name) => ({ slug: name.replace(/\.md$/, ''), text: readFileSync(here(`./apps/${name}`), 'utf8') }));

describe('apps (src/content/apps)', () => {
  it('lists the eight the owner chose', () => {
    expect(apps.map((a) => a.slug).sort()).toEqual(
      ['agentic-blog', 'correlateai', 'dbtour', 'delulu-beats', 'feedme-ai', 'liliart', 'oliver-math', 'shut-the-cube'],
    );
  });

  it('each file says what the schema asks for', () => {
    for (const { slug, text } of apps) {
      const result = appSchema.safeParse(frontMatter(text));
      expect(result.success, `${slug}: ${result.error?.message ?? ''}`).toBe(true);
    }
  });

  it('each screenshot is on disk', () => {
    for (const { slug, text } of apps) {
      const app = appSchema.parse(frontMatter(text));
      expect(existsSync(publicFile(app.shot)), `${slug}: ${app.shot}`).toBe(true);
    }
  });

  it('no two share a place in the order', () => {
    const orders = apps.map(({ text }) => appSchema.parse(frontMatter(text)).order);
    expect(new Set(orders).size).toBe(orders.length);
  });
});

describe('a summary split for its row', () => {
  it('takes the first sentence as the lead', () => {
    expect(splitSummary('One thing. Then\n  another.')).toEqual({ lead: 'One thing.', rest: 'Then another.' });
  });

  it('keeps a one-sentence summary whole', () => {
    expect(splitSummary('Only one sentence here')).toEqual({ lead: 'Only one sentence here', rest: '' });
  });

  it('does not split inside a number or a host name', () => {
    expect(splitSummary('Scores +0.91 on blog.victorsaly.com. Next.')).toEqual({ lead: 'Scores +0.91 on blog.victorsaly.com.', rest: 'Next.' });
  });
});
