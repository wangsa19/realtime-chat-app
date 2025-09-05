
"use client";

import { useEffect, useRef } from "react";
import ChatHistory from "@/components/chat/ChatHistory";
import MessageInput from "@/components/chat/MessageInput";

export default function Home() {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col h-full gap-2">
      <ChatHistory ref={chatRef} />
      <MessageInput />
    </div>
  );
}
