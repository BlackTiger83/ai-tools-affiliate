import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://ai-tools-affiliate-placeholder.vercel.app',
  integrations: [mdx(), sitemap()],
  output: 'static'
});
