import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import next from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig(
  { ignores: ['out/', '.next/', 'node_modules/', 'next-env.d.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  next.configs['core-web-vitals'],
  reactHooks.configs.flat.recommended,
  {
    plugins: { '@stylistic': stylistic },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/max-len': ['error', { code: 100 }],
      '@stylistic/eol-last': ['error', 'always'],
    },
  },
  {
    // Os testes substituem next/image por um <img> simples
    files: ['**/*.test.tsx'],
    rules: { '@next/next/no-img-element': 'off' },
  },
);
