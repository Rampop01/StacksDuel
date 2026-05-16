import { VALIDATION } from '../config';

export const validateDuelTitle = (title: string): boolean => {
  const length = title.trim().length;
  return length >= VALIDATION.MIN_TITLE_LENGTH && length <= VALIDATION.MAX_TITLE_LENGTH;
};
export const validateDuelOptions = (options: string[]): boolean => {
  const count = options.length;
  const allValid = options.every(opt => opt.trim().length > 0);
  return count >= VALIDATION.MIN_OPTIONS && count <= VALIDATION.MAX_OPTIONS && allValid;
};
