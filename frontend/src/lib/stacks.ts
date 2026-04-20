import { fetchCallReadOnlyFunction, cvToJSON, uintCV } from '@stacks/transactions';
import { STACKS_MAINNET } from '@stacks/network';

const CONTRACT_ADDRESS = 'SP1BTBG1TW13NEV2FQM7HC1BZ9XZV7FZSGPMVV38M';
const CONTRACT_NAME = 'duel-engine';

export async function fetchLastDuelId(): Promise<number> {
  // We can fetch data-vars via common API calls if no getter is present
  const url = `https://api.mainnet.hiro.so/extended/v1/address/${CONTRACT_ADDRESS}/contract/${CONTRACT_NAME}/data-var/last-duel-id`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return parseInt(data.value.slice(2), 16);
  } catch (error) {
    console.error('Error fetching last-duel-id:', error);
    return 0;
  }
}

export async function fetchDuelDetails(id: number) {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'get-duel-details',
      functionArgs: [uintCV(id)],
      network: STACKS_MAINNET,
      senderAddress: CONTRACT_ADDRESS,
    });
    
    const json = cvToJSON(result);
    if (!json.value) return null;
    
    return {
      id: id.toString(),
      creator: json.value.creator.value,
      title: json.value.title.value,
      options: json.value.options.value.map((o: any) => o.value),
      prediction: parseInt(json.value.prediction.value),
      active: json.value.active.value,
      winner: json.value.winner.value?.value,
      totalVotes: parseInt(json.value['total-votes'].value),
    };
  } catch (error) {
    console.error(`Error fetching duel ${id}:`, error);
    return null;
  }
}
