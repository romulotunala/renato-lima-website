import { buildPlanWhatsAppLink } from '@/lib/whatsapp';
import { Bullet } from '../Bullet';
import styles from './Plans.module.scss';

const flagEnum = {
  highlight: 'highlight',
  news: 'news',
} as const;

type Flag = typeof flagEnum[keyof typeof flagEnum];
type Plan = {
  id: string;
  title: string;
  description: string;
  featuresList: string[];
  buttonText: string;
  flag?: Flag;
};
const plansContent: Plan[] = [
  {
    id: 'personal-premium-in-person',
    title: 'Personal Premium Presencial',
    description: 'Máxima atenção técnica, correções ao vivo e alta performance.',
    featuresList: [
      'Campo Grande e Recreio',
      'Correções técnicas em tempo real',
      'Avaliação física, postural e funcional',
      'Ajustes semanais de carga/progressão',
    ],
    buttonText: 'Consultar Vagas',
  },
  {
    id: 'personal-premium-duo',
    title: 'Personal Premium em Dupla',
    description: 'Treinem juntos, mas com estratégias e progressões individuais.',
    featuresList: [
      'Motivação em dobro, custo otimizado',
      'Adaptações individuais no presencial',
      'Treinos extras 100% no app',
      'Avaliação física individual para ambos',
    ],
    buttonText: 'Saber Mais',
    flag: flagEnum.news,
  },
  {
    id: 'premium-online-coaching',
    title: 'Consultoria Premium Online',
    description: 'Liberdade para treinar onde quiser, sem improvisos.',
    featuresList: [
      'Anamnese profunda',
      'Treino entregue no App MFIT (em até 48h)',
      'Vídeos demonstrativos de tudo',
      'Análise de execução por vídeo via WhatsApp',
      'Reavaliações a cada 4 semanas',
    ],
    buttonText: 'Começar Agora',
    flag: flagEnum.highlight,
  },
  {
    id: 'storm-evolution-plan',
    title: 'Plano Storm Evolution',
    description: 'Plano estratégico de 4 semanas (custo-benefício).',
    featuresList: [
      'Treino personalizado para 4 semanas no app',
      'Sem acompanhamento semanal (foco em autonomia)',
      'Bônus: E-book "Reeducação Alimentar Inteligente"',
    ],
    buttonText: 'Conhecer Plano',
  },
];

export function Plans() {
  const getCardHighlightClassName = (flag: Flag | undefined) =>
    flag === flagEnum.highlight ? styles.cardHighlight : false;

  const getButtonHighlightClassName = (flag: Flag | undefined) =>
    flag === flagEnum.highlight ? styles.cardButtonHighlight : false;

  return (
    <section className={styles.plans} id="planos" aria-label="Planos e serviços">
      <div className={styles.container}>
        <h2 className={styles.title}>
          Escolha a{' '}
          <span className={styles.highlightTitle}>sua jornada</span>
        </h2>
        <p className={styles.subtitle}>Opções que se adaptam à sua rotina, garantindo{' '}
          acompanhamento técnico de excelência.</p>
        <ul className={styles.cardsList}>
          {plansContent.map((plan) => (
            <li
              key={plan.id}
              className={[styles.card, getCardHighlightClassName(plan.flag)]
                .filter(Boolean)
                .join(' ')
              }
            >
              {plan.flag === 'highlight' && (
                <span className={styles.flagHighlight}>
                  Mais Procurado
                </span>
              )}
              {plan.flag === 'news' && (
                <span className={styles.flagNews}>
                  Novidade
                </span>
              )}
              <h3 className={styles.cardTitle}>{plan.title}</h3>
              <p className={styles.cardDescription}>{plan.description}</p>
              <ul>
                {plan.featuresList.map((feature, index) => (
                  <li key={plan.id + index} className={styles.featureItem}>
                    <Bullet size="small" />
                    <span className={styles.featureText}>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={buildPlanWhatsAppLink(plan.title)}
                className={[styles.cardButton, getButtonHighlightClassName(plan.flag)]
                  .filter(Boolean)
                  .join(' ')
                }
                target='_blank'
                rel='noreferrer'
                aria-label={`Consultar plano ${plan.title}`}
              >
                {plan.buttonText}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
