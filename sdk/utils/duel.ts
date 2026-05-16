import { DuelDetails, DuelStatus } from '../types';

export const isDuelExpired = (duel: DuelDetails): boolean => {
  const now = Date.now();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  return now - duel.createdAt > ONE_DAY_MS;
};

export const canVoteOnDuel = (duel: DuelDetails): boolean => {
  const isCorrectStatus = [DuelStatus.Open, DuelStatus.Active].includes(duel.status);
  return isCorrectStatus && !isDuelExpired(duel);
};

export const getDuelStatusLabel = (status: DuelStatus): string => {
  return DuelStatus[status] || 'Unknown';
};

export const isDuelWinner = (duel: DuelDetails, optionIndex: number): boolean => {
  return duel.winner !== null && duel.winner === optionIndex;
};
