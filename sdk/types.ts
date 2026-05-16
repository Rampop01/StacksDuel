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
