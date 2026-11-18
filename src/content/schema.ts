// Why: what an app's file must say, in one place. The collection validates against it at build time and the tests
// run it over the same files, so a broken entry fails both. The fields are victorsaly.com's work entries, copied
// as they are, so an app reads the same on both sites.
import { z } from 'astro/zod';

/** a path to a file in public/, e.g. /shots/delulubeats.jpg */
const publicPath = z.string().regex(/^\/[\w./-]+$/);

export const appSchema = z.object({
  title: z.string().min(1).max(60),
  /** where its row sits, lowest first; the same number as on victorsaly.com */
  order: z.number().int().nonnegative(),
  /** what it does; its first sentence is the row's bold line */
  summary: z.string().min(20).max(500),
  url: z.url(),
  /** what the link to it says, e.g. delulubeats.com */
  host: z.string().min(1),
  repo: z.url().optional(),
  /** a real screenshot at 1280×800, saved 800px wide */
  shot: publicPath,
  shotAlt: z.string().min(10),
  tech: z.array(z.string().min(1)).min(1),
});

export type App = z.infer<typeof appSchema>;

/** The summary's first sentence, and the rest: the row says the first in bold, as the site's tagline. */
export function splitSummary(summary: string): { lead: string; rest: string } {
  const text = summary.replace(/\s+/g, ' ').trim();
  const end = text.search(/[.!?](\s|$)/);
  if (end === -1) return { lead: text, rest: '' };
  return { lead: text.slice(0, end + 1), rest: text.slice(end + 1).trim() };
}
