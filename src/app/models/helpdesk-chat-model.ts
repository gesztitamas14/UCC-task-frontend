export interface HelpdeskChat {
  id: number;
  userId: number;
  userName: string;
  status: 'OPEN' | 'HUMAN' | 'CLOSED';
  lastMessage: string;
  lastMessageAt: string;
}
