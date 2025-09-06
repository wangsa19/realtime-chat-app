import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import { NextApiResponseWithSocket } from "@/app/typings/platform";

export default function SocketHandler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  // Cek jika server socket.io sudah berjalan
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

  // Simpan instance io ke server agar bisa diakses lagi
  res.socket.server.io = io;

  // Handler utama untuk koneksi client
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Handler untuk menerima pesan dari client
    socket.on("message:send", (data) => {
      // Broadcast pesan ke SEMUA client yang terhubung
      console.log("Broadcasting message:", data);
      io.emit("message:receive", data);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  res.end();
}