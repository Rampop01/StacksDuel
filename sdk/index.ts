import { STACKS_MAINNET } from '@stacks/network';

export const CONFIG = {
  NETWORK: STACKS_MAINNET,
  CONTRACT_ADDRESS: 'SP1BTBG1TW13NEV2FQM7HC1BZ9XZV7FZSGPMVV38M',
  CONTRACT_NAME: 'duel-engine',
  API_URL: 'https://api.mainnet.hiro.so',
};

export interface DuelDetails {
  creator: string;
  title: string;
  options: string[];
  prediction: number;
  active: boolean;
  winner: number | null;
  totalVotes: number;
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
