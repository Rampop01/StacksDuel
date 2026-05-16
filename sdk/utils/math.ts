export const calculateOdds = (poolA: number, poolB: number): { oddsA: number; oddsB: number } => {
  const total = poolA + poolB;
  if (total === 0) return { oddsA: 1, oddsB: 1 };
  
  return {
    oddsA: total / (poolA || 1),
    oddsB: total / (poolB || 1),
  };
};

export const getDuelPoolTotal = (poolA: number, poolB: number): number => {
  return poolA + poolB;
};

export const calculateROI = (odds: number): number => {
  return (odds - 1) * 100;
};
