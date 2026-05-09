import { calculateOdds, formatSTX, toMicroSTX } from '../index';

describe('SDK Math Helpers', () => {
  test('toMicroSTX converts STX to microSTX', () => {
    expect(toMicroSTX(1)).toBe(1000000);
    expect(toMicroSTX('0.5')).toBe(500000);
  });

  test('formatSTX converts microSTX to formatted string', () => {
    expect(formatSTX(1000000)).toBe('1.00');
    expect(formatSTX(500000)).toBe('0.50');
  });

  test('calculateOdds returns correct multipliers', () => {
    const { oddsA, oddsB } = calculateOdds(100, 300);
    expect(oddsA).toBe(4); // (100 + 300) / 100
    expect(oddsB).toBe(1.3333333333333333); // (100 + 300) / 300
  });

  test('calculateOdds handles empty pools', () => {
    const { oddsA, oddsB } = calculateOdds(0, 0);
    expect(oddsA).toBe(1);
    expect(oddsB).toBe(1);
  });
});
