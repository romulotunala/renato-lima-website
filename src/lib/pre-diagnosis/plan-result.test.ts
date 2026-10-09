import { describe, expect, it } from 'vitest';
import { getResultText, isInPersonPlan, resolvePlan } from './plan-result';

describe('resolvePlan', () => {
  it.each([
    [{ modalidade: 'presencial' }, 'presencial'],
    [{ modalidade: 'dupla' }, 'dupla'],
    [{ modalidade: 'online', focoOnline: 'online' }, 'online'],
    [{ modalidade: 'online', focoOnline: 'storm' }, 'storm'],
    [{ modalidade: 'indeciso', situacao: 'presencial' }, 'presencial'],
    [{ modalidade: 'indeciso', situacao: 'dupla' }, 'dupla'],
    [{ modalidade: 'indeciso', situacao: 'online' }, 'online'],
    [{ modalidade: 'indeciso', situacao: 'storm' }, 'storm'],
  ])('resolves %o to "%s"', (answers, plan) => {
    expect(resolvePlan(answers)).toBe(plan);
  });

  it('returns null while the plan cannot be resolved yet', () => {
    expect(resolvePlan({})).toBeNull();
    expect(resolvePlan({ modalidade: 'online' })).toBeNull();
    expect(resolvePlan({ modalidade: 'indeciso' })).toBeNull();
  });

  it('ignores branch answers that belong to another modality', () => {
    expect(resolvePlan({ modalidade: 'presencial', situacao: 'storm' })).toBe('presencial');
  });
});

describe('isInPersonPlan', () => {
  it('is true only for in-person plans', () => {
    expect(isInPersonPlan('presencial')).toBe(true);
    expect(isInPersonPlan('dupla')).toBe(true);
    expect(isInPersonPlan('online')).toBe(false);
    expect(isInPersonPlan('storm')).toBe(false);
    expect(isInPersonPlan(null)).toBe(false);
  });
});

describe('getResultText', () => {
  it('starts the text with the first name when provided', () => {
    expect(getResultText('storm', ' Ana ')).toMatch(/^Ana, pelo que você respondeu, o Storm/);
  });

  it('keeps the original text when the name is empty', () => {
    expect(getResultText('storm', '')).toMatch(/^Pelo que você respondeu/);
  });
});
