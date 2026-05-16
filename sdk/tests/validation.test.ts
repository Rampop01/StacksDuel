import { describe, it, expect } from 'vitest';
import { validateDuelTitle, validateDuelOptions, validatePrediction } from '../utils/validation';

describe('Validation Helpers', () => {
  it('should validate duel title length', () => {
    expect(validateDuelTitle('Valid Title')).toBe(true);
    expect(validateDuelTitle('No')).toBe(false); // Too short
    expect(validateDuelTitle('A'.repeat(101))).toBe(false); // Too long
  });

  it('should validate duel options count and content', () => {
    expect(validateDuelOptions(['Yes', 'No'])).toBe(true);
    expect(validateDuelOptions(['Single'])).toBe(false); // Too few
    expect(validateDuelOptions(['One', 'Two', 'Three'])).toBe(false); // Too many
    expect(validateDuelOptions(['Valid', ' '])).toBe(false); // Empty option
  });

  it('should validate prediction index', () => {
    expect(validatePrediction(0, 2)).toBe(true);
    expect(validatePrediction(1, 2)).toBe(true);
    expect(validatePrediction(2, 2)).toBe(false); // Out of bounds
    expect(validatePrediction(-1, 2)).toBe(false); // Negative
  });
});
