'use client';

import { hexToCV, cvToJSON } from '@stacks/transactions';

const CONTRACT_ADDRESS = 'SP1BTBG1TW13NEV2FQM7HC1BZ9XZV7FZSGPMVV38M';
const CONTRACT_NAME = 'duel-engine';

export async function fetchLastDuelId(): Promise<number> {
  try {
    const url = `https://api.mainnet.hiro.so/v2/data_var/${CONTRACT_ADDRESS}/${CONTRACT_NAME}/last-duel-id?proof=0`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data.data) {
      const cv = hexToCV(data.data);
      const json = cvToJSON(cv);
      return parseInt(json.value) || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching last-duel-id:', error);
    return 0;
  }
}

export async function fetchDuelDetails(id: number): Promise<any | null> {
  try {
    const url = `https://api.mainnet.hiro.so/v2/contracts/call-read/${CONTRACT_ADDRESS}/${CONTRACT_NAME}/get-duel-details`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: CONTRACT_ADDRESS,
        arguments: [
          '0x01' + id.toString(16).padStart(32, '0')
        ]
      })
    });
    
    const data = await response.json();
    
    if (!data.okay || data.result === '0x09') {
      return null;
    }
    
    // Decode the Clarity value into JSON
    const cv = hexToCV(data.result);
    const json = cvToJSON(cv);
    
    // Handle both (some {...}) and direct tuple
    const duel = json.value?.value || json.value || json;
    
    return {
      id: id.toString(),
      creator: duel.creator?.value || 'Unknown',
      title: duel.title?.value || `Duel #${id}`,
      options: (duel.options?.value || []).map((o: any) => o.value || o),
      prediction: parseInt(duel.prediction?.value || '0'),
      active: duel.active?.value === true || duel.active?.value === 'true',
      winner: duel.winner?.value?.value ? parseInt(duel.winner.value.value) : null,
      totalVotes: parseInt(duel['total-votes']?.value || '0'),
    };
  } catch (err) {
    console.error(`Error fetching duel #${id}:`, err);
    return null;
  }
}
