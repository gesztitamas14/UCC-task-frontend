export interface ChatMessage {
  id: number;
  chat_id: number;
  sender_role: 'USER' | 'HELP_DESK';
  message: string;
  created_at: string;
}