import { isInPersonPlan, resolvePlan } from './plan-result';
import { MODALIDADE, type Modalidade, STEPS } from './questions';
import type { Answers, Question, QuestionId, StepId } from './types';

export const FIRST_STEP: StepId = 'objetivo';

/** Tela extra que cada modalidade abre logo depois da tela 2. */
const BRANCH_STEP: Readonly<Record<Exclude<Modalidade, 'presencial'>, StepId>> = {
  [MODALIDADE.dupla]: 'parceiro',
  [MODALIDADE.online]: 'focoOnline',
  [MODALIDADE.indeciso]: 'situacao',
};

function isBranchModalidade(value: string | undefined): value is keyof typeof BRANCH_STEP {
  return value !== undefined && Object.hasOwn(BRANCH_STEP, value);
}

const FINAL_STEPS: readonly StepId[] = ['treina', 'dor', 'dificuldade', 'inicio', 'nome'];

/** Caminho atual do questionário; muda conforme as respostas da tela 2 em diante. */
export function getSteps(answers: Answers): StepId[] {
  const branchStep = isBranchModalidade(answers.modalidade)
    ? BRANCH_STEP[answers.modalidade]
    : undefined;
  const steps: StepId[] = [FIRST_STEP, 'modalidade'];

  if (branchStep) steps.push(branchStep);
  if (isInPersonPlan(resolvePlan(answers))) steps.push('agenda');

  return [...steps, ...FINAL_STEPS];
}

export function getVisibleQuestions(stepId: StepId, answers: Answers): readonly Question[] {
  return STEPS[stepId].questions.filter((question) => question.visibleWhen?.(answers) ?? true);
}

export function isAnswered(question: Question, answers: Answers): boolean {
  if (question.kind === 'multi') {
    return (answers[question.id]?.length ?? 0) > 0;
  }

  return (answers[question.id]?.trim() ?? '').length > 0;
}

export function isStepComplete(stepId: StepId, answers: Answers): boolean {
  return getVisibleQuestions(stepId, answers).every((question) => isAnswered(question, answers));
}

/** Telas com uma única pergunta de opções avançam assim que a pessoa responde. */
export function autoAdvances(stepId: StepId, answers: Answers): boolean {
  const questions = getVisibleQuestions(stepId, answers);
  return questions.length === 1 && questions[0].kind === 'choice';
}

/** Remove respostas de perguntas que saíram do caminho (ex.: trocar Online por Dupla). */
export function pruneAnswers(answers: Answers): Answers {
  const relevantIds = new Set<QuestionId>();

  for (const stepId of getSteps(answers)) {
    getVisibleQuestions(stepId, answers).forEach((question) => relevantIds.add(question.id));
  }

  return Object.fromEntries(
    Object.entries(answers).filter(([id]) => relevantIds.has(id as QuestionId)),
  );
}
