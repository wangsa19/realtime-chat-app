"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { io, Socket } from "socket.io-client";

import ChatHistory from "@/components/chat/ChatHistory";
import MessageInput from "@/components/chat/MessageInput";
import Sidebar from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import { ContactUser, Message } from "@/app/typings/chat";

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
  const selectedContactRef = useRef<ContactUser | null>(null);

  useEffect(() => {
    selectedContactRef.current = selectedContact;
  }, [selectedContact]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (session) {
        try {
          const response = await fetch("/api/contacts");
          if (response.ok) {
            const fetchedContacts = await response.json();
            setContacts(
              fetchedContacts.map((c: any) => ({ ...c, unreadCount: 0 }))
            );
          }
        } catch (error) {
          console.error("Failed to fetch contacts:", error);
        }
      }
    };
    fetchContacts();
  }, [session]);

  useEffect(() => {
    const initializeSocket = async () => {
      if (status !== "authenticated" || !session) return;

      await fetch("/api/socket");
      socket = io({ path: "/api/socket_io" });

      socket.on("connect", () => {
        console.log("Connected to socket server!");
        socket.emit("user:online", session.user.id.toString());
      });

      socket.on(
        "private:receive",
        (newMessageFromServer: Message & { tempId?: string }) => {
          const { tempId, ...message } = newMessageFromServer;
          const senderId = message.user.id;
          const currentUserId = session.user.id.toString();
          const activeContactId = selectedContactRef.current?.id.toString();

          if (tempId && senderId === currentUserId) {
            setMessages((prev) =>
              prev.map((m) => (m.id === tempId ? message : m))
            );
          } else if (senderId === activeContactId) {
            setMessages((prev) => [...prev, message]);
            socket.emit("messages:mark_as_read", {
              contactId: activeContactId,
              currentUserId: currentUserId,
            });
          }

          const conversationPartnerId =
            senderId === currentUserId ? activeContactId : senderId;

          if (!conversationPartnerId) return;

          setContacts((prev) => {
            const contactIndex = prev.findIndex(
              (c) => c.id.toString() === conversationPartnerId
            );
            if (contactIndex === -1) return prev;

            const updatedContact = { ...prev[contactIndex] };
            updatedContact.lastMessage =
              senderId === currentUserId
                ? `You: ${message.text}`
                : message.text;
            updatedContact.lastMessageTimestamp = message.timestamp;

            if (senderId !== currentUserId && senderId !== activeContactId) {
              updatedContact.unreadCount =
                (updatedContact.unreadCount || 0) + 1;
            }
            const otherContacts = prev.filter(
              (c) => c.id.toString() !== conversationPartnerId
            );
            return [updatedContact, ...otherContacts];
          });
        }
      );

      socket.on("private:status_update", ({ messageId, status }) => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, status } : msg))
        );
      });

      socket.on("private:read_receipt", ({ readerId }) => {
        if (readerId === selectedContactRef.current?.id.toString()) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.user.id === session.user.id.toString() &&
              msg.status !== "READ"
                ? { ...msg, status: "READ" }
                : msg
            )
          );
        }
      });

      return () => {
        if (socket && socket.connected) {
          console.log("Disconnecting socket...");
          socket.disconnect();
          // @ts-ignore
          socket = null;
        }
      };
    };

    initializeSocket();
  }, [status, session]);

  const handleSelectContact = async (contact: ContactUser) => {
    setSelectedContact(contact);
    setMessages([]);
    setIsSidebarOpen(false);

    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? { ...c, unreadCount: 0 } : c))
    );

    try {
      const response = await fetch(`/api/messages/${contact.id}`);
      if (response.ok) {
        const historyMessages = await response.json();
        setMessages(historyMessages);
        if (socket) {
          socket.emit("messages:mark_as_read", {
            contactId: contact.id.toString(),
            currentUserId: session?.user.id.toString(),
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch message history:", error);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && socket && session?.user && selectedContact) {
      const tempId = new Date().toISOString();
      const messageObject: Message = {
        id: tempId,
        text: inputValue,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "SENT",
        user: {
          id: session.user.id.toString(),
          name: session.user.name!,
          image:
            session.user.image ||
            `https://i.pravatar.cc/150?u=${session.user.id}`,
        },
      };

      setMessages((prev) => [...prev, messageObject]);

      const payload = {
        receiverId: selectedContact.id.toString(),
        message: messageObject,
        tempId: tempId,
      };

      socket.emit("private:send", payload);
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
          contacts={contacts}
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
