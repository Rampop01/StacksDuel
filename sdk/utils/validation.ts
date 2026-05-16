import { VALIDATION } from '../config';

export const validateDuelTitle = (title: string): boolean => {
  const length = title.trim().length;
  return length >= VALIDATION.MIN_TITLE_LENGTH && length <= VALIDATION.MAX_TITLE_LENGTH;
};
