export const heroContent = {
  badgeLabel: 'Consultoria & Personal Premium',
  title: 'Resultado não vem do acaso.',
  highlightTitle: 'Vem da estratégia.',
  subtitle:
    'Treino personalizado, biomecânica e periodização científica '
    + 'para você transformar seu corpo com segurança, constância e sem perder tempo.',
  primaryCtaLabel: 'Iniciar Transformação',
  // build WhatsApp link in multiple lines to satisfy max-len lint rule
  primaryCtaHref: (() => {
    const base = 'https://wa.me/5521991425161';
    const message = 'Olá, Renato! Vim pelo site e gostaria de iniciar '
      + 'minha transformação.';
    return `${base}?text=${encodeURIComponent(message)}`;
  })(),
  secondaryCtaLabel: 'Conhecer os planos',
} as const;

export interface HomeServiceItem {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export const servicesContent = {
  items: [
    {
      title: 'Falta de Direção',
      description:
        'Você chega na academia sem saber direito por onde começar ou '
        + 'executa exercícios sem ter certeza de que está no caminho certo.',
      icon: '/pin_drop_orange.svg',
    },
    {
      title: 'Falta de Constância',
      description:
        'Já tentou começar várias vezes, mas a falta de acompanhamento e '
        + 'de motivação faz você parar na metade e voltar à estaca zero.',
      icon: '/event_busy_orange.svg',
    },
    {
      title: 'Dores e Estagnação',
      description:
        'Treina há meses, mas convive com desconfortos articulares, postura '
        + 'incorreta e um corpo que parece não mudar no espelho.',
      icon: '/trending_down_orange.svg',
    },
  ] satisfies readonly HomeServiceItem[],
} as const;
