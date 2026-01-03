export type ChatStatus = 'OPEN' | 'HUMAN' | 'CLOSED';

export interface Chat {
  id: number;
  user_id: number;
  status: ChatStatus;
  created_at: string;
  updated_at: string;
}