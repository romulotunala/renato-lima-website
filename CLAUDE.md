# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Landing page de página única do personal trainer Renato Lima (personalrenatolima.com.br).
Next.js 16 com App Router e `output: 'export'` (totalmente estático, sem servidor nem API routes),
React 19, TypeScript estrito e SCSS Modules. O contato é feito apenas por links do WhatsApp com
mensagens pré-preenchidas. Textos do site, comentários e documentação ficam em português (pt-BR).

Requer Node 24+ e pnpm 11.

## Comandos

```bash
pnpm dev                        # servidor de desenvolvimento em http://localhost:3000
pnpm build                      # export estático em out/
pnpm lint                       # ESLint + Stylelint (src/**/*.scss)
pnpm lint:fix
pnpm test                       # testes unitários (Vitest, execução única)
pnpm exec vitest run src/lib/whatsapp.test.ts   # um único arquivo de teste
pnpm exec vitest run -t "nome do teste"         # filtrar pelo nome do teste
pnpm test:e2e                   # Playwright contra out/ — rode pnpm build antes
pnpm exec playwright install chromium           # setup do E2E na primeira vez
```

O E2E serve o `out/` já gerado com `serve` na porta 3000 (`playwright.config.ts`), então um build
desatualizado gera resultados desatualizados.

## Arquitetura

- `src/app/page.tsx` monta a página com os componentes de `src/components/sections/`; a ordem das
  seções fica ali. A navegação é por âncoras (`#metodo`, `#planos`, `#sobre`, `#faq`), definidas em
  `NAV_LINKS` em `src/lib/site.ts` — os `id`s das seções precisam bater.
- **O conteúdo fica junto do componente.** Listas (planos, FAQ, benefícios) são constantes no topo
  do arquivo da seção, renderizadas com `map`. Só dados usados por mais de um componente vão para
  `src/lib/site.ts` (telefone, CREF, Instagram, links do menu, URL/nome/descrição do site).
- **Links do WhatsApp** sempre são gerados com `buildWhatsAppLink` / `buildPlanWhatsAppLink` de
  `src/lib/whatsapp.ts`, nunca escritos à mão.
- **Assets estáticos:** arquivos de `public/` são referenciados via `assetPath()`
  (`src/lib/assets.ts`), que adiciona o base path. A fonte única do base path é `basePath` em
  `next.config.ts`, exposto como `NEXT_PUBLIC_BASE_PATH`. Imagens usam `next/image` com
  `unoptimized: true` (exigido pelo export estático).
- Componentes são server components por padrão; só os interativos (`Navbar`, `Faq`) usam
  `'use client'`.
- `NEXT_PUBLIC_BASE_URL` define a URL usada nos metadados e em `src/app/sitemap.ts`
  (padrão `https://personalrenatolima.com.br`).

## Estilo

- Cada componente tem um `*.module.scss` ao lado. Classes são combinadas com `cn()` de
  `src/lib/cn.ts`.
- Tokens (cores, espaçamentos, breakpoints, gradientes) ficam em
  `src/styles/abstracts/_variables.scss`; mixins (`container`, `respond-to($bp)` mobile-first,
  `respond-below($bp)`) em `_mixins.scss`. Os módulos importam com
  `@use '../../styles/abstracts/variables' as *;` — use os tokens em vez de valores soltos.
- **Estrutura das seções:** `<section className={styles.<secao>} id=... aria-label=...>`.
  Sem fundo próprio, a raiz recebe `@include container` e `padding-block: $spacing-24`; com fundo
  de ponta a ponta (Hero, Método, CTA), a raiz leva o fundo e um filho `.container` leva o mixin.
  Nomes: `.grid` para layout em colunas, listas pelo conteúdo (`.cardsList`, `.faqList`),
  `.content` para a coluna de texto e `.media` para a de imagem. `respond-to` fica aninhado na
  classe.

## Testes

- Testes unitários ficam ao lado do arquivo testado (`Componente.test.tsx`); o Vitest só pega
  `src/**/*.{test,spec}.{ts,tsx}`. Ambiente jsdom, globals habilitados, alias `@` para `src`.
- Nos testes, CSS Modules usam `classNameStrategy: 'non-scoped'`, então as classes são verificadas
  com o nome escrito no SCSS.
- Os testes substituem `next/image` por um `<img>` simples (`no-img-element` está desligado para
  `*.test.tsx`).

## Convenções

- O ESLint exige: indentação de 2 espaços, aspas simples (inclusive em atributos JSX),
  ponto e vírgula, vírgula final em multilinha e linhas de no máximo 100 caracteres.
- Idioma: mensagens de commit e descrições de testes (`describe`/`it`) em inglês; título e
  descrição de PR em português (seguindo `.github/pull_request_template.md`).
- Conventional Commits, validados pelo commitlint no hook `commit-msg`; o `pre-commit` roda o
  lint-staged (ESLint/Stylelint com `--fix` nos arquivos staged).

## Deploy / CI

Todo push na `main` roda `.github/workflows/deploy.yml`: lint → testes unitários → build →
verificação dos assets exportados → E2E → GitHub Pages. A verificação de assets é uma lista fixa de
arquivos que precisam existir em `out/` **e** ser referenciados em `out/index.html` — ao adicionar,
renomear ou remover uma imagem/ícone usado na página, atualize essa lista.
