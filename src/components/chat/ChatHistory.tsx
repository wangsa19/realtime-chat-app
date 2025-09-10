import React from "react";
import Image from "next/image";
import { Check, CheckCheck } from "lucide-react";
import { Message, MessageStatus } from "@/app/typings/chat";

interface ChatHistoryProps {
  messages: Message[];
  currentUserId: string;
}

const MessageStatusIcon: React.FC<{ status: MessageStatus }> = ({ status }) => {
  if (status === "SENT") {
    return <Check size={16} className="ml-1 text-gray-500" />;
  }
  if (status === "DELIVERED") {
    return <CheckCheck size={16} className="ml-1 text-gray-500" />;
  }
  if (status === "READ") {
    return <CheckCheck size={16} className="ml-1 text-blue-500" />;
  }
  return null;
};

const ChatHistory = React.forwardRef<HTMLDivElement, ChatHistoryProps>(
  ({ messages, currentUserId }, ref) => {
    return (
      <section
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-white rounded-xl shadow-md border border-slate-200 scrollbar-custom"
        ref={ref}
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            No messages yet. Start chatting!
          </div>
        ) : (
          messages.map((msg) => {
            const isCurrentUser = msg.user.id === currentUserId;
            if (isCurrentUser) {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="flex flex-col items-end max-w-lg">
                    <div className="bg-orange-500 text-white px-5 py-3.5 rounded-3xl rounded-br-none">
                      <p>{msg.text}</p>
                    </div>
                    <div className="flex items-center justify-end text-xs text-gray-500 mt-1">
                      <span>{msg.timestamp}</span>
                      <MessageStatusIcon status={msg.status} />
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={msg.id} className="flex items-start gap-3">
                  <Image
                    src={msg.user.image || "https://i.pravatar.cc/150"}
                    alt={msg.user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-1 max-w-lg">
                    <div className="bg-gray-200 px-5 py-3.5 rounded-3xl rounded-bl-none">
                      <p className="font-bold text-sm text-gray-700 mb-1">
                        {msg.user.name}
                      </p>
                      <p>{msg.text}</p>
                    </div>
                    <div className="flex items-center justify-start text-xs text-gray-500 mt-1">
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            }
          })
        )}
      </section>
    );
  }
);

ChatHistory.displayName = "ChatHistory";
export default ChatHistory;
