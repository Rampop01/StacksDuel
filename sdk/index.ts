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
