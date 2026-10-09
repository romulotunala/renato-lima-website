import type { Option, PlanId, QuestionId, Step, StepId } from './types';

/** Valores usados pelas regras do fluxo; os textos exibidos ficam nas opções. */
export const MODALIDADE = {
  presencial: 'presencial',
  dupla: 'dupla',
  online: 'online',
  indeciso: 'indeciso',
} as const;

export type Modalidade = typeof MODALIDADE[keyof typeof MODALIDADE];

export const DOR = {
  nao: 'nao',
  sim: 'sim',
} as const;

// Os valores de `focoOnline` e `situacao` são os próprios ids dos planos indicados
const FOCO_ONLINE_OPTIONS: readonly Option<PlanId>[] = [
  { value: 'online', label: 'Acompanhamento contínuo, com feedbacks e ajustes' },
  { value: 'storm', label: 'Um planejamento de 4 semanas, com mais autonomia' },
];

const SITUACAO_OPTIONS: readonly Option<PlanId>[] = [
  { value: 'presencial', label: 'Quero alguém comigo presencialmente durante os treinos' },
  { value: 'dupla', label: 'Quero treinar presencialmente com outra pessoa' },
  { value: 'online', label: 'Quero acompanhamento contínuo mesmo treinando sozinho' },
  { value: 'storm', label: 'Quero receber um plano personalizado e ter mais autonomia' },
];

export const STEPS: Readonly<Record<StepId, Step>> = {
  objetivo: {
    questions: [{
      kind: 'choice',
      id: 'objetivo',
      label: 'Qual é seu principal objetivo?',
      options: [
        { value: 'emagrecimento', label: 'Emagrecimento' },
        { value: 'hipertrofia', label: 'Hipertrofia' },
        { value: 'composicao-corporal', label: 'Melhora da composição corporal' },
        { value: 'condicionamento', label: 'Condicionamento físico' },
        { value: 'voltar-aos-treinos', label: 'Voltar aos treinos' },
        { value: 'postura-mobilidade', label: 'Postura e mobilidade' },
        { value: 'outro', label: 'Outro' },
      ],
    }],
  },
  modalidade: {
    questions: [{
      kind: 'choice',
      id: 'modalidade',
      label: 'Como você gostaria de ser acompanhado?',
      options: [
        { value: MODALIDADE.presencial, label: 'Personal Presencial Individual' },
        { value: MODALIDADE.dupla, label: 'Personal em Dupla' },
        { value: MODALIDADE.online, label: 'Online' },
        { value: MODALIDADE.indeciso, label: 'Ainda não sei' },
      ],
    }],
  },
  parceiro: {
    questions: [{
      kind: 'choice',
      id: 'parceiro',
      label: 'Você já tem alguém para treinar com você?',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'procurando', label: 'Ainda estou procurando alguém' },
        { value: 'entender-primeiro', label: 'Quero entender como funciona primeiro' },
      ],
    }],
  },
  focoOnline: {
    questions: [{
      kind: 'choice',
      id: 'focoOnline',
      label: 'O que você procura neste momento?',
      options: FOCO_ONLINE_OPTIONS,
    }],
  },
  situacao: {
    questions: [{
      kind: 'choice',
      id: 'situacao',
      label: 'Qual destas situações mais combina com você?',
      options: SITUACAO_OPTIONS,
    }],
  },
  agenda: {
    questions: [
      {
        kind: 'text',
        id: 'regiao',
        label: 'Em qual bairro ou região pretende treinar?',
        placeholder: 'Ex.: Barra da Tijuca',
        help: 'Apenas o bairro ou a região. Não precisa informar o endereço.',
      },
      {
        kind: 'choice',
        id: 'periodo',
        label: 'Qual período costuma ter disponibilidade?',
        options: [
          { value: 'manha', label: 'Manhã' },
          { value: 'tarde', label: 'Tarde' },
          { value: 'noite', label: 'Noite' },
          { value: 'variados', label: 'Horários variados' },
        ],
      },
    ],
  },
  treina: {
    questions: [{
      kind: 'choice',
      id: 'treina',
      label: 'Você treina atualmente?',
      options: [
        { value: 'regularmente', label: 'Sim, regularmente' },
        { value: 'as-vezes', label: 'Às vezes' },
        { value: 'parado', label: 'Estou parado(a)' },
        { value: 'nunca', label: 'Nunca treinei' },
      ],
    }],
  },
  dor: {
    questions: [
      {
        kind: 'choice',
        id: 'dor',
        label: 'Sente alguma dor ou limitação hoje?',
        options: [
          { value: DOR.nao, label: 'Não' },
          { value: DOR.sim, label: 'Sim' },
        ],
      },
      {
        kind: 'multi',
        id: 'dorLocal',
        label: 'Onde?',
        visibleWhen: (answers) => answers.dor === DOR.sim,
        options: [
          { value: 'ombros', label: 'Ombros' },
          { value: 'coluna', label: 'Coluna' },
          { value: 'quadril', label: 'Quadril' },
          { value: 'joelhos', label: 'Joelhos' },
          { value: 'outro', label: 'Outro' },
        ],
      },
    ],
  },
  dificuldade: {
    questions: [{
      kind: 'choice',
      id: 'dificuldade',
      label: 'Qual é hoje sua maior dificuldade com os treinos?',
      options: [
        { value: 'tempo', label: 'Falta de tempo' },
        { value: 'constancia', label: 'Falta de constância' },
        { value: 'o-que-fazer', label: 'Não sei o que fazer no treino' },
        { value: 'dores', label: 'Dores ou medo de me lesionar' },
        { value: 'alimentacao', label: 'Alimentação' },
        { value: 'outra', label: 'Outra' },
      ],
    }],
  },
  inicio: {
    questions: [{
      kind: 'choice',
      id: 'inicio',
      label: 'Quando pretende começar?',
      options: [
        { value: 'o-quanto-antes', label: 'O quanto antes' },
        { value: 'proximos-7-dias', label: 'Nos próximos 7 dias' },
        { value: 'proximas-semanas', label: 'Nas próximas semanas' },
        { value: 'pesquisando', label: 'Estou apenas pesquisando' },
      ],
    }],
  },
  nome: {
    questions: [{
      kind: 'text',
      id: 'nome',
      label: 'Qual é seu primeiro nome?',
      placeholder: 'Seu primeiro nome',
      autoComplete: 'given-name',
    }],
  },
};

const OPTIONS_BY_QUESTION = new Map<QuestionId, readonly Option[]>(
  Object.values(STEPS)
    .flatMap((step) => step.questions)
    .flatMap((question) => (
      question.kind === 'text' ? [] : [[question.id, question.options] as const]
    )),
);

/** Texto exibido de uma opção, a partir do valor salvo nas respostas. */
export function getOptionLabel(
  questionId: QuestionId,
  value: string | undefined,
): string | undefined {
  if (value === undefined) return undefined;
  const option = OPTIONS_BY_QUESTION.get(questionId)?.find((item) => item.value === value);
  return option?.label ?? value;
}
