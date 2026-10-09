import { describe, expect, it } from 'vitest';
import { autoAdvances, getSteps, isStepComplete, pruneAnswers } from './flow';

describe('getSteps', () => {
  it('shows only the fixed steps before the modality is chosen', () => {
    expect(getSteps({})).toEqual([
      'objetivo', 'modalidade', 'treina', 'dor', 'dificuldade', 'inicio', 'nome',
    ]);
  });

  it.each([
    ['presencial', {}, ['agenda'], 8],
    ['dupla', {}, ['parceiro', 'agenda'], 9],
    ['online', { focoOnline: 'online' }, ['focoOnline'], 8],
    ['indeciso', { situacao: 'presencial' }, ['situacao', 'agenda'], 9],
    ['indeciso', { situacao: 'storm' }, ['situacao'], 8],
  ])('builds the path for modality "%s"', (modalidade, extra, extraSteps, total) => {
    const steps = getSteps({ modalidade, ...extra });

    expect(steps.slice(2, 2 + extraSteps.length)).toEqual(extraSteps);
    expect(steps).toHaveLength(total);
  });
});

describe('isStepComplete', () => {
  it('requires both region and period on the schedule step', () => {
    expect(isStepComplete('agenda', { periodo: 'manha' })).toBe(false);
    expect(isStepComplete('agenda', { regiao: '   ', periodo: 'manha' })).toBe(false);
    expect(isStepComplete('agenda', { regiao: 'Recreio', periodo: 'manha' })).toBe(true);
  });

  it('requires at least one location when the person reports pain', () => {
    expect(isStepComplete('dor', { dor: 'nao' })).toBe(true);
    expect(isStepComplete('dor', { dor: 'sim', dorLocal: [] })).toBe(false);
    expect(isStepComplete('dor', { dor: 'sim', dorLocal: ['joelhos'] })).toBe(true);
  });

  it('requires a non-blank first name on the name step', () => {
    expect(isStepComplete('nome', {})).toBe(false);
    expect(isStepComplete('nome', { nome: '  ' })).toBe(false);
    expect(isStepComplete('nome', { nome: 'Ana' })).toBe(true);
  });
});

describe('autoAdvances', () => {
  it('advances on steps with a single choice question', () => {
    expect(autoAdvances('objetivo', {})).toBe(true);
    expect(autoAdvances('dor', { dor: 'nao' })).toBe(true);
  });

  it('waits for "Continuar" on steps with text or extra questions', () => {
    expect(autoAdvances('agenda', {})).toBe(false);
    expect(autoAdvances('dor', { dor: 'sim' })).toBe(false);
  });
});

describe('pruneAnswers', () => {
  it('drops answers from branches that left the path', () => {
    const answers = pruneAnswers({
      objetivo: 'hipertrofia',
      modalidade: 'dupla',
      focoOnline: 'storm',
      parceiro: 'sim',
      regiao: 'Recreio',
      nome: 'Ana',
    });

    expect(answers).toEqual({
      objetivo: 'hipertrofia',
      modalidade: 'dupla',
      parceiro: 'sim',
      regiao: 'Recreio',
      nome: 'Ana',
    });
  });

  it('drops pain locations when the answer changes to no pain', () => {
    expect(pruneAnswers({ dor: 'nao', dorLocal: ['coluna'] })).toEqual({ dor: 'nao' });
  });
});
