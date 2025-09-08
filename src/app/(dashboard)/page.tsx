"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { io, Socket } from "socket.io-client";

import ChatHistory from "@/components/chat/ChatHistory";
import MessageInput from "@/components/chat/MessageInput";
import Sidebar, { ContactUser } from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import { Message } from "@/app/typings/chat";

let socket: Socket;

const ChatPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full text-center bg-white rounded-xl shadow-md border border-slate-200">
    <h2 className="text-2xl font-semibold text-gray-700">Selamat Datang!</h2>
    <p className="text-gray-500 mt-2">
      Pilih kontak di sebelah kiri untuk memulai percakapan.
    </p>
  </div>
);

export default function Home() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedContact, setSelectedContact] = useState<ContactUser | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [contacts, setContacts] = useState<ContactUser[]>([]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const initializeSocket = async () => {
      if (status !== "authenticated" || !session) return;

      await fetch("/api/socket");
      socket = io({ path: "/api/socket_io" });

      socket.on("connect", () => {
        console.log("Connected to socket server!");
        socket.emit("user:online", session.user.id.toString());
      });

      socket.on("private:receive", (newMessage: Message) => {
        if (!newMessage || !newMessage.user) {
          return;
        }

        const senderId = newMessage.user.id;
        const currentUserId = session.user.id.toString();
        const activeContactId = selectedContact?.id.toString();

        if (senderId === activeContactId || senderId === currentUserId) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      return () => {
        if (socket) socket.disconnect();
      };
    };

    initializeSocket();
  }, [status, session, selectedContact]);

  const handleSelectContact = async (contact: ContactUser) => {
    setSelectedContact(contact);
    setMessages([]);
    setIsSidebarOpen(false);

    try {
      const response = await fetch(`/api/messages/${contact.id}`);
      if (response.ok) {
        const historyMessages = await response.json();
        setMessages(historyMessages);
      }
    } catch (error) {
      console.error("Failed to fetch message history:", error);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && socket && session?.user && selectedContact) {
      const newMessage = {
        receiverId: selectedContact.id.toString(),
        message: {
          id: new Date().toISOString(),
          text: inputValue,
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          user: {
            id: session.user.id.toString(),
            name: session.user.name!,
            image:
              session.user.image ||
              `https://i.pravatar.cc/150?u=${session.user.id}`,
          },
        },
      };

      socket.emit("private:send", newMessage);
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
    <div className="relative h-screen w-full">
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}
      <div className="flex h-full">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSelectContact={handleSelectContact}
          selectedContactId={selectedContact?.id || null}
        />
        <main className="flex h-full w-full flex-1 flex-col py-2 pr-2">
          <Header
            contact={selectedContact}
            onMenuClick={() => setIsSidebarOpen(true)}
          />
          {selectedContact ? (
            <>
              <div className="flex flex-1 flex-col overflow-hidden">
                <ChatHistory
                  ref={chatRef}
                  messages={messages}
                  currentUserId={session?.user?.id.toString() ?? ""}
                />
                <MessageInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onSend={handleSendMessage}
                />
              </div>
            </>
          ) : (
            <ChatPlaceholder />
          )}
        </main>
      </div>
    </div>
  );
}
