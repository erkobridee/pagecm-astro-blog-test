import type { AstroUserConfig } from 'astro';

import remarkToc from 'remark-toc';
import remarkCollapse from 'remark-collapse';

import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';

// https://tailwindcss.com/docs/installation/framework-guides/astro
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/config';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://github.com/eslint/eslint/discussions/15305
import { readFileSync } from 'fs';
const packageJSON = JSON.parse(
  readFileSync('./package.json', { encoding: 'utf-8' })
);
const { name } = packageJSON;

const isGitHubPagesBuild = !!process.env.GITHUB_PAGES;
const isGitHubPagesPreview = !!process.env.GITHUB_PAGES_PREVIEW;

const baseConfig: AstroUserConfig = {
  integrations: [mdx(), react(), sitemap()],

  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkToc,
        [remarkCollapse, { test: 'Table of contents' }],
      ],
    }),
    shikiConfig: { theme: 'one-dark-pro', wrap: true },
  },

  vite: {
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@styles': path.resolve(__dirname, './src/styles'),
      },
    },
  },

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
