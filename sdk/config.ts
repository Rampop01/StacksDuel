import { STACKS_MAINNET } from '@stacks/network';

export const SDK_CONFIG = {
  NETWORK: STACKS_MAINNET,
  CONTRACT_ADDRESS: 'SP1BTBG1TW13NEV2FQM7HC1BZ9XZV7FZSGPMVV38M',
  CONTRACT_NAME: 'duel-engine',
  API_URL: 'https://api.mainnet.hiro.so',
};

export const getContractIdentifier = () => 
  `${SDK_CONFIG.CONTRACT_ADDRESS}.${SDK_CONFIG.CONTRACT_NAME}`;
