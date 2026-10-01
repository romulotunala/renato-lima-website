import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('joins class names with a single space', () => {
    expect(cn('card', 'highlight')).toBe('card highlight');
  });

  it('ignores falsy values', () => {
    expect(cn('card', false, null, undefined, '', 'open')).toBe('card open');
  });

  it('returns an empty string when no class is truthy', () => {
    expect(cn(false, undefined)).toBe('');
  });
});
