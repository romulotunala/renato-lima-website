# Renato Lima | Personal Trainer

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![SCSS Modules](https://img.shields.io/badge/SCSS-Modules-cc6699?logo=sass&logoColor=white)

Landing page do personal trainer Renato Lima, publicada em
[personalrenatolima.com.br](https://personalrenatolima.com.br).

É um site estático de página única (`output: 'export'`). Os contatos são feitos por links do
WhatsApp com mensagens pré-preenchidas.

## Stack

| Área | Ferramentas |
|---|---|
| App | Next.js 16 (App Router, export estático), React 19, TypeScript estrito |
| Estilo | SCSS + CSS Modules, tokens e mixins em `src/styles/abstracts` |
| Qualidade | ESLint 10, Stylelint, Husky, lint-staged, commitlint |
| Testes | Vitest + Testing Library (unitários), Playwright (E2E) |
| Deploy | GitHub Actions → GitHub Pages |

Requer Node.js 24+ e pnpm 11.

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000`.

## Scripts

```bash
pnpm dev          # servidor de desenvolvimento
pnpm build        # build estático em out/
pnpm lint         # ESLint + Stylelint
pnpm lint:fix     # corrige o que for automático
pnpm test         # testes unitários
pnpm test:e2e     # testes E2E contra out/ (rode pnpm build antes)
```

Na primeira vez que for rodar o E2E, instale o navegador com
`pnpm exec playwright install chromium`.

## Onde editar

| O que mudar | Onde |
|---|---|
| Texto de uma seção | O próprio componente em `src/components/sections/` |
| Telefone, CREF, Instagram, links do menu, URL e descrição do site | `src/lib/site.ts` |
| Mensagens e links do WhatsApp | `src/lib/whatsapp.ts` |
| Ordem das seções | `src/app/page.tsx` |
| Metadados, Open Graph e fontes | `src/app/layout.tsx` |
| Cores, espaçamentos, breakpoints e gradientes | `src/styles/abstracts/_variables.scss` |
| Imagens e ícones | `public/` |

O conteúdo fica junto do componente que o exibe. Listas (planos, FAQ, benefícios) são
constantes no topo do arquivo, renderizadas com `map`. Só dados usados por mais de um
componente ficam em `src/lib/site.ts`.

## Estrutura

```text
src/
├── app/               # layout, página e sitemap
├── components/
│   ├── sections/      # seções da página
│   └── ui/            # componentes reutilizáveis
├── lib/               # dados do site e helpers (WhatsApp, assets, cn)
├── styles/            # SCSS global, tokens e mixins
└── tests/             # setup do Vitest
e2e/                   # testes Playwright
```

## Convenções

- Os commits seguem [Conventional Commits](https://www.conventionalcommits.org/). O commitlint
  valida a mensagem no hook `commit-msg`.
- O hook `pre-commit` roda ESLint e Stylelint nos arquivos staged.
- Os testes unitários ficam ao lado do arquivo testado (`Componente.test.tsx`).

## Deploy

Todo push na `main` dispara o workflow [deploy.yml](.github/workflows/deploy.yml). Ele roda,
em ordem: lint, testes unitários, build, verificação dos assets exportados, testes E2E e
publicação no GitHub Pages. O domínio próprio é configurado em
**Settings → Pages → Custom domain**.

A variável `NEXT_PUBLIC_BASE_URL` define a URL usada nos metadados e no sitemap. O valor padrão é
`https://personalrenatolima.com.br`.
