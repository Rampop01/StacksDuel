import { describe, it, expect } from 'vitest';
import { formatSTX, toMicroSTX, calculateOdds } from '../index';

describe('SDK Utilities', () => {
  describe('formatSTX', () => {
    it('should correctly format microSTX to STX string', () => {
      expect(formatSTX(1000000)).toBe('1.00');
      expect(formatSTX(5500000)).toBe('5.50');
      expect(formatSTX('10000000')).toBe('10.00');
    });

    it('should handle zero correctly', () => {
      expect(formatSTX(0)).toBe('0.00');
    });
  });

  describe('toMicroSTX', () => {
    it('should correctly convert STX to microSTX', () => {
      expect(toMicroSTX(1)).toBe(1000000);
      expect(toMicroSTX(5.5)).toBe(5500000);
      expect(toMicroSTX('10')).toBe(10000000);
    });
  });

  describe('calculateOdds', () => {
    it('should calculate correct odds for balanced pools', () => {
      const { oddsA, oddsB } = calculateOdds(100, 100);
      expect(oddsA).toBe(2);
      expect(oddsB).toBe(2);
    });

    it('should calculate correct odds for imbalanced pools', () => {
      const { oddsA, oddsB } = calculateOdds(100, 300);
      expect(oddsA).toBe(4);
      expect(oddsB).toBe(1.3333333333333333);
    });

    it('should handle empty pools gracefully', () => {
      const { oddsA, oddsB } = calculateOdds(0, 0);
      expect(oddsA).toBe(1);
      expect(oddsB).toBe(1);
    });
  });
});
