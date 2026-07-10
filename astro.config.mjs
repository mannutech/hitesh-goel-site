// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is what @astrojs/sitemap reads to build absolute URLs — keep it in sync
// with the canonical domain (master plan, Part 3 §5).
export default defineConfig({
  site: 'https://hitesh-goel.com',
  integrations: [sitemap()],
  trailingSlash: 'ignore',
});
