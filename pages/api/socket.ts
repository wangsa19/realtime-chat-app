import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import prisma from "@/lib/prisma";
import { NextApiResponseWithSocket } from "@/app/typings/platform";

const onlineUsers = new Map<string, string>();

const formatMessageForClient = (dbMessage: any) => ({
  id: dbMessage.id.toString(),
  text: dbMessage.content,
  timestamp: new Date(dbMessage.timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }),
  status: dbMessage.status,
  user: {
    id: dbMessage.userSender.id.toString(),
    name: dbMessage.userSender.name!,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      dbMessage.userSender.name || "User"
    )}`,
  },
  tempId: dbMessage.tempId,
});

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
      const { receiverId, message, tempId } = data;
      const senderId = message.user.id;

      const receiverSocketId = onlineUsers.get(receiverId);
      const isReceiverOnline = !!receiverSocketId;

      const newMessage = await prisma.messages.create({
        data: {
          sender_id: Number(senderId),
          receiver_id: Number(receiverId),
          content: message.text,
          timestamp: new Date(),
          status: isReceiverOnline ? "DELIVERED" : "SENT",
        },
        include: { userSender: true },
      });

      const messageForReceiver = formatMessageForClient(newMessage);

      const messageForSender = {
        ...messageForReceiver,
        tempId: tempId,
      };

      if (isReceiverOnline) {
        io.to(receiverSocketId!).emit("private:receive", messageForReceiver);
      }

      socket.emit("private:receive", messageForSender);
    });

    socket.on("messages:mark_as_read", async ({ contactId, currentUserId }) => {
      await prisma.messages.updateMany({
        where: {
          sender_id: Number(contactId),
          receiver_id: Number(currentUserId),
          status: { not: "READ" },
        },
        data: { status: "READ" },
      });

      const senderSocketId = onlineUsers.get(contactId);
      if (senderSocketId) {
        io.to(senderSocketId).emit("private:read_receipt", {
          readerId: currentUserId,
        });
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
