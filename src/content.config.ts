import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Field Notes: one dated markdown file per note under src/content/notes.
// `title` and `pubDate` feed the per-note BlogPosting JSON-LD automatically.
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { notes };
