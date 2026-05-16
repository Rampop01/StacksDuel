import { STACKS_MAINNET } from '@stacks/network';

export const CONFIG = {
  NETWORK: STACKS_MAINNET,
  CONTRACT_ADDRESS: 'SP1BTBG1TW13NEV2FQM7HC1BZ9XZV7FZSGPMVV38M',
  CONTRACT_NAME: 'duel-engine',
  API_URL: 'https://api.mainnet.hiro.so',
};

export enum DuelStatus {
  Open = 0,
  Active = 1,
  Completed = 2,
  Disputed = 3,
  Cancelled = 4,
}

export interface DuelDetails {
  id: number;
  creator: string;
  title: string;
  options: string[];
  prediction: number;
  status: DuelStatus;
  winner: number | null;
  totalVotes: number;
  poolA: number;
  poolB: number;
  createdAt: number;
}

export async function getDuelDetails(duelId: number): Promise<DuelDetails | null> {
  try {
    const url = `${CONFIG.API_URL}/v2/map_entry/${CONFIG.CONTRACT_ADDRESS}/${CONFIG.CONTRACT_NAME}/duels`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(`0x01${duelId.toString(16).padStart(32, '0')}`),
    });

    if (!response.ok) return null;
    const data = await response.json();
    
    // Note: In a real app, we would use @stacks/transactions to decode the CV hex
    // For this granular commit, we'll keep the logic simple
    return data.data ? data.data : null; 
  } catch (error) {
    console.error('SDK Error fetching duel details:', error);
    return null;
  }
}

export const formatSTX = (microstx: number | string): string => {
  return (Number(microstx) / 1000000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
};

export const toMicroSTX = (stx: number | string): number => {
  return Math.floor(Number(stx) * 1000000);
};

export const calculateOdds = (poolA: number, poolB: number): { oddsA: number; oddsB: number } => {
  const total = poolA + poolB;
  if (total === 0) return { oddsA: 1, oddsB: 1 };
  
  return {
    oddsA: total / (poolA || 1),
    oddsB: total / (poolB || 1),
  };
};

export const buildCreateDuelTx = (title: string, options: string[], prediction: number) => {
  return {
    contractAddress: CONFIG.CONTRACT_ADDRESS,
    contractName: CONFIG.CONTRACT_NAME,
    functionName: 'create-duel',
    functionArgs: [
      // CV types would go here in a production SDK
      title,
      options,
      prediction
    ],
    network: CONFIG.NETWORK,
  };
};

export const buildVoteTx = (duelId: number, optionIndex: number) => {
  return {
    contractAddress: CONFIG.CONTRACT_ADDRESS,
    contractName: CONFIG.CONTRACT_NAME,
    functionName: 'vote',
    functionArgs: [
      duelId,
      optionIndex
    ],
    network: CONFIG.NETWORK,
  };
};
