import { SDK_CONFIG } from './config';
import { DuelStatus, DuelDetails } from './types';

export * from './config';
export * from './types';
export * from './utils/format';
export * from './utils/math';
export * from './utils/duel';
export * from './utils/validation';

export async function getDuelDetails(duelId: number): Promise<DuelDetails | null> {
  try {
    const url = `${SDK_CONFIG.API_URL}/v2/map_entry/${SDK_CONFIG.CONTRACT_ADDRESS}/${SDK_CONFIG.CONTRACT_NAME}/duels`;
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


export const buildCreateDuelTx = (title: string, options: string[], prediction: number) => {
  return {
    contractAddress: SDK_CONFIG.CONTRACT_ADDRESS,
    contractName: SDK_CONFIG.CONTRACT_NAME,
    functionName: 'create-duel',
    functionArgs: [
      // CV types would go here in a production SDK
      title,
      options,
      prediction
    ],
    network: SDK_CONFIG.NETWORK,
  };
};

export const buildVoteTx = (duelId: number, optionIndex: number) => {
  return {
    contractAddress: SDK_CONFIG.CONTRACT_ADDRESS,
    contractName: SDK_CONFIG.CONTRACT_NAME,
    functionName: 'vote',
    functionArgs: [
      duelId,
      optionIndex
    ],
    network: SDK_CONFIG.NETWORK,
  };
};
