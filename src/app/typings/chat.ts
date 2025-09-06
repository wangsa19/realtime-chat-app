// app/typings/chat.ts
export interface Message {
  id: string;
  text: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
}