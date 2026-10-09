import { useEffect, useReducer, useState } from 'react';
import {
  autoAdvances,
  FIRST_STEP,
  getSteps,
  getVisibleQuestions,
  isStepComplete,
} from '@/lib/pre-diagnosis/flow';
import { resolvePlan } from '@/lib/pre-diagnosis/plan-result';
import {
  INITIAL_STATE,
  preDiagnosisReducer,
  RESULT_STEP,
  type PreDiagnosisState,
} from '@/lib/pre-diagnosis/reducer';
import type { AnswerValue, PlanId, Question, QuestionId } from '@/lib/pre-diagnosis/types';

/** Tempo em que as opções ficam bloqueadas após trocar de tela (evita o toque duplo). */
export const STEP_SETTLE_MS = 250;

export interface QuestionView {
  readonly kind: 'question';
  readonly questions: readonly Question[];
  readonly stepNumber: number;
  readonly totalSteps: number;
  readonly canGoBack: boolean;
  readonly canContinue: boolean;
  readonly showContinue: boolean;
}

export interface ResultView {
  readonly kind: 'result';
  readonly plan: PlanId;
}

export type AnswerHandler = (
  question: QuestionId,
  value: AnswerValue,
  autoAdvance: boolean,
) => void;

/** `true` logo após a troca de tela, até o intervalo de `STEP_SETTLE_MS` passar. */
function useStepSettling(currentStep: PreDiagnosisState['current']): boolean {
  const [settledStep, setSettledStep] = useState(currentStep);

  useEffect(() => {
    const timeout = window.setTimeout(() => setSettledStep(currentStep), STEP_SETTLE_MS);
    return () => window.clearTimeout(timeout);
  }, [currentStep]);

  return settledStep !== currentStep;
}

function buildView({ answers, current }: PreDiagnosisState): QuestionView | ResultView {
  const plan = resolvePlan(answers);

  if (current === RESULT_STEP && plan) return { kind: 'result', plan };

  // O reducer só chega ao resultado com o plano definido; a volta para a 1ª tela é só defesa
  const step = current === RESULT_STEP ? FIRST_STEP : current;
  const steps = getSteps(answers);
  const isComplete = isStepComplete(step, answers);

  return {
    kind: 'question',
    questions: getVisibleQuestions(step, answers),
    stepNumber: steps.indexOf(step) + 1,
    totalSteps: steps.length,
    canGoBack: step !== FIRST_STEP,
    canContinue: isComplete,
    // Telas que avançam ao toque só mostram "Continuar" quando já foram respondidas (ao voltar)
    showContinue: isComplete || !autoAdvances(step, answers),
  };
}

export function usePreDiagnosis() {
  const [state, dispatch] = useReducer(preDiagnosisReducer, INITIAL_STATE);
  const isSettling = useStepSettling(state.current);

  const answer: AnswerHandler = (question, value, autoAdvance) => (
    dispatch({ type: 'answer', question, value, autoAdvance })
  );

  return {
    view: buildView(state),
    answers: state.answers,
    currentStep: state.current,
    isSettling,
    answer,
    next: () => dispatch({ type: 'next' }),
    back: () => dispatch({ type: 'back' }),
    review: () => dispatch({ type: 'review' }),
    restart: () => dispatch({ type: 'restart' }),
  };
}
