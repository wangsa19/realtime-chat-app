export type MessageStatus = "SENT" | "DELIVERED" | "READ";

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  status: MessageStatus;
  user: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface ContactUser {
  id: number;
  name: string | null;
  email: string;
  unreadCount?: number;
  lastMessage?: string;
  lastMessageTimestamp?: string;
}