import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import prisma from "@/lib/prisma";
import { NextApiResponseWithSocket } from "@/app/typings/platform";

const onlineUsers = new Map<string, string>();

export default function SocketHandler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    console.log("Socket server already running");
    res.end();
    return;
  }

  console.log("Starting Socket.IO server...");
  const io = new Server(res.socket.server as any, {
    path: "/api/socket_io",
    addTrailingSlash: false,
  });

  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("user:online", (userId: string) => {
      if (userId) {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} is online with socket ${socket.id}`);
      }
    });

    socket.on("private:send", async (data) => {
      const { receiverId, message } = data;

      try {
        await prisma.messages.create({
          data: {
            sender_id: Number(message.user.id),
            receiver_id: Number(receiverId),
            content: message.text,
            timestamp: new Date(message.id),
          },
        });
        console.log("Message saved to DB");
      } catch (error) {
        console.error("Failed to save message to DB:", error);
      }

      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("private:receive", message);
        socket.emit("private:receive", message);
      } else {
        console.log(`User ${receiverId} is not online.`);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });

  res.end();
}
