import { autoAdvances, FIRST_STEP, getSteps, isStepComplete, pruneAnswers } from './flow';
import type { Answers, AnswerValue, QuestionId, StepId } from './types';

export const RESULT_STEP = 'resultado';

export interface PreDiagnosisState {
  readonly answers: Answers;
  /** Guarda o id da tela (e não o índice), porque o caminho muda com as respostas. */
  readonly current: StepId | typeof RESULT_STEP;
}

export type PreDiagnosisAction =
  | {
    readonly type: 'answer';
    readonly question: QuestionId;
    readonly value: AnswerValue;
    /** Se a resposta pode avançar sozinha (toque/clique); o teclado só seleciona. */
    readonly autoAdvance: boolean;
  }
  | { readonly type: 'next' }
  | { readonly type: 'back' }
  | { readonly type: 'review' }
  | { readonly type: 'restart' };

export const INITIAL_STATE: PreDiagnosisState = { answers: {}, current: FIRST_STEP };

function goNext(state: PreDiagnosisState): PreDiagnosisState {
  if (state.current === RESULT_STEP || !isStepComplete(state.current, state.answers)) {
    return state;
  }

  const steps = getSteps(state.answers);
  const nextStep = steps[steps.indexOf(state.current) + 1] ?? RESULT_STEP;

  return { ...state, current: nextStep };
}

function goBack(state: PreDiagnosisState): PreDiagnosisState {
  const steps = getSteps(state.answers);
  const index = state.current === RESULT_STEP ? steps.length : steps.indexOf(state.current);

  return index > 0 ? { ...state, current: steps[index - 1] } : state;
}

function answer(
  state: PreDiagnosisState,
  { question, value, autoAdvance }: Extract<PreDiagnosisAction, { type: 'answer' }>,
): PreDiagnosisState {
  const answered = { ...state, answers: pruneAnswers({ ...state.answers, [question]: value }) };
  const shouldAdvance = autoAdvance
    && state.current !== RESULT_STEP
    && autoAdvances(state.current, answered.answers);

  return shouldAdvance ? goNext(answered) : answered;
}

export function preDiagnosisReducer(
  state: PreDiagnosisState,
  action: PreDiagnosisAction,
): PreDiagnosisState {
  switch (action.type) {
    case 'answer':
      return answer(state, action);
    case 'next':
      return goNext(state);
    case 'back':
      return goBack(state);
    case 'review':
      return { ...state, current: FIRST_STEP };
    case 'restart':
      return INITIAL_STATE;
  }
}
