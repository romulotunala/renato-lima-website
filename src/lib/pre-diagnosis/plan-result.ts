import { MODALIDADE } from './questions';
import type { Answers, PlanId } from './types';

interface PlanResult {
  readonly title: string;
  readonly text: string;
  readonly ctaLabel: string;
  /** Frase final da mensagem de WhatsApp. */
  readonly closing: string;
}

const DEFAULT_CTA_LABEL = 'Conversar com Renato no WhatsApp';
const DEFAULT_CLOSING = 'Gostaria de entender melhor como funciona e verificar os próximos passos.';

export const PLAN_RESULTS: Readonly<Record<PlanId, PlanResult>> = {
  presencial: {
    title: 'Personal Presencial',
    text: 'Pelo que você respondeu, o Personal Presencial pode fazer sentido para o seu momento. '
      + 'Como disponibilidade e condições dependem também da frequência, agenda e região do '
      + 'atendimento, o próximo passo é conversarmos pelo WhatsApp.',
    ctaLabel: DEFAULT_CTA_LABEL,
    closing: DEFAULT_CLOSING,
  },
  dupla: {
    title: 'Personal em Dupla',
    text: 'Pelo que você respondeu, o Personal em Dupla pode fazer sentido para vocês. Vocês '
      + 'treinam juntos presencialmente, mas cada aluno é avaliado e acompanhado individualmente. '
      + 'O próximo passo é verificar a agenda com o Renato.',
    ctaLabel: 'Verificar disponibilidade no WhatsApp',
    closing: 'Gostaria de verificar disponibilidade e entender melhor como funciona o Personal '
      + 'em Dupla.',
  },
  online: {
    title: 'Consultoria Online Personalizada',
    text: 'Pelo que você respondeu, a Consultoria Online Personalizada parece estar mais alinhada '
      + 'ao nível de acompanhamento que você procura.',
    ctaLabel: DEFAULT_CTA_LABEL,
    closing: DEFAULT_CLOSING,
  },
  storm: {
    title: 'Storm Evolution',
    text: 'Pelo que você respondeu, o Storm Evolution pode ser uma boa opção para organizar suas '
      + 'próximas quatro semanas de treino com estratégia e maior autonomia.',
    ctaLabel: DEFAULT_CTA_LABEL,
    closing: DEFAULT_CLOSING,
  },
};

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === 'string' && Object.hasOwn(PLAN_RESULTS, value);
}

/** Plano indicado pelas respostas, ou `null` enquanto ainda não dá para indicar. */
export function resolvePlan({ modalidade, focoOnline, situacao }: Answers): PlanId | null {
  switch (modalidade) {
    case MODALIDADE.presencial:
      return 'presencial';
    case MODALIDADE.dupla:
      return 'dupla';
    case MODALIDADE.online:
      return isPlanId(focoOnline) ? focoOnline : null;
    case MODALIDADE.indeciso:
      return isPlanId(situacao) ? situacao : null;
    default:
      return null;
  }
}

/** Planos atendidos presencialmente, que pedem região e disponibilidade. */
export function isInPersonPlan(plan: PlanId | null): boolean {
  return plan === 'presencial' || plan === 'dupla';
}

/** Texto do resultado, começando pelo nome quando ele já foi informado. */
export function getResultText(plan: PlanId, name = ''): string {
  const { text } = PLAN_RESULTS[plan];
  const trimmedName = name.trim();

  if (!trimmedName) return text;

  return `${trimmedName}, ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}
