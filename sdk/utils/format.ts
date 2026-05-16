export const formatSTX = (microstx: number | string): string => {
  return (Number(microstx) / 1000000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
};

export const toMicroSTX = (stx: number | string): number => {
  return Math.floor(Number(stx) * 1000000);
};
