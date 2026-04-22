declare module 'stacksduel-sdk' {
    export function getLatestDuelId(): Promise<number>;
    export function buildVotePayload(duelId: number, optionIndex: number): any;
    export const CONTRACT_ADDRESS: string;
    export const CONTRACT_NAME: string;
}
