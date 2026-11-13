import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  // Global ignores (replaces .eslintignore)
  {
    ignores: [
      "dist/**", 
      ".astro/**", 
      ".vscode/**", 
      "node_modules/**", 
      "public/**", 
      "dist/**", 
      ".husky/**", 
      ".yarn/**",
      "src/**/*.d.ts",
    ],
  },

  // Replaces "env": { node: true, es2022: true, browser: true }
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
  },

  // Replaces "eslint:recommended"
  eslint.configs.recommended,

  // TypeScript support (replaces @typescript-eslint/parser)
  ...tseslint.configs.recommended,

  // Replaces "plugin:astro/recommended" and the *.astro override
  ...eslintPluginAstro.configs.recommended,

  // Optional: Add custom rules for .astro files here
  {
    files: ["**/*.astro"],
    rules: {},
  },
];