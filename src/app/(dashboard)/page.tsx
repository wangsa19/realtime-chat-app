"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { io, Socket } from "socket.io-client";
import ChatHistory from "@/components/chat/ChatHistory";
import MessageInput from "@/components/chat/MessageInput";
import { Message } from "@/app/typings/chat";

let socket: Socket;

export default function Home() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const initializeSocket = async () => {
      if (status !== "authenticated") return;

      await fetch("/api/socket");
      socket = io({
        path: "/api/socket_io",
      });

      socket.on("connect", () => {
        console.log("Connected to socket server!");
      });

      socket.on("message:receive", (newMessage: Message) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    };

    initializeSocket();
  }, [status]);

  const handleSendMessage = () => {
    if (inputValue.trim() && socket && session?.user) {
      const newMessage: Message = {
        id: new Date().toISOString(),
        text: inputValue,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        user: {
          id: session.user.id!.toString(),
          name: session.user.name!,
          image:
            session.user.image ||
            `https://i.pravatar.cc/150?u=${session.user.id}`,
        },
      };

      socket.emit("message:send", newMessage);
      setInputValue("");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p>Please log in to chat.</p>
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatHistory
        ref={chatRef}
        messages={messages}
        currentUserId={session?.user?.id!.toString() ?? ''}
      />
      <MessageInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSend={handleSendMessage}
      />
    </div>
  );
}
