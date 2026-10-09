import { describe, expect, it } from 'vitest';
import {
  INITIAL_STATE,
  preDiagnosisReducer,
  RESULT_STEP,
  type PreDiagnosisAction,
  type PreDiagnosisState,
} from './reducer';
import type { AnswerValue, QuestionId } from './types';

function run(actions: PreDiagnosisAction[], state = INITIAL_STATE): PreDiagnosisState {
  return actions.reduce(preDiagnosisReducer, state);
}

const answer = (
  question: QuestionId,
  value: AnswerValue,
  autoAdvance = true,
): PreDiagnosisAction => ({ type: 'answer', question, value, autoAdvance });

describe('preDiagnosisReducer', () => {
  it('advances automatically on single choice steps', () => {
    const state = run([answer('objetivo', 'hipertrofia')]);

    expect(state.current).toBe('modalidade');
    expect(state.answers).toEqual({ objetivo: 'hipertrofia' });
  });

  it('selects without advancing when auto-advance is off (keyboard)', () => {
    const state = run([answer('objetivo', 'hipertrofia', false)]);

    expect(state.current).toBe('objetivo');
    expect(state.answers).toEqual({ objetivo: 'hipertrofia' });
    expect(run([{ type: 'next' }], state).current).toBe('modalidade');
  });

  it('does not advance on "next" while the step is incomplete', () => {
    const state = run([
      answer('objetivo', 'hipertrofia'),
      answer('modalidade', 'presencial'),
      answer('regiao', 'Recreio'),
      { type: 'next' },
    ]);

    expect(state.current).toBe('agenda');
  });

  it('waits for "next" when pain is reported and then follows the path', () => {
    const state = run([
      answer('objetivo', 'hipertrofia'),
      answer('modalidade', 'online'),
      answer('focoOnline', 'storm'),
      answer('treina', 'nunca'),
      answer('dor', 'sim'),
    ]);
    expect(state.current).toBe('dor');

    const next = run([answer('dorLocal', ['coluna']), { type: 'next' }], state);
    expect(next.current).toBe('dificuldade');
  });

  it('reaches the result after the last step and goes back to it', () => {
    const state = run([
      answer('objetivo', 'hipertrofia'),
      answer('modalidade', 'online'),
      answer('focoOnline', 'online'),
      answer('treina', 'nunca'),
      answer('dor', 'nao'),
      answer('dificuldade', 'tempo'),
      answer('inicio', 'pesquisando'),
      answer('nome', 'Ana'),
    ]);
    expect(state.current).toBe('nome');

    const result = run([{ type: 'next' }], state);
    expect(result.current).toBe(RESULT_STEP);
    expect(run([{ type: 'back' }], result).current).toBe('nome');
  });

  it('stays on the first step when going back', () => {
    expect(run([{ type: 'back' }])).toBe(INITIAL_STATE);
  });

  it('keeps answers on review and clears them on restart', () => {
    const state = run([answer('objetivo', 'hipertrofia'), answer('modalidade', 'dupla')]);

    expect(run([{ type: 'review' }], state)).toEqual({
      current: 'objetivo',
      answers: { objetivo: 'hipertrofia', modalidade: 'dupla' },
    });
    expect(run([{ type: 'restart' }], state)).toBe(INITIAL_STATE);
  });
});
