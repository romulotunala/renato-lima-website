export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://personalrenatolima.com.br';
export const SITE_NAME = 'Renato Lima | Personal Trainer';
export const SITE_DESCRIPTION =
  'Treino personalizado, biomecânica e periodização científica para transformar seu corpo.';

export const CREF = 'CREF 055596-RJ';

export const PHONE = {
  e164: '5521991425161',
  display: '(21) 99142-5161',
} as const;

export const INSTAGRAM = {
  handle: '@personalrenatolima',
  url: 'https://www.instagram.com/personalrenatolima/',
} as const;

export interface NavLink {
  readonly href: string;
  readonly label: string;
  readonly longLabel: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { href: '#metodo', label: 'O Método', longLabel: 'O Método' },
  { href: '#planos', label: 'Serviços', longLabel: 'Serviços e Planos' },
  { href: '#sobre', label: 'Sobre', longLabel: 'Sobre o Renato' },
  { href: '#faq', label: 'FAQ', longLabel: 'Perguntas Frequentes' },
];
