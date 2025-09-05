"use client";
import { useEffect, useState } from "react";
import { socket } from "../../../lib/socket";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      console.log("Sending:", message); // ✅ debug
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Real-time Chat</h1>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
