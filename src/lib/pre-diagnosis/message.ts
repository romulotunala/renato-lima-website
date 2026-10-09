import { buildWhatsAppLink } from '@/lib/whatsapp';
import { isInPersonPlan, PLAN_RESULTS } from './plan-result';
import { DOR, getOptionLabel } from './questions';
import type { Answers, PlanId } from './types';

const MESSAGE_INTRO = 'Olá, Renato! Vim pelo seu site e respondi ao pré-diagnóstico.';

type MessageLine = readonly [label: string, value: string | undefined];

function describeDor({ dor, dorLocal = [] }: Answers): string {
  if (dor !== DOR.sim) return 'Não';
  return dorLocal.map((local) => getOptionLabel('dorLocal', local)).join(', ');
}

function getAgendaLines(answers: Answers, plan: PlanId): MessageLine[] {
  if (!isInPersonPlan(plan)) return [];

  return [
    ['Região', answers.regiao?.trim()],
    ['Disponibilidade', getOptionLabel('periodo', answers.periodo)],
  ];
}

function getParceiroLines(answers: Answers, plan: PlanId): MessageLine[] {
  if (plan !== 'dupla') return [];
  return [['Já tenho alguém para treinar comigo', getOptionLabel('parceiro', answers.parceiro)]];
}

export function buildPreDiagnosisMessage(answers: Answers, plan: PlanId): string {
  const result = PLAN_RESULTS[plan];
  const lines: MessageLine[] = [
    ['Meu nome', answers.nome?.trim()],
    ['Objetivo', getOptionLabel('objetivo', answers.objetivo)],
    ['Interesse indicado', result.title],
    ['Treino atualmente', getOptionLabel('treina', answers.treina)],
    ['Dor ou limitação', describeDor(answers)],
    ['Maior dificuldade', getOptionLabel('dificuldade', answers.dificuldade)],
    ['Pretendo começar', getOptionLabel('inicio', answers.inicio)],
    ...getAgendaLines(answers, plan),
    ...getParceiroLines(answers, plan),
  ];
  const summary = lines
    .filter(([, value]) => value)
    .map(([label, value]) => `*${label}*: ${value}`)
    .join('\n');

  return [MESSAGE_INTRO, summary, result.closing].join('\n\n');
}

export function buildPreDiagnosisLink(answers: Answers, plan: PlanId): string {
  return buildWhatsAppLink(buildPreDiagnosisMessage(answers, plan));
}
