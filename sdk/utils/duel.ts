import { DuelDetails } from '../types';

export const isDuelExpired = (duel: DuelDetails): boolean => {
  const now = Date.now();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  return now - duel.createdAt > ONE_DAY_MS;
};
