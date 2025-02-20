import type { AstroUserConfig } from 'astro';

import remarkToc from 'remark-toc';
import remarkCollapse from 'remark-collapse';

import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import { SITE } from './src/config';

// https://github.com/eslint/eslint/discussions/15305
import { readFileSync } from 'fs';
const packageJSON = JSON.parse(
  readFileSync('./package.json', { encoding: 'utf-8' })
);
const { name } = packageJSON;

const isGitHubPagesBuild = !!process.env.GITHUB_PAGES;
const isGitHubPagesPreview = !!process.env.GITHUB_PAGES_PREVIEW;

const baseConfig: AstroUserConfig = {
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: 'Table of contents' }]],
    shikiConfig: { theme: 'one-dark-pro', wrap: true },
  },
  vite: { optimizeDeps: { exclude: ['@resvg/resvg-js'] } },
  scopedStyleStrategy: 'where',
};

// https://docs.astro.build/en/guides/deploy/github/#configure-astro-for-github-pages
const config = (
  isGitHubPagesBuild
    ? {
        ...baseConfig,
        site: isGitHubPagesPreview ? undefined : SITE.website,
        base: `/${name}`,
      }
    : baseConfig
) as AstroUserConfig;

// https://astro.build/config
export default defineConfig(config);
